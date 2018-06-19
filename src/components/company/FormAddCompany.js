import React                                         from 'react';
import {Collapse,Card, CardBody, Form, Label, Input} from  'reactstrap'
import {Button}                                      from "antd";
import {connect}                                     from 'react-redux'
import {addCompany}                                  from "./action";
import { CompanyEditorService }                      from "../../services";
//import AddArea from "./AddArea";

const mapDispatchToProps = function (dispatch) {
    return {
        addCompany : function (name, phoneManager, emailManager, nameManager, address ) {
            dispatch(addCompany(name, phoneManager, emailManager, nameManager, address))
        }
    }

};

const mapStateToProps   = function (state) {
    return {
        companies : state
    }
};

class FormAddCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            phoneManager :'',
            emailManager : '',
            nameManager  : '',
            address      : ''
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            company : {
                name : this.state.name,
                phoneManager : this.state.phoneManager,
                emailManager : this.state.emailManager,
                address : this.state.address,
                nameManager : this.state.nameManager
            },
            name : '',
            phoneManager : '',
            emailManager : '',
            address : '',
            nameManager : ''
        },() => {
            CompanyEditorService.postCompany(this.state.company).then(res =>
                this.props.onChangeCompany(res.data)
            )
        });
    }

    nameChange(event) {
        this.setState({name: event.target.value})
    }

    phoneManagerChange(event) {
        this.setState({phoneManager: event.target.value})
    }

    nameManagerChange(event) {
        this.setState({nameManager: event.target.value})
    }

    emailManagerChange(event) {
        this.setState({emailManager: event.target.value})
    }

    addressChange(event) {
        this.setState({address: event.target.value})
    }

    render() {
        return (
            <Collapse isOpen={this.props.collapse}>
                <Card>
                    <CardBody>
                        <Form onSubmit={this.handleClick.bind(this)}>
                            <Label>Name</Label>
                            <Input value={this.state.name} onChange={this.nameChange.bind(this)}/>
                            <Label>Phone Manager</Label>
                            <Input onChange={this.phoneManagerChange.bind(this)} value={this.state.phoneManager} />
                            <Label>Email Manager</Label>
                            <Input onChange={this.emailManagerChange.bind(this)} value={this.state.emailManager}/>
                            <Label>Name Manager</Label>
                            <Input onChange={this.nameManagerChange.bind(this)} value={this.state.nameManager}/>
                            <Label>Address</Label>
                            <Input onChange={this.addressChange.bind(this)} value={this.state.address}/>
                            <br/>
                            <Button onClick={this.handleClick.bind(this)}>SAVE</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormAddCompany)