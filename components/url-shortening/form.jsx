import { Component } from "react"
import axios from "axios"
import dayjs from "dayjs"

import Options from "./options"


export default class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: "",
      lifespan: 14,
      customShortened: "",
      password: "",
      restrictionMethod: "None",
      restrictionLimit: 86400,
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleChangeOptions = (optionsState) => this.setState(Object.assign(this.state, optionsState))

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post("/api/urls", {
        customShortened: this.state.customShortened,
        original: this.state.url,
        expirationDate: new dayjs().add(this.state.lifespan, "day"),
        password: this.state.password,
        restrictionMethod: this.state.restrictionMethod,
        restrictionLimit: this.state.restrictionLimit
      })
      this.props.onRespond(res)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
        <div className="form-group align-self-stretch">
          <div className="input-group input-group-lg">
            <input className="form-control" type="url" name="url" placeholder="Enter your URL here..."
              value={this.state.url} onChange={this.handleChange} required
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">Shorten</button>
            </div>
          </div>
        </div>
        <Options onChange={this.handleChangeOptions} />
      </form>
    )
  }
}
