import React from 'react';
import { Button, Icon, Pane, Dialog, TextInput, toaster, Heading, FilePicker, Switch, IconButton } from 'evergreen-ui';
import FileUploadProgress from 'react-fileupload-progress';
import { Nav, Navbar, Collapse } from 'react-bootstrap';

import Component from "@reactions/component";
import AvatarAndEdit from '../common/Avatar';
import StarRatings from 'react-star-ratings';
import Vimeo from '@u-wave/react-vimeo';
import Context from '../Context';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";
import Home from '../Home/Home';
import host from '../Host';
import '../../assets/AddCourse/AddLecture.css';
const cookies = new Cookies();
const styles = {
    progressWrapper: {
        height: "27px",
        width: "475px",
        marginTop: "4px",
        marginLeft: "20px",
        float: "left",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
    },
    progressBar: {
        float: "left",
        width: "0",
        height: "100%",
        fontSize: "12px",
        lineHeight: "20px",
        color: "#fff",
        textAlign: "center",
        backgroundColor: "#5cb85c",
        WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
        boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
        WebkitTransition: "width .6s ease",
        Otransition: "width .6s ease",
        transition: "width .6s ease"
    }
};

class AddLecture extends React.Component {
    constructor(props) {
        super(props);
        this.displayDataAdt = [];
        this.state = {
            course: [],
            lectures: [],
            Adtdata: this.displayDataAdt,
            videos: [],
            videos2: [],
            open: false,
            addLecture: '',
            courseId: '',
            nameVideo: '',
            chapter: '',
            free: "false",
            video: [],
            chapterId: '',
            editVideo: '',
            rating: 3.5,
            courseDetels: []

        };
    }
    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }
    componentDidMount() {
        axios.get(host + `api/course/Course/` + this.props.match.params.id, { headers: {} })
            .then(response => {
                this.setState({ lectures: response.data })
                this.Html(response.data.length)
            })
            .catch((error) => { console.log('error ' + error); })

        axios.get(host + `api/course/CourseDetails/` + this.props.match.params.id, { headers: { token: cookies.get('token') } })
            .then(response => {
                this.setState({ courseDetels: response.data[0] })
            })
            .catch((error) => { console.log('error ' + error); })
    }
    deleteLecture(id) {
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        axios({ url: host + "api/course/deletechapter/" + id, method: "POST", headers: headers })
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Successful");
                    this.componentDidMount();
                }
            })
            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });

    }

    addLecture() {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };
        formData.append("courseId", this.state.courseId);
        formData.append("title", this.state.addLecture);
        axios({ url: host + "api/course/addchapter", method: "POST", data: formData, headers: headers })
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Successful");
                    this.componentDidMount();
                }
            })
            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
    }

    network(id) {
        axios.get(host + `api/course/Chapters/` + id,
            { headers: { token: cookies.get('token') } })
            .then(response => {
                let data = {
                    [id]: response.data
                }

                let videos = [...this.state.videos2, data]







                this.setState({
                    videos: response.data,
                    videos2: videos
                })
            })
            .catch((error) => {
                console.log('error ' + error);
            })
    }

    DeleteVideo(id) {
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

        axios({ url: host + "api/course/deleteVideo/" + id, method: "POST", headers: headers })
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Successful");
                    // this.componentDidMount();

                }
            })
            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });

    }
    chengeCheked = () => {
        if (this.state.free === "false") {
            this.setState({ free: 'true' })
        }
        else {
            this.setState({ free: 'false' })
        }
    }
    renderIcon = (_id, stat) => {
        if (stat) { return <Icon id='menuicon' icon="minus" color="danger" size={30} /> }
        else { return <Icon id='menuicon' icon="menu" color="info" size={30} /> }
    }

    customFormRenderer(onSubmit) {
        return (
            <form id="customForm" method="post" action={host + `api/course/Videoadd`}>
                <input type="hidden" name="token" value={cookies.get("token")} />
                <input type="hidden" name="chapter" value={this.state.chapterId} />
                <input type="hidden" name="free" value={this.state.free} />

                <div id='inputofuploadVideo'>
                    <div id='labelOfInputuploadVideo'>
                        <p>Name of Video</p>
                    </div>

                    <TextInput width='75%'
                        name="name"
                        placeholder="input name of video..."

                        onChange={(event) =>
                            this.setState({ addLecture: event.target.value })} />
                </div>

                <Heading size={400} marginLeft={32} width="90%" marginBottom={10} marginTop="default">
                    Choose File
            </Heading>

                <FilePicker marginLeft={32} width="90%" marginBottom={10} id="FilePicker"
                    onChange={files => console.log(files)}
                    display="none;" name="file" />
                <Heading size={400} marginLeft={32} marginBottom={10} marginTop="default">
                    Free ?
            </Heading>
                <Switch marginLeft={32} marginBottom={10}
                    onChange={() => this.chengeCheked()} />
                <Button appearance="primary" marginLeft={210} onClick={onSubmit}>
                    Upload File
            </Button>
            </form>
        );
    }

    formGetter() {
        return new FormData(document.getElementById("customForm"));
    }

    customProgressRenderer(progress, hasError, cancelHandler) {
        if (hasError || progress > -1) {
            let barStyle = Object.assign({}, styles.progressBar);

            barStyle.width = progress + "%";

            let message = (
                <div style={{ "margin-left": "19px" }}>

                    <div>
                        Uploading {barStyle.width}
                    </div>

                    <div>

                    </div>
                </div>
            );

            if (hasError) {
                barStyle.backgroundColor = "#d9534f";
                message = (
                    <span style={{ color: "#a94442", "margin-left": "19px" }}>
                        Failed to upload ...
              </span>
                );
            }

            if (progress === 100) {

                toaster.success("Successful");
            }

            return (
                <div>
                    <div style={styles.progressWrapper}>
                        <div style={barStyle} />
                    </div>
                    <IconButton onClick={cancelHandler} icon="cross" intent="danger" />
                    <div style={{ clear: "left" }}>{message}</div>
                </div>
            );
        } else {
            return;
        }
    }

    Html(value) {
        let html = []
        for (let index = 0; index < value; index++) {
            html.push(
                <div key={this.state.lectures[index]._id} id='AddLectureContiner'>
                    <Component initialState={{
                        ['open' + index]: false, videos: [],
                    }}>
                        {({ state, setState }) => (
                            <div id='plusContinerAdd'>
                                <div id='plusContiner1Add' >

                                    <div id='menuAndTitle'>
                                        <div onClick={() => {

                                            axios.get(host + `api/course/Chapters/` + this.state.lectures[index]._id,
                                                { headers: { token: cookies.get('token') } })
                                                .then(response => {
                                                    setState({
                                                        videos: response.data,
                                                        ['open' + index]: !state['open' + index]
                                                    })
                                                })
                                                .catch((error) => {
                                                    console.log('error ' + error);
                                                })
                                        }

                                        } aria-controls="example-collapse-text" >
                                            {this.renderIcon(this.state.lectures[index]._id, state['open' + index])} {}
                                        </div>
                                        <span >{this.state.lectures[index].title}</span>
                                    </div>
                                    <div id="uploadAnddeletContiner">
                                        <Component initialState={{ isShown: false, checked: false }}>
                                            {({ state, setState }) => (
                                                <Pane>
                                                    <Dialog
                                                        isShown={state.isShown}
                                                        title={'Uplod Video to ' + this.state.lectures[index].title}
                                                        onCloseComplete={() => setState({ isShown: false })}
                                                        hasFooter={false}
                                                    >

                                                        <div>
                                                            <FileUploadProgress key='ex1' url={host + `api/course/Videoadd`}
                                                                onProgress={(e, request, progress) => { console.log('progress', e, request, progress); }}
                                                                onLoad={(e, request) => { console.log('load', e, request); }}
                                                                onError={(e, request) => { console.log('error', e, request); }}
                                                                onAbort={(e, request) => { console.log('abort', e, request); }}
                                                                formGetter={this.formGetter.bind(this)}
                                                                formRenderer={this.customFormRenderer.bind(this)}
                                                                progressRenderer={this.customProgressRenderer.bind(this)}
                                                            />
                                                        </div>
                                                    </Dialog>
                                                    <Icon icon="upload" onClick={() => {
                                                        this.setState({
                                                            chapterId: this.state.lectures[index]._id
                                                        })
                                                        setState({ isShown: true })
                                                    }}
                                                        size={20} color="selected" marginRight={16} id='iconTrushAddlecture' />
                                                </Pane>
                                            )}
                                        </Component>
                                        <Icon icon="trash" onClick={() => this.deleteLecture(this.state.lectures[index]._id)}
                                            size={20} color="danger" marginRight={16} id='iconTrushAddlecture' />
                                    </div>
                                </div>
                                <Collapse in={state['open' + index]}>
                                    <div id="example-collapse-text">
                                        {state.videos.map((video) =>
                                            <div key={video._id} id='showVideoContiner'>
                                                <div id='iconVideoAndName'>
                                                    <Component initialState={{ isShown: false }}>
                                                        {({ state, setState }) => (
                                                            <Pane>
                                                                <Dialog
                                                                    isShown={state.isShown}
                                                                    title="No footer"
                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                    hasFooter={false}
                                                                    hasHeader={false}
                                                                >
                                                                    <Vimeo
                                                                        video={video.VideoId}
                                                                        frameborder="0"
                                                                        width={525}
                                                                        webkitallowfullscreen mozallowfullscreen allowfullscreen
                                                                        autoplay
                                                                    />

                                                                </Dialog>
                                                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { setState({ isShown: true }) }}>
                                                                    <Icon icon="video" size={20} color="success" marginRight={16} marginLeft={16} />
                                                                    <p id='NameofVideoInLecture'>{video.name}</p>
                                                                </div>
                                                            </Pane>
                                                        )}
                                                    </Component>

                                                </div>
                                                <div>
                                                    <Component initialState={{ isShown: false }}>
                                                        {({ state, setState }) => (
                                                            <Pane style={{ display: 'inline' }}>
                                                                <Dialog onConfirm={() => {
                                                                    {
                                                                        let formData = new FormData();
                                                                        var headers = { "Content-Type": "application/json", token: cookies.get("token") };

                                                                        formData.append("name", this.state.editVideo);

                                                                        axios({ url: host + "api/course/editVideo/" + video._id, method: "POST", data: formData, headers: headers })
                                                                            .then(response => {
                                                                                if (response.status === 200) {
                                                                                    toaster.success("Successful"); this.componentDidMount();
                                                                                }
                                                                            })
                                                                            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
                                                                    }
                                                                    this.network(this.state.lectures[index]._id)
                                                                    this.setState({})
                                                                    setState({ isShown: false })
                                                                }}
                                                                    isShown={state.isShown}
                                                                    title="Edit Name Of Video"
                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                    confirmLabel="Add"

                                                                >
                                                                    <div id='inputofAddlecture'>
                                                                        <div id='labelOfInputAddLecture'>
                                                                            <p>Name of Video</p>
                                                                        </div >
                                                                        <TextInput width='75%' name="text-input-name"
                                                                            placeholder="input name of Video..."
                                                                            onChange={(event) => this.setState({ editVideo: event.target.value })}
                                                                        />
                                                                    </div>
                                                                </Dialog>
                                                                <Icon icon="edit" size={20} color="muted" marginRight={16}
                                                                    onClick={() => { setState({ isShown: true }) }}
                                                                    style={{ cursor: 'pointer' }}
                                                                />

                                                            </Pane>
                                                        )}
                                                    </Component>

                                                    <Icon icon="trash" size={20} color="muted" marginRight={16}
                                                        onClick={() => {
                                                            var headers = { "Content-Type": "application/json", token: cookies.get("token") };

                                                            axios({ url: host + "api/course/deleteVideo/" + video._id, method: "POST", headers: headers })
                                                                .then(response => {
                                                                    if (response.status === 200) {
                                                                        toaster.success("Successful");
                                                                        const lecture = state.videos.filter(sort => sort._id !== video._id);
                                                                
                                                                        setState({
                                                                            videos: lecture
                                                                        })
                                                                    }
                                                                })
                                                                .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });

                                                        }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Collapse>
                            </div>
                            
                        )}
               </Component>

                </div>

            )

        }

        this.displayDataAdt = html;
        this.setState({
            Adtdata: this.displayDataAdt,
        });


    }

    render() {

        return (
            <Context.Consumer>
                {ctx => {
                    if (ctx.value.auth === "login") {
                        return (
                            <React.Fragment>
                                <Navbar id='collapsAddCourse' collapseOnSelect expand="lg" variant="light" >
                                    <Navbar.Brand href="/">
                                        <img style={{ width: '70px' }} src={require('../../assets/logo.png')} alt="img" />
                                    </Navbar.Brand>
                                    <Nav className="mr-auto">
                                    </Nav>
                                    <AvatarAndEdit />
                                </Navbar>

                                <div id='titleCourseContiner'>
                                    <div id='titleCourseContiner1'>
                                        <h2 id='titleCourse'>
                                            {this.state.courseDetels.title}
                                        </h2>
                                        <p id='descripCourse'> {this.state.courseDetels.body} </p>
                                        <div className='rating'>
                                            <StarRatings rating={this.state.courseDetels.ratting} starRatedColor="gold"
                                                starDimension='20px'
                                                starSpacing='4px'
                                            />

                                        </div>


                                    </div>
                                    <div id='imgCardCourseContiner' > <img id='imgCardCourse' src={host + this.state.courseDetels.img} alt="img" /></div>

                                </div>
                                {/* )} */}
                                <NavLink exact to='/Addcourses'>
                                    <div id='iconBack'>
                                        <Icon icon='arrow-left' size={30} color="white" />
                                    </div>
                                </NavLink>
                                <Component initialState={{ isShown: false }}>
                                    {({ state, setState }) => (
                                        <Pane>
                                            <Dialog onConfirm={() => {
                                                this.addLecture()
                                                setState({ isShown: false })
                                            }}
                                                isShown={state.isShown}
                                                title="Create Lecture"
                                                onCloseComplete={() => setState({ isShown: false })}
                                                confirmLabel="Add"

                                            >
                                                <div id='inputofAddlecture'>
                                                    <div id='labelOfInputAddLecture'>
                                                        <p>Name of Lecture</p>
                                                    </div >
                                                    <TextInput width='75%' name="text-input-name"
                                                        placeholder="input name of leacture..."
                                                        onChange={(event) =>
                                                            this.setState({ addLecture: event.target.value, courseId: this.props.match.params.id })}
                                                    />
                                                </div>
                                            </Dialog>

                                            <div id='AddLectureButtom'>
                                                <Button onClick={() => setState({ isShown: true })}
                                                    appearance="primary" marginLeft={20} intent="danger">Add Lecture</Button>
                                            </div>
                                        </Pane>
                                    )}
                                </Component>
                                {this.displayDataAdt}
                            </React.Fragment>
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

export default AddLecture;