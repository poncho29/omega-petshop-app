import { createContext, useCallback, useMemo, useState } from "react";

const OMEGA_PETSHOP_TOKEN = 'x-token';
const OMEGA_PETSHOP_USER = 'omega_user';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  // Guarda el token y el usuario en localStorage
  const [auth, setAuth] = useState(localStorage.getItem(OMEGA_PETSHOP_TOKEN) ?? false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(OMEGA_PETSHOP_USER)) ?? null);

  const login = useCallback((data) => {
    localStorage.setItem(OMEGA_PETSHOP_TOKEN, data.token);
    localStorage.setItem(OMEGA_PETSHOP_USER, JSON.stringify(data.user));
    setAuth(true);
    setUser(data.user)
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(OMEGA_PETSHOP_TOKEN);
    localStorage.removeItem(OMEGA_PETSHOP_USER);
    setAuth(false);
    setUser(null);
  }, []);

  const data = useMemo(() => ({auth, user, login, logout}), [auth, user, login, logout]);

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
export default AuthContext;