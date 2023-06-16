import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import Features from '../Features/features'
import Team from '../Team/Team'
import Footer from '../Footer/Footer'


const Acceuil = () => {

    return (
      <div className='Acceuil'>
        <Navbar/>
        <Home/>
        <Features/>
        <Team/>
        <Footer/>
      </div>
    )
  }
  
  export default Acceuil