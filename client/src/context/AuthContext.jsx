import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
