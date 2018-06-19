export default {
    domain         : process.env.REACT_APP_DOMAIN,
    role           : {
        ADMIN : 'admin',
        INTERN : 'intern',
        LECTURER: 'lecturer',
        GUEST : 'guest'
    },
    app            : {
        textLogo       : 'Management Intern',
        textHeaderLogin: 'Welcome to Management Intern',
    },
    localStorageKey: {
        toke_auth: 'token'
    },
    auth           : {
        authPrivateKey: process.env.REACT_APP_AUTH_PRIVATE_KEY
    }
}
