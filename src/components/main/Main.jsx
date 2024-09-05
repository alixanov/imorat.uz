import React from 'react'
import { GetStarted, HomePage } from '../'
import { Route, Routes } from 'react-router-dom'

const Main = () => {
  return (
    <div className='main'>
      <GetStarted />
      <Routes>
        <Route path={"/"} element={<HomePage />}/>
      </Routes>
    </div>
  )
}

export default Main
