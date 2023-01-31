import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'components/Button';
import Input from 'components/Input';
import formValidator from 'helpers/formValidator';
import cookie from 'helpers/cookie';
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

const AuthFormTextItem = ({label, name, errors, required=false, type='text', value, onInput}) => 
(<label className="auth-form-item">
    <span className="auth-form-item__label auth-form-item__label--required">{label}</span>
    <Input
        className="auth-form-item__input"
        name={name}
        required={required}
        type={type}
        valid={errors.length === 0}
        value={value}
        onInput={onInput}
    />
    {errors.length > 0 && 
        errors.length === 1 ? <span className="auth-form-item__error">{errors[0]}</span> :
        <ul className="auth-form-item__errors">
            {errors.map((error, i) => <li className="auth-form-item__error" key={i}>{error}</li>)}
        </ul>
    }
</label>);

const AuthForm = ({setUsername}) => {
    const navigate = useNavigate();
    const [fieldsData, setFieldsData] = useState(initialFieldsData);
    const [authError, setAuthError] = useState(null);

    const onFieldInput = (event) => {
        const {target: {name, value}} = event;
        const errors = fieldValidate(name, value);

        setFieldsData(prevData => ({...prevData, [name]: {value, errors}}))
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setAuthError(null);

        try {
            const response = await fetch(`/auth-user?email=${fieldsData.email.value}`, {method: 'GET'});

            if(response.status === 200) {
                const {email, token} = await response.json();

                cookie.set('token', token, 1/24);
                setUsername(email);
                navigate("/", {replace: true});
            } else {
                let error = new Error(response.statusText);

                error.response = response
                throw error
            }
        } catch(error) {
              let errorText = error.statusText;

              if(error.response) {
                const errorData = await error.response.json();
                
                errorText = errorData.error || error.response.statusText;
              }

              setAuthError(errorText)
        }
    }

    return <form id="authForm" className="auth-form" onSubmit={onSubmit}>
        <AuthFormTextItem 
            label="Email"
            name="email"
            errors={fieldsData.email.errors}
            required
            value={fieldsData.email.value}
            onInput={onFieldInput}
        />
        <AuthFormTextItem 
            label="Password"
            name="password"
            errors={fieldsData.password.errors}
            required
            type="password"
            value={fieldsData.password.value}
            onInput={onFieldInput}
        />
        {authError && <div className="auth-form__error">{authError}</div>}
        <div className="auth-form__actions">
            <Button 
                className="auth-form__action auth-form__action--submit"
                type="submit"
            >
                Sign In
            </Button>
        </div>
    </form>
}

export default AuthForm;
