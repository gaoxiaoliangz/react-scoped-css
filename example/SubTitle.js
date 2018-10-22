import React from 'react'
import './SubTitle.scoped.css'

const SubTitle = props => {
  return (
    <div className="title">
      <i />
      <p>{props.children}</p>
    </div>
  )
}

export default SubTitle
