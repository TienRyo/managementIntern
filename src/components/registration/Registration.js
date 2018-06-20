import React                                                                     from 'react';
import {  Button, Select }                                                       from "antd";
import { courseService, internshipService, profileService, registrationService } from "../../services";
import { Input, Table }                                                          from "reactstrap";
import App                                                                       from "../../App";
import { Form, Message }                                                         from "semantic-ui-react";
const Option = Select.Option;

class Registration extends React.Component {
    state = {
        courses : [],
        internships : [],
        registrations : [],
        confirmed : [],
        pending : [],
        intern_delete : [],
        listConfirmed : '',
    };
    componentWillMount() {
        courseService.getCourses().then(res => {
            this.setState({
                courses : res.data
            },() => {
                internshipService.getInternship(this.state.courses[0].id).then(res => {
                    this.setState({
                        internships: res.data
                    })
                });
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
        localStorage.setItem('internship_id',id);
        registrationService.getConfirmed(id).then(res => {
            this.setState({
                confirmed : res.data.filter(intern => intern.lecturer_code ===localStorage.getItem('code')),
                internship_id : id
            })
        });
        registrationService.getPending(id).then(res => {
            this.setState({
                pending : res.data.filter(intern => intern.lecturer_code ===localStorage.getItem('code')),
                internship_id : id,
            })
        })
    }
    onChangeConfirmed(intern) {
        this.setState({
            listConfirmed : [...this.state.listConfirmed,{...intern}]
        })
    }
    sendConfirmed(){
        this.state.listConfirmed.map(intern =>
            this.setState({
                confirmed : [...this.state.confirmed,{...intern}],
                pending : this.state.pending.filter(rawIntern => !(rawIntern.code===intern.code))
            }, () => registrationService.confirmed(intern.registration))
        )
    }
    onChangeDelete(intern) {
        this.setState({
            intern_delete : [...this.state.intern_delete, {...intern}]
        })
    }
    deleteConfirmed() {
        this.state.intern_delete.map(intern =>
            this.setState({
                pending : this.state.pending.filter(rawIntern => !(rawIntern.code===intern.code))
            }, () => registrationService.deleteRegistration(intern.registration))
        )
    }
    render() {
        const admin     = !(profileService.getProfile().role === 'lecturer');
        return (
            <App>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Message
                        attached
                        header={'REGISTRATION'}
                    />
                    <Form className={'attached fluid segment'}>
                        <label>Course : </label>
                        <Select style={{ width: '35%' }} onChange={(value) => this.onChangeCourse(value)}>
                            {this.state.courses.map((course, index ) =>
                                <Option value={course.id} key={index}>{course.name}</Option>
                            )}
                        </Select>
                        <label style={{marginLeft: 20}}> Internships : </label>
                        <Select style={{width: '40%' }} onChange={(value)=> this.onChangeInternship(value)}>
                            {this.state.internships.map((internship, index ) =>
                                <Option value={internship.id} key={index}>{internship.company.name}</Option>
                            )}
                        </Select>
                        <label style={{marginTop : 30}}><b>List Registration Confirmed</b></label>
                        <Table>
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Address</th>
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
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                        <div>
                            <label><b>List Registration Pending</b></label>
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
                                <th style={{textAlign: 'center'}}>CONFIRMED</th>
                                <th style={{textAlign: 'center'}}>DELETE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.pending.map((intern, index) =>
                                    <tr key={index}>
                                        <th>{intern.code}</th>
                                        <td>{intern.firstName}</td>
                                        <td>{intern.lastName}</td>
                                        <td>{intern.gender}</td>
                                        <td>{intern.dateOfBirth}</td>
                                        <td>{intern.address}</td>
                                        <td style={{textAlign: 'center'}}>
                                            <Input onChange={()=>this.onChangeConfirmed(intern)} type="checkbox" />
                                        </td>
                                        <td style={{textAlign: 'center'}}>
                                            <Input onChange={()=>this.onChangeDelete(intern)} type="checkbox" />
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td colSpan={6}/>
                                <td style={{textAlign: 'center'}}>
                                    <Button onClick={this.sendConfirmed.bind(this)} disabled={admin}>Confirmed</Button>
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    <Button onClick={this.deleteConfirmed.bind(this)} disabled={admin}>DELETE</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Form>
                </div>
            </App>
        )
    }
}
export default Registration;