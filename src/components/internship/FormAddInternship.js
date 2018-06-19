import React from 'react';
import {Collapse,Card, CardBody, Label, Input} from  'reactstrap'
import {addInternship} from "./action";
import { Button, Select} from "antd";
import {connect} from 'react-redux';
import {loadCompany} from "../company/action";
import {loadLecturer} from "../lecturer/action";
const Option = Select.Option;

const mapDispatchToProps = function (dispatch) {
    return {
        addInternship : function (company_id,lecturer_code, deadline, course_id) {
            dispatch(addInternship(company_id,lecturer_code, deadline, course_id))
        },
        loadLecturer : function() {
            dispatch(loadLecturer())
        },
        loadCompany : function() {
            dispatch(loadCompany())
        }

    }
};

const mapStateToProps    = function (state) {
    return {
        lecturers : state.lecturerReducer,
        companies : state.companyReducer
    }
};

class FormAddInternship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_id : '',
            lecturer_code : '',
            deadline : '',
            toggle: false,
        };
    }
    handleClick(e) {
        e.preventDefault();
        this.props.addInternship(this.props.course_id, this.state.lecturer_code, this.state.company_id, this.state.deadline)
    }
    endDateChange(event) {
        this.setState({deadline : event.target.value})
    }
    componentDidMount() {
        this.props.loadLecturer();
        this.props.loadCompany();
    }
    CompanyClick(event) {
        this.setState({company_id : event});
        this.setState({course_id : this.props.course_id});
    }
    LecturerClick(event) {
        this.setState({lecturer_code : event})
    }
    render() {
        return(
            <Collapse isOpen={this.props.collapse}>
                <Card>
                    <CardBody>
                        <div>
                            <Label>Company</Label>
                            <Select onChange={this.CompanyClick.bind(this)}>
                                {this.props.companies.map((company,index) =>
                                    <Option key={index} value={company.id}>{company.name}</Option>
                                )}
                            </Select>
                            <Label>Lecturer manager</Label>
                            <Select onChange={this.LecturerClick.bind(this)}>
                                {this.props.lecturers.map((lecturer, index) =>
                                    <Option key={index} value={lecturer.code}>{lecturer.name}</Option>
                                )}
                            </Select>
                            <Label>Deadline</Label>
                            <Input onChange={this.endDateChange.bind(this)} name="deadline" type={"date"}/>
                            <br/>
                            <Button type={'primary'} onClick={this.handleClick.bind(this)}>SAVE</Button>
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FormAddInternship)