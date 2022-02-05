import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveAppBar from './components/MenuBar';
import './App.css';

function App() {
  return (
    <>
    <ResponsiveAppBar />
        <Routes>
      <Route  path='/' element={<Home/>}></Route>
      <Route  path='/login' element={<Login/>}></Route>
      <Route  path='/register' element={<Register/>}></Route>
        </Routes>
    </>
  );
}

export default App;
