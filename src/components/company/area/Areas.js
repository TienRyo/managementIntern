import React                                                                  from 'react';
import { Breadcrumb, Button, Icon, Select }                                   from "antd";
import { areaService, courseService, internshipService, registrationService } from "../../../services";
import { Table }                                                              from "reactstrap";
import App                                                                    from "../../../App";
import { Form, Message }                                                      from "semantic-ui-react";
const Option = Select.Option;

class Areas extends React.Component {
    state = {
        courses : [],
        internships : [],
        registrations : [],
        confirmed : [],
        pending : [],
        intern_delete : [],
        listConfirmed : '',
        areas : [],
        choices : []
    };
    componentWillMount() {
        courseService.getCourses().then(res => {
            this.setState({
                courses : res.data
            })
        });

    }
    onChangeCourse(value) {
        internshipService.getInternship(value).then(res => {
            this.setState({
                internships: res.data
            })
        })
    };
    onChangeInternship(id) {
        areaService.getAreas(id).then(res => {
            this.setState({
                areas : res.data
            })
        })
    }
    onChangeAreas(id) {
        registrationService.getConfirmed(id).then(res => {
            this.setState({
                confirmed : res.data,
                internship_id : id
            })
        });
    }
    onChangeConfirmed(intern, index) {
        this.state.confirmed.splice(index, 1);
        this.setState({
            confirmed : this.state.confirmed,
            choices: [...this.state.choices, {...intern}]
        })
    }
    onChangeDelete(intern, index) {
        this.state.choices.splice(intern,1);
        this.setState({
            confirmed : [...this.state.confirmed, {...intern}],
            choices : this.state.choices
        })
    }
    render() {
        return (
            <App>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Message
                        attached
                        header={'AREAS COMPANY'}
                    />
                    <Form className={'attached fluid segment'}>
                    <div style={{width : '50%', margin : 'auto'}}>
                        <label>Course</label><br/>
                        <Select style={{ width: '100%' }} onChange={(value) => this.onChangeCourse(value)}>
                            {this.state.courses.map((course, index ) =>
                                <Option value={course.id} key={index}>{course.name}</Option>
                            )}
                        </Select>
                        <br/>
                        <label> Companies</label><br/>
                        <Select style={{ width: '100%' }} onChange={(value)=> this.onChangeInternship(value)}>
                            {this.state.internships.map((internship, index ) =>
                                <Option value={internship.id} key={index}>{internship.company.name}</Option>
                            )}
                        </Select>
                        <br/>
                        <label>Areas</label><br/>
                        <Select style={{ width: '100%' }} onChange={(value)=> this.onChangeAreas(value)}>
                            {this.state.areas.map((area, index ) =>
                                <Option value={area.id} key={index}>{area.address}</Option>
                            )}
                        </Select>
                        <br/>
                    </div>
                    <div style={{textAlign : 'right'}}>
                        <Button type={'primary'}>SAVE</Button>
                    </div>
                    <label><b>List Area</b></label>
                    <Table>
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Address</th>
                            <th style={{textAlign: 'center'}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.choices.map((intern, index) =>
                                <tr key={index}>
                                    <th>{intern.code}</th>
                                    <td>{intern.firstName}</td>
                                    <td>{intern.lastName}</td>
                                    <td>{intern.gender}</td>
                                    <td>{intern.dateOfBirth}</td>
                                    <td>{intern.address}</td>
                                    <td style={{textAlign : 'center'}}><Icon onClick={()=>this.onChangeDelete(intern,index )} type={'minus-circle'}/></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    <div>
                        <label><b>List Registration Confirmed</b></label>
                    </div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Address</th>
                            <th style={{textAlign: 'center'}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.confirmed.map((intern, index) =>
                                <tr key={index}>
                                    <th>{intern.code}</th>
                                    <td>{intern.firstName}</td>
                                    <td>{intern.lastName}</td>
                                    <td>{intern.gender}</td>
                                    <td>{intern.dateOfBirth}</td>
                                    <td>{intern.address}</td>
                                    <td style={{textAlign : 'center'}}><Icon onClick={()=>this.onChangeConfirmed(intern, index)} type={'plus-circle'}/></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    </Form>
                </div>
            </App>
        )
    }
}
export default Areas;