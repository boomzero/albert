import { Component } from "react"
import Router from 'next/router'
import axios from "axios"

import { Username, Password } from '../common/form-groups'


export default class SigninForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      dirty: false,
    }
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post("/auth/local", {
        username: this.state.username,
        password: this.state.password
      })
      const { success, token } = res.data
      if (success) {
        localStorage.setItem("jwt_token", token)
        Router.push('/dashboard')
      }
      else this.setState({ dirty: true })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <form className='form' onSubmit={this.handleSubmit}>
          <Username name='username' value={this.state.username} onChange={this.handleChange} required={true} />
          <Password name='password' value={this.state.password} onChange={this.handleChange} required={true} />
          <button className='btn btn-primary' type='submit'>Sign In</button>
        </form>
        {this.state.dirty ? <small className='text-danger'>Username or password incorrect</small> : null}
      </>
    )
  }
}
