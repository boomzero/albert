import { Component } from "react"
import { withRouter } from 'next/router'
import axios from "axios"

import Layout from "../components/layout"
import RedirectingRestriction from "../components/redirecting-restriction"


class Redirecting extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-sm-8">
              <RedirectingRestriction />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}


export default withRouter(Redirecting)
