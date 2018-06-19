class AuthService {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    login(credential) {
        return this.axios.post(`${this.config.domain}/login`, credential);
    }

    setToken(token) {
        let key = this.config.localStorageKey.toke_auth;
        return localStorage.setItem(key, token);
    }

    getToken(){
        return localStorage.getItem(this.config.localStorageKey.toke_auth);
    }

    logout() {
        let key = this.config.localStorageKey.toke_auth;
        return localStorage.removeItem(key);
    }

    isLogin() {
        return !!this.getToken();
    }

}

export default AuthService;