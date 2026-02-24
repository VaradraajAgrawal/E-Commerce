import { useContext, useEffect, createContext, useState } from "react";
import { api } from "../services/api";

const authCon = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const restoreUser = async () => {
  //     try {
  //       const data = await api("/practise/who");
  //       setUser(data);
  //     } catch {
  //       localStorage.removeItem("token");
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   restoreUser();
  // }, []);

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api("/practise/who");
        // Ensure data exists and isn't an empty object
        if (data && Object.keys(data).length > 0) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreUser();
  }, []);

  const login = (token, data) => {
    localStorage.setItem("token", token);
    setUser(data);
  };

  // 2. Added logout so it's actually usable
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    // 3. Added logout to the value object
    <authCon.Provider value={{ user, loading, login, logout }}>
      {children}
    </authCon.Provider>
  );
};

// 4. Wrapped useContext in a function (a custom hook)
export const useAuth = () => useContext(authCon);
