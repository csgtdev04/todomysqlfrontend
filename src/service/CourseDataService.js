import axios from 'axios'

// const COURSE_API_URL = 'http://localhost:8080'
const COURSE_API_URL = 'http://todoappc11-env.eba-h3k9p9w3.us-east-2.elasticbeanstalk.com'


class CourseDataService {
    //POST
    createItem(course) {
        return axios.post(`${COURSE_API_URL}/addCourse`, course);
    }

    createUser(user) {
        return axios.post(`${COURSE_API_URL}/createUser`, user)
    }
    //GET
    
    //OPTIONAL Methods
    // getAllItems() {
    //     return axios.get(`${COURSE_API_URL}/courses`);
    // }
    // getItemById(id) {
    //     return axios.get(`${COURSE_API_URL}/courseById/${id}`);
    // }
    // getItemByName(name) {
    //     return axios.get(`${COURSE_API_URL}/courseByName/${name}`);
    // }

    //To validate if User Exists
    getUserByUsername(username, password) {
        console.log("IN AXIOS " + username);
        console.log("IN AXIOS " + password);
        return axios.get(`${COURSE_API_URL}/login/${username}/${password}`)
            .catch(error => {
                console.log(error.response)
            });
    }

    //To get User's todos
    getCoursesByUsername(username) {
        return axios.get(`${COURSE_API_URL}/listCourseByUsername/${username}`)
            .catch(error => {
                console.log(error.response)
            });
    }

    //PUT
    updateItem(course) {
        return axios.put(`${COURSE_API_URL}/update`, course);
    }

    //DELETE
    deleteItemById(id) {
        return axios.delete(`${COURSE_API_URL}/delete/${id}`)
    }
}

export default new CourseDataService();