import React, { Component } from 'react';
import './NotFound.css';

class AccessDenied extends Component {
    render() {
        return (
            <div>
                <div className='c'>
                    <div className='_403'>403</div>
                    <div className='_1'>ACCESS DENIED</div>
                </div>
            </div>
        );
    }
}

export default AccessDenied;
