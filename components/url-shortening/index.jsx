import { Component } from "react"
import dayjs from "dayjs"

import Announcement from "./announcement"
import Form from "./form"


class UrlShortening extends Component {
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
      <>
        <Form onRespond={this.handleRespond} />
        {this.getAnnouncement()}
      </>
    )
  }
}


export default UrlShortening
