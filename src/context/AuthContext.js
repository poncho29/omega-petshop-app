import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);

  const handleAuth = (data) => {
    if (!data) return;

    localStorage.setItem('x-token', data.token);
    navigate('/');
    window.location.reload();
  }

  const logout = () => {
    localStorage.removeItem('x-token');
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    if(localStorage.getItem('x-token')) {
      setAuth(true);
    }
  }, []);

  const data = {auth, handleAuth, logout}

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
export default AuthContext;