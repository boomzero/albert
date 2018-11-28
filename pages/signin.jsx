import Layout from "../components/layout"
import Link from "next/link"
import React, {Component} from 'react'
import axios from "axios"

export default class Signin extends Component {

  constructor(prop){
    super(prop)
    this.state = {
      username : "",
      password: ""
    }
  }
  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.get("/api/users/" + this.state.username )
      let result = res.data
      if ((this.state.username == result.username) && (this.state.password == result.password) ) 
        console.log("OK")
      console.log(result)
    }
    catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              <h2 className="text-center">Log in</h2>
          
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  <input type="text" className="form-control" name="username" placeholder="Username" 
                    value={this.state.username} onChange={this.handleChange} required="required" onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                  <input type="password" className="form-control" name="password" placeholder="Password" 
                    value={this.state.password} onChange={this.handleChange} required="required" onChange={this.handleChange}/>
                </div>
              </div>        
              <div className="form-group">
                  <button type="submit" className="btn btn-success btn-block login-btn" >Sign in</button>
              </div>
              <div className="form-group">
                <p className="text-center">
                  <Link prefetch href ="/signup">
                    <a href="#">Create an Account</a>
                  </Link>
                </p>
              </div>
              <div className="clearfix">
                <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                <a href="#" className="float-right text-success">Forgot Password?</a>
              </div> 

              <div className="or-seperator"><i>or</i></div>
              <div className="text-center social-btn">
                <a href="#" className="btn btn-primary btn-block"><i className="fa fa-facebook"></i> Sign in with <b>Facebook</b></a>
                <a href="#" className="btn btn-danger btn-block"><i className="fa fa-google"></i> Sign in with <b>Google</b></a>
              </div>

            </form>
          </div>

          <style jsx>{`
            .login-form {
              width : 340px;
              margin : 30px auto;
            }
            .login-form form {
              margin-bottom: 15px;
              background: #f7f7f7;
              box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
              padding: 30px;
            }
            .login-form h2 {
              margin: 0 0 15px;
            }
            .login-form .hint-text {
              color: #777;
              padding-bottom: 15px;
              text-align: center;
            }
            .form-control, .btn{
              min-height : 38px;
              border-radius :2px ;
            }
            .login-btn {        
              font-size: 15px;
              font-weight: bold;
            }
            .or-seperator {
              margin: 20px 0 10px;
              text-align: center;
              border-top: 1px solid #ccc;
            }
            .or-seperator i {
              padding: 0 10px;
              background: #f7f7f7;
              position: relative;
              top: -11px;
              z-index: 1;
            }
            .social-btn .btn {
              margin: 10px 0;
              font-size: 15px;
              text-align: left; 
              line-height: 24px;       
            }
            .social-btn .btn i {
              float: left;
              margin: 4px 15px  0 5px;
              min-width: 15px;
            }
            .input-group-addon .fa{
              font-size: 18px;
            }
          `}</style>
        </Layout>
      </div>
    );
  }
}
