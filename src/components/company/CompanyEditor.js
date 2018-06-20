import React                                  from 'react';
import {connect}                              from "react-redux";
import {Input, Form, FormGroup, Label, Table} from "reactstrap";
import {Button}                   from "antd";
import {createArea}                           from "./area/action";
import { CompanyEditorService, areaService}   from '../../services';
import App                                    from "../../App";
import {Header} from 'semantic-ui-react';
const mapDispatchToProps = function (dispatch) {
    return {
        createArea : function (name, address, company_id) {
            dispatch(createArea(name, address, company_id))
        }
    }
};

const mapStateToProps = function (state) {

    return {
        areas : state.areaReducer,
        detail_company : state.companyReducer,
        index : state.companyReducer.key
    }
};
class CompanyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areas : [],
            nameArea : '',
            addressArea : '',
            name : '',
            address: '',
            phoneManager: '',
            emailManager: '',
            nameManager: '',
            id : ''
        }
    }
    componentWillMount() {
        CompanyEditorService.getCompany(this.props.match.params.id).then(res => {
            let company = res.data[0];
            this.setState({
                name : company.name,
                address: company.address,
                phoneManager: company.phoneManager,
                emailManager: company.emailManager,
                nameManager: company.nameManager,
                id : company.id
            })
        });
        areaService.getAreas(this.props.match.params.id).then(res => {
            this.setState({
                areas : res.data
            })
        })
    }
    nameArea(e) {
        this.setState({
            nameArea : e.target.value
        })
    }
    addressArea(e) {
        this.setState({
            addressArea : e.target.value
        })
    }
    createArea(e) {
        e.preventDefault();
        areaService.postArea(this.state.nameArea,this.state.addressArea, this.state.id).then(res => {
            let area = res.data;
            this.setState({
                areas : [...this.state.areas, {name : area.name, address : area.address, id : area.id}],
                nameArea : '',
                addressArea : '',
            });
        });
    }
    SubmitEdit() {
        CompanyEditorService.putCompany(this.props.match.params.id, {
                name : this.state.name,
                address: this.state.address,
                phoneManager: this.state.phoneManager,
                emailManager: this.state.emailManager,
                nameManager: this.state.nameManager,
                id : this.props.match.params.id
            }).then(() => {
                window.location.replace('/company-list')
            }).catch(() =>
                    this.setState({message : 'Edit Fail'})

            )
    }
    onChangeEmailManager(e) {
        this.setState({
            emailManager : e.target.value
        })
    }
    onChangePhoneManager(e) {
        this.setState({
            phoneManager: e.target.value
        })
    }
    onChangeNameManager(e) {
        this.setState({
            nameManager : e.target.value
        })
    }
    onChangeName(e) {
        this.setState({
            name : e.target.value
        })
    }
    onChangeAddress(e) {
        this.setState({
            address : e.target.value
        })
    }
    deleteArea(e) {
        let key = e.target.getAttribute('data-key');
        console.log(this.state.areas[key]);
        areaService.deleteArea(this.state.id,this.state.areas[key].id).then(()=> {
            this.state.areas.splice(key,1);
            this.setState({
                areas : this.state.areas
            })
        })
    }
    render() {
        return (
            <App>
            <div>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Header style={{textAlign: 'center'}}>Edit Company
                    </Header>
                    <div style={{border : 2, width : '70%', margin : 'auto'}}>
                    <Form>
                        <FormGroup >
                            <Label for="Name" >Name</Label>
                            <Input id="Name" onChange={this.onChangeName.bind(this)} value={this.state.name} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="address" >Address</Label>
                            <Input id="address" onChange={this.onChangeAddress.bind(this)} value={this.state.address} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="Name manager" >Name manager</Label>
                            <Input id="Name manager" onChange={this.onChangeNameManager.bind(this)} value={this.state.nameManager}/>
                        </FormGroup>
                        <FormGroup >
                            <Label for="Phone manager" >Phone manager</Label>
                            <Input id="Phone manager" onChange={this.onChangePhoneManager.bind(this)} value={this.state.phoneManager}/>
                        </FormGroup>
                        <FormGroup >
                            <Label for="Email manager" >Email manager</Label>
                            <Input id="Email manager" onChange={this.onChangeEmailManager.bind(this)} value={this.state.emailManager}/>
                        </FormGroup>
                    </Form>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280, margin : 'auto', border : '1px solid' }}>
                        <h3>ADD AREA</h3>
                        <Form>
                            <FormGroup >
                                <Label for="Name" >Name </Label>
                                <Input id="Name" value={this.state.nameArea} onChange={this.nameArea.bind(this)}/>
                            </FormGroup>
                            <FormGroup >
                                <Label for="address" >Address</Label>
                                <Input id="address" value={this.state.addressArea} onChange={this.addressArea.bind(this)}/>
                            </FormGroup>
                            <Button onClick={this.createArea.bind(this)}>ADD</Button>
                        </Form>
                    </div>
                    <br/>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>NAME AREA</th>
                            <th>ADDRESS</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.areas.map((area,index) =>
                            <tr key={index}>
                                <td>{area.name}</td>
                                <td>{area.address}</td>
                                <td><Button onClick={this.deleteArea.bind(this)} data-key={index}>DELETE</Button></td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                        <label style={{color : "red"}}>{this.state.message}</label>
                        <Button onClick={this.SubmitEdit.bind(this)}>SUBMIT</Button>
                    </div>
                </div>
            </div>
            </App>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CompanyEditor);