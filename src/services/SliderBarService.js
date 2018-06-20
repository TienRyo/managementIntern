import Role from '../Role';

const SLIDER_BAR_MENU_ADMIN = [
    {
        path : '/course-list',
        label: 'Course List',
        // icon : 'home'
    },{
        path : '/company-list',
        label: 'Company List',
        // icon : 'home'
    },{
        path : '/lecturer-list',
        label: 'Lecturer List',
        // icon : 'home'
    },{
        path : '/intern-list',
        label: 'Intern List',
        // icon : 'home'
    },{
        path : '/council-list',
        label: 'Council List',
        // icon : 'home'
    },{
        path : '/registration-list',
        label: 'Registration List',
        // icon : 'home'
    },{
        path : '/rates',
        label: 'Rates',
        // icon : 'home'
    }
];

const SLIDER_BAR_MENU_LECTURER = [
    {
        path : '/course-list',
        label: 'Course List',
        // icon : 'home'
    },{
        path : '/company-list',
        label: 'Company List',
        // icon : 'home'
    },{
        path : '/lecturer-list',
        label: 'Lecturer List',
        // icon : 'home'
    },{
        path : '/intern-list',
        label: 'Intern List',
        // icon : 'home'
    },{
        path : '/council-list',
        label: 'Council List',
        // icon : 'home'
    },{
        path : '/registration-list',
        label: 'Registration List',
        // icon : 'home'
    },{
        path : '/area-list',
        label: 'Area List',
        // icon : 'home'
    },
    {
        path : '/rates',
        label: 'Rates',
        // icon : 'home'
    }
];

const SLIDER_BAR_MENU_INTERN = [
    {
        path : '/courses',
        label: 'Courses',
        // icon : 'home'
    },{
        path : '/companies',
        label: 'Companies',
        // icon : 'home'
    },{
        path : '/lecturer-list',
        label: 'Lecturers',
        // icon : 'home'
    },{
        path : '/rates',
        label: 'Rates',
        // icon : 'home'
    }
];


class SliderBarService {
    constructor(axios, config) {
        this.config = config;
    }

    getMenu() {
        switch (Role.getCurrentRole()) {
            case this.config.role.ADMIN:
                return SLIDER_BAR_MENU_ADMIN;
            case this.config.role.INTERN:
                return SLIDER_BAR_MENU_INTERN;
            case this.config.role.LECTURER:
                return SLIDER_BAR_MENU_LECTURER;
            default:
                return [];
        }
    }

}

export default SliderBarService;



