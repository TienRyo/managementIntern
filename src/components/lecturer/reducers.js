import {LOAD_LECTURER} from "./action";

export function lecturerReducer(state = [], action) {
    if (action.type === LOAD_LECTURER) {
        return [...action.lecturers]
    }


    return state;
}