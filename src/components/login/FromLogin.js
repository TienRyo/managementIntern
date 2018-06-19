import React                                                       from 'react';
import {Form, Icon, Input, Button, Checkbox, Breadcrumb, Row, Col} from 'antd';
import {Container}                                                 from "reactstrap";
import { loginService }                                            from "../../services";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    openModal() {
        this.setState({
            modalIsOpen: true,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    user_name: values.userName,
                    password: values.password
                };
                loginService.login(data).then( user => {
                    if(user.data.message === 'login false') {
                        alert('user_name or password wrong!')
                    }
                    else {
                        localStorage.setItem('user_name', user.data.user_name);
                        localStorage.setItem('email', user.data.email);
                        localStorage.setItem('avatar', user.data.avatar);
                        localStorage.setItem('role', user.data.role);
                        localStorage.setItem('code', user.data.code);
                        localStorage.setItem('password', values.password);
                        switch (user.data.role) {
                            case 'admin' :
                                return window.location.replace('/management/courses');
                            case 'intern' :
                                return window.location.replace('/courses');
                            default :
                                return window.location.replace('/management/courses');
                        }
                    }
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>LOGIN</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <Row>
                        <Col span={8} offset={8}>
                            <Container>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('userName', {
                                            rules: [{required: true, message: 'Please input your username!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Username"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Please input your Password!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   type="password" placeholder="Password"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>Remember me</Checkbox>
                                        )}
                                        <a className="login-form-forgot" href="">Forgot password</a>
                                        <div>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Login
                                            </Button>
                                        </div>
                                        <div>
                                            Or <a href="">register now!</a>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Container>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const FormLogin = Form.create()(Login);
export  default FormLogin;