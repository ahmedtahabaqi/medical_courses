import React, { Component } from 'react';
import Context from '../Context';
import HeaderMyCourses from './HeaderMyCourses';
import FooterMyCourses from './FooterMyCourses';
import ContentMyCourses from './ContentMyCourses';
import { NavLink } from 'react-router-dom';

class MyCourses extends Component {
    render() {
        return (<Context.Consumer>
            {ctx => {
                return (
                    <div>
                        <NavLink to='/mycourses' ></NavLink>
                        <HeaderMyCourses />
                        <ContentMyCourses />
                        <FooterMyCourses />
                    </div>
                )
            }}
        </Context.Consumer>
        )
    }
}
export default MyCourses;