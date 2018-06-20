import React from 'react';
import {connect}                                                             from 'react-redux'
import {Container, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {Button, Layout, Select}                                              from "antd"
import {ChangeStatusCourse, deleteCourse, editCourse}                        from "./actions";
import {Link}                                                                from "react-router-dom";
import {listInternshipById}                                                  from "../internship/action";
import { Collapse, CardBody, Card, CardHeader }                              from 'reactstrap';
import InternshipList                                                        from "../internship/Internship";
import {Table}                                                               from 'semantic-ui-react';
import { profileService }                                                    from "../../services";
const mapDispatchToProps = function (dispatch) {
    return {
        editCourse : function (id, name, startDate, endDate, status, key_edit) {
            dispatch(editCourse(id, name, startDate, endDate, status, key_edit))
        },

        deleteCourse(id,key_delete) {
            dispatch(deleteCourse(id, key_delete))
        },
        listInternshipById : function (id) {
            dispatch(listInternshipById(id))
        },
        ChangeStatusCourse(id, index) {
            dispatch(ChangeStatusCourse(id, index))
        }

    }
};

const mapStateToProps = function (state) {

    return {
        courses : state.addCourseReducer
    }
};

class ListCourse extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.renderInternship.bind(this);
        this.state = {
            courses: [],
            name: '',
            status : '',
            startDate: '',
            endDate: '',
            toggle: false,
            modalIsOpen: false,
            idChecked: [],
            collapse: false,
            id : '',
            course_id : ''

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    renderInternship(e) {
        e.preventDefault();
        let id = e.currentTarget.getAttribute('data-course-id');
        this.setState({ collapse: !this.state.collapse, course_id: id});
        this.props.listInternshipById(id);
    }
    openModal(course, index) {
        this.setState({
            modalIsOpen: true,
            name: course.name,
            status : course.status,
            startDate: course.startDate,
            endDate: course.endDate,
            id: course.id,
            key_edit: index
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    onEdited(e) {
        e.preventDefault();
        this.props.editCourse(this.state.id, this.state.name, this.state.startDate, this.state.endDate, this.state.status,this.state.key_edit);
        this.closeModal();
    }
    nameChange(event) {
        this.setState({name: event.target.value})
    }

    startDateChange(event) {
        this.setState({startDate: event.target.value})
    }

    endDateChange(event) {
        this.setState({endDate: event.target.value})
    }

    ChangeStatusCourse(e) {
        let id = e.currentTarget.getAttribute('data-course-id');
        let index = e.currentTarget.getAttribute('index');
        this.props.ChangeStatusCourse(id, index);
    }

    render() {
        const admin     = !(profileService.getProfile().role === 'admin');
        return (
            <Container>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>START_DATE</Table.HeaderCell>
                            <Table.HeaderCell>END_DATE</Table.HeaderCell>
                            <Table.HeaderCell style={{textAlign:'center'}}>STATUS</Table.HeaderCell>
                            <Table.HeaderCell style={{textAlign:'center'}}>EDIT</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.props.courses.map((course, index) =>
                        <Table.Row key={index}>
                            <Table.Cell><Link onClick={this.renderInternship.bind(this)} data-course-id={course.id} to ={"/course/".concat(course.id).concat('/internships')}>{course.name}</Link></Table.Cell>
                            <Table.Cell>{course.startDate}</Table.Cell>
                            <Table.Cell>{course.endDate}</Table.Cell>
                            <Table.Cell style={{textAlign:'center'}}><Button disabled={admin} data-course-id={course.id} index={index} onClick={this.ChangeStatusCourse.bind(this)}
                                                style={{marginBottom: '1rem'}} type={course.status==='CLOSE' ? 'danger' : 'primary'}>{course.status}</Button></Table.Cell>
                            <Table.Cell style={{textAlign:'center'}}><Button data-course-id={course.id} disabled={admin}  onClick={() => this.openModal(course, index)}
                                                style={{marginBottom: '1rem'}}>Edit</Button></Table.Cell>
                            <Modal isOpen={this.state.modalIsOpen} onClosed={this.closeModal}>
                                <ModalHeader>EDIT COURSE</ModalHeader>
                                <ModalBody>
                                    <Label>Name</Label>
                                    <Input name="name" type="text" value={this.state.name}
                                           onChange={this.nameChange.bind(this)}
                                           placeholder="Enter name course"/>
                                    <Label>Start_Date</Label>
                                    <Input onChange={this.startDateChange.bind(this)} value={this.state.startDate}
                                           name="startDate" type="date"/>
                                    <Label>End_Date</Label>
                                    <Input onChange={this.endDateChange.bind(this)} value={this.state.endDate}
                                           name="endDate" type={"date"}/>
                                    <Label>Status</Label><br/>
                                    <Select defaultValue={this.state.status} disabled style={{ width: '100%' }}>
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.onEdited.bind(this)} type={'primary'}>SAVE</Button>
                                </ModalFooter>
                            </Modal>
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <Layout>
                            <CardHeader><b>LIST INTERNSHIP</b></CardHeader>
                            <CardBody>
                                <InternshipList course_id={this.state.course_id}/>
                            </CardBody>
                        </Layout>
                    </Card>
                </Collapse>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);