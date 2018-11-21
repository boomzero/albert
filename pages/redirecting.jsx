import { Component } from "react"
import Router from 'next/router'
import axios from "axios"
import dayjs from 'dayjs'

import Hero from '../components/hero'
import Layout from "../components/layout"


const Page = (props) => (
  <Layout>
    <Hero height="calc(100vh - 56px)">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <h6 className='card-subtitle'>{props.subtitle}</h6>
              <p className='card-text'>{props.message}</p>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </Hero>
  </Layout>
)

class Redirecting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      urlData: null,
    }
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
      if (urlData.restriction.method === 'Block') return (
        <Page title='URL Restricted'
          message='The number of accesses has exceeded the limit of this URL.'
        />
      )
    }
    Router.push(urlData.original)
    return null
  }
}


export default Redirecting
