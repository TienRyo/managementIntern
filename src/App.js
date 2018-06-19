import React                  from 'react';
import {Link}                 from 'react-router-dom';
import {Menu, Segment}        from 'semantic-ui-react';
import {sliderBarMenuService} from './services';
import HeaderComponent        from './screens/header/HeaderComponent';
import './App.css';
class App extends React.Component {

    state = {
        listMenu: sliderBarMenuService.getMenu()
    };


    render() {
        return (
            <div className='app'>
                <Menu fixed='left' vertical inverted>
                    {this.state.listMenu.map((menu, index) => (
                        <Menu.Item key={index} as={Link} to={menu.path}>
                            {menu.label}
                        </Menu.Item>
                    ))}
                </Menu>
                <HeaderComponent/>
                <Segment>
                    <main>
                        <div id="content" style={{marginTop: 20}}>
                        {this.props.children}
                        </div>
                    </main>
                </Segment>
            </div>
        );
    }
}

export default App;