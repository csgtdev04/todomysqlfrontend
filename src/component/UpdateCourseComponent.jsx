import CourseDataService from "../service/CourseDataService";
import AccessCoursesComponent from "./AccessCoursesComponent";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

class UpdateCourseComponent extends AccessCoursesComponent {

    constructor(props) {
        super(props);
        this.state = {
            u_name: this.props.history.location.state.name,
            u_description: this.props.history.location.state.description,
            u_status: '',
            show: false,
            status_empty: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleStatusChangeOther = this.handleStatusChangeOther.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseStatus = this.handleCloseStatus.bind(this);
    }

    handleSubmit() {
        console.log("Name: " + this.state.u_name);
        console.log("Description: " + this.state.u_description);
        console.log("Status: " + this.state.u_status);

        if (this.state.u_status.length === 0) {
            this.setState({ status_empty: true })
        }

        const { match: { params } } = this.props;
        let myUpdatedTodo = {
            id: params.id,
            name: this.state.u_name, //need to get name from listComponent and autofill 
            description: this.state.u_description, //need to get description from listComponent and autofill
            status: this.state.u_status,
            username: params.username
        }
        CourseDataService.updateItem(myUpdatedTodo)
            .then(
                response => {
                    console.log(response.data)
                    this.props.history.push(`/listCourseByUsername/${params.username}`);
                }
            );
    }

    goBack() {
        const { match: { params } } = this.props;
        this.props.history.push(`/listCourseByUsername/${params.username}`)
    }

    handleNameChange(e) {
        this.setState({ u_name: e.target.value })
    }
    handleDescriptionChange(e) {
        this.setState({ u_description: e.target.value })
    }

    handleStatusChangeOther(e) {
        this.setState({ u_status: e.target.value })
    }
    handleStatusChange(status) {
        console.log("Status: " + status);
        this.setState({ u_status: status })
    }

    handleShow() {
        this.setState({ show: true })
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleCloseStatus() {
        this.setState({ status_empty: false })
    }

    render() {
        return (
            <div>
                <h2>Update TODO Here</h2>
                <Form>
                    <Form.Group controlId="formBasicImmutableName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Updated Name" id={this.state.u_id} value={this.state.u_name} onChange={this.handleNameChange} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formBasicUpdatedDescription">
                        <Form.Label>Updated Description</Form.Label>
                        <Form.Control type="text" name="description" placeholder="Updated Description" value={this.state.u_description} onChange={this.handleDescriptionChange} />
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicUpdatedStatus">
                        <Form.Label>Updated Status</Form.Label>
                        <Form.Control type="text" name="status" placeholder="Status" value={this.state.u_status} onChange={this.handleStatusChange} />
                    </Form.Group> */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status:
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item name="status" href="#start" value={this.state.u_status} onSelect={() => this.handleStatusChange("Just Started")}>Just Started</Dropdown.Item>
                            <Dropdown.Item name="status" href="#inprog" value={this.state.u_status} onSelect={() => this.handleStatusChange("In Progress")}>In Progress</Dropdown.Item>
                            <Dropdown.Item name="status" href="#almost" value={this.state.u_status} onSelect={() => this.handleStatusChange("Almost Done")}>Almost Done</Dropdown.Item>
                            <Form>
                                <Form.Group controlId="formBasicOther">
                                    <Form.Control type="text" name="other" placeholder="Other..." value={this.state.u_status} size="sm" onChange={this.handleStatusChangeOther} />
                                </Form.Group>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown> <br />

                    {/* <div className="row">
                        <Button variant="success" onClick={this.handleSubmit} size="lg">Submit</Button>{' '}
                    </div> <br /> */}
                    <div className="row">
                        <Button variant="success" onClick={this.handleShow} size="lg">Submit</Button>{' '}
                    </div> <br />
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header >
                            <Modal.Title>Want to Save Changes?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You can change your TODO later if necessary.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Fix Something!
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.status_empty} onHide={this.handleCloseStatus}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You are able to change your description. Select an entry in the drop-down menu for status.</Modal.Body>
                    </Modal>

                    <div className="row">
                        <Button variant="info" onClick={this.goBack} size="sm">Nevermind...</Button>{' '}
                    </div>
                </Form>
            </div>
        );
    }
}
export default UpdateCourseComponent;