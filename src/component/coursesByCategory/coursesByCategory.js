import React from 'react';
import Context from '../Context';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Button ,Popover,Menu,Position} from 'evergreen-ui';
import { Link } from 'react-router-dom';
import AvataeAndEdit from '../common/Avatar';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import host from '../Host';
class CorsesByCategory extends React.Component {
    constructor() {
        super()
        this.state = {
            rating: 3.5,
            courses: []
        }

    }
    componentDidMount() {

        axios.get(host + `api/course/Category/` + this.props.match.params.id, { headers: {} })
            .then(response => {
                this.setState({ courses: response.data })
            })
            .catch((error) => { console.log('error ' + error) })
    }
    render() {
        return ( <Context.Consumer>
            {ctx => {
                return (
            <div >
                <Navbar id='collapsAddCourse' collapseOnSelect expand="md" variant="light" >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Brand href="/">
                        <img style={{ width: '70px', paddingLeft: 16 }} src={require('../../assets/logo.png')} alt="img" />
                    </Navbar.Brand>
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
                <Row style={{ margin: 0, padding: 0 }}>
                    {this.state.courses.map(cors =>
                        <Col key={cors._id} id="col1" style={{ margin: 0, marginTop: 50, padding: 0 }} xs={12} sm={6} md={4} lg={3} xl={3} >
                            <div id='allcardContiner'>
                                <Link to={'/courses/'+cors._id}>
                                    <div id='allcard'>
                                        <div id='allimgCardContiner'>
                                            <img id='allimgCard' src={host + cors.img} alt="img" />
                                        </div>
                                        <div>
                                            <div id='allcardcontent'>
                                                <h2>{cors.title}</h2>
                                                <p>{'auther: ' + cors.userName} </p>
                                                <div id='btnRatingContiner'>
                                                    <Button marginRight={10} marginLeft={10} intent="danger">{cors.price}</Button>
                                                    <StarRatings rating={cors.ratting} starRatedColor="gold"
                                                        starDimension='15px' id='rating'
                                                        starSpacing='4px' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    )}
                </Row>



            </div>
             )
            }}
        </Context.Consumer>

        );
    }
}

export default CorsesByCategory;
