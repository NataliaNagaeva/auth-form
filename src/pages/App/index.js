import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import cookie from 'helpers/cookie';
import './App.css';

const isAuthPageActive = (pathname) => pathname === '/auth';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    const token = cookie.get('token');

    if(token !== '') {
      setIsAuthorized(true);
      setUsername(window.atob(token));
    }
  }, []);  

  useEffect(() => {
    // redirect to Home page if the user have already authorized
    if(isAuthorized && isAuthPageActive(location.pathname)) {
      navigate('/', {replace: true})
    }
  }, [isAuthorized, location.pathname, navigate])

  useEffect(() => {
    setIsAuthorized(username !== null ? true : false);
  }, [username]);

  const onSignOut = () => {
    setUsername(null);
    cookie.delete('token');
  }

  // TODO move Header to a separate component
  return (
    <div className="app">
      <header className="app__header">
        {isAuthorized ? 
          <div>
            <span>Hi, {username}</span>
            <button 
              type="button"
              onClick={onSignOut}>
              Sign Out
            </button>
          </div> :
          !isAuthPageActive(location.pathname) && <button type="button"  onClick={() => { navigate("/auth"); }}>
            Sign In
          </button>
        }
      </header>
      <div className="app__detail">
        <Outlet context={[setUsername]}/>
      </div>
    </div>
  )
};

export default App;
