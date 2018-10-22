import React from 'react'
import SubTitle from './SubTitle'
import './Title.scoped.css'

const Title = props => {
  return (
    <div className="title" width="100">
      <div className="title" width="100" />
      {props.content}
      <SubTitle />
    </div>
  )
}

Title.propTypes = {}

export default Title
