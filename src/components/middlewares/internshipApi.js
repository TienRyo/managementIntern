import {ADD_INTERNSHIP, DELETE_INTERNSHIP, EDIT_INTERNSHIP, LIST_INTERNSHIP_BY_ID} from "../internship/action";
import axios                                                                       from "axios"
import config                                                                      from "../../config";

const internshipApi = store => next => action => {
    if(action.type === LIST_INTERNSHIP_BY_ID) {
        let id = action.courseId;
        return axios.get(`${config.domain}/course/${id}/internships`).then(res => next({
            type : LIST_INTERNSHIP_BY_ID,
            internships : res.data,
            course_id : id
        }))
    }
    if(action.type === ADD_INTERNSHIP) {
        let id = action.course_id;
        return axios.post(`${config.domain}/course/${id}/internship`,{
            course_id : action.course_id,
            lecturer_code : action.lecturer_code,
            company_id : action.company_id,
            deadline : action.deadline
        }).then(res => next({
            type : ADD_INTERNSHIP,
            internship : res.data,
        }))
    }
    if(action.type === EDIT_INTERNSHIP) {
        return axios.put(`${config.domain}/course/${action.course_id}/internship/${action.id}`,{
            course_id : action.course_id,
            lecturer_code : action.lecturer_code,
            company_id : action.company_id,
            deadline : action.deadline
        }).then(res => next({
            type : EDIT_INTERNSHIP,
            key_edit : action.key_edit,
            internship : res.data,
        }))
    }
    else if (action.type === DELETE_INTERNSHIP) {
        axios.delete(`${config.domain}/course/${action.course_id}/internship/${action.id}`).then(() => next({
            type : DELETE_INTERNSHIP,
            key_delete: action.key_delete
        }))
    }
    next(action);
};

export default internshipApi;