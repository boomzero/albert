import { Component } from "react"
import Router from 'next/router'
import axios from "axios"
import dayjs from 'dayjs'

import Layout from "../components/layout"
import { Captcha, Timeout } from '../components/redirecting-restriction'


const Page = (props) => (
  <Layout>
    <section className='container p-5'>
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-xl-6">
          <div className="card">
            <div class="card-header">
              <h5 className="mb-0">{props.title}</h5>
            </div>
            <div className="card-body">
              {props.message ? <p className='card-text'>{props.message}</p> : null}
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)


export default class Redirecting extends Component {
  constructor(props) {
    super(props)

    this.state = { urlData: null }
  }

  async componentDidMount() {
    const res = await axios.get(`/api/urls/${Router.query.shortened}`)
    this.setState({ urlData: res.data })
  }

  render() {
    const urlData = this.state.urlData
    if (!urlData) return null
    if (!urlData.active) return (
      <Page title="URL Deactivated" message='This URL has been deactivated by the owner.' />
    )
    const expirationDayJs = dayjs(urlData.expirationDate)
    if (expirationDayJs.isBefore(dayjs())) return (
      <Page title="URL Expired"
        message={`This URL has been expired since ${expirationDayJs.format("HH:mm MMM DD, YYYY")}.`}
      />
    )
    if (urlData.accesses.count + 1 > urlData.restriction.limitAllIpPerDay) {
      if (urlData.restriction.method === 'Timeout') return (
        <Page title='URL Restricted with Time Out'>
          <Timeout duration={urlData.restriction.timeOutDuration} redirectTo={urlData.original} />
        </Page>
      )
      else if (urlData.restriction.method === 'CAPTCHA') return (
        <Page title='URL Restricted with CAPTCHA'>
          <Captcha redirectTo={urlData.original} />
        </Page>
      )
      else if (urlData.restriction.method === 'Block') return (
        <Page title='URL Blocked'
          message='The number of accesses has exceeded the limit of this URL.'
        />
      )
    }
    Router.push(urlData.original)
    return null
  }
}
