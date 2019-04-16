import React from 'react';
import { Pane, Dialog, Icon, Popover, Menu, Position, Avatar, Button, TextInput, FilePicker, Textarea, toaster } from 'evergreen-ui';
import Component from "@reactions/component";
import '../../assets/common/Avatar.css';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Context from '../Context';
import axios from 'axios';
import host from '../Host';
const cookies = new Cookies();


class AvataeAndEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            file: [],
        }
    }
    EditProfile() {
        let formData = new FormData();
        var headers = { "Content-Type": "application/json", token: cookies.get("token") };
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("file", this.state.file[0]);


        axios({ url: host + "api/course/editcourse/", method: "POST", data: formData, headers: headers })
            .then(response => { if (response.status === 200) { window.location.reload(); } })
            .catch(function (error) { if (error.request.response) { toaster.danger(error.request.response); } });
    }

    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div id='avatar'>
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Menu.Item>
                                                ahmedtaha@gmail.com
                                             </Menu.Item>
                                        </Menu.Group>
                                        <Menu.Divider />
                                        <Menu.Group >
                                            <div style={ctx.value.session.role === 1 ? {} : { display: "none" }}>
                                                <Menu.Item style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }} >
                                                    <Link to='/dashboard1' style={{ display: 'flex', justifyContent: 'center' }} >

                                                        < Button marginTop={20} marginBottom={20} width={100} appearance="primary" intent="none">Dashboard</Button>
                                                    </Link>
                                                </Menu.Item>
                                            </div>
                                            <Menu.Item style={{ marginTop: '10px' }} >
                                                <Link to='/Addcourses' style={{ display: 'flex', justifyContent: 'center' }} >
                                                    < Button marginTop={20} marginBottom={20} width={100} appearance="primary" intent="none">My Courses</Button>
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item style={{ marginTop: '10px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    < Button marginTop={20} marginBottom={20} width={100}
                                                        onClick={() => {
                                                            cookies.remove("token");
                                                            window.location.href = "/"
                                                        }}
                                                        appearance="primary" intent="danger">Logout</Button>
                                                </div>
                                            </Menu.Item>
                                        </Menu.Group>
                                    </Menu>
                                } >
                                <Avatar id='editAvatar'
                                    src={require("../../assets/Dr Karrar mahdi.jpg")}
                                    name="Jeroen Ransijn"
                                    size={40}
                                />

                            </Popover>
                            <Component initialState={{ isShown: false }}>
                                {({ state, setState }) => (
                                    <Pane>
                                        <Dialog
                                            isShown={state.isShown}
                                            title="Edit Profile"
                                            onCloseComplete={() => setState({ isShown: false })}
                                            confirmLabel="Save"
                                            onConfirm={() => {
                                                this.EditProfile()
                                                setState({ isShown: false })
                                            }}
                                        >
                                            <p>Full Name</p>
                                            <TextInput id='inputnamecourse'
                                                name="text-input-name"
                                                placeholder="input full name..."
                                                onChange={(event) => this.setState({ name: event.target.value })}
                                            />
                                            <p style={{ marginTop: 20 }}>Upload Image</p>
                                            <FilePicker
                                                width={250}
                                                marginBottom={32}
                                                onChange={files => { this.setState({ file: files }) }} />
                                            <p>Description</p>
                                            <Textarea
                                                id="textarea-2"
                                                placeholder="Description..."
                                                onChange={(event) => this.setState({ description: event.target.value })} />
                                        </Dialog>
                                        <Icon id='editAvatar' size={25} icon="edit" color="muted" marginLeft={10} paddingTop={10} onClick={() => setState({ isShown: true })} />
                                    </Pane>
                                )
                                }
                            </Component>
                        </div>)
                }
                }
            </Context.Consumer>
        )
    }
}
export default AvataeAndEdit;
