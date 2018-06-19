import {ADD_COMPANY, DELETE_COMPANY, DETAIL_COMPANY, EDIT_COMPANY, LOAD_COMPANY} from "./action";

export function companyReducer(state = [], action) {
    switch (action.type) {
        case LOAD_COMPANY :
            return [...action.companies];
        case ADD_COMPANY :
            return  [...state, {...action.company}];
        case EDIT_COMPANY :
            const newCompany = [...state];
            newCompany[action.key_edit] = action.company;
            return [...newCompany];
        case DELETE_COMPANY :
            const newState = [...state];
            newState.splice(action.key_delete, 1);
            return newState;
        case DETAIL_COMPANY :
            let company = [...state];
            return [{company : company[action.key], key : action.key}];
        default : return state;

    }
}