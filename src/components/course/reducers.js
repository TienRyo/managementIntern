import {
    ADD_COURSE, CHECKED_COURSE, DELETE_COURSE, DELETE_COURSE_CHECKED, EDIT_COURSE,
    LOAD_COURSE, STATUS_COURSE
} from "./actions";

export function addCourseReducer(state = [], action) {
    if (action.type === ADD_COURSE) {
        return [...state, {...action.course}];
    }

    if (action.type === DELETE_COURSE_CHECKED) {
        return state.filter(course => !course.checked);
    }

    if (action.type === LOAD_COURSE) {
        return [...action.courses]
    }

    if (action.type === DELETE_COURSE) {
        const newCourse = [...state];
        newCourse.splice(action.key_delete, 1);
        return newCourse;
    }

    if (action.type === EDIT_COURSE) {
        const newCourse = [...state];
        newCourse[action.key_edit] = action.course;
        return [...newCourse];
    }

    if (action.type === CHECKED_COURSE) {
        const newCourse = [...state,{
            id: action.id,
            checked : action.checked
        }];
        newCourse[action.id].checked = action.checked;
        return [...newCourse];
    }
    if (action.type === STATUS_COURSE) {
        const newCourse = [...state];
        newCourse[action.index] = action.course;
        return [...newCourse];
    }

    return state;
}
