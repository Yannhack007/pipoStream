import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Acceuil from './Acceuil/Acceuil'
import './App.css'
import { themeContext } from './Context'
import Login from './Login/Login'
import RoomPage from './Room/Room'
import Signin from './Signin/Signin'
import Starting from './Starting/Starting'

const App = () => {
  const theme=useContext(themeContext);
  const darkMode=theme.state.darkMode;
  return (
    <div className='App' 
    style={{
      background: darkMode? 'black':'',
      color: darkMode? 'white':''
    }}>
      
      <Routes>
        <Route path='/' 
        element={<Acceuil/>}
        />
        <Route path='/Signin' 
        element={<Signin/>}
        />
        <Route path='/Starting' 
        element={<Starting/>}
        />
        <Route path='/Login' 
        element={<Login/>}
        />
        <Route path='/room/:roomId' 
        element={<RoomPage/>}
        />
      </Routes>
    </div>
  )
}

export default App