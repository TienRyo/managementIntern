import React from 'react';
import {Input, Form, FormGroup, Label, Button} from "reactstrap";
import {Breadcrumb} from "antd";

class UserProfile extends React.Component {
    state = {
        username : '',
        password : '',
        email : '',
        code : '',
    };
    componentWillMount() {
        this.setState({
            username: localStorage.getItem('user_name'),
            password : localStorage.getItem('password'),
            email : localStorage.getItem('email'),
            code : localStorage.getItem('code'),
        })
    }
    EditProfile() {

    }
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><b>USER PROFILE</b></Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <div style={{border : 2, width : '70%', margin : 'auto'}}>
                        <Form>
                            <FormGroup disabled>
                                <Label for="Name manager" >Code</Label>
                                <Input disabled id="Name manager" name={'code'} onChange={this.onChange.bind(this)} value={this.state.code}/>
                            </FormGroup>
                            <FormGroup >
                                <Label for="Name" >User Name</Label>
                                <Input id="Name" name={'username'} onChange={this.onChange.bind(this)} value={this.state.username} />
                            </FormGroup>
                            <FormGroup >
                                <Label for="address" >Password</Label>
                                <Input id="address" name={'password'} onChange={this.onChange.bind(this)} value={this.state.password} />
                            </FormGroup>
                            <FormGroup >
                                <Label for="Name manager" >Email</Label>
                                <Input id="Name manager" name={'email'} onChange={this.onChange.bind(this)} value={this.state.email}/>
                            </FormGroup>
                        </Form>
                        <Button onClick={this.EditProfile.bind(this)}>Save</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserProfile;