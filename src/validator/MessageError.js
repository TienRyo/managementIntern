class MessageError {

    static required(name) {
        return `${name} is not required!`
    }

    static invalid(field) {
        return `Invalid ${field}!`
    }

    static minLength(field, number) {
        return `${field} must be at least ${number} characters long.`
    }

    static maxLength(field, number) {
        return `${field} should be less than ${number} characters.`
    }


}

export default MessageError;