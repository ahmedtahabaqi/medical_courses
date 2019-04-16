import React, { Component } from 'react';
import Context from '../Context';
import LoginTecher from './loginTecher';
import RegisterTecher from './registerTecher';
import LoginUser from  './loginUser';
import RegisterUser from './registerUser';
import { Route } from 'react-router-dom';

class RegisterAndLogin extends Component {
    render() {
        return (<Context.Consumer>
            {ctx => {
                return (
                    <div>
                        
                        <Route path='/logintecher' component={LoginTecher}/>
                        <Route path='/loginuser' component={LoginUser}/>
                        <Route path='/registeruser' component={RegisterUser}/>
                        <Route path='/registertecher' component={RegisterTecher}/>
                    </div>
                )
            }}
        </Context.Consumer>
        )
    }
}
export default RegisterAndLogin;