import React                     from 'react';
import { connect }               from 'react-redux';
import LoginComponent            from './screens/Login/LoginComponent';
import routers                   from './routers';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory      from 'history/createBrowserHistory'
import AccessDenied              from './screens/PageErrors/AccessDenied';
import NotFoundComponent         from './screens/PageErrors/NotFoundComponent';

const newHistory = createBrowserHistory();

class RouteProtected extends React.Component {

    protectedRoute = (route, role, permissions = [], index) => {
        return (
            permissions.includes(role) || permissions.includes('*') ? <Route key={index} {...route}/> :
                <Route key={index} {...route} component={AccessDenied}/>
        )
    };


    render() {
        const credential = this.props.credential || {};
        if (!credential.role) return <LoginComponent/>;
        return (
            <Router history={newHistory}>
                <Switch>
                    <Route exact path='/' name='Login' component={LoginComponent}/>
                    {routers.map((router, index) => this.protectedRoute(router, credential.role, router.permissions, index))}
                    <Route component={NotFoundComponent}/>
                </Switch>
            </Router>
        )
    }
}


const mapStateToProps = state => {
    return {
        credential: state.auth.credential
    }
};


export default connect(mapStateToProps)(RouteProtected);
