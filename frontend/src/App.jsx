import React from 'react'
import Dashboard from './pages/Dashboard'
import Login from './components/auth/Login';
import Welcome from './components/auth/Welcome';
import Register from './components/auth/Register';
import AuthRoute from './components/auth/AuthRoute';
import { SnackbarProvider } from 'notistack';
import './App.css'
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route
            path="/notes"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
