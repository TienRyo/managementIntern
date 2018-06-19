import React                                                          from 'react';
import { Input, Form, FormGroup, Label, Container, Row, Col } from "reactstrap";
import { internService }                                              from "../../services";
import App                                                            from "../../App";
import { Header, Divider, Button}                                                    from "semantic-ui-react";
export default class CreateIntern extends React.Component {
    state = {
        code : '',
        name : '',
        lastName : '',
        firstName : '',
        gender : '',
        dateOfBirth : '',
        idCard : '',
        issued : '',
        provide : '',
        phone : '',
        phoneParent : '',
        email : '',
        address : ''
    };

    SubmitEdit() {
        internService.postIntern({
            code : this.state.code,
            name : this.state.name,
            lastName : this.state.lastName,
            firstName : this.state.firstName,
            gender : this.state.gender,
            dateOfBirth : this.state.dateOfBirth,
            idCard : this.state.idCard,
            issued : this.state.issued,
            provide : this.state.provide,
            phone : this.state.phone,
            phoneParent : this.state.phoneParent,
            email : this.state.email,
            address : this.state.address
        }).then(res => window.location.replace('/management/interns'))
    }
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <App>
            <div>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Header>Create Intern
                    </Header>
                    <Divider/>
                    <div style={{border : 2, width : '70%', margin : 'auto'}}>
                        <Container>
                            <Form>
                                <Row>
                                    <Col>
                                        <FormGroup >
                                            <Label for="code" >Code</Label>
                                            <Input id="code" name='code' onChange={this.onChange.bind(this)} value={this.state.code} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="lastName" >Last Name</Label>
                                            <Input id="lastName" name={"lastName"} value={this.state.lastName} onChange={this.onChange.bind(this)}  />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="firstName" >First Name</Label>
                                            <Input id="firstName" name={"firstName"} value={this.state.firstName} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="gender" >Gender</Label>
                                            <Input id="gender" name={'gender'} value={this.state.gender} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="phone" >Phone</Label>
                                            <Input id="phone" name={'phone'} value={this.state.phone} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="phoneParent" >Phone Parent</Label>
                                            <Input id="phoneParent" name={'phoneParent'} onChange={this.onChange.bind(this)}  value={this.state.phoneParent}/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup >
                                            <Label for="birth" >Date of birth</Label>
                                            <Input id="birth" type={'date'} name={'dateOfBirth'} value={this.state.dateOfBirth} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="idCard" >Id Card</Label>
                                            <Input id="idCard" name={"idCard"} value={this.state.idCard} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="issued" >Issued</Label>
                                            <Input id="issued" name={"issued"} value={this.state.issued} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="provide" >Provide</Label>
                                            <Input id="provide"  name={"provide"} value={this.state.provide} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="address" >Address</Label>
                                            <Input id="address" name={"address"} value={this.state.address} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="email" >Email</Label>
                                            <Input id="email" name={'email'} value={this.state.email} onChange={this.onChange.bind(this)} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <label style={{color : "red"}}>{this.state.message}</label>
                            <Button onClick={this.SubmitEdit.bind(this)}>SUBMIT</Button>
                        </Container>
                    </div>
                </div>
            </div>
            </App>
        )
    }
}

