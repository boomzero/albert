import { Component } from 'react'
import axios from 'axios'


export default class SigninForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("/auth/local", {
        username: this.state.username,
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
            <label>Password</label>
            <input className="form-control" name='password' type="password" onChange={this.handleChange} required />
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}
