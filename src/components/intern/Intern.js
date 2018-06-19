import React                                from 'react';
import {connect}                            from 'react-redux';
import {loadIntern}                         from "./action";
import {Container, Table}                   from "reactstrap";
import { internService}                     from "../../services";
import { Button, Icon, Upload } from "antd";
import { Link }                             from "react-router-dom";
import { message }                          from "antd/lib/index";
import App                                  from "../../App";
import { Form, Message }                    from "semantic-ui-react";




const mapDispatchToProps = function (dispatch) {
    return {
        loadIntern: function () {
            dispatch(loadIntern());
        }
    }
};
const mapStateToProps = function (state) {
    return {
        interns : state.internReducer
    }
};

class Intern extends React.Component {
    state = {
        interns : []
    };

    componentWillMount() {
        internService.getInterns().then(res => {
            this.setState({
                interns : res.data
            })
        })
    }
    deleteIntern(e) {
        this.state.interns.splice(e.target.getAttribute('data-key'),1);
        internService.deleteIntern(e.target.getAttribute('data-id')).then(res => {
            this.setState({
                interns : this.state.interns
            })
        })
    }
    importFile() {

    }
    render() {
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    this.setState({
                        listImport : info.fileList
                    })
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <App>
            <Container>
                <div style={{ padding: 24, background: '#fff'}}>
                    <Message
                        attached
                        header={'List Intern'}
                    />
                    <Form className={'attached fluid segment'}>

                        <Container>

                            <div style={{textAlign : 'right'}}>
                                <Link to={'/management/intern'}><Button>ADD</Button></Link><br/>
                            </div>
                            <label>Import file : </label>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Upload>
                            <br/>
                            <Button onClick={this.importFile.bind(this)}>Save</Button>
                            <br/>

                            <br/>
                            <br/>
                            <Table striped>
                                <thead>
                                <tr>
                                    <th> MASV </th>
                                    <th> LASTNAME</th>
                                    <th> FIRSTNAME</th>
                                    <th> GENDER</th>
                                    <th> DATEOFBIRTH</th>
                                    <th> IDCARD</th>
                                    <th>PHONE</th>
                                    <th> ADDRESS</th>
                                    <th style={{textAlign: "center"}}> ACTION</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.interns.map((intern, index) =>
                                    <tr key={index}>
                                        <td><Link to={`/management/intern/${intern.code}`}>{intern.code}</Link></td>
                                        <td>{intern.lastName}</td>
                                        <td>{intern.firstName}</td>
                                        <td>{intern.gender}</td>
                                        <td>{intern.dateOfBirth}</td>
                                        <td>{intern.idCard}</td>
                                        <td>{intern.phone}</td>
                                        <td>{intern.address}</td>
                                        <td><Button data-id={intern.code} data-key={intern} onClick={this.deleteIntern.bind(this)}>DELETE</Button></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Container>
                    </Form>
                </div>
            </Container>
            </App>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intern);


