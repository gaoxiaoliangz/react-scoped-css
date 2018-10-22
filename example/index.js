import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'

const App = () => {
  return (
    <div>
      <Title subTitle="sub title">This is a test</Title>
      content here
    </div>
  )
}

ReactDOM.render(React.createElement(App), document.getElementById('root'))
