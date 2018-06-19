import BaseValidator from 'react-reactive-form/lib/validators';

function isEmptyInputValue(value) {
    return value == null || value.length === 0
}


const EMAIL_REGEXP = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEXP = /[\d-+.]*/;

export default class Validators extends BaseValidator {

    /**
     * Validator that requires controls to have a value greater than a number.
     */
    static min(min) {
        return control => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null // don't validate empty values to allow optional controls
            }
            const parsedValue = parseFloat(control.value);
            return !isNaN(parsedValue) && parsedValue < min
                ? { min: `The field must be at least ${min} actual ${parsedValue}.` }
                : null
        }
    }

    /**
     * Validator that requires controls to have a value less than a number.
     */
    static max(max) {
        return control => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null // don't validate empty values to allow optional controls
            }
            const parsedValue = parseFloat(control.value);
            return !isNaN(parsedValue) && parsedValue > max
                ? { max: `The field may not be greater than ${max} actual ${parsedValue}.` }
                : null
        }
    }

    /**
     * Validator that requires controls to have a non-empty value.
     */
    static required(control) {
        return isEmptyInputValue(control.value) ? { required: 'The field is required.' } : null
    }

    static number(control) {
        return (!isNaN(parseFloat(control.value)) && isFinite(control.value)) ? null : { number: 'The field must be number.' }
    }

    /**
     * Validator that performs email validation.
     */
    static email(control) {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return EMAIL_REGEXP.test(control.value) ? null : { email: `The field must be a valid email address.` }
    }

    /**
     * Validator that requires controls to have a value of a minimum length.
     */
    static minLength(minLength) {
        return control => {
            if (isEmptyInputValue(control.value)) {
                return null // don't validate empty values to allow optional controls
            }
            const length = control.value ? control.value.length : 0;
            return length < minLength
                ? { minLength: `The field must be at least ${minLength} characters actual ${length}.` }
                : null
        }

    }

    /**
     * Validator that requires controls to have a value of a maximum length.
     */
    static maxLength(maxLength) {
        return control => {
            const length = control.value ? control.value.length : 0;
            return length > maxLength
                ? { maxLength: `The field may not be greater than ${maxLength} characters actual ${length}.` }
                : null
        }
    }

    /**
     * validator that requires controls to have a value with type boolean
     */

    static boolean(){
        return control => {
            return (typeof control === 'boolean')
                ? {boolean: 'The field must be boolean'}
                : null
        }
    }

    static phone(control) {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return PHONE_REGEXP.test(control.value) ? null : { email: `The field must be a valid phone number.` }
    }

}