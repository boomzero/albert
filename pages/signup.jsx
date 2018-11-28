import Layout from "../components/layout"
import axios from "axios"
import React,{Component} from 'react'


class Signup extends Component {

  constructor(prop) {
    super(prop)

    this.state = {
      email: "" ,
      username : "",
      password : "" ,
      firstName : "" ,
      lastName : "" ,
      confirmpass : "" ,
      //confirmPass : "" ,
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleConfirmPassword = (event) => this.setState({confirmpass: event.target.value})

  handleSubmit = async(event) => {
    event.preventDefault()
    if (this.state.password != this.state.confirmpass) alert("sorry, password does not match")
    else
      try {
        const res = await axios.post("/api/users", {
          email: this.state.email ,
          username: this.state.username,
          password : this.state.password,
          firstName : this.state.firstName,
          lastName : this.state.lastName
        })
        
        let result = res.data
        if (result.name == "MongoError") alert("username or email already exits")
        else alert("signed up successfully")
      }
      catch(err){
        console.log(err)
      }
  }
  render() {
    return (
      <Layout>
        <div className="login-form">
          <form action="/examples/actions/confirmation.php" method="post" onSubmit={this.handleSubmit}>
            <h2 className="text-center">Sign Up</h2>

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                <input type="text" className="form-control" name="firstName" placeholder="First Name" 
                  value={this.state.firstName} onChange={this.handleChange} required="required" 
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                <input type="text" className="form-control" name="lastName" placeholder="Last Name" 
                  value={this.state.lastName} onChange={this.handleChange} required="required" 
                />
              </div>
            </div>
          
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                <input type="text" className="form-control" name="email" placeholder="Email" 
                  value={this.state.email} onChange={this.handleChange} required="required" 
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                <input type="text" className="form-control" name="username" placeholder="Username" 
                  value={this.state.username} onChange={this.handleChange} required="required" 
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                <input type="password" className="form-control" name="password" placeholder="Password" 
                   value={this.state.password} onChange={this.handleChange} required="required" 
                />
              </div>
            </div> 

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                <input type="password" className="form-control" name="confirmpassword" placeholder="Confirm Password" 
                  value={this.state.confirmpass} onChange={this.handleConfirmPassword} required="required" 
                />
              </div>
            </div> 
    
            <div className="form-group">
                <button type="submit" className="btn btn-success btn-block login-btn" >Sign up</button>
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
    ) ;
  }
}


export default Signup
