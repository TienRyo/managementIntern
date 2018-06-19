import {Button, Select, Tabs} from 'antd';
import React from "react";
import {connect}            from  'react-redux';
import {deleteInternship, editInternship, loadInternship} from "./action";
import FormAddInternship from "./FormAddInternship";
import {Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {loadLecturer} from "../lecturer/action";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const mapDispatchToProps = function (dispatch) {
    return {
        loadInternship : function () {
            dispatch(loadInternship());
        },
        loadLecturer : function() {
            dispatch(loadLecturer())
        },
        editInternship : function (course_id, internship_id, lecturer_code, company_id, deadline, key_edit) {
            dispatch(editInternship(course_id, internship_id, lecturer_code, company_id, deadline, key_edit))
        },
        deleteInternship : function (id, course_id, key_edit) {
            dispatch(deleteInternship(id, course_id, key_edit))
        }
    }
};

const mapStateToProps = function (state) {
    return {
        internships : state.internshipReducer,
        lecturers : state.lecturerReducer,
    }
};
class InternshipList extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            course_id :'',
            modalIsOpen: false,
            lecturer_code : '',
            company_id : '',
            id :  '',
            key_edit: '',
            deadline : '',
        };
    }

    componentDidMount() {
        this.props.loadInternship();
    }
    toggle() {
        this.setState({collapse: !this.state.collapse});
    }
    openModal(internship, index) {
        this.setState({
            modalIsOpen: true,
            id: internship.id,
            lecturer_code : internship.lecturer.code,
            company_id : internship.company.id,
            course_id : internship.course,
            deadline : internship.deadline,
            key_edit: index
        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    onChangeDeadline(event) {
        console.log(event.target.value);
        this.setState({
            deadline :  event.target.value
        });
    }
    handleClick() {
        this.setState({
            modalIsOpen: false
        }, () =>
        this.props.editInternship(this.state.course_id, this.state.id, this.state.lecturer_code, this.state.company_id, this.state.deadline, this.state.key_edit)
        );
    }
    LecturerClick(event) {
        this.setState({lecturer_code : event})
    }
    deleteInternship() {
        this.props.deleteInternship(this.state.id, this.state.course_id, this.state.key_edit)
    }
    render() {
        return (
            <div style={{ padding: 24, background: '#fff'}}>
                <Button style={{marginBottom : 10}} onClick={this.toggle}>ADD</Button>
                <FormAddInternship collapse={this.state.collapse} course_id={this.props.course_id}/>
                <div className="card-container">
                    <Tabs tabPosition={'top'} type="card">
                        {this.props.internships.map((internship, index) =>
                            <TabPane tab={internship.company.name} key={index}>
                                <ul>
                                    <li><b> Deadline : {internship.deadline}</b></li>
                                    <h2> Company</h2>
                                    <li> Company Name : {internship.company.name}</li>
                                    <li> Company Address : {internship.company.address}</li>
                                    <li> Phone Manager : {internship.company.phoneManager}</li>
                                    <li> Email Manager : {internship.company.emailManager}</li>
                                    <li> Name Manager : {internship.company.nameManager}</li>
                                    <h2> Lecturer manager </h2>
                                    <li> Lecturer Name : {internship.lecturer.name}</li>
                                    <li> Lecturer Phone : {internship.lecturer.phone}</li>
                                    <li> Lecturer Email : {internship.lecturer.email}</li>
                                </ul>
                                <Button onClick={() => this.openModal(internship, index)}>EDIT</Button>
                                <Modal isOpen={this.state.modalIsOpen} onClosed={this.closeModal.bind(this)}>
                                    <ModalHeader>EDIT INTERNSHIP</ModalHeader>
                                    <ModalBody>
                                        <Label>Company</Label>
                                        <Select defaultValue={internship.company.name} style={{ width: '100%' }} disabled>
                                        </Select>
                                        <Label>Lecturer manager</Label>
                                        <Select style={{ width: '100%' }} defaultValue={internship.lecturer.name} onChange={this.LecturerClick.bind(this)}>
                                            {this.props.lecturers.map((lecturer, index) =>
                                                <Option key={index} value={lecturer.code}>{lecturer.name}</Option>
                                            )}
                                        </Select>
                                        <Label>Deadline</Label>
                                        <Input onChange={this.onChangeDeadline.bind(this)} value={this.state.deadline} name="deadline" type={"date"}/>
                                        <br/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type={'primary'} onClick={this.handleClick.bind(this)}>SAVE</Button>
                                    </ModalFooter>
                                </Modal>
                                <Button onClick={this.deleteInternship.bind(this)}>DELETE</Button>
                            </TabPane>
                        )}
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InternshipList)
