// @ts-check
import React from 'react'
import './Header.scoped.scss'

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
    </header>
  )
}

export default Header
