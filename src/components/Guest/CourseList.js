import React                            from 'react';
import { CardHeader, Container, Table } from "reactstrap";
import {connect}                    from  'react-redux';
import {loadCourse}                 from "../course/actions";
import {Link}                       from 'react-router-dom';
import {listInternshipById}         from "../internship/action";
import InternshipList               from "./InternshipList";
import { Collapse, CardBody, Card } from 'reactstrap';
import {Layout}                     from "antd";
import App                          from "../../App";
import { Form, Message }            from "semantic-ui-react";

const mapDispatchToProps = function (dispatch) {

    return {
        loadCourse : function () {
            dispatch(loadCourse());
        },

        listInternshipById : function (id) {
            dispatch(listInternshipById(id))
        }

    }
};

const mapStateToProps = function (state) {
    return {
        courses : state.addCourseReducer,
    }
};

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.renderInternship.bind(this);
        this.state = { collapse: false };
    }
    componentDidMount() {
        this.props.loadCourse();
    }
    renderInternship(e) {
        e.preventDefault();
        this.setState({ collapse: !this.state.collapse });
        let id = e.currentTarget.getAttribute('data-course-id');
        this.props.listInternshipById(id);
    }
    render() {
        return (
            <App>
            <div>
                <div style={{ padding: 24, background: '#fff'}}>
                    <Message
                        attached
                        header={'Course List'}
                    />
                    <Form className={'attached fluid segment'}>
                    <Container>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th> NAME</th>
                                <th> START_DATE</th>
                                <th> END_DATE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.courses.map((course, index) =>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td><Link onClick={this.renderInternship.bind(this)} data-course-id={course.id} to ={"/course/".concat(course.id).concat('/internships')}>{course.name}</Link></td>
                                    <td>{course.startDate}</td>
                                    <td>{course.endDate}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Container>
                    </Form>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <Layout>
                            <CardHeader><b>LIST INTERNSHIP</b></CardHeader>
                        <CardBody>
                            <InternshipList/>
                        </CardBody>
                        </Layout>
                    </Card>
                </Collapse>
            </div>
            </App>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)