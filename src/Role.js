import {authService, profileService} from './services';
import config                        from './config';

class Role {
    static getCurrentRole() {
        let profile = profileService.getProfile();
        let role    = profile.role;
        if (authService.isLogin()) {
            if (role === config.role.ADMIN) {
                return config.role.ADMIN
            }
            if (role === config.role.INTERN) {
                return config.role.INTERN
            }
            if (role === config.role.LECTURER) {
                return config.role.LECTURER
            }
        }
        return config.role.GUEST;
    }
}

export default Role;