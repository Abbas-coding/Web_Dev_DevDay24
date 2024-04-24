import React, { useEffect } from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ActivationPage from './pages/ActivationPage';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/dashboard"
          element={
              <DashboardPage />
          }
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App
