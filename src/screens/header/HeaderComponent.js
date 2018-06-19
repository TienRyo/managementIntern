import React            from 'react';
import {Menu, Icon}     from 'semantic-ui-react';
import {connect}        from 'react-redux';
import DropdownMenuUser from "./DropdownMenuUser";
import {logout}         from '../../reducers/auth'
import config           from '../../config';
import './header.css';
// import { Link }         from "react-router-dom";


class HeaderComponent extends React.Component {

    render() {
        return (
            <Menu className={'header-fix-top'} fixed='top'>
                <Menu.Item header>
                    {config.app.textLogo}
                </Menu.Item>
                <Menu.Menu position='right'>
                    {/*<Menu.Item style={{textAlign : "center"}}><Link to="/courses"><Icon type="profile"/><span>COURSES</span></Link></Menu.Item>*/}
                    {/*<Menu.Item style={{textAlign : "center"}}><Link to="/companies"><Icon type="user"/><span>COMPANIES</span></Link></Menu.Item>*/}
                    {/*<Menu.Item style={{textAlign : "center"}}><Link to="/lecturers"><Icon type="user"/><span>LECTURERS</span></Link></Menu.Item>*/}
                    <Menu.Item>
                        <Icon name='alarm'/>
                    </Menu.Item>
                    <Menu.Item>
                        <DropdownMenuUser credential={this.props.credential} logout={this.props.logout}/>
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='setting'/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        credential: state.auth.credential
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);