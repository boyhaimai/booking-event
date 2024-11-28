import React, { createContext, useEffect, useState } from "react";

import * as logoutService from "~/service/logOutService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    const id = localStorage.getItem("userId");

    setIsAuth(!!token);
    setUserId(id);
  }, []);

  const login = (token, id) => {
    localStorage.setItem("tokens", token); // Lưu token vào localStorage
    localStorage.setItem("userId", id); // Lưu userId vào localStorage

    setIsAuth(true);
    setUserId(id);
  };

  const logOut = async () => {
    try {
      const tokenString = localStorage.getItem("tokens");
      const tokens = tokenString ? JSON.parse(tokenString) : {};
  
      if (tokens.refreshToken) {
        await logoutService.logOutFromServer(tokens.refreshToken); // Gửi Refresh Token lên server để xóa
      }
  
      // Xóa token khỏi localStorage
      localStorage.removeItem("tokens");
      localStorage.removeItem("userId");
  
      setIsAuth(false);
      setUserId(null);
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const value = {
    isAuth,
    userId,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
