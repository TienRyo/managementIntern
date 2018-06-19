import React                     from 'react';
import {FieldGroup, FormBuilder} from "react-reactive-form";
import InputForm                 from "./InputForm";
import {Form as SemanticForm}    from 'semantic-ui-react';

export default class Form extends React.Component {

    render() {
        const {control, render, children, ...other} = this.props;
        return <FieldGroup
            control={control}
            render={(form) => <SemanticForm {...other} >{render ? render(form) : children}</SemanticForm>}
        />
    }
}

Form.defaultProps = {
    control: FormBuilder.group({})
};

Form.Input = InputForm;
