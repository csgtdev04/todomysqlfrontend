import { Component } from 'react'
import CourseDataService from '../service/CourseDataService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user_fail_login: false
        }

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleUserNameChange(e) {
        this.setState({ username: e.target.value })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }
    createAccount() {
        this.props.history.push("/createUser");
    }
    handleSubmit() {
        console.log("U: " + this.state.username);
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log("User obj " + user.username + user.password)        
        CourseDataService.getUserByUsername(user.username, user.password)
            .then(
                (getResponse) => {
                    if (getResponse === undefined) {
                        // alert("Undefined");
                        this.setState({user_fail_login : true})
                    }
                    else {
                        let data = getResponse.data;
                        console.log(data);

                        if (data === false) { //no user
                            // alert("Invalid Credentials");
                            this.setState({user_fail_login : true})
                        } else {
                            console.log("Reached")
                            this.props.history.push(`/listCourseByUsername/${this.state.username}`);
                        }
                    }
                }
            )
    }

    handleShow() {
        this.setState({user_fail_login : true});
    }
    handleClose() {
        this.setState({user_fail_login : false});
    }

    render() {
        return (
            <div className="container">
                <h2>Login Screen</h2>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={this.state.username} onChange={this.handleUserNameChange} />
                        <Form.Text className="text-muted">
                            Be as unique as possible!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </Form.Group>

                    <Button variant="success" onClick={this.handleSubmit} block>Submit</Button>{' '}
                    <Modal show={this.state.user_fail_login} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Invalid Credentials</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Our database doesn't regonize you as a user! Please re-enter credentials or Create Account!</Modal.Body>
                        {/* <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Retry!
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit}>
                                Create Account
                            </Button>
                        </Modal.Footer> */}
                    </Modal>
                    <Button variant="info" onClick={this.createAccount} block>Create Account</Button>{' '}
                </Form>
                {/* <form>
                    <label>
                        Username:
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUserNameChange} />
                    </label> <br />
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label> <br />
                    <Button variant="success" onClick={this.handleSubmit} block>Submit</Button>{' '}
                    <Button variant="info" onClick={this.createAccount} block>Create Account</Button>{' '}
                    {/* <button type="button" onClick={this.handleSubmit}>Submit</button> */}
                {/* <button type="button" onClick={this.createAccount}>Create Account</button> */}
                {/* </form> * /} */}
            </div >
        );

    }
}
export default LoginComponent;