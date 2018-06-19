import React                          from 'react';
import {Dropdown, Image}              from 'semantic-ui-react';
import {menuUserService, authService} from '../../services';
import './DropdownMenuUser.css';
import {Link}                         from 'react-router-dom';
import nullAvatar                     from '../images/nullAvatar.jpg';

class DropdownMenuUser extends React.Component {

    handleLogout = () => {
        authService.logout();
        return this.props.logout();
    };

    render() {
        let avatar = this.props.credential.avatar;
        return (
            <div className={'dropdown_menu_user'}>
                <Dropdown trigger={<Image avatar src={avatar ? avatar : nullAvatar}/>} pointing='top left'
                          icon={null}>
                    <Dropdown.Menu>
                        {
                            menuUserService.getMenu().map((menu, index) => {
                                return (
                                    <Dropdown.Item key={index}>
                                        <Link to={menu.path}>
                                            {menu.name}
                                        </Link>
                                    </Dropdown.Item>
                                )
                            })
                        }
                        <div className="item">
                            <a onClick={this.handleLogout}>Logout</a>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default DropdownMenuUser;