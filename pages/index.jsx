import { Component } from "react"
import dayjs from "dayjs"

import Hero from "../components/hero"
import Layout from "../components/layout"
import { Announcement, Form } from "../components/url-shortening"


export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: { success: false }
    }
  }

  handleRespond = (result) => {
    this.setState({ result })
    $("#url-shortening-announcement").modal("show")
  }

  getAnnouncement() {
    const result = this.state.result
    if (!result.success) return <Announcement success={false} />
    const data = {
      shortened: result.shortened,
      expirationDateStr: dayjs(result.expirationDate).format("HH:mm MMM DD, YYYY"),
      restrictionMethod: result.restriction.method,
      restrictionLimit: result.restriction.limitAllIpPerDay,
    }
    return <Announcement success={true} data={data} />
  }

  render() {
    return (
      <Layout>
        <Hero backgroundImage="url(../static/home-hero-background.jpg)" height="calc(100vh - 56px)">
          <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-xl-6">
              <Form onRespond={this.handleRespond} />
              {this.getAnnouncement()}
            </div>
          </div>
        </Hero>
      </Layout>
    )
  }
}
