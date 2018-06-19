import {profileService} from '../services';

const LOGIN  = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
    credential: profileService.getProfile(),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {credential: action.credential};
        case LOGOUT:
            return {credential: {}};
        default:
            return state;
    }
};


export const login = () => {
    return {
        type      : LOGIN,
        credential: profileService.getProfile()
    }
};

export const logout = () => {
    return {
        type      : LOGOUT,
        credential: {},
    }
};