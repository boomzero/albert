import { Component } from "react"
import axios from "axios"
import dayjs from "dayjs"

import Options from "./options"


class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: "",
      lifespan: 14,
      customShortened: "",
      password: "",
      restrictionMethod: "none",
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
      let result = res.data
      if (result.shortened) {
        result.success = true
        result.shortened = `${this.windowObject.location.origin}/${result.shortened}`
        this.props.onRespond(result)
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.windowObject = window
  }

  render() {
    return (
      <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
        <div className="form-group form-row align-self-stretch">
          <div className="col">
            <div className="input-group input-group-lg">
              <input className="form-control"
                type="url" name="url" placeholder="Enter your URL here..."
                value={this.state.url} onChange={this.handleChange}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Shorten</button>
              </div>
            </div>
          </div>
        </div>
        <Options onChange={this.handleChangeOptions} />
      </form>
    )
  }
}


export default Form