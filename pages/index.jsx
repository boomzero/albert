import { Component } from "react"

import Hero from "../components/hero"
import Layout from "../components/layout"
import { Announcement, Form } from "../components/url-shortening"


export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = { success: false, responseData: null }
  }

  handleRespond = (res) => {
    let data = res.data
    let success = false
    if (data.shortened) {
      data.shortened = `${this.window.location.origin}/${data.shortened}`
      success = true
    }
    this.setState({ success, responseData: data })
    $("#url-shortening-announcement").modal("show")
  }

  getAnnouncement() {
    if (!this.state.success) return <Announcement success={false} />
    return <Announcement success={true} data={this.state.responseData} />
  }

  componentDidMount() {
    this.window = window
  }

  render() {
    return (
      <Layout>
        <Hero backgroundImage="url(../static/hero.jpg)" height="calc(100vh - 56px)">
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
