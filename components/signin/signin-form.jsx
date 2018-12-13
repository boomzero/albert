import { Component } from "react"
import axios from "axios"

import { Username, Password } from '../common/form-groups'


export default class SigninForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const authData = await axios.post("/auth/local", {
        username: this.state.username,
        password: this.state.password
      })
      if (authData.status === 200) {
        if (authData.data.success) {
          localStorage.setItem("jwt_token", authData.data.token)
          //TODO: redirect
        } else {
          //TODO: add message (server) / add notif (client)
          console.log("wrong password")
        }
      } else {
        //TODO: handle unsucessful response
        console.log("unsucessful")
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <Username name='username' value={this.state.username} onChange={this.handleChange} required={true} />
        <Password name='password' value={this.state.password} onChange={this.handleChange} required={true} />
        <button className='btn btn-primary' type='submit'>Sign In</button>
      </form>
    )
  }
}
