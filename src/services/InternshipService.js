class InternshipService{
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }
    getInternship(idCourse) {
        return this.axios.get(`${this.config.domain}/course/${idCourse}/internships`);
    }
}

export default InternshipService;
