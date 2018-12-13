import { Component } from "react"
import Router from 'next/router'
import axios from "axios"
import dayjs from 'dayjs'

import Layout from "../components/layout"
import { Captcha, Timeout } from '../components/redirecting-restriction'
import { Password } from '../components/common/form-groups'


const Page = (props) => (
  <Layout>
    <section className='container p-5'>
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-xl-6">
          <div className="card">
            <div className="card-header">
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

const ExpiredPage = (props) => (
  <Page title="URL Expired"
    message={`This URL has been expired since ${props.since.format("MMM DD, YYYY HH:mm:ss")}.`}
  />
)

const DeactivatedPage = (props) => <Page title="URL Deactivated" message='This URL has been deactivated by the owner.' />

class PasswordPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      dirty: false,
      passwordValid: null
    }
  }

  validate = async (dirty=false) => {
    const res = await axios.post(`/api/urls/${Router.query.shortened}`, { password: this.state.password })
    this.setState({ dirty, passwordValid: res.data.success })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.validate(true)
  }

  componentDidMount() {
    this.validate()
  }

  render() {
    if (this.state.passwordValid === null) return null
    if (this.state.passwordValid) {
      this.props.onValid()
      return null
    }
    return (
      <Page title='Password validation required'>
        <form className='form' onSubmit={this.handleSubmit}>
          <Password name='password' value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })} required={true}
          />
          <button className='btn btn-primary' type='submit'>Validate</button>
        </form>
        {this.state.dirty ? <small className='text-danger'>Password incorrect</small> : null}
      </Page>
    )
  }
}

const TimeoutPage = (props) => (
  <Page title='URL Restricted'>
    <Timeout duration={props.duration} redirectTo={props.redirectTo} />
  </Page>
)

const CaptchaPage = (props) => (
  <Page title='URL Restricted'>
    <Captcha redirectTo={props.redirectTo} />
  </Page>
)

const BlockedPage = (props) => (
  <Page title='URL Blocked' message='The number of accesses has exceeded the limit of this URL.' />
)


export default class Redirecting extends Component {
  constructor(props) {
    super(props)

    this.state = { urlData: null, passwordValid: false }
  }

  async componentDidMount() {
    const res = await axios.get(`/api/urls/${Router.query.shortened}`)
    this.setState({ urlData: res.data })
  }

  render() {
    const urlData = this.state.urlData
    if (!urlData) return null

    const expirationDayJs = dayjs(urlData.expirationDate)
    if (expirationDayJs.isBefore(dayjs())) return <ExpiredPage since={expirationDayJs} />
    if (!urlData.active) return <DeactivatedPage />
    if (!this.state.passwordValid) return <PasswordPage onValid={() => this.setState({ passwordValid: true })} />
    if (urlData.accesses.count + 1 > urlData.restriction.limitAllIpPerDay) {
      if (urlData.restriction.method === 'Timeout') return (
        <TimeoutPage duration={urlData.restriction.timeOutDuration} redirectTo={urlData.original} />
      )
      else if (urlData.restriction.method === 'CAPTCHA') return <CaptchaPage redirectTo={urlData.original} />
      else if (urlData.restriction.method === 'Block') return <BlockedPage />
    }
    Router.push(urlData.original)
    return null
  }
}
