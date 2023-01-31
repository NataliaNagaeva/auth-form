import { useEffect, useState } from "react";
import './Input.css';

const generateClasses = (isValid, additionalClassName) => {
    const classes = ['input'];

    if(!isValid) {
        classes.push('input--invalid');
    }

    if(additionalClassName) {
        classes.push(additionalClassName);
    }

    return classes.join(' ');
} 

const Input = ({className = "", type="text", name="", placeholder="", required=false, onInput = null, value = undefined, valid = true }) => {
    const [classes, setClasses] = useState(generateClasses(valid, className));

    useEffect(() => {
        setClasses(generateClasses(valid, className));
    }, [valid, className]);

    
    const handleOnInput = (event) => {
        if (onInput !== null & typeof onInput === 'function') {
            onInput(event);
        } 
    }

    return <input 
                className={classes}
                name={name} 
                placeholder={placeholder} 
                required={required}
                type={type} 
                value={value}
                onInput={handleOnInput}
            />
}

export default Input;
