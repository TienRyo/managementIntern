import axios           from "axios"
import {LOAD_LECTURER} from "../lecturer/action";
import config          from "../../config";
const lecturerApi = store => next => action => {
    if(action.type === LOAD_LECTURER) {
        return axios.get(`${config.domain}/lecturers`).then(res => next({
            type : LOAD_LECTURER,
            lecturers : res.data
        }))
    }
    next(action);
};

export default lecturerApi;