import React from 'react';
import Component from "@reactions/component";
import { Col, Row, Table, Button, Form } from 'react-bootstrap';
import { Pane, Dialog, toaster } from 'evergreen-ui';
import Context from '../Context';
import { Link, NavLink } from 'react-router-dom';
import '../../assets/dashboard/Dashboard.css';
import axios from 'axios';
import Cookies from "universal-cookie";
import Home from '../Home/Home';
import host from '../Host';

const cookies = new Cookies();



class Dashboard2 extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            Packages: [],
            pakgSelect: ''
        }
    }
    componentDidMount() {


        axios.get(host + `api/course`, { headers: {} })
            .then(response => {
                this.setState({ courses: response.data })
            })
            .catch((error) => { console.log('error ' + error) })

        axios.get(host + `api/course/Package`, { headers: {} })
            .then(response => {
                this.setState({ Packages: response.data })


            })
            .catch((error) => { console.log('error ' + error) })


    }
    AddCourseToPackage(course) {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        formData.append("Course", course);
        formData.append("package_id", this.state.pakgSelect);

        axios({ url: host + "api/course/Package/addCourse", method: "POST", data: formData, headers: headers })
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Successful");
                    this.componentDidMount();
                }
            })
            .catch(function (error) {
                if (error.request.response) {
                    toaster.danger(error.request.response);
                }
            });
    }

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    if (ctx.value.session.role === 1) {

                        return (
                            <div>
                                <Row style={{ height: '100vh', margin: 0, padding: 0 }}>
                                    <Col id='col1Dash' md={3} xl={2}>
                                        <div className="logoDash">
                                            <Link to='/'>
                                                <img width="100" src={require('../../assets/loog.png')} alt="img" />
                                            </Link>
                                        </div>
                                        <div id='isolate' />
                                        <div id='continerButtonDash'>
                                            <NavLink activeClassName='activeDash1' to='/dashboard1'>
                                                <Col id='slideCol' md={12}>
                                                    <div>
                                                        Aprovel
                                                    </div>
                                                </Col>
                                            </NavLink>
                                            <NavLink activeClassName='activeDash2' to='/dashboard2'>
                                                <Col id='slideCol' md={12}>
                                                    <div>
                                                        Courses
                                                    </div>
                                                </Col>
                                            </NavLink>
                                            <Col id='slideColLogout' md={12}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    cookies.remove("token");
                                                    window.location.href = "/"
                                                }}>
                                                <div>
                                                    Logout
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col id='col2Dash' sm={12} md={9} xl={10}>

                                        <Row style={{ margin: 50, padding: 0 }}>
                                            <Col>
                                                <Table id='RowTable' striped bordered hover size="xs" variant="">
                                                    <thead>
                                                        <tr>

                                                            <th> Name Course</th>
                                                            <th style={{ width: '300px' }}>Name Instructor</th>
                                                            <th style={{ width: '100px' }}>Price</th>
                                                            <th style={{ width: '150px' }}>Packages</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.courses.map(course =>
                                                            <tr key={course._id}>
                                                                <Link to={'/courses/' + course._id}>
                                                                    <td>{course.title}</td>
                                                                </Link>
                                                                <td>{course.userName}</td>
                                                                <td> {course.price + '$'}</td>
                                                                <td style={{ width: '150px', display: 'flex', justifyContent: 'center' }} >
                                                                    <Component initialState={{ isShown: false }}>
                                                                        {({ state, setState }) => (
                                                                            <Pane>
                                                                                <Dialog
                                                                                    isShown={state.isShown}
                                                                                    title="Add Course To Package"
                                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                                    confirmLabel="Add"
                                                                                    onConfirm={() => {
                                                                                        this.AddCourseToPackage(course._id)
                                                                                        setState({ isShown: false })
                                                                                    }}
                                                                                >

                                                                                    <Form>
                                                                                        <Form.Group id='selectCategoryContiner' controlId="exampleForm.ControlSelect1">
                                                                                            <Form.Label >Packages</Form.Label>
                                                                                            <Form.Control as="select"

                                                                                                onChange={(even) => {
                                                                                                    if (even.target.value !== 'SelectPackage') {
                                                                                                        this.setState({ pakgSelect: even.target.value })
                                                                                                    }
                                                                                                }
                                                                                                }>
                                                                                                <option value="SelectPackage">Select Package </option>
                                                                                                {this.state.Packages.map(pakg =>
                                                                                                    <option key={pakg._id} value={pakg._id}  >
                                                                                                        {pakg.Title}
                                                                                                    </option>
                                                                                                )}
                                                                                            </Form.Control>
                                                                                        </Form.Group>
                                                                                    </Form>

                                                                                </Dialog>
                                                                                <Button onClick={() => setState({ isShown: true })} style={{ marginTop: '-5px' }} size="sm"
                                                                                    variant="outline-primary">Add To Package</Button>

                                                                            </Pane>
                                                                        )}
                                                                    </Component>

                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </div>
                        )
                    }
                    else {
                        return (
                            <Home />
                        )
                    }


                }}
            </Context.Consumer>
        )
    }
}
export default Dashboard2;