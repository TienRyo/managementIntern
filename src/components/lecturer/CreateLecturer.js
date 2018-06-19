import React, {Component}                                             from 'react';
import { lecturerService }                                            from "../../services";
import { Input, FormGroup, Label, Container, Row, Col } from "reactstrap";
import App                                                            from "../../App";
import { Message, Form , Button}                                                    from "semantic-ui-react";

class CreateLecturer extends Component {
    state ={
        code : '',
        name : '',
        gender : '',
        phone : '',
        email : '',
        address : ''
    };
    SubmitEdit() {
        lecturerService.postLecturer({
            code : this.state.code,
            name : this.state.name,
            gender : this.state.gender,
            phone : this.state.phone,
            email : this.state.email,
            address : this.state.address
        }).then(res => {
            window.location.replace('/lecturer-list')
        }).catch(()=>this.setState({message : "Create Fail"}))
    }
    onChangeEmailManager(e) {
        this.setState({
            email : e.target.value
        })
    }
    onChangePhoneManager(e) {
        this.setState({
            phone: e.target.value
        })
    }
    onChangeNameManager(e) {
        this.setState({
            gender : e.target.value
        })
    }
    onChangeName(e) {
        this.setState({
            code : e.target.value
        })
    }
    onChangeAddress(e) {
        this.setState({
            name : e.target.value
        })
    }
    onChangeCode(e) {
        this.setState({
            address : e.target.value
        })
    }

    render() {
        return (
            <App>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Message
                        attached
                        header={'CREATE LECTURER'}
                    />
                    <Form className={'attached fluid segment'}>
                        <Container>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="Name" >MaGV</Label>
                                        <Input id="Name" onChange={this.onChangeName.bind(this)} value={this.state.code} />
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="address" >Name</Label>
                                        <Input id="address" onChange={this.onChangeAddress.bind(this)} value={this.state.name} />
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="Name manager" >Gender</Label>
                                        <Input id="Name manager" onChange={this.onChangeNameManager.bind(this)} value={this.state.gender}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup >
                                        <Label for="Phone manager" >Phone</Label>
                                        <Input id="Phone manager" onChange={this.onChangePhoneManager.bind(this)} value={this.state.phone}/>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="Email manager" >Email</Label>
                                        <Input id="Email manager" onChange={this.onChangeEmailManager.bind(this)} value={this.state.email}/>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="Email manager" >Address</Label>
                                        <Input id="Email manager" onChange={this.onChangeCode.bind(this)} value={this.state.address}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <label style={{color : "red"}}>{this.state.message}</label>
                            <Button onClick={this.SubmitEdit.bind(this)} type={"Submit"}>SUBMIT</Button>
                        </Container>
                    </Form>
                </div>
            </App>
        )
    }
}
export default CreateLecturer;
