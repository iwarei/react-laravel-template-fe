import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteAuthGuard } from './RouteAuthGuard';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { ErrorPage } from './components/pages/ErrorPage';
import { AuthProvider } from './context/AuthProvider';
import { ForgotPassword } from './components/pages/ForgotPassword';
import { ResetPassword } from './components/pages/ResetPassword';

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={
              <RouteAuthGuard redirect="/login">
                <Home />
              </RouteAuthGuard>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="password-reset/*" element={<ResetPassword />} />
          <Route path="dashboard" element={<ErrorPage message="dashboard" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
