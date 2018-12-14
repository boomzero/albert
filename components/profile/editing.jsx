import { Component } from 'react'
import axios from 'axios'

import FormGroup from '../common/form-groups'


export default class ProfileEditing extends Component {
  constructor(props) {
    super(props)

    this.state = { data: props.data, modified: false, dirty: false }
  }

  handleChange = (event) => {
    const data = Object.assign(this.state.data, { [event.target.name]: event.target.value })
    this.setState({ data, modified: true })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let data = this.state.data
      if (!this.state.modified) {
        this.props.onToggleMode(data)
        return
      }
      const { firstName, lastName, email } = data
      const res = await axios.put('/api/users/mine', { firstName, lastName, email }, {
        headers: { authorization: localStorage.getItem('jwt_token') },
      })
      data = res.data
      if (data.username) {
        this.setState({ data })
        this.props.onToggleMode(data)
      }
      else this.setState({ dirty: true })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const data = this.state.data
    return (
      <>
        <form className='form' onSubmit={this.handleSubmit}>
          <FormGroup label='Full name'>
            <div className='input-group'>
              <input className='form-control' name='firstName' type='text'
                value={data.firstName} placeholder='First Name' onChange={this.handleChange} required={true}
              />
              <input className='form-control' name='lastName' type='text'
                value={data.lastName} placeholder='Last Name' onChange={this.handleChange} required={true}
              />
            </div>
          </FormGroup>
          <FormGroup label='Email'>
            <input className='form-control' name='email' type='email'
              value={data.email} onChange={this.handleChange} required={true}
            />
          </FormGroup>
          <button className='btn btn-primary' type='submit'>Save profile</button>
        </form>
        {this.state.dirty ? <small className='text-danger'>Failed to update profile</small> : null}
      </>
    )
  }
}
