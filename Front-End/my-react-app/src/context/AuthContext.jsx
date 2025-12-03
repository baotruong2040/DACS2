import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Chạy 1 lần khi F5 trang web: Kiểm tra localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    try {
        if (token && storedUser) {
            const decode = jwtDecode(token)
        
            if (decode.exp * 1000 < Date.now()) {
                console.log("token đã hết hạn");
                logout();
            }else {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        }
    } catch (error) {
        logout();    
    }
    setLoading(false);
  }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook custom để dùng nhanh ở các trang khác
export const useAuth = () => {
  return useContext(AuthContext);
};