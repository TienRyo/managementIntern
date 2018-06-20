class MailSercive {
    constructor(axios, config) {
        this.axios  = axios;
        this.config = config;
    }

    sendMailLecturer() {
        return this.axios.post(`${this.config.domain}/send-code`);
    }
    sendMailIntern() {
        return this.axios.post(`${this.config.domain}/send-mail`);
    }
}

export default MailSercive;
