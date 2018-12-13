import React, { Component } from "react"
import dayjs from 'dayjs'


const CopyButton = (props) => {
  let classes, text
  if (props.copied) {
    classes = "btn btn-success"
    text = "Copied"
  } else {
    classes = "btn btn-primary"
    text = "Copy"
  }
  return <button className={classes} type="button" onClick={props.onClick}>{text}</button>
}

class ShortenedUrl extends Component {
  constructor(props) {
    super(props)

    this.state = { copied: false }
    this.shortenedUrlRef = React.createRef()
  }

  handleCopy = (event) => {
    this.shortenedUrlRef.current.select()
    document.execCommand('copy')
    this.setState({ copied: true })
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Shortened URL</label>
          <div className="input-group">
            <input className="form-control" type="text"
              value={this.props.shortened} onClick={this.handleCopy}
              ref={this.shortenedUrlRef} readOnly
            />
            <div className="input-group-append">
              <CopyButton copied={this.state.copied} onClick={this.handleCopy} />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

const Notice = (props) => (
  <p>
    <span>This URL will be expired at&nbsp;
      <strong>{props.expirationDateStr}</strong>
      .
    </span>
    <br/>
    {props.restrictionMethod === "none" ? null : (
      <span>
        After&nbsp;
        <strong>{props.restrictionLimit}</strong>
        &nbsp;normal requests per day, the access is restricted by&nbsp;
        <strong>{props.restrictionMethod}</strong>
        .
      </span>
    )}
  </p>
)

const AnnouncementTemplate = (props) => (
  <div className="modal fade" id="url-shortening-announcement">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <button className="close" type="button" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">{props.children}</div>
      </div>
    </div>
  </div>
)


export default (props) => {
  if (!props.success) return (
    <AnnouncementTemplate title="Failure">
      <p>Sorry, we couldn't make that.</p>
    </AnnouncementTemplate>
  )
  return (
    <AnnouncementTemplate title="Success">
      <ShortenedUrl shortened={props.data.shortened} />
      <Notice expirationDateStr={dayjs(props.data.expirationDate).format("MMM DD, YYYY HH:mm:ss")}
        restrictionMethod={props.data.restriction.method} restrictionLimit={props.data.restriction.limitAllIpPerDay}
      />
    </AnnouncementTemplate>
  )
}
