import { useOutletContext } from "react-router-dom";
import AuthForm from "components/AuthForm";
import './Auth.css';

const Auth = () => {
    const [setUsername] = useOutletContext();
    
    return <div className="auth">
        <div className="auth__content">
            <AuthForm setUsername={setUsername} />
        </div>
    </div>
}

export default Auth;
