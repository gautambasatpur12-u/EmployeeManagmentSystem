import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const login = (user) => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
