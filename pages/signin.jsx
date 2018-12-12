import Layout from "../components/layout"
import { SigninForm, SignupForm } from '../components/signin'


export default (props) => (
  <Layout>
    <section className='container p-5'>
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-xl-6">
          <nav className="nav nav-pills nav-justified mb-3">
            <a className="nav-item nav-link active" data-toggle="pill" href="#signin-form">Sign In</a>
            <a className="nav-item nav-link" data-toggle="pill" href="#signup-form">Sign Up</a>
          </nav>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="signin-form">
              <SigninForm />
            </div>
            <div className="tab-pane fade" id="signup-form">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
