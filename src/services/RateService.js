class RateService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getAll() {
        return this.axios.get(`${this.config.domain}/rates`);
    }
    importFile(data) {
        return this.axios.post(`${this.config.domain}/import/rate`, data);
    }
}

export default RateService;
