import './Button.css';

const Button = ({children, className = "", type="button"}) => {
    return <button 
                className={['button', className].join(' ')} 
                type={type}
            >
                {children}
            </button>
};

export default Button;
