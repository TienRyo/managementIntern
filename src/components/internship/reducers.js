import {ADD_INTERNSHIP, DELETE_INTERNSHIP, EDIT_INTERNSHIP, LIST_INTERNSHIP_BY_ID, LOAD_INTERNSHIP} from "./action";

export  function internshipReducer(state = [], action) {
    if (action.type === LOAD_INTERNSHIP) {
        return [...state]
    }
    if (action.type === LIST_INTERNSHIP_BY_ID) {
        return [...action.internships];
    }
    if(action.type === ADD_INTERNSHIP) {
        return [...state, {...action.internship}]
    }
    if(action.type === EDIT_INTERNSHIP) {
        let newState = [...state];
        newState[action.key_edit] = action.internship;
        return [...newState]
    }
    if (action.type === DELETE_INTERNSHIP) {
        const newCourse = [...state];
        newCourse.splice(action.key_delete, 1);
        return newCourse;
    }

    return state;
}