import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ArtistPlaylist } from './index'
import renderer from 'react-test-renderer'

describe('ArtistPlaylist', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Router>
        <ArtistPlaylist />
      </Router>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
