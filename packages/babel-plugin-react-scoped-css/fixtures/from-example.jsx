import React from 'react'
import styled from 'styled-components'
import styles from './Content.scoped.scss'
import Grid from './Grid'
import GridForwardProps from './GridForwardProps'

const Text = styled.div`
  color: #666;
`

const FromExample = props => {
  return (
    <div className="content">
      <h3>Styling html tags</h3>
      <p>p tag with style</p>

      <React.Fragment>
        <div>
          <p>content wrapped with React Fragment should be fine</p>
        </div>
      </React.Fragment>

      <h3>Using classes</h3>
      <div className="grid" />
      <div className="grid" />

      <h3>Styling child components with css modules</h3>
      <Grid className={styles.grid} />
      <Grid className={styles.grid} />

      <h3>Styling child components which forward data-v attributes to its root element</h3>
      <GridForwardProps className="content-grid" />
      <GridForwardProps className="content-grid" />

      <h3>Styling with styled-components</h3>
      <Text className="text">Some content in styled-components</Text>
    </div>
  )
}

export default Content
