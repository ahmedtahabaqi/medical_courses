import React, { Component } from 'react';
import Context from '../Context';
import Slider from 'react-slick';
import StarRatings from 'react-star-ratings';
import { Button } from 'evergreen-ui';
import '../../assets/cssHome/contentHome.css';

class ContentHome extends Component {
    constructor() {
        super()
        this.state = { rating:3.5 }

    }


    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1140,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 740,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 525,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]

        }
        return (<Context.Consumer>
            {ctx => {
                return (
                    <div>
                        <div id='titlecontiner'> 
                        <span id='line'></span>
                        <span id='titleCourses'> New Courses </span>
                        <span id='line'></span>
                        </div>
                        <div id='continerSlider1'>
                            <Slider {...settings}>

                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course1.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course2.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course3.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course4.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course5.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course6.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>

                            </Slider>
                        </div>
                        <div id='titlecontiner'> 
                        <span id='line'></span>
                        <span id='titleCourses'> High Rating Courses </span>
                        <span id='line'></span>
                        </div>
                        <div id='continerSlider2'>
                            <Slider {...settings}>

                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course7.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course8.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course9.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course10.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course6.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='cardContiner'>
                                    <div id='card'>
                                        <div>
                                            <img id='imgCard' src={require('../../assets/course2.jpg')} alt="img" />
                                        </div>
                                        <div id='cardcontent'>
                                            <h2>The Web Developer Bootcamp</h2>
                                            <p>auther name </p>

                                            <Button marginRight={10} marginLeft={10} intent="danger">11.68 $</Button>
                                            <StarRatings rating={this.state.rating} starRatedColor="gold"
                                                starDimension='15px' id='rating'
                                                starSpacing='4px'
                                            />
                                        </div>
                                    </div>
                                </div>

                            </Slider>
                        </div>
                    </div>
                )
            }}
        </Context.Consumer>
        );
    }
}


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundColor: 'lightcoral', top: '38%', borderRadius: '50%', marginRight: 8 }}
            onClick={onClick}
            id="arownext"
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            id="arownext"
            style={{ ...style, backgroundColor: 'lightcoral', top: '38%', borderRadius: '50%', marginLeft: 45, zIndex: 1 }}
            onClick={onClick}
        />
    );
}

export default ContentHome;
