import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import {  Button } from 'evergreen-ui';
import StarRatings from 'react-star-ratings';
import AvataeAndEdit from '../common/Avatar';
import '../../assets/cssCourse/HeaderCourses.css';
import axios from 'axios';
import Cookies from "universal-cookie";
import host from '../Host';
const cookies = new Cookies();



    
    
class HeaderCourses extends Component {
    constructor() {
        super()
        this.state = {
             courseDetels:[]
             }
    }
    componentDidMount() {      

        axios.get(host + `api/course/CourseDetails/`+ this.props.match.params.id, { headers: { token: cookies.get('token') } })
            .then(response => { this.setState({ courseDetels: response.data[0]  }) 
            console.log( response.data[0]);
            
           
        })
            .catch((error) => { console.log('error ' + error); })
    }

    // changeRating(newRating) {
    //     this.setState({
    //         rating: newRating
    //     });
    // }
    render() {
        return (
            <div>
                <Navbar id='collapsAddCourse' collapseOnSelect expand="md" variant="light" >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Brand href="/">
                        <img style={{ width: '70px', paddingLeft: 16 }} src={require('../../assets/logo.png')} alt="img" />
                    </Navbar.Brand>
                    <Nav className="mr-auto" />
                    <AvataeAndEdit />
                </Navbar>
                <div id='titleCourseContiner'>
                    <div id='titleCourseContiner1'>
                        <h2 id='titleCourse'>
                            {this.state.courseDetels.title}
                   </h2>
                        <p id='descripCourse'>{this.state.courseDetels.body} </p>
                        <div className='rating'>
                            <StarRatings rating={this.state.courseDetels.ratting} starRatedColor="gold"
                                // changeRating={this.changeRating} 
                                starDimension='20px'
                                starSpacing='4px'
                            />
                           <span style={{marginLeft:30}}>{'Auther: '+this.state.courseDetels.userName}</span>
                        </div>
                        <div id='byNowContiner'>
                            <Button size={400} appearance="primary" intent="danger" > By Now</Button>
                            {/* <div id='orginalPrice'>{this.state.courseDetels.__v + ' $'}</div> */}
                            <div id='priceNow'>{this.state.courseDetels.price + ' $'}</div>
                        </div>

                    </div>
                    <div id='imgCardCourseContiner' > <img id='imgCardCourse' src={host+this.state.courseDetels.img} alt="img" /></div>

                </div>





            </div>
        )
    }
}

export default HeaderCourses;
