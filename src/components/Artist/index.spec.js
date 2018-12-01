import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Artist } from './index'
import renderer from 'react-test-renderer'

describe('Artist', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Router>
        <Artist artist={{}} />
      </Router>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
