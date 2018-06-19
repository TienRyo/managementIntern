import axios  from 'axios';
import config from '../config';

import AuthService         from "./AuthService";
import SliderBarService    from "./SliderBarService";
import ProfileService      from "./ProfileService";
import MenuUserService     from "./MenuUserService";
import CourseService       from "./CourseService";
import InternshipService   from "./InternshipService";
import LecturerService     from "./LecturerService";
import InternService       from "./InternService";
import AreaService         from "./AreaService";
import RegistrationService from "./RegistrationService";
import CompanyService      from "./CompanyService";

axios.interceptors.request.use(axiosConfig => {
    //TODO add token here
    //bla bla
    return axiosConfig;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && +error.response.status === 403) {
            return window.location.reload();
        }
        return Promise.reject(error.response);
    }
);

export let authService           = new AuthService(axios, config);
export let sliderBarMenuService  = new SliderBarService(axios, config);
export let menuUserService       = new MenuUserService(axios, config);
export let profileService        = new ProfileService(axios, config);
export let courseService = new CourseService(axios, config);
export let internshipService = new InternshipService(axios, config);
export let lecturerService = new LecturerService(axios, config);
export let internService = new InternService(axios, config);
export let CompanyEditorService = new CompanyService(axios, config);
export let areaService = new AreaService(axios, config);
export let registrationService = new RegistrationService(axios, config);

