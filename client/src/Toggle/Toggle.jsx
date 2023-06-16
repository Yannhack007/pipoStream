import React from 'react'
import './Toggle.css'
import { themeContext } from '../Context'
import { useContext } from 'react'
/*
import sun from
import moon from
*/ 

const Toggle = () => {

  const theme=useContext(themeContext)
  const darkMode=theme.state.darkMode
  
  const handleClick=()=>{
    theme.dispatch({type:'toggle'})
  }
  
  return (
    <div className="toggle">
      <span>M</span>
      <span>S</span>
      <div className="to-button"
      onClick={handleClick}
      style={darkMode? {left:'2px'}:{right:'2px'}}
      >
          
      </div>
    </div>
  )
}

export default Toggle