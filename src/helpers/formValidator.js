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

const getError = (fieldName, message) => ({fieldName, message})

/* 
errors 

[{fieldName: 'fieldName or `general`', message: 'error text'}]

*/

const formValidator = (fields) => {
    return (fieldName, fieldValue) => {
        const validateField = fields.find(item => item.name === fieldName);

        // Don't check if the field is unknown
        if(validateField === undefined) {
            return [true, []];
        }

        const errors = [];
        let isValid = true;

        if(validateField.isEmail && !isEmailValid(fieldValue)) {
           isValid = false; 
           errors.push(getError(fieldName, 'Invalid email'));
        }

        if(validateField.minLength && !isMinLengthValid(fieldValue, validateField.minLength)) {
            isValid = false;
            errors.push(getError(fieldName, `Min length is ${validateField.minLength}`));
        }
        
        if(validateField.maxLength && !isMaxLengthValid(fieldValue, validateField.maxLength)) {
            isValid = false;
            errors.push(getError(fieldName,`Max length is ${validateField.maxLength}`));
        }

        return [isValid, errors];
    }
}

export default formValidator;
