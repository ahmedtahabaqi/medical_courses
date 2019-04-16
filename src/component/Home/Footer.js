import React, { Component } from 'react';
import '../../assets/cssHome/footer.css'
import { Button } from 'evergreen-ui';
import AliceCarousel from 'react-alice-carousel';
import { Media, Image, Container, Col, Row } from 'react-bootstrap';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
var Coverflow = require('react-coverflow');

class FooterHome extends Component {

    responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 3 },
    };
    render() {

        return (
            <div id='footercontiner'>
                <Coverflow
                    width={'100%'}
                    height={500}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                >
                    <video controls>
                        <source src={require("../../assets/video.mp4")} type="video/mp4" />
                    </video>
                    <video controls>
                        <source src={require("../../assets/video.mp4")} type="video/mp4" />
                    </video>
                    <video controls>
                        <source src={require("../../assets/video.mp4")} type="video/mp4" />
                    </video>
                    <video controls>
                        <source src={require("../../assets/video.mp4")} type="video/mp4" />
                    </video>
                    <video controls>
                        <source src={require("../../assets/video.mp4")} type="video/mp4" />
                    </video>


                </Coverflow>,
               
                <div id='continerCrosol'>
                    <div id='studentCrosol' > <h2>instructor</h2></div>
                    <div>
                        <AliceCarousel
                            duration={400}
                            autoPlay={false}
                            startIndex={1}
                            fadeOutAnimation={true}
                            mouseDragEnabled={true}
                            playButtonEnabled={false}
                            autoPlayInterval={2000}
                            autoPlayDirection="rtl"
                            responsive={this.responsive}
                            disableAutoPlayOnAction={false}
                            onSlideChange={this.onSlideChange}
                            onSlideChanged={this.onSlideChanged}
                        >
                            <Media id='mediacrosol'>
                                <Image
                                    width={100}
                                    height={100}
                                    className="align-self-start mr-3"
                                    src={require('../../assets/Dr. Ziad Alrawi.jpeg')}
                                    alt="Generic placeholder"
                                    roundedCircle
                                />
                                <Media.Body>
                                    <h5>Dr.Ziad Alrawi</h5>
                                    <p>
                                        Vice President at Iraqi dental association
                                        Works at Baghdad smile Clinics
    
                                     </p>

                                </Media.Body>
                            </Media>
                            <Media id='mediacrosol'>
                                <Image
                                    width={100}
                                    height={100}
                                    className="align-self-start mr-3"
                                    src={require('../../assets/Dr. Maha Mohammed Abd Ali.jpeg')}
                                    alt="Generic placeholder"
                                    roundedCircle
                                />
                                <Media.Body>
                                    <h5>Dr.Maha Mohammed</h5>
                                    <p>
                                        Molecular oral pathology
                                        MS.c
                                        High Dental Deplona of oral surgery
                                        H.D.D.
                                        member of ISCO
                                        Member of rare cancer
                                        cases committy
                                     </p>

                                </Media.Body>
                            </Media>
                            <Media id='mediacrosol'>
                                <Image
                                    width={100}
                                    height={100}
                                    className="align-self-start mr-3"
                                    src={require('../../assets/Ass.prof.dr.mohammed alshahwani.jpeg')}
                                    alt="Generic placeholder"
                                    roundedCircle
                                />
                                <Media.Body>
                                    <h5>Ass.prof. dr.mohammed alshahwani</h5>
                                    <p>
                                        Consultant urologist MBChB  FICMS
                                     </p>

                                </Media.Body>
                            </Media>
                            <Media id='mediacrosol'>
                                <Image
                                    width={100}
                                    height={100}
                                    className="align-self-start mr-3"
                                    src={require('../../assets/Dr.sahar Alani.jpeg')}
                                    alt="Generic placeholder"
                                    roundedCircle
                                />
                                <Media.Body>
                                    <h5>Dr.sahar Alani</h5>
                                    <p>

                                        عميدة طب الأسنان
                                     <br />
                                        جامعة الرافدين
                                     </p>

                                </Media.Body>
                            </Media>
                        </AliceCarousel>
                    </div>
                    <div>

                        <Container id='becomAndbusines'>
                            <Row className="justify-content-center">
                                <Col id='becomeContiner'>
                                    <h2>Become an instructor</h2>
                                    <p>Teach what you love. Gsm gives you the tools to create an online course.</p>
                                    <Button appearance="primary" intent="none">Start teaching</Button>
                                </Col>
                            </Row>
                        </Container>
                        <div id='copyriteContiner'>
                            <img height="27" src={require('../../assets/logo.png')} alt="img" />
                            <p> Copyright © 2019.</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default FooterHome;
