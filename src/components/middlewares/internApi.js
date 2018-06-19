import axios         from "axios"
import {LOAD_INTERN} from "../intern/action";
import config        from "../../config";
const internApi = store => next => action => {
    if(action.type === LOAD_INTERN) {
        return axios.get(`${config.domain}/interns`).then(res => next({
            type : LOAD_INTERN,
            interns : res.data
        }))
    }
    next(action);
};

export default internApi;