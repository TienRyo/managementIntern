import React                                                 from 'react';
import { Button, Icon, Select }                  from "antd";
import { Table }                                             from "reactstrap";
import { courseService, internshipService, lecturerService } from "../../services";
import App                                                   from "../../App";
import { Form, Message }                                     from "semantic-ui-react";
const Option = Select.Option;

class Council extends React.Component {
    state = {
        lecturers : [],
        courses : [],
        internships : [],
        councils : []
    };
    componentWillMount() {
        lecturerService.getLecturers().then(res => {
            this.setState({
                lecturers : res.data
            })
        });
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
    handleChoice(lecturer, index) {
        this.state.lecturers.splice(index,1);
        this.setState({
            councils : [...this.state.councils, {...lecturer}],
            lecturers : this.state.lecturers
        })
    }
    handleRemove(lecturer, index) {
        this.state.councils.splice(index,1);
        this.setState({
            councils : this.state.councils,
            lecturers : [...this.state.lecturers, {...lecturer}]
        })
    }
    onChangeCourse(value) {
        internshipService.getInternship(value).then(res => {
            this.setState({
                internships: res.data
            })
        })
    };
    onChangeInternship() {
        
    }
    render() {
        return (
            <App>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Message
                            attached
                            header={'CREATE COUNCIL'}
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
                        <Button type="primary" style={{marginLeft : '10px'}}>SAVE</Button>
                        <br/>
                        <label style={{marginTop : 30}}><b>List Council</b></label>
                        <Table>
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th style={{textAlign : 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.councils.map((lecturer, index) =>
                                    <tr key={index}>
                                        <th>{lecturer.code}</th>
                                        <td>{lecturer.name}</td>
                                        <td>{lecturer.gender}</td>
                                        <td>{lecturer.phone}</td>
                                        <td>{lecturer.email}</td>
                                        <td>{lecturer.address}</td>
                                        <td style={{textAlign : 'center'}}><Icon onClick={()=>this.handleRemove(lecturer,index )} type={'minus-circle'}/></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                        <label style={{marginTop : 30}}><b>List Lecturer</b></label>
                        <Table>
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th style={{textAlign : 'center'}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.lecturers.map((lecturer, index) =>
                                    <tr key={index}>
                                        <th>{lecturer.code}</th>
                                        <td>{lecturer.name}</td>
                                        <td>{lecturer.gender}</td>
                                        <td>{lecturer.phone}</td>
                                        <td>{lecturer.email}</td>
                                        <td>{lecturer.address}</td>
                                        <td style={{textAlign : 'center'}}><Icon onClick={()=>this.handleChoice(lecturer, index)} type={'plus-circle'}/></td>
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
export default Council;