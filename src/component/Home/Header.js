import React from 'react';
import { Navbar, Nav,  Image } from 'react-bootstrap';
import { Button, SearchInput, Popover, Menu, Position } from 'evergreen-ui';
import Context from '../Context';
import { Link } from 'react-router-dom';
import AvataeAndEdit from '../common/Avatar';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import host from '../Host';
class HeaderHome extends React.Component {
    constructor() {
        super()
        this.state = {
            rating: 3.5,
            category: [],
        }

    }
    componentDidMount() {

        axios.get(host + `api/course/Category`, { headers: {} })
            .then(response => { this.setState({ category: response.data }) })
            .catch((error) => { console.log('error ' + error) })
    }
    render() {
        return (
            <Context.Consumer>
            {ctx => {
                return (
            <div >
                <Navbar id='collaps' collapseOnSelect expand="lg" bg="light" variant="light" >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Brand href="/">
                        <img height="27" src={require('../../assets/logo.png')} alt="img" />
                    </Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Group>
                                         <Link to='/allcourses'><Menu.Item>All Category</Menu.Item></Link>
                                        {this.state.category.map(cate =>
                                        <Link  key={cate._id}  to={'/CoursesByCategory/'+cate._id} >
                                            <Menu.Item  >{cate.name}</Menu.Item>
                                            </Link>
                                         ) }
                                        </Menu.Group>
                                    
                                    </Menu>
                                }
                            >
                                <Button marginRight={10} iconAfter="caret-down">Category</Button>
                            </Popover>

                            <Link to="/ShowPackages">
                                < Button   appearance="primary" intent="none">Packages</Button>
                            </Link>



                        </Nav>
                        <Nav>
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
                        </Nav>
                    </Navbar.Collapse >
                </Navbar>
                <div>

                    <div id='searchHome'>
                        <p id='pImg'>now it's possible: excel your knowledge<br /> and teach others  join now</p>
                        <Link to="#"> < Button id='becomeInstructureButtom'
                            appearance="primary" intent="none">Become an instructor</Button>
                        </Link>
                        <SearchInput id='searchHome1' placeholder="Search for courses..." />

                    </div>
                    <img id='homeImages' src={require('../../assets/homeimage.png')} alt="img" />
                </div>
                <div id='redbar'>
                    <div id='contentRedbar'>
                        <Image roundedCircle width='50px' height='50px' src={require('../../assets/Dr Karrar mahdi.jpg')} alt="Image" />
                        <div >
                            <h3>Dr Karrar Mahdi</h3>
                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                starDimension='15px' id='rating'
                                starSpacing='2px' />
                        </div>
                    </div>
                    <div id='contentRedbar'>
                        <Image roundedCircle width='50px' height='50px' src={require('../../assets/Dr Karrar mahdi.jpg')} alt="Image" />
                        <div >
                            <h3>Dr Karrar Mahdi</h3>
                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                starDimension='15px' id='rating'
                                starSpacing='2px' />
                        </div>
                    </div>
                    <div id='contentRedbar'>
                        <Image roundedCircle width='50px' height='50px' src={require('../../assets/dr Dani mamo.jpg')} alt="Image" />
                        <div>
                            <h3>Dr Dani Mamo</h3>
                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                starDimension='15px' id='rating'
                                starSpacing='2px' />
                        </div>
                    </div>
                    <div id='contentRedbar'>
                        <Image roundedCircle width='50px' height='50px' src={require('../../assets/dr ali alwaily.jpg')} alt="Image" />
                        <div>
                            <h3>Dr Ali Alwaily</h3>
                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                starDimension='15px' id='rating'
                                starSpacing='2px' />
                        </div>
                    </div>
                </div>
            </div>
                 )
                }}
            </Context.Consumer>
        );
    }
}

export default HeaderHome;
