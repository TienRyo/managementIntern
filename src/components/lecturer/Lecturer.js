import React                               from 'react';
import {connect}                           from 'react-redux';
import {loadLecturer}                      from "./action";
import {Container, Table}                  from 'reactstrap';
import {Button}                            from "antd";
import { Link }                            from "react-router-dom";
import { Upload, message,  Icon }          from 'antd';
import { lecturerService, profileService } from "../../services";
import App                                 from "../../App";
import { Form, Message }                   from "semantic-ui-react";



const mapDispatchToProps = function (dispatch) {
    return {
        loadLecturer: function () {
            dispatch(loadLecturer());
        }
    }
};
const mapStateToProps = function (state) {
    return {
        lecturers : state.lecturerReducer
    }
};

class Lecturer extends React.Component {
    state = {
        lecturers : [],
        listImport : []
    };
    componentWillMount() {
        lecturerService.getLecturers().then(res => {
            this.setState({
                lecturers : res.data
            })
        })
    }
    deleteLecturer(e) {
        this.state.lecturers.splice(e.target.getAttribute('data-key'),1);
        lecturerService.deleteLecturer(e.target.getAttribute('data-id')).then(res => {
            this.setState({
                lecturers : this.state.lecturers
            })
        })
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
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    lecturerService.importFile({file : info.file.name}).then(() => {
                        message.success(`${info.file.name} file uploaded successfully`);
                        window.location.replace('/lecturer-list');
                    });
                } else if (info.file.status === 'error') {
                    lecturerService.importFile({file : info.file.name}).then(() => {
                        message.success(`${info.file.name} file uploaded successfully`);
                        window.location.replace('/lecturer-list');
                    });
                }
            },
        };
        const admin     = !(profileService.getProfile().role === 'admin');
        return (
            <App>
                <div>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Message
                            attached
                            header={'List Lecturer'}
                        />
                        <Form className={'attached fluid segment'}>
                        <Container>
                            <div style={{textAlign : 'right'}}>
                            <Link to={'/create/lecturer'}><Button type={'primary'} disabled={admin}>ADD</Button></Link><br/>
                            </div>
                            <label>Import file : </label>
                            <Upload {...props}>
                                <Button disabled={admin}>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Upload>
                            <br/>
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th> MAGV </th>
                                    <th> NAME</th>
                                    <th> GENDER</th>
                                    <th> PHONE</th>
                                    <th> EMAIL</th>
                                    <th> ADDRESS</th>
                                    <th style={{textAlign: 'center'}}> ACTION</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.lecturers.map((lecturer, index) =>
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{lecturer.code}</td>
                                        <td><Link to={'/management/lecturer/'.concat(lecturer.code)}>{lecturer.name}</Link></td>
                                        <td>{lecturer.gender}</td>
                                        <td>{lecturer.phone}</td>
                                        <td>{lecturer.email}</td>
                                        <td>{lecturer.address}</td>
                                        <td style={{textAlign: 'center'}}><Button disabled={admin} data-id={lecturer.code} data-key={index} onClick={this.deleteLecturer.bind(this)}>DELETE</Button></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Container>
                        </Form>
                    </div>
                </div>
            </App>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecturer);


