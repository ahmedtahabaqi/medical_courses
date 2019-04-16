import React, { Component } from 'react';
import '../../assets/allCourses/ContentAllCourses.css';
import StarRatings from 'react-star-ratings';
import { Button } from 'evergreen-ui';
import { Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import host from '../Host';
class ContentAllCourses extends Component {
  constructor() {
    super()
    this.state = {
      rating: 3.5,
      course: [],
    }

  }
  componentDidMount() {
    axios.get(host + `api/course`, { headers: {} })
      .then(response => {
        this.setState({ course: response.data })
      })
      .catch((error) => { console.log('error ' + error) })

  }
  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }
  render() {
    return (
      <div>
        <Row style={{ margin: 0, padding: 0 }}>
          {this.state.course.map(cors =>
            <Col key={cors._id} id="col1" style={{ margin: 0, marginTop: 50, padding: 0 }} xs={12} sm={6} md={4} lg={3} xl={3} >
              <div id='allcardContiner'>
              <Link to={'/courses/'+ cors._id}>
                <div id='allcard'>
                  <div id='allimgCardContiner'>
                    <img id='allimgCard' src={host+cors.img} alt="img" />
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
  }
}
export default ContentAllCourses;