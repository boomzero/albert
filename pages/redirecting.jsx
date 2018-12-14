import { Component } from "react"
import Router from 'next/router'
import axios from "axios"
import dayjs from 'dayjs'

import {
  ExpiredPage,
  DeactivatedPage,
  TimeoutPage,
  CaptchaPage,
  BlockedPage,
  PasswordPage
} from '../components/redirecting/pages'


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
      if (urlData.restriction.method === 'CAPTCHA') return <CaptchaPage redirectTo={urlData.original} />
      if (urlData.restriction.method === 'Block') return <BlockedPage />
    }
    axios.post(`/api/urls/${Router.query.shortened}/accesses`, { redirected: true })
    Router.push(urlData.original)
    return null
  }
}
