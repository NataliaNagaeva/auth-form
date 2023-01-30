/* fields type:
        {
            name: string;
            isEmail?: boolean;
            maxLength?: number;
            minLength?: number;
            required?: boolean;
        }[]
*/

const isEmailValid = (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

const isMaxLengthValid = (value, limit) => value.length <= limit;
  
const isMinLengthValid = (value, limit) => value.length >= limit;

const formValidator = (fields) => {
    return (fieldName, fieldValue) => {
        const validateField = fields.find(item => item.name === fieldName);

        // Don't check if the field is unknown
        if(validateField === undefined) {
            return [true, []];
        }

        const errors = [];

        if(validateField.isEmail && !isEmailValid(fieldValue)) {
           errors.push('Invalid email');
        }

        if(validateField.minLength && !isMinLengthValid(fieldValue, validateField.minLength)) {
            errors.push(`Min length is ${validateField.minLength}`);
        }
        
        if(validateField.maxLength && !isMaxLengthValid(fieldValue, validateField.maxLength)) {
            errors.push(`Max length is ${validateField.maxLength}`);
        }

        return errors;
    }
}

export default formValidator;
