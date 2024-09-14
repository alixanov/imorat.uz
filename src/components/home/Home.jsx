import React from 'react'
import "./home.css"
import { InputSearch, Navbar, MinimalSlider } from "../../page"
import {Ad} from '../'

const Home= () => {
  return (
    <div className='home__container'>
      <Navbar />
      <hr style={{backgroundColor:"white",width:"100%"}} />
      <InputSearch />
      <MinimalSlider />
      <Ad />
  
    </div>
  )
}

export default Home
