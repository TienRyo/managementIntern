class CourseService{
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }
    getCourses() {
        return this.axios.get(`${this.config.domain}/courses`);
    }
}

export default CourseService;
