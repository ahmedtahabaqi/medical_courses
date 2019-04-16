import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Button, Popover, Position, Menu } from 'evergreen-ui';
import Context from '../Context';
import AvataeAndEdit from '../common/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '../Host';

class HeaderAllCourses extends Component {
    constructor() {
        super()
        this.state = {
            category: [],
        }

    }
    componentDidMount() {

        axios.get(host + `api/course/Category`, { headers: {} })
            .then(response => { this.setState({ category: response.data }) })
            .catch((error) => { console.log('error ' + error) })
    }

    render() {
        return (<Context.Consumer>
            {ctx => {
                return (
                    <div>
                        <Navbar id='collapsAddCourse' collapseOnSelect expand="md" variant="light" >
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Brand href="/">
                                <img style={{ width: '70px', paddingLeft: 16 }} src={require('../../assets/logo.png')} alt="img" />
                            </Navbar.Brand>
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Link to='/allcourses'><Menu.Item>All Category</Menu.Item></Link>
                                            {this.state.category.map(cate =>
                                                <Link key={cate._id} to={'/CoursesByCategory/' + cate._id} >
                                                    <Menu.Item  >{cate.name}</Menu.Item>
                                                </Link>
                                            )}
                                        </Menu.Group>

                                    </Menu>
                                }
                            >
                                <Button marginRight={10} iconAfter="caret-down">Category</Button>
                            </Popover>
                            <Nav className="mr-auto" />
                            <div style={ctx.value.auth !== "login" ? { display: "none"} : { }}>
                            <AvataeAndEdit  />

                            </div>
                            <div style={ctx.value.auth !== "login" ? { } : {display: "none" }}>
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Menu.Item ><Link
                                             to="/loginuser"
                                             >Login user</Link></Menu.Item>
                                            <Menu.Item ><Link to="/logintecher">Login teacher</Link></Menu.Item>
                                        </Menu.Group>
                                    </Menu>
                                }
                            >
                                <Button marginRight={10} iconAfter="caret-down">Login</Button>
                            </Popover>
                            </div>
                            <div style={ctx.value.auth !== 'login' ? { } : {display: "none" }}>
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Menu.Item ><Link to="/registeruser">Register user</Link></Menu.Item>
                                            <Menu.Item ><Link to="/registertecher">Register teacher</Link></Menu.Item>
                                        </Menu.Group>
                                    </Menu>
                                }
                            >
                                <Button marginRight={10} iconAfter="caret-down">Register</Button>
                            </Popover>
                            </div>
                        </Navbar>
                    </div>
                )
            }}
        </Context.Consumer>
        )
    }
}
export default HeaderAllCourses;