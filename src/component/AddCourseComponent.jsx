import { Component } from "react";
import CourseDataService from "../service/CourseDataService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddCourseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            status: 'Unfinished'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleSubmit() {
        console.log("Name: " + this.state.name);
        console.log("Description: " + this.state.description);
        console.log("Username: " + this.state.username);
        const { match: { params } } = this.props;
        let myTodo = {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            username: params.username,
        }
        CourseDataService.createItem(myTodo)
            .then(
                response => {
                    console.log(response.data)
                    this.props.history.push(`/listCourseByUsername/${myTodo.username}`);
                }
            );
    }

    goBack() {
        const { match: { params } } = this.props;
        let myTodo = {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            username: params.username,
        }
        this.props.history.push(`/listCourseByUsername/${myTodo.username}`);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }

    render() {
        return (
            <div>
                <h2>Add TODO Here</h2>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
                    </Form.Group>

                    <div className="row">
                        <Button variant="success" onClick={this.handleSubmit} size="lg">Submit</Button>{' '}
                    </div> <br/>
                    <div className="row">
                        <Button variant="info" onClick={this.goBack} size="sm">Nevermind...</Button>{' '}
                    </div>
                </Form>
            </div>
        );
    }
}
export default AddCourseComponent;