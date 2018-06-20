import React                                       from 'react';
import {connect}                                   from 'react-redux';
import {deleteCompany, detailCompany, loadCompany} from "./action";
import {Container, Table}     from 'reactstrap';
import {Button}               from 'antd'
import FormAddCompany         from "./FormAddCompany";
import {Link}                 from "react-router-dom";
import {loadArea}             from "./area/action";
import {CompanyEditorService} from "../../services";
import App                    from "../../App";
import {profileService}         from "../../services";



const mapDispatchToProps = function (dispatch) {
    return {
        loadCompany : function () {
            dispatch(loadCompany());
        },
        deleteCompany : function (id, key_delete) {
            dispatch(deleteCompany(id, key_delete))
        },
        detailCompany : function (id, key) {
            dispatch(detailCompany(id, key))
        },
        loadArea : function (id) {
            dispatch(loadArea(id))
        }
    }
};
const mapStateToProps = function (state) {
    return {
        companies : state.companyReducer
    }
};

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            toggle : false,
            companies : []

        }
    }

    componentWillMount() {
        CompanyEditorService.getCompanies().then(res => {
            this.setState({
                companies : res.data
            })
        })
    }
    toggle() {
        this.setState({collapse: !this.state.collapse});
    }
    onDeleted (e) {
        const nameCompany = e.currentTarget.getAttribute('name');
        let id = e.currentTarget.getAttribute('data-company-id');
        let index =  e.currentTarget.getAttribute('index');
        this.setState.key_delete = index;
        if (window.confirm('Do you want to delete this : '.concat(nameCompany))) {
            this.props.deleteCompany(id,index);
            this.state.companies.splice(index,1);
            this.setState({ companies : this.state.companies})
        }
    }
    detailCompany(e) {
        this.props.loadArea(e.currentTarget.getAttribute('data-company-id'));
        this.props.detailCompany(e.currentTarget.getAttribute('data-company-id'),e.currentTarget.getAttribute('data-key'));
    }
    onChangeCompany(value) {
        this.setState({
            companies : [...this.state.companies,{...value}]
        })
    }
     render() {
         const admin     = !(profileService.getProfile().role === 'admin');
        return (
            <App>
            <Container>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Table>
                        <thead>
                        <tr>
                            <th> STT </th>
                            <th> NAME </th>
                            <th> PHONE MANAGER </th>
                            <th> EMAIL MANAGER </th>
                            <th> NAME MANAGER </th>
                            <th> ADDRESS </th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.companies.map((company, index) =>
                            <tr key={index}>
                                <th>{index}</th>
                                <th><Link to={'/edit/company/'.concat(company.id)} data-company-id={company.id} data-key={index} onClick={this.detailCompany.bind(this)}>{company.name}</Link></th>
                                <th>{company.phoneManager}</th>
                                <th>{company.emailManager}</th>
                                <th>{company.nameManager}</th>
                                <th>{company.address}</th>
                                <th>
                                    <Button
                                        disabled={admin}
                                        className={"btn-delete"}
                                        data-company-id={company.id}
                                        index={index}
                                        name={company.name}
                                        onClick={this.onDeleted.bind(this)}
                                    >Delete</Button>
                                </th>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                <div>
                    <Button onClick={this.toggle} style={{marginBottom: '1rem'}} disabled={admin}>ADD</Button>
                    <FormAddCompany onChangeCompany={(value) => this.onChangeCompany(value)} collapse={this.state.collapse}/>
                </div>
                </div>
            </Container>
            </App>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)


