import { Component } from 'react'
import axios from 'axios'

import FormGroup, { Username, ConfirmedPassword } from '../common/form-groups'


export default class SigninForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dirty: false,
      success: false,
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleChangePassword = (data) => this.setState({ password: data.password })

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/users', {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
      let success = false
      if (res.data.username) success = true
      this.setState({ dirty: true, success })
    } catch (err) {
      console.log(err)
    }
  }

  getAnnouncement() {
    if (this.state.success) return <small className='text-success'>Registered account successfully</small>
    else return <small className='text-danger'>Failed to register account</small>
  }

  render() {
    return (
      <>
        <form className='form' onSubmit={this.handleSubmit}>
          <Username name='username' value={this.state.username} onChange={this.handleChange} required={true} />
          <FormGroup label='Full name'>
            <div className='input-group'>
              <input className='form-control' name='firstName' type='text'
                value={this.state.firstName} placeholder='First Name' onChange={this.handleChange} required={true}
              />
              <input className='form-control' name='lastName' type='text'
                value={this.state.lastName} placeholder='Last Name' onChange={this.handleChange} required={true}
              />
            </div>
          </FormGroup>
          <FormGroup label='Email'>
            <input className='form-control' name='email' type='email'
              value={this.state.email} onChange={this.handleChange} required={true}
            />
          </FormGroup>
          <ConfirmedPassword value={this.state.password} onChange={this.handleChangePassword} required={true} />
          <button className='btn btn-primary' type='submit'>Sign Up</button>
        </form>
        {this.state.dirty ? this.getAnnouncement() : null}
      </>
    )
  }
}
