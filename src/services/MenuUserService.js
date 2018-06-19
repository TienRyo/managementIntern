import Role from "../Role";

let MENU_ADMIN  = [
    {
        name: 'Setting',
        icon: '',
        path: '/setting'
    },
    {
        name: 'Edit profile',
        icon: '',
        path: '/edit-profile'
    }
];
let MENU_INTERN = [
    {
        name: 'Setting',
        icon: '',
        path: '/setting'
    },
    {
        name: 'Edit profile',
        icon: '',
        path: '/edit-profile'
    }
];
let MENU_LECTURER = [
    {
        name: 'Setting',
        icon: '',
        path: '/setting'
    },
    {
        name: 'Edit profile',
        icon: '',
        path: '/edit-profile'
    }
];

class MenuUserService {
    constructor(axios, config) {
        this.config = config;
    }

    getMenu() {
        switch (Role.getCurrentRole()) {
            case this.config.role.ADMIN:
                return MENU_ADMIN;
            case this.config.role.INTERN:
                return MENU_INTERN;
            case this.config.role.LECTURER:
                return MENU_LECTURER ;
            default:
                return [];
        }
    }

}

export default MenuUserService;