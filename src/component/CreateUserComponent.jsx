import { Component } from "react";
import CourseDataService from '../service/CourseDataService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            show: false,
            already_user: false
        }
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseForAlrUser = this.handleCloseForAlrUser.bind(this);
    }
    handleUserNameChange(e) {
        this.setState({ username: e.target.value })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }
    goBack() {
        this.props.history.push("/login")
    }
    handleSubmit() {
        //validate to see if User is in DB (check username and password)
        console.log(this.state.username)
        console.log(this.state.password)
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log("User obj" + user.username + user.password)
        CourseDataService.createUser(user)
            .then(
                response => {
                    if(response.data === false) {
                        console.log("reach")
                        this.setState({already_user : true})
                    } else {
                        this.props.history.push("/login");
                    }                    
                }
            )
    }

    handleShow() {
        this.setState({show : true});
    }
    handleClose() {
        this.setState({show : false});
    }

    handleCloseForAlrUser() {
        this.setState({already_user : false});
    }
     
    render() {
        return (
            <div className="container">
                <h2>Create User Screen</h2>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={this.state.username} onChange={this.handleUserNameChange}/>
                        <Form.Text className="text-muted">
                            Be as unique as possible!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </Form.Group>

                    {/* <div className="row">
                        <Button variant="success" onClick={this.handleSubmit} size="lg">Submit</Button>{' '}
                    </div> <br /> */}
                    <div className="row">
                        <Button variant="success" onClick={this.handleShow} size="lg">Submit</Button>{' '}
                    </div> <br />
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You can't change your Username Later.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Change Something!
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit}>
                                Create Account
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.already_user} onHide={this.handleCloseForAlrUser}>
                        <Modal.Header closeButton>
                            <Modal.Title>Username already taken</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please pick another username 😀</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseForAlrUser}>
                                Change Username!
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="row">
                        <Button variant="info" onClick={this.goBack} size="sm">I already have an account</Button>{' '}
                    </div>
                </Form>
            </div>
        );

    }
}
export default CreateUserComponent;