import React from 'react'
import './Title.scoped.css'

const Title = props => {
  return (
    <h1 className="title">
      <p>{props.children}</p>
    </h1>
  )
}

export default Title
