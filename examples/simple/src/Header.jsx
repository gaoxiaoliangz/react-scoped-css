// @ts-check
import React from 'react'
import Title from './Title'
import './Header.scoped.scss'

const Header = ({ title, children }) => {
  return (
    <header className="header">
      <Title>{title}</Title>
      <p>{children}</p>
    </header>
  )
}

export default Header
