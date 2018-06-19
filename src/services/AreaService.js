class AreaService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getAreas(id) {
        return this.axios.get(`${this.config.domain}/company/${id}/areas`);
    }
    postArea(name,address,id) {
        return this.axios.post(`${this.config.domain}/company/${id}/area`,{
            name : name,
            address : address,
            company_id : id
        });
    }
    deleteArea(idCompany, idArea) {
        return this.axios.delete(`${this.config.domain}/company/${idCompany}/area/${idArea}`);
    }

}

export default AreaService;
