class CouncilService{
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }
    postCouncil(data) {
        return this.axios.post(`${this.config.domain}/council`, data);
    }
}

export default CouncilService;
