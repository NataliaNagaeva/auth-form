import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './App.css';

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="app__header">
        {isAuthorized ? <div>Hi, USER_NAME</div> :
        <button type="button" onClick={() => { navigate("/auth"); }}>
          Sign In
        </button>
        }
      </header>
      <div className="app__detail">
        <Outlet />
      </div>
    </div>
  )
};

export default App;
