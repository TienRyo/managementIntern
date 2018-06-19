import React              from 'react';
import {Container, Table} from "reactstrap";
import {connect}          from  'react-redux';
import {loadCompany}      from "../company/action";
import { Link }           from "react-router-dom";
import App                from "../../App";
import { Form, Message }  from "semantic-ui-react";

const mapDispatchToProps = function (dispatch) {
    return {
        loadCompany: function () {
            dispatch(loadCompany());
        }
    }
};

const mapStateToProps = function (state) {
    return {
        companies : state.companyReducer,
    }
};

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    componentDidMount() {
        this.props.loadCompany();
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        return (
            <App>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Message
                        attached
                        header={'Company List'}
                    />
                    <Form className={'attached fluid segment'}>
                    <Container>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th> NAME</th>
                                <th> PHONE MANAGER</th>
                                <th> EMAIL MANAGER</th>
                                <th> NAME MANAGER</th>
                                <th> ADDRESS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.companies.map((company, index) =>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td><Link to={{pathname : `/company/${company.id}`}}>{company.name}</Link></td>
                                    <td>{company.phoneManager}</td>
                                    <td>{company.emailManager}</td>
                                    <td>{company.nameManager}</td>
                                    <td>{company.address}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Container>
                    </Form>
                </div>
            </App>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)