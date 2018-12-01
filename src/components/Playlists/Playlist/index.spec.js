import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Playlist } from './index'
import renderer from 'react-test-renderer'

describe('Playlist', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Router>
        <Playlist elem={{}} />
      </Router>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
