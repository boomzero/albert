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
        expirationDate: dayjs().add(this.state.lifespan, 'day'),
        password: this.state.password,
        restrictionMethod: this.state.restrictionMethod,
        restrictionLimit: this.state.restrictionLimit
      })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

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
