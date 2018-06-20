import React, {Component}              from 'react';
import {Button, Grid, Header, Segment} from 'semantic-ui-react';
import Form                            from "../../lib/FormGroups";
import {FormBuilder}                   from "react-reactive-form";
import Validators                      from "../../lib/FormGroups/Validators";
import {authService}                   from '../../services';
import {connect}                       from "react-redux";
import {login}                         from "../../reducers/auth";
import config                          from '../../config';
import './login.css';

class LoginComponent extends Component {

    loginForm = FormBuilder.group({
        code   : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    componentWillMount() {
        this.loginForm.valueChanges.subscribe(() => {
            if (!this.hasErrorSever) return;
            this.loginForm.controls.email.setErrors(null);
            this.hasErrorSever = false;
        })
    }


    handleLogin = e => {
        e.preventDefault();
        authService.login(this.loginForm.value)
            .then(res => {
                authService.setToken(res.data.token);
                this.props.login();
            })
            .catch((error) => {
                this.hasErrorSever = true;
                this.loginForm.controls.email.setErrors({error: error.data.message})
            })
    };


    render() {
        const credential = this.props.credential || {};
        switch (credential.role) {
            case config.role.INTERN :
                this.props.history.push('/courses');
                return '';
            case config.role.ADMIN:
                this.props.history.push('/course-list');
                return '';
            case config.role.LECTURER:
                this.props.history.push('/course-list');
                return '';
            default :
                return (
                    <div className='login-form'>
                        <Grid
                            textAlign='center'
                            style={{height: '100%'}}
                            verticalAlign='middle'
                        >
                            <Grid.Column style={{maxWidth: 450}}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    {config.app.textHeaderLogin}
                                </Header>
                                <Form size='large' onSubmit={this.handleLogin} control={this.loginForm}
                                      render={(form) => {
                                          return <Segment>
                                              <Form.Input
                                                  fluid
                                                  icon='user'
                                                  iconPosition='left'
                                                  placeholder='E-mail address'
                                                  name='code'
                                              />
                                              <Form.Input
                                                  fluid
                                                  icon='lock'
                                                  iconPosition='left'
                                                  placeholder='Password'
                                                  type='password'
                                                  name='password'
                                              />
                                              <Button color='teal' fluid size='large'
                                                      disabled={!form.valid}>Login</Button>
                                          </Segment>
                                      }}>

                                </Form>
                            </Grid.Column>
                        </Grid>
                    </div>
                );
        }
    }

}

export default connect(({auth}) => ({credential: auth.credential}), {login})(LoginComponent);