import WelcomePage from './pages/WelcomePage'
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import NewProject from './pages/NewProject';
import { Route, Routes } from 'react-router-dom';
import {ProSidebarProvider} from 'react-pro-sidebar';
import {useSelector} from 'react-redux';

import './App.css'


function App() {
  const user = useSelector((state) => state.user.user?.username);

  return (
    <>
<ProSidebarProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage/*" element={user ? <HomePage /> : <Login />} />
      
      </Routes>
    </ProSidebarProvider>
    </>
  )
}

export default App
