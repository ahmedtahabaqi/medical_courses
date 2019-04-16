import React from 'react';
import { Row, Col, Navbar, Nav, Form, Image, Media } from 'react-bootstrap';
import { Button, Pane, Dialog, TextInput, FilePicker, toaster, Textarea, Icon, SideSheet, Paragraph, Table } from 'evergreen-ui';
import '../../assets/AddCourse/SlideBar.css';
import Context from '../Context';
import StarRatings from 'react-star-ratings';
import AvatarAndEdit from '../common/Avatar';
import { NavLink, Link } from 'react-router-dom';
import Component from "@reactions/component";
import axios from 'axios';
import Cookies from "universal-cookie";
import Home from '../Home/Home';
import host from '../Host';
const cookies = new Cookies();


var type;
class SlideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [{ id: 1, name: 'ahmed', lastActivity: '10 Min', itv: 33 },
            { id: 1, name: 'ahmed', lastActivity: '10 Min', itv: 33 },
            { id: 1, name: 'ahmed', lastActivity: '10 Min', itv: 33 },
            { id: 1, name: 'ahmed', lastActivity: '10 Min', itv: 33 },
            { id: 1, name: 'ahmed', lastActivity: '10 Min', itv: 33 }],
            cateSelect: '',
            sidebarOpen: true,
            title: '',
            price: 0,
            category: [],
            file: [],
            description: '',
            course: [],
            selectCourse: [],
            fileEdit: [],
        };
    }
    componentDidMount() {
        axios.get(host + `api/course/Category`, { headers: {} })
            .then(response => { this.setState({ category: response.data }) })
            .catch((error) => { console.log('error ' + error) })

        axios.get(host + `api/course/teacher`, { headers: { token: cookies.get('token') } })
            .then(response => { this.setState({ course: response.data }) })
            .catch((error) => { console.log('error ' + error); })
    }
    deleteCourse(id) {
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        axios({ url: host + "api/course/deletecourse/" + id, method: "POST", headers: headers })
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Successful");
                    this.componentDidMount();
                }
            })
            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });

    }
    AddCourse() {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        formData.append("title", this.state.title);
        formData.append("price", this.state.price);
        formData.append("body", this.state.description);
        formData.append("category", this.state.cateSelect);
        formData.append("type", type);
        formData.append("file", this.state.file[0]);

        axios({ url: host + "api/course/addcourse", method: "POST", data: formData, headers: headers })
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

    EditCourse(id) {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };
        formData.append("title", this.state.title);
        formData.append("price", this.state.price);
        formData.append("body", this.state.description);
        formData.append("category", this.state.cateSelect);
        if(type!==""){
            formData.append("type", type);
        }
       
        formData.append("file", this.state.file[0]);


        axios({ url: host + "api/course/editcourse/" + id, method: "POST", data: formData, headers: headers })
            .then(response => { if (response.status === 200) { window.location.reload(); this.componentDidMount(); } })
            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        
        return (
            <Context.Consumer>
                {ctx => {
                    if (ctx.value.auth==="login") {
                        return (
                            <div >
                                <NavLink exact to='/Addcourses' />
    
                                <Navbar id='collapsAddCourse' collapseOnSelect expand="md" variant="light" >
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Brand href="/">
                                        <img style={{ width: '70px', paddingLeft: 16 }} src={require('../../assets/logo.png')} alt="img" />
                                    </Navbar.Brand>
    
                                    <Nav className="mr-auto">
                                        <Component initialState={{ isShown: false }}>
                                            {({ state, setState }) => (
                                                <Pane>
                                                    <Dialog
                                                        isShown={state.isShown}
                                                        title="Create Course"
                                                        onConfirm={() => {
                                                            this.AddCourse()
                                                            setState({ isShown: false })
                                                        }}
                                                        onCloseComplete={() => setState({ isShown: false })}
                                                        confirmLabel="Create"
                                                    >
                                                        <p>Course Name</p>
                                                        <TextInput id='inputnamecourse'
                                                            name="text-input-name"
                                                            placeholder="input course name..."
                                                            onChange={(event) => this.setState({ title: event.target.value })}
                                                    
                                                        />
                                                        <p id='priceTitle'>Price</p>
                                                        <TextInput id='inputPriceCource'
                                                            name="text-input-name"
                                                            placeholder="input course price..."
                                                            onChange={(event) => this.setState({ price: event.target.value })}
                                                        // value={this.state.price}
                                                        />
                                                        <Form>
                                                            <Form.Group id='selectCategoryContiner' controlId="exampleForm.ControlSelect1">
                                                                <Form.Label >Category</Form.Label>
                                                                <Form.Control as="select"
                                                                     onChange={(even) => {
                                                                        if (even.target.value !== 'SelectCategory') {
                                                                            this.setState({ cateSelect: even.target.value })
                                                                        }
                                                                    }}>
                                                                    <option value="SelectCategory">Select Category </option>
                                                                    {this.state.category.map(cate =>
    
                                                                        <option key={cate._id} value={cate._id} >
                                                                            {cate.name}
                                                                        </option>
    
                                                                    )}
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
    
                                                            <div className="mb-3">
                                                                <Form.Group as={Row}>
                                                                    <Col sm={10}>
                                                                        <Form.Check
                                                                            type="radio"
                                                                            label="Post Graduate"
                                                                            onChange={(e) => {
                                                                                document.getElementById('steps').style.display = 'none'
                                                                                let radiobtn1 = document.getElementById("step1");
                                                                                radiobtn1.checked = false;
                                                                                type = 'post';
                                                                                let radiobtn = document.getElementById("step2");
                                                                                radiobtn.checked = false;
    
                                                                            }}
                                                                            custom
                                                                            value="uptime"
                                                                            name="formHorizontalRadios"
                                                                            id="Post"
    
                                                                        />
                                                                        <Form.Check
                                                                            type="radio"
                                                                            label="Under Graduate"
                                                                            custom
                                                                            onChange={(e) => {
                                                                                //   this.Sort(e.target.value)
                                                                                document.getElementById('steps').style.display = 'block'
                                                                                document.getElementById('Under').Check = true;
                                                                            }}
                                                                            value="price"
                                                                            name="formHorizontalRadios"
                                                                            id="Under"
    
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
                                                            </div>
    
    
                                                            <div id="steps">
                                                                <Form>
                                                                    <Form.Group as={Row}>
                                                                        <Col sm={10}>
                                                                            <Form.Check
                                                                                type="radio"
                                                                                label="Step 1"
                                                                                onChange={(e) => {
                                                                                    type = 'under Step1';
    
                                                                                }}
                                                                                custom
                                                                                value="uptime"
                                                                                name="formHorizontalRadios"
                                                                                id="step1"
    
                                                                            />
                                                                            <Form.Check
                                                                                type="radio"
                                                                                label="Step 2"
                                                                                custom
                                                                                onChange={(e) => {
                                                                                    type = 'under Step2';
    
                                                                                }}
                                                                                value="price"
                                                                                name="formHorizontalRadios"
                                                                                id="step2"
    
                                                                            />
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Form>
                                                            </div>
    
    
                                                        </Form>
                                                        <p>Upload Image</p>
                                                        <FilePicker
                                                            width={250}
                                                            marginBottom={32}
                                                            onChange={files => { this.setState({ file: files }) }}
    
                                                        />
                                                        <p>Course Description</p>
                                                        <Textarea
                                                            id="textarea-2"
                                                            placeholder="Description..."
                                                            onChange={(event) => this.setState({ description: event.target.value })}
                                                        // value={this.state.description}
                                                        />
    
                                                    </Dialog>
    
                                                    <Button onClick={() => setState({ isShown: true })} marginRight={16} appearance="primary">Add New Course</Button>
                                                </Pane>
                                            )}
                                        </Component>
                                    </Nav>
                                    <Nav>
                                        <Navbar.Collapse id="responsive-navbar-nav">
                                            <Component initialState={{ isShown: false }}>
                                                {({ state, setState }) => (
                                                    <React.Fragment>
                                                        <SideSheet
                                                            isShown={state.isShown}
                                                            onCloseComplete={() => setState({ isShown: false })}
                                                        >
                                                            <Paragraph margin={0}>
                                                                <div id='headerSlider'>
                                                                    <img height="27" src={require('../../assets/logo.png')} alt="img" />
                                                                </div>
                                                                <Table id='tableDash'>
                                                                    <Table.Head >
                                                                        <Table.TextHeaderCell>
                                                                            Course Name
                                                            </Table.TextHeaderCell>
                                                                        <Table.TextHeaderCell>
                                                                            Student Name
                                                            </Table.TextHeaderCell>
                                                                        <Table.TextHeaderCell>
                                                                            Price Course
                                                            </Table.TextHeaderCell>
                                                                    </Table.Head>
                                                                    <Table.Body height="100vh" >
                                                                        {this.state.profiles.map(profile => (
                                                                            <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
                                                                                <Table.TextCell>{profile.name}</Table.TextCell>
                                                                                <Table.TextCell>{profile.lastActivity}</Table.TextCell>
                                                                                <Table.TextCell isNumber>
                                                                                    {profile.itv}
                                                                                </Table.TextCell>
                                                                            </Table.Row>
                                                                        ))}
                                                                    </Table.Body>
                                                                </Table>
                                                            </Paragraph>
                                                        </SideSheet>
                                                        <Button onClick={() => setState({ isShown: true })} marginRight={16} appearance="primary">
                                                            Dashboard
                                            </Button>
                                                    </React.Fragment>
                                                )}
                                            </Component>
    
                                        </Navbar.Collapse>
                                    </Nav>
                                    <AvatarAndEdit />
                                </Navbar>
                                <Row style={{ margin: 0, padding: 0 }}>
                                    <Col style={{ margin: 0, padding: 0 }}>
                                        <div id='AddContentContiner' >
                                            <Row >
                                                {this.state.course.map(corse =>
                                                    <Col key={corse._id} id='col' xs={12} sm={6} md={4} lg={3} xl={3} >
                                                        <Media id='media'>
                                                        <Link to={'/addlecture/' + corse._id}
                                                        onClick={() => ctx.action.HeaderCource(
                                                            corse
                                                        )}>
                                                        <div id='AddImageCourse'>
                                                        <Image width={200} height={100} id='AddImageCourse' src={host + corse.img} alt='img' />
                                                        </div>
                                                                <Media.Body >
                                                                    <h2 id='AddcourseName'>{corse.title}</h2>
                                                                </Media.Body>
                                                            </Link>
                                                            <div id='ContinerR_E_T' >
                                                                <div className='ratingCardCourse'>
                                                                    <StarRatings rating={corse.rating} starRatedColor="gold"
                                                                        starDimension='15px'
                                                                        starSpacing='3px'
                                                                    />
    
                                                                </div>
                                                                <div id='menuEdit1'>
                                                                    <Component initialState={{ isShown: false }}>
                                                                        {({ state, setState }) => (
                                                                            <Pane>
    
                                                                                <Dialog
                                                                                    isShown={state.isShown}
                                                                                    title="Dialog title"
                                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                                    confirmLabel="Custom Label"
                                                                                    onConfirm={() => {
                                                                                        this.EditCourse(corse._id)
                                                                                        setState({ isShown: false })
                                                                                    }}
                                                                                >
    
                                                                                    <p>Course Name</p>
                                                                                    <TextInput id='inputnamecourse'
                                                                                        name="text-input-name"
                                                                                        placeholder="input course name..."
                                                                                        onChange={(event) => this.setState({ title: event.target.value })}
                                                                                    // value={this.state.title}
                                                                                    />
                                                                                    <p id='priceTitle'>Price</p>
                                                                                    <TextInput id='inputPriceCource'
                                                                                        name="text-input-name"
                                                                                        placeholder="input course price..."
                                                                                        onChange={(event) => this.setState({ price: event.target.value })}
                                                                                    // value={this.state.price}
                                                                                    />
                                                                                    <Form>
                                                                                        <Form.Group id='selectCategoryContiner' controlId="exampleForm.ControlSelect1">
                                                                                            <Form.Label >Category</Form.Label>
                                                                                            <Form.Control as="select"
                                                                                                
                                                                                                onChange={(even) => {
                                                                                                    if (even.target.value !== 'SelectCategory') {
                                                                                                        this.setState({ cateSelect: even.target.value })
                                                                                                    }
                                                                                                }}>
                                                                                                <option value="SelectCategory">Select Category </option>
                                                                                                {this.state.category.map(cate =>
    
                                                                                                    <option key={cate._id} value={cate._id} >
                                                                                                        {cate.name}
                                                                                                    </option>
    
                                                                                                )}
                                                                                            </Form.Control>
                                                                                        </Form.Group>
                                                                                    </Form>
                                                                                    <Form>
    
                                                                                        <div className="mb-3">
                                                                                            <Form.Group as={Row}>
                                                                                                <Col sm={10}>
                                                                                                    <Form.Check
                                                                                                        type="radio"
                                                                                                        label="Post"
                                                                                                        onChange={(e) => {
                                                                                                            document.getElementById('steps').style.display = 'none'
                                                                                                            let radiobtn1 = document.getElementById("step1");
                                                                                                            radiobtn1.checked = false;
                                                                                                            type = 'post';
                                                                                                            let radiobtn = document.getElementById("step2");
                                                                                                            radiobtn.checked = false;
    
                                                                                                        }}
                                                                                                        custom
                                                                                                        value="uptime"
                                                                                                        name="formHorizontalRadios"
                                                                                                        id="Post"
    
                                                                                                    />
                                                                                                    <Form.Check
                                                                                                        type="radio"
                                                                                                        label="Under"
                                                                                                        custom
                                                                                                        onChange={(e) => {
                                                                                                            //   this.Sort(e.target.value)
                                                                                                            document.getElementById('steps').style.display = 'block'
                                                                                                            document.getElementById('Under').Check = true;
                                                                                                        }}
                                                                                                        value="price"
                                                                                                        name="formHorizontalRadios"
                                                                                                        id="Under"
    
                                                                                                    />
                                                                                                </Col>
                                                                                            </Form.Group>
                                                                                        </div>
    
    
                                                                                        <div id="steps">
                                                                                            <Form>
                                                                                                <Form.Group as={Row}>
                                                                                                    <Col sm={10}>
                                                                                                        <Form.Check
                                                                                                            type="radio"
                                                                                                            label="Recently Added"
                                                                                                            onChange={(e) => {
                                                                                                                type = 'under Step1';
    
                                                                                                            }}
                                                                                                            custom
                                                                                                            value="uptime"
                                                                                                            name="formHorizontalRadios"
                                                                                                            id="step1"
    
                                                                                                        />
                                                                                                        <Form.Check
                                                                                                            type="radio"
                                                                                                            label="Lower Price"
                                                                                                            custom
                                                                                                            onChange={(e) => {
                                                                                                                type = 'under Step2';
    
                                                                                                            }}
                                                                                                            value="price"
                                                                                                            name="formHorizontalRadios"
                                                                                                            id="step2"
    
                                                                                                        />
                                                                                                    </Col>
                                                                                                </Form.Group>
                                                                                            </Form>
                                                                                        </div>
    
    
                                                                                    </Form>
                                                                                    <p>Upload Image</p>
                                                                                    <FilePicker
                                                                                        width={250}
                                                                                        marginBottom={32}
                                                                                        onChange={files => { this.setState({ file: files }) }}
    
                                                                                    />
                                                                                    <p>Course Description</p>
                                                                                    <Textarea
                                                                                        id="textarea-2"
                                                                                        placeholder="Description..."
                                                                                        onChange={(event) => this.setState({ description: event.target.value })}
                                                                                    // value={this.state.description}
                                                                                    />
    
                                                                                </Dialog>
                                                                                <Icon id='editAddCourseIcon' icon="edit" onClick={() => setState({ isShown: true })} />
                                                                            </Pane>
                                                                        )}
                                                                    </Component>
    
                                                                </div>
                                                                <Icon id='trushAddCourseIcon' onClick={() => this.deleteCourse(corse._id)}
                                                                    marginLeft={10} icon="trash" color="danger" />
    
                                                            </div>
                                                        </Media>
    
                                                    </Col>
                                                )}
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                       
                            )   
                    } else {
                        return(
                            <Home/>
                        )
                    }

                }}
            </Context.Consumer>
        )
    }
}
export default SlideBar;