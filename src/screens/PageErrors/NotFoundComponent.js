import React, {Component} from 'react';
import {Link}             from 'react-router-dom';
import './NotFound.css';

class NotFoundComponent extends Component {
    render() {
        return (
            <div>
                <div className='c'>
                    <div className='_404'>404</div>
                    <div className='_1'>THE PAGE NOT FOUND</div>
                    <Link className={'btn'} to={'/dashboard'}>BACK TO DASHBOARD</Link>
                </div>
            </div>
        );
    }
}

export default NotFoundComponent;
