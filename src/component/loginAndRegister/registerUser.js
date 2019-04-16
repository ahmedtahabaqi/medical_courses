
import React from "react";
// import { toaster, Pane } from "evergreen-ui";
// import axios from "axios";
// import Cookies from "universal-cookie";
import {Link} from 'react-router-dom';
import '../../assets/loginTecherAndUser/loginTecher.css';
import host from '../Host';
// const cookies = new Cookies();

class RegisterUser extends React.Component {
    constructor() {
        super();
        this.state = {
            Email: "",
            Name: "",
            Password: ""
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    Register(event) {
        // event.preventDefault();
        // axios.post(host+`api/user/register`, {
        //     email: this.state.Email,
        //     password: this.state.Password,
        //     name: this.state.Name
        //   })
        //   .then(function(response) {
        //     cookies.set("token", response.data, {
        //       path: "/",
        //       expires: new Date(Date.now() + 604800000)
        //     });
        //     window.location.href = "/files";
        //   })
        //   .catch(function(error) {
        //     if (error.response.data.code == 11000) {
        //       toaster.danger("The email is already in use");
        //     } else if (error.response.data.details[0].message) {
        //       toaster.danger(error.response.data.details[0].message);
        //     } else {
        //       // console.log(error)
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
                                <div className="Authenticate">Create account as a user </div>
                                <form className="authform">
                                    <div className="username">
                                        <input type="text" placeholder="User Name" name="Name"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.Name}
                                        />
                                    </div>
                                    <div className="email">
                                        <input type="text" placeholder="Email" name="Email"
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
                                        onClick={this.Register.bind(this)}
                                    >
                                        Register
                                     </button>
                                </form>
                                <div className="linkSignUp on-signup">
                                    <span>Already a member? &nbsp;</span>
                                    <Link to="/loginuser"> Login</Link>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            </div>
        )

    }
}
export default RegisterUser;