import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveAppBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
// import AuthRoute from './utils/AuthRoute';
import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <ResponsiveAppBar />
      <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route  path='/login' element={<Login/>}></Route>
        <Route  path='/register' element={<Register/>}></Route>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
