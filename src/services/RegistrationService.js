class RegistrationService{
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getConfirmed(id) {
        return this.axios.get(`${this.config.domain}/confirmed/${id}`);
    }
    getPending(id, data) {
        return this.axios.get(`${this.config.domain}/pending/${id}`);
    }
    registration(id, data) {
        return this.axios.post(`${this.config.domain}/registration/send/${id}`, data);
    }
    confirmed(id, data) {
        return this.axios.put(`${this.config.domain}/registration/confirmed/${id}`, data);
    }
    deleteRegistration(id) {
        return this.axios.delete(`${this.config.domain}/registration/${id}`);
    }
}

export default RegistrationService;
