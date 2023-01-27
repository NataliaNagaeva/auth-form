import { useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import formValidator from 'helpers/formValidator';
import './AuthForm.css';

const fieldValidate = formValidator([
    {
        name: 'email', 
        isEmail: true 
    },
    {
        name: 'password',
        minLength: 3,
        maxLength: 16
    }
]);

const initialFieldsData = {
    email: {value: '', errors: []}, 
    password: {value: '', errors: []}
};

const AuthForm = ({onSignIn}) => {
    const [fieldsData, setFieldsData] = useState(initialFieldsData);

    const onFieldInput = (event) => {
        const {target: {name, value}} = event;
        const [isValid, errors] = fieldValidate(name, value);

        setFieldsData(prevData => ({...prevData, [name]: {value, errors}}))
        console.log(isValid, errors);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`/auth-user?email=${fieldsData.email.value}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => console.log('data', data))
            .catch(error => console.log('error', error));
    }

    return <form id="authForm" className="auth-form" onSubmit={onSubmit}>
        <label className="auth-form__item">
            <span className="auth-form__label auth-form__label--required">Email</span>
            <Input
                className='auth-form__input'
                name="email"
                placeholder="example@mail.com"
                required
                type="email"
                valid={fieldsData.email.errors.length === 0}
                value={fieldsData.email.value}
                onInput={onFieldInput}
            />
        </label>
        <label className="auth-form__item">
            <span className="auth-form__label auth-form__label--required">Password</span>
            <Input
                className='auth-form__input'
                name="password"
                required
                type="password"
                valid={fieldsData.password.errors.length === 0}
                value={fieldsData.password.value}
                onInput={onFieldInput}
            />
        </label>
        <div className="auth-form__actions">
            <Button 
                className='auth-form__action auth-form__action--submit' 
                type="submit"
            >
                Sign In
            </Button>
        </div>
    </form>
}

export default AuthForm;
