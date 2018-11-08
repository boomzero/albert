import { Component } from "react"

import Options from "./options"


class Form extends Component {
  constructor(props) {
    super(props)

    this.state = { url: "" }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleChangeOptions = (optionsState) => this.setState(Object.assign(this.state, optionsState))

  handleSubmit = (event) => console.log("Submitted")  // TODO: Actually send a request to API

  render() {
    return (
      <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
        <div className="form-group form-row align-self-stretch">
          <div className="col-sm-8 col-md-9 col-lg-10 mb-2 mb-sm-0">
            <input className="form-control form-control-lg"
              type="url" name="url" placeholder="Enter your URL here..."
              value={this.state.url} onChange={this.handleChange}
            />
          </div>
          <div className="col-sm-4 col-md-3 col-lg-2">
            <button type="submit" className="btn btn-primary btn-lg">Shorten</button>
          </div>
        </div>

        <Options onChange={this.handleChangeOptions} />
      </form>
    )
  }
}


export default Form
