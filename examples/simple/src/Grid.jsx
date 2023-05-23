import React from 'react'
import './Grid.scoped.scss'

const Grid = (props) => {
  const { className } = props
  return <div className={`grid ${className ? className : ''}`}>{props.children}</div>
}

export default Grid
