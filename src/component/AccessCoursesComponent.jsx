import { Component } from "react";
import CourseDataService from "../service/CourseDataService";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

class AccessCoursesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            name: null, 
            description: null,
            status: null,
            message: null,
        }
        this.refreshCourses = this.refreshCourses.bind(this);
        this.updateCourseClicked = this.updateCourseClicked.bind(this);
        this.addCourseClicked = this.addCourseClicked.bind(this);
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this);
        this.goBackToLoginScreen = this.goBackToLoginScreen.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        const { match: { params } } = this.props;
        CourseDataService.getCoursesByUsername(params.username)
            .then(
                response => {
                    if (response.data === undefined) {
                        console.log("New User or Finished all TODO");
                    }
                    this.setState({ courses: response.data });
                }
            )
    }

    updateCourseClicked(id, name, description) {
        const { match: { params } } = this.props;
        this.props.history.push(`/updateCourseByUsername/${params.username}/${id}`,
            { name: name, description: description }
        )
    }

    addCourseClicked() {
        const { match: { params } } = this.props;
        this.props.history.push(`/addCourseByUsername/${params.username}`);
    }

    deleteCourseClicked(id) {
        CourseDataService.deleteItemById(id)
            .then(
                response => {
                    this.setState({ message: `Deletion of course ${id} successful` })
                    this.refreshCourses();
                }
            )
    }
    goBackToLoginScreen() {
        this.props.history.push(`/login`);
    }

    render() {
        var courses_len = this.state.courses.length;
        return (
            <div className="container">
                {
                    <h4>You have {courses_len} TODOs!</h4>
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.courses.map(
                                course =>
                                    <tr key={course.id}>
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>{course.status}</td>
                                        <td><Button variant="warning" size="sm" onClick={() => this.updateCourseClicked(course.id, course.name, course.description)}>Update</Button>                        </td>
                                        <td><Button variant="primary" size="sm" onClick={() => this.deleteCourseClicked(course.id)}>Done</Button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <Button variant="primary" size="lg" onClick={this.addCourseClicked}>Add TODO</Button>
                </div> <br />
                <div className="row">
                    <Button variant="secondary" size="sm" onClick={this.goBackToLoginScreen}>Logout</Button>
                </div> <br />
                {/* Can change the max count for progress bar */}
                <div className="row">
                    <ProgressBar style={{ minWidth: 1100 }} size="lg" max="5" variant="success" now={courses_len} label={`${courses_len} left!`} />
                </div>
            </div>
        );
    }
}
export default AccessCoursesComponent;
