import {CREATE_AREA, LOAD_AREA} from "./action";

export function areaReducer(state = [], action) {
    switch (action.type) {
        case LOAD_AREA :
            return [...action.areas];
        case CREATE_AREA:
            return [...state, {...action.area}];
        default:
            return [...state]
    }
}