// @ts-check
import React from 'react'
import Header from './Header'
import './App.css'
import Content from './Content'

const App = () => {
  return (
    <div className="app">
      <Header title="React scoped CSS" />
      <Content />
    </div>
  )
}

export default App
