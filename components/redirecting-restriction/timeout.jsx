import { Component } from 'react'
import Router from 'next/router'


export default class Timeout extends Component {
  constructor(props) {
    super(props)

    this.state = { remaining: this.props.duration }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState({ remaining: this.state.remaining - 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    if (this.state.remaining <= 0) Router.push(this.props.redirectTo)
    return (
      <p>You will be redirected in {this.state.remaining}s.</p>
    )
  }
}
