export const ADD_COURSE             = "addCourse";
export const DELETE_COURSE          = "deleteCourse";
export const EDIT_COURSE            = "editCourse";
export const CHECKED_COURSE         = 'checkCOURSE';
export const DELETE_COURSE_CHECKED  = 'deleteCheckCOURSE';
export const LOAD_COURSE            = 'loadCourse';
export const ID_COURSE              = 'idCourse';
export const STATUS_COURSE          = 'STATUS_COURSE';

export function ChangeStatusCourse(id, index) {
    return {
        type : STATUS_COURSE,
        id : id,
        index : index
    }

}
export function idCourse(id) {
    return {
        type : ID_COURSE,
        id   : id
    }
}
export function addCourse(name, startDate, endDate) {
    return {
        type        : ADD_COURSE,
        name        : name,
        startDate   : startDate,
        endDate     : endDate,
    }
}

export function loadCourse() {
    return {
        type : LOAD_COURSE
    }
}

export function deleteCourseChecked() {
    return {
        type        : DELETE_COURSE_CHECKED
    }
}
export function deleteCourse(id, course_id, key_delete) {
    return {
        type        : DELETE_COURSE,
        course_id   : course_id,
        id          : id,
        key_delete  : key_delete
    }
}

export function editCourse(id, name, startDate, endDate, status, key) {
    return {
        type        : EDIT_COURSE,
        id          : id,
        name        : name,
        startDate   : startDate,
        endDate     : endDate,
        status : status,
        key_edit    : key
    }
}

export function checkedCourse(id, checked) {
    return {
        type: CHECKED_COURSE,
        checked: checked,
        id: id
    }
}
