class LecturerService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getLecturers() {
        return this.axios.get(`${this.config.domain}/lecturers`);
    }
    getLecturer(id) {
        return this.axios.get(`${this.config.domain}/lecturer/${id}`);
    }
    putLecturer(id, data) {
        return this.axios.put(`${this.config.domain}/lecturer/${id}`, data);
    }
    postLecturer(data) {
        return this.axios.post(`${this.config.domain}/lecturer`, data);
    }
    deleteLecturer(id) {
        return this.axios.delete(`${this.config.domain}/lecturer/${id}`);
    }
    importFile(data) {
        return this.axios.post(`${this.config.domain}/import/lecturers`, data);
    }
}

export default LecturerService;
