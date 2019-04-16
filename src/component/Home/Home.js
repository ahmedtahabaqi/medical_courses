import React, { Component } from 'react';
import Context from '../Context';
import ContentHome from './content';
import HeaderHome from './Header';
import FooterHome from './Footer';
import {NavLink} from 'react-router-dom';

class Home extends Component {
    render() {
        return (<Context.Consumer>
            {ctx => {
            
                return (
                    <div>
                        <NavLink exact to='/'/>
                        <HeaderHome />
                        <ContentHome />
                        <FooterHome />
                    </div>
                )
            }}
        </Context.Consumer>
        );
    }
}

export default Home;
