import { Component } from 'react'
import Router from 'next/router'
import Link from "next/link"
import axios from 'axios'


const SignInButton = (props) => (
  <Link prefetch href="/signin">
    <a className="btn btn-outline-light">Sign In</a>
  </Link>
)

class ProfileDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = { name: '' }
  }

  signOut = (event) => {
    event.preventDefault()
    localStorage.removeItem('jwt_token')
    this.props.onSignOut()
    Router.push('/')
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users/mine', {
        headers: { authorization: localStorage.getItem('jwt_token') }
      })
      const { firstName, lastName } = res.data
      this.setState({ name: `${firstName} ${lastName}` })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const pathname = Router.pathname
    return (
      <div className="nav-item dropdown">
        <button className="btn btn-outline-light dropdown-toggle" data-toggle="dropdown">
          <span className='mr-2'>Hi <strong>{this.state.name}</strong></span>
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <Link prefetch href="/dashboard">
            <a className={`dropdown-item ${pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</a>
          </Link>
          <Link prefetch href="/profile">
            <a className={`dropdown-item ${pathname === '/profile' ? 'active' : ''}`}>View Profile</a>
          </Link>
          <a className="dropdown-item text-danger" href='#' onClick={this.signOut}>Sign out</a>
        </div>
      </div>
    )
  }
}

export default class Topbar extends Component {
  constructor(props) {
    super(props)

    this.state = { signedIn: null }
  }

  signOut = () => this.setState({ signedIn: false })

  componentDidMount() {
    const value = Boolean(localStorage.getItem('jwt_token'))
    this.setState({ signedIn: value })
  }

  getTopbarEnd() {
    if (this.state.signedIn === null) return null
    if (this.state.signedIn) return <ProfileDropdown onSignOut={this.signOut} />
    return <SignInButton />
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top shadow">
        <Link prefetch href="/">
          <a className="navbar-brand h1 mb-0">
            <strong>ALBERT</strong>
          </a>
        </Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-nav">
          <div className="navbar-nav ml-auto">{this.getTopbarEnd()}</div>
        </div>
      </nav>
    )
  }
}
