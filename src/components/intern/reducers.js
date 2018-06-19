import {LOAD_INTERN} from "./action";

export function internReducer(state = [], action) {
    if (action.type === LOAD_INTERN) {
        return [...action.interns]
    }
    return state;
}