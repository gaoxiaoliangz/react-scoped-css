import React from 'react'
import styled from 'styled-components'
import styles from './Content.scoped.scss'
import Grid from './Grid'
import GridForwardProps from './GridForwardProps'

const Text = styled.div`
  color: #666;
`

const Content = props => {
  return (
    <div className="content">
      <h3>Style html tags</h3>
      <p>p tag with style</p>

      <hr />
      <h3>The normal use case</h3>
      <div className="grid" />
      <div className="grid" />

      <h3>Style child components with css modules</h3>
      <Grid className={styles.grid} />
      <Grid className={styles.grid} />

      <h3>
        Style child components which forward data-v attributes to its root
        element
      </h3>
      <GridForwardProps className="content-grid" />
      <GridForwardProps className="content-grid" />

      <h3>Use with styled-components</h3>
      <Text className="text">Some content in styled-components</Text>
    </div>
  )
}

export default Content
