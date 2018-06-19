import {CREATE_AREA, LOAD_AREA} from "../company/area/action";
import axios from 'axios';
import config from '../../config';
const areaApi = store => next => action => {
    switch (action.type) {
        case LOAD_AREA :
            return axios.get(`${config.domain}/company/${action.id}/areas`).then(res => next({
                type : LOAD_AREA,
                areas : res.data
            }));
        case CREATE_AREA:
            return axios.post(`${config.domain}/company/${action.company_id}/area`,{
                company_id : action.company_id,
                name : action.name,
                address : action.address
            }).then(res => next({
                type : CREATE_AREA,
                area : res.data
            }));
        default : next(action)

    }

};

export default areaApi;