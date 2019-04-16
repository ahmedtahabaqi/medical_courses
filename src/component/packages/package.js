import React from 'react';
import { Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Button } from 'evergreen-ui';
import '../../assets/AddCourse/SlideBar.css';
import Context from '../Context';
import StarRatings from 'react-star-ratings';
import AvatarAndEdit from '../common/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../Host';
const cookies = new Cookies();




class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursePackge: [],
            packageContent: [],
            id: this.props.match.params.id
        };
    }

    componentDidMount() {

        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        formData.append("package_id", this.state.id);

        axios({ url: host + "api/course/Package/getCourses", method: "POST", data: formData, headers: headers })
            .then(response => {
                this.setState({ coursePackge: response.data.courses, packageContent: response.data.package })
                console.log(response.data.package);


            })
            .catch(function (error) {
                console.log(error);
            });

    }



    render() {

        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div >

                            <Navbar id='collapsAddCourse' collapseOnSelect expand="md" variant="light" >
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Brand href="/">
                                    <img style={{ width: '70px', paddingLeft: 16 }} src={require('../../assets/logo.png')} alt="img" />
                                </Navbar.Brand>
                                <Nav className="mr-auto" />
                                <AvatarAndEdit />
                            </Navbar>
                            <div id='titleCourseContiner'>
                                <div id='titleCourseContiner1'>
                                    <h2 id='titleCourse'>
                                       {this.state.packageContent.Title}
                                    </h2>
                                    <p id='descripCourse'> {this.state.packageContent.body} </p>

                                    <div id='byNowContiner'>
                                        <Button size={30} appearance="primary" intent="danger" > By Now</Button>

                                        <div id='priceNow'>{this.state.packageContent.Price + ' $'}</div>
                                    </div>

                                </div>
                                <div id='imgCardCourseContiner' > <img id='imgCardCourse' src={host+this.state.packageContent.img } alt="img" /></div>

                            </div>

                            <Row style={{ margin: 0, padding: 0 }}>
                                {this.state.coursePackge.map(coursePackge =>
                                    <Col key={coursePackge._id} id="col1" style={{ margin: 0, marginTop: 50, padding: 0 }} xs={12} sm={6} md={4} lg={3} xl={3} >
                                        <Link to={'/courses/' + coursePackge._id}>

                                            <div id='allcardContiner'>
                                                <div id='allcardpackage'>
                                                    <div id='imagecardpackage'>
                                                        <img id='imagecardpackage' src={host + coursePackge.img} alt="img" />
                                                    </div>
                                                    <div id='allcardcontentpackage'>
                                                        <div>
                                                            <h2>{coursePackge.title}</h2>
                                                            <p>{coursePackge.body} </p>
                                                        </div>
                                                        <div id='pricepackage' >
                                                            <StarRatings rating={coursePackge.ratting} starRatedColor="gold"
                                                                starDimension='15px' id='rating'
                                                                starSpacing='4px' />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </Link>
                                    </Col>)}
                            </Row>


                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}
export default Package;