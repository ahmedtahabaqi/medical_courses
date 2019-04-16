import React from "react";
// import { toaster, Pane } from "evergreen-ui";
// import axios from "axios";
// import Cookies from "universal-cookie";
import {Link} from 'react-router-dom';
import '../../assets/loginTecherAndUser/loginTecher.css';
// import host from '../Host';
// const cookies = new Cookies();

class LoginTeacher extends React.Component {
    constructor() {
        super();
        this.state = {
            Email: "",
            Password: ""
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    Login(event) {
        // event.preventDefault();
        // axios.post(host+`api/user/login`, {
        //     email: this.state.Email,
        //     password: this.state.Password
        //   })
        //   .then(function(response) {
        //     cookies.set("token", response.data, {
        //       path: "/",
        //       expires: new Date(Date.now() + 604800000)
        //     });
        //     window.location.href = "/files";
        //   })
        //   .catch(function(error) {
        //     if (error.response) {
        //       toaster.danger("Please check your email and password then try again");
        //     }
        //   });
    }

    render() {
        return (
            <div className="authmain">
                <div className="authDiv">
                    <React.Fragment>
                        <div className="mainSignIn">
                            <div className="leftside">
                                <div className="logoSignin">
                                    <img width="100" src={require('../../assets/loog.png')} alt='img' />
                                </div>
                                <div className="namelogo">Medical Education</div>
                               
                               
                                <div className="icons-container">
                                </div>
                            </div>
                            <div className="auth">
                                <div className="Authenticate">Login as a User</div>
                                <form className="authform">
                                    <div className="email">
                                        <input type="email" placeholder="Email" name="Email"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.Email}
                                        />
                                    </div>
                                    <div className="password">
                                        <input type="password" placeholder="Password" name="Password"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.Password}
                                        />
                                    </div>
                                    <button className="btnauth"
                                        onClick={this.Login.bind(this)}>
                                        Login
                                   </button>
                                </form>
                                <a id='forgetpassword' href="/forgetpassword">Forget Password</a>
                                <div className="linkSignUp">
                                    <span>Don’t have an account? &nbsp;</span>
                                    <Link to="/registeruser"> Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}
export default LoginTeacher;