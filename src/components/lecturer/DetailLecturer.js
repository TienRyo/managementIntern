import React, {Component}                                     from 'react';
import { lecturerService }                       from "../../services";
import { Input, Form, Button, FormGroup, Label, Container, Row, Col } from "reactstrap";
import { Breadcrumb }                                   from "antd";

class DetailLecturer extends Component {
    state ={
        code : '',
        name : '',
        gender : '',
        phone : '',
        email : '',
        address : ''
    };
    componentWillMount() {
        lecturerService.getLecturer(this.props.match.params.id).then(res => {
            let lecturer = res.data[0];
            this.setState({
                code : lecturer.code,
                name : lecturer.name,
                gender : lecturer.gender,
                phone : lecturer.phone,
                email : lecturer.email,
                address : lecturer.address
            })
        })
    }
    SubmitEdit() {
        lecturerService.putLecturer(this.props.match.params.id, {
            code : this.state.code,
            name : this.state.name,
            gender : this.state.gender,
            phone : this.state.phone,
            email : this.state.email,
            address : this.state.address
        }).then(res => {
            window.location.replace('/management/lecturers')
        })
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
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><b>DETAIL LECTURER</b></Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <div style={{border : 2, width : '70%', margin : 'auto'}}>
                        <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup disabled>
                                        <Label for="Name" >MaGV</Label>
                                        <Input id="Name" disabled onChange={this.onChangeName.bind(this)} value={this.state.code} />
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
                        </Form>
                            <label style={{color : "red"}}>{this.state.message}</label>
                            <Button onClick={this.SubmitEdit.bind(this)}>SUBMIT</Button>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}
export default DetailLecturer;
