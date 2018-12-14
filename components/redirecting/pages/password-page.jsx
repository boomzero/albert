import { Component } from 'react'
import Router from 'next/router'
import axios from 'axios'

import Page from './page'
import { Password } from '../../common/form-groups'


export default class PasswordPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      dirty: false,
      passwordValid: null
    }
  }

  validate = async (dirty = false) => {
    const res = await axios.post(`/api/urls/${Router.query.shortened}`, { password: this.state.password })
    this.setState({ dirty, passwordValid: res.data.success })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.validate(true)
  }

  componentDidMount() {
    this.validate()
  }

  render() {
    if (this.state.passwordValid === null) return null
    if (this.state.passwordValid) {
      this.props.onValid()
      return null
    }
    return (
      <Page title='Password validation required'>
        <form className='form' onSubmit={this.handleSubmit}>
          <Password name='password' value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })} required={true}
          />
          <button className='btn btn-primary' type='submit'>Validate</button>
        </form>
        {this.state.dirty ? <small className='text-danger'>Password incorrect</small> : null}
      </Page>
    )
  }
}
