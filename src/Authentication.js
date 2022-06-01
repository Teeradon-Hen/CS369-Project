import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
const { Provider } = AuthContext;
const AuthProvider = ({ children }) => {
     const navigate = useNavigate();
     const token = localStorage.getItem('token');
     const userInfo = localStorage.getItem('userInfo');
     const expiresAt = localStorage.getItem('expiresAt');
     const [authState, setAuthState] = useState({ token, expiresAt, userInfo: userInfo ? JSON.parse(userInfo) : {} });
     const setAuthInfo = ({ token, userInfo, expiresAt }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('expiresAt', expiresAt);
          setAuthState({ token, userInfo, expiresAt });
     };

     const logout = (callback) => {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          localStorage.removeItem('expiresAt');
          setAuthState({}); navigate('/');
     };
     
     const isAuthenticated = () => {


          if (!authState.token || !authState.expiresAt) {
               return false;
          }
          return (new Date().getTime() / 1000 < authState.expiresAt);
     };
     return (
          <Provider value={{
               authState,
               setAuthState: authInfo => setAuthInfo(authInfo),
               logout,
               isAuthenticated,
          }}
          >
               {children}
          </Provider>
     );
};

const useAuth = () => { return useContext(AuthContext); }
export { AuthContext, AuthProvider, useAuth };