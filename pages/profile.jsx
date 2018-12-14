import { Component } from 'react'
import axios from 'axios'

import Layout from "../components/layout"
import { ProfileView, ProfileEditing } from '../components/profile'


export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = { data: null, inViewMode: true }
  }

  getProfileForm() {
    if (!this.state.data) return null
    if (this.state.inViewMode) return (
      <ProfileView data={this.state.data} onToggleMode={() => this.setState({ inViewMode: false })} />
    )
    return (
      <ProfileEditing data={this.state.data} onToggleMode={(data) => this.setState({ data, inViewMode: true })} />
    )
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users/mine', {
        headers: { authorization: localStorage.getItem('jwt_token') }
      })
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Layout>
        <section className='container p-5'>
          <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-xl-6">
              <div className='card shadow'>
                <div className="card-header">
                  <h5 className="mb-0">{this.state.inViewMode ? 'View Profile' : 'Edit Profile'}</h5>
                </div>
                <div className='card-body'>{this.getProfileForm()}</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
