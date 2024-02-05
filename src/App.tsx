import React from 'react';
import axios from 'axios';
import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { AlertProvider } from './context/AlertProvider';
import { LoadingProvider } from './context/LoadingProvider';
import AppRoutes from './AppRoutes';

const App = () => {
  axios.defaults.withCredentials = true;

  return (
    <AuthProvider>
      <AlertProvider>
        <LoadingProvider>
          <AppRoutes />
        </LoadingProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
