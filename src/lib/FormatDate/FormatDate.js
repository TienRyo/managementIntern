import React from 'react';
import PropTypes        from 'prop-types';
import moment from 'moment';

class FormatDate extends React.Component{
    render(){
        return moment(this.props.date).format(this.props.type);
    }
}

FormatDate.propTypes = {
    type: PropTypes.string,
    date: PropTypes.object.isRequired
};

FormatDate.defaultProps = {
    type: 'DD/MM/YYYY',
};

export default FormatDate;