import React from 'react'
import './frag.scoped.css'

const Frag = () => {
  return (
    <div>
      <React.Fragment>
        <div className="test-frag"></div>
      </React.Fragment>
      <>
        <div>text</div>
      </>
    </div>
  )
}

export default Frag
