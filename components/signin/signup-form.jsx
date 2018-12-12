import { Component } from 'react'
import axios from 'axios'


export default class SigninForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmedPassword: '',
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("/api/users", {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.lastName,
        password: this.state.password,
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className='card card-body'>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" name='username' type="text" onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Full name</label>
            <div className="input-group">
              <input className="form-control" name='firstName' type="text" placeholder='First Name'
                onChange={this.handleChange} required
              />
              <input className="form-control" name='lastName' type="text" placeholder='Last Name'
                onChange={this.handleChange} required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" name='email' type="email" onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" name='password' type="password" onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input className="form-control" name='confirmedPassword' type="password" onChange={this.handleChange} required />
          </div>
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}
