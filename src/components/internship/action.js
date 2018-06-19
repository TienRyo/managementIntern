export const LOAD_INTERNSHIP = "loadInternship";
export const ADD_INTERNSHIP = "ADD_INTERNSHIP";
export const DELETE_INTERNSHIP = "DELETE_INTERNSHIP";
export const EDIT_INTERNSHIP = "EDIT_INTERNSHIP";
export const LIST_INTERNSHIP_BY_ID = "listInternshipById";


export function listInternshipById(id) {
    return {
        type : LIST_INTERNSHIP_BY_ID,
        courseId : id
    }
}

export function loadInternship() {
    return {
        type : LOAD_INTERNSHIP,
    }
}
export function addInternship(course_id, lecturer_code, company_id, deadline) {
    return {
        type : ADD_INTERNSHIP,
        course_id : course_id,
        lecturer_code : lecturer_code,
        company_id : company_id,
        deadline : deadline
    }
}export function editInternship(course_id,internships_id, lecturer_code, company_id, deadline, key_edit) {
    return {
        type : EDIT_INTERNSHIP,
        course_id : course_id,
        id: internships_id,
        lecturer_code : lecturer_code,
        company_id : company_id,
        deadline : deadline,
        key_edit : key_edit,
    }
}
export function deleteInternship(id,key_delete) {
    return {
        type        : DELETE_INTERNSHIP,
        id          : id,
        key_delete  : key_delete
    }
}