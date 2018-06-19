import React          from 'react';
import {Form}         from 'semantic-ui-react';
import {FieldControl} from "react-reactive-form";

export default class InputForm extends React.Component {
    getError(errors = {}) {
        return errors && Object.values(errors)[0]
    }

    render() {
        const {Input, ...props} = this.props;
        return (
            <FieldControl
                name={this.props.name}
                render={({handler, touched, errors, meta}) => {
                    let error = this.getError(errors);
                    return <React.Fragment>
                        <Input {...handler()} {...props} />
                        {touched && <span className={'message-error'}>{error}</span>}
                    </React.Fragment>;
                }}

            />
        )
    }
}

InputForm.defaultProps = {
    Input: Form.Input
};