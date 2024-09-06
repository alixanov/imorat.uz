import React from 'react'
import Main from './components/main/Main'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components'

const App = () => {
  return (
    <div>
      <Main />
      <Routes>
        {/* <Route path={"/"} element={<HomePage />} /> */}
      </Routes>
    </div>
  )
}

export default App
