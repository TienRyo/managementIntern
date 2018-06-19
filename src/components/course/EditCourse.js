import React, { Component } from 'react';
import {
    Input, Form, Button,
    Modal, Header} from 'semantic-ui-react';
class EditCourse extends Component {
    state = {
        name: '',
        status : '',
        startDate: '',
        endDate: '',
        id: '',
        key_edit: '',
        visible: false
    };


    closeModal() {
        this.setState({visible: !this.state.visible})
    };
    nameChange(event) {
        this.setState({name: event.target.value})
    }

    startDateChange(event) {
        this.setState({startDate: event.target.value})
    }
    onEdited(e) {
        e.preventDefault();
        this.props.editCourse(this.state.id, this.state.name, this.state.startDate, this.state.endDate, this.state.status,this.state.key_edit);
        this.closeModal();
    }

    endDateChange(event) {
        this.setState({endDate: event.target.value})
    }
    componentWillMount() {
        let course= this.props.course;
        let index = this.props.index;
        this.setState({
            name: course.name,
            status : course.status,
            startDate: course.startDate,
            endDate: course.endDate,
            id: course.id,
            key_edit: index,
        });

    }
    render() {
        return (
            <div>
                <Button   onClick={this.closeModal.bind(this)}
                          style={{marginBottom: '1rem'}}>Edit</Button>
                    <Modal open={this.state.visible} dimmer={'inverted'} onClose={this.closeModal.bind(this)}>
                        <Header icon='archive' >EDIT COURSE</Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field onChange={this.nameChange.bind(this)} control={Input} value={this.state.name} label='Name' name="name" placeholder='Name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field onChange={this.startDateChange.bind(this)} control={Input} value={this.state.startDate} label='Start Date' name="Start Date" placeholder='Start Date' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field onChange={this.endDateChange.bind(this)} type={"date"} control={Input} value={this.state.endDate} label='End Date' name="End Date" placeholder='Name' />
                                </Form.Group>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={this.close}>
                                Cancel
                            </Button>
                            <Button onClick={this.onEdited.bind(this)} type={'primary'}>SAVE</Button>
                        </Modal.Actions>
                    </Modal>
            </div>
        )
    }
}

export default EditCourse;