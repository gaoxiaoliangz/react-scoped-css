import React from 'react'

const SubTitle = props => {
  return (
    <div className="title" width="100">
      <span className="title" width="100" />
      <i />
      title
    </div>
  )
}

const Title = props => {
  return (
    <div className="title" width="100">
      <div className="title" width="100" />
      <SubTitle />
      title
    </div>
  )
}

Title.propTypes = {}

export default Title
