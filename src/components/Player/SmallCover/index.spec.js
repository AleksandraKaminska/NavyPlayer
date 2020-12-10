import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { SmallCover } from './index'
import renderer from 'react-test-renderer'

describe('SmallCover', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Router>
        <SmallCover />
      </Router>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
