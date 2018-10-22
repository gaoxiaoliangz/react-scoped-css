import React from 'react'
import './SubTitle.scoped.css'

const SubTitle = props => {
  return (
    <div className="sub-title">
      <i />
      <p>{props.content}</p>
    </div>
  )
}

export default SubTitle
