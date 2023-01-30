import './Button.css';

const Button = ({ children, className = "", disabled = false, type = "button" }) => {
    return <button 
                className={['button', className].join(' ')} 
                disabled={disabled}
                type={type}
            >
                {children}
            </button>
};

export default Button;
