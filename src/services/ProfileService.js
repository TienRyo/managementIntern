import jwt from 'jsonwebtoken';

class ProfileService {

    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    getProfile() {
        let token = localStorage.getItem(this.config.localStorageKey.toke_auth) || '';
        if (!token) {
            return {};
        }
        let secret = this.config.auth.authPrivateKey;
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            localStorage.removeItem(this.config.localStorageKey.toke_auth);
            return {};
        }
    }

}

export default ProfileService;