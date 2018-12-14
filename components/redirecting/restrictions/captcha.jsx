import { Component, createRef } from 'react'
import Router from 'next/router'
import ReCAPTCHA from "react-google-recaptcha"

import captchaConfigs from "../../../configs/captcha"


export default class Captcha extends Component {
  constructor(props) {
    super(props)

    this.captchaRef = createRef()
  }

  handleChange = () => Router.push(this.props.redirectTo)

  handleExpired = () => this.captchaRef.current.reset()

  render() {
    return (
      <ReCAPTCHA ref={this.captchaRef} sitekey={captchaConfigs.RECAPTCHA_CLIENT_KEY}
        onChange={this.handleChange} onExpired={this.handleExpired}
      />
    )
  }
}
