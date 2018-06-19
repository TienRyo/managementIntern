class InternService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getInterns() {
        return this.axios.get(`${this.config.domain}/interns`);
    }
    getIntern(id) {
        return this.axios.get(`${this.config.domain}/intern/${id}`);
    }
    putIntern(id, data) {
        return this.axios.put(`${this.config.domain}/intern/${id}`, data);
    }
    postIntern(id, data) {
        return this.axios.post(`${this.config.domain}/intern`, data);
    }
    deleteIntern(id) {
        return this.axios.delete(`${this.config.domain}/intern/${id}`);
    }
    importFile(data) {
        return this.axios.post(`${this.config.domain}/import/interns`, data);
    }
}

export default InternService;
