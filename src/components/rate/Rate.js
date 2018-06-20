import React                          from 'react';
import {connect}                      from 'react-redux';
import {Container, Table}             from "reactstrap";
import { rateService } from "../../services";
import { Button, Icon, Upload }       from "antd";
import { Link }                       from "react-router-dom";
import { message }                    from "antd/lib/index";
import App                            from "../../App";
import { Form, Message }              from "semantic-ui-react";




const mapDispatchToProps = function (dispatch) {
    return {

    }
};
const mapStateToProps = function (state) {
    return {

    }
};

class Intern extends React.Component {
    state = {
        rates : [],
        listImport : []
    };

    componentWillMount() {
        rateService.getAll().then(res => {
            this.setState({
                rates : res.data
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
                console.log(info);
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
                            header={'List Rate'}
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
                                        <th> FIRST POINT</th>
                                        <th> LECTURER POINT</th>
                                        <th> COMPANY POINT</th>
                                        <th>COUNCIL POINT</th>
                                        <th> FINALE POINT </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.rates.map((rate, index) =>
                                        <tr key={index}>
                                            <td>{rate.code}</td>
                                            <td>{rate.lastName}</td>
                                            <td>{rate.firstName}</td>
                                            <td>{rate.first_point}</td>
                                            <td>{rate.lecture_point}</td>
                                            <td>{rate.company_point}</td>
                                            <td>{rate.council_point}</td>
                                            <td>{rate.finale_point}</td>
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


