import React from 'react'
import SubTitle from './SubTitle'
import './Title.scoped.css'

const Title = ({ subTitle, children }) => {
  return (
    <div className="title">
      <p>{children}</p>
      <SubTitle>{subTitle}</SubTitle>
    </div>
  )
}

Title.propTypes = {}

export default Title
