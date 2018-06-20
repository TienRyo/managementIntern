import React                                                  from 'react';
import { areaService, CompanyEditorService }                  from "../../services";
import { Col, Container, Form, FormGroup, Label, Row, Table } from "reactstrap";
import App                                                    from "../../App";
import { Segment }                                   from "semantic-ui-react";

class DetailCompany extends React.Component {
    state = {
        areas : [],
    };
    componentWillMount() {
        CompanyEditorService.getCompany(this.props.match.params.id).then(res => {
            let company = res.data[0];
            this.setState({
                name : company.name,
                address: company.address,
                phoneManager: company.phoneManager,
                emailManager: company.emailManager,
                nameManager: company.nameManager,
                id : company.id
            })
        });
        areaService.getAreas(this.props.match.params.id).then(res => {
            this.setState({areas : res.data})
        })
    }
    render() {
        return (
            <App>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Segment.Group>
                        <Segment><b>DETAIL COMPANY</b></Segment>
                        <Segment>
                        <div style={{border : 2, width : '70%', margin : 'auto'}}>
                        <Container>
                            <Form>
                                <Row>
                                    <Col>
                                        <FormGroup disabled>
                                            <Label for="Name" >Name :</Label>{' '+this.state.name}
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="address" >Name Manager : </Label>{' '+this.state.nameManager}
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="Name manager" >Phone Manager : </Label>{' '+this.state.phoneManager}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup >
                                            <Label for="Phone manager" >Email Manager : </Label>{' '+this.state.emailManager}
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="Email manager" >Address : </Label>{' '+this.state.address}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <h6>AREAS COMPANY</h6>
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.areas.map((area, index)=> {
                                    return (
                                        <tr key={index}>
                                            <td>{area.name}</td>
                                            <td>{area.address}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                        </Segment>
                    </Segment.Group>
            </div>
            </App>
        )
    }
}
export default DetailCompany;