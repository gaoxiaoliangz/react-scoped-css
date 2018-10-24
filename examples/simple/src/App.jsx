// @ts-check
import React from 'react'
import Header from './Header'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Header title="React scoped CSS">header content</Header>
      <p>content color should be #666</p>
    </div>
  )
}

export default App
