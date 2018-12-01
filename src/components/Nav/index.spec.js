import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './index'
import renderer from 'react-test-renderer'

describe('Nav', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Router>
        <Nav />
      </Router>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
