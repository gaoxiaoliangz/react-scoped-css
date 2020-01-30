import React from 'react'
import ReactDOM from 'react-dom'

// this style will be scoped
import './app.scoped.less'
// this style is normal
import './app.less'

const App = () => {
  return (
    <div className="app">
      <h1 className="title">less support</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
