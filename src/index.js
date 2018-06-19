import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import RouteProtected  from './RouteProtected';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
// import 'semantic-ui-css/semantic.min.css';

import store from "./reducers/store";

ReactDOM.render(
    <Provider store={store}>
        <RouteProtected/>
    </Provider>,
    document.getElementById('root')
);
