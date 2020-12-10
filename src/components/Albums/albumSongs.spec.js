import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AlbumSongs } from './albumSongs'
import renderer from 'react-test-renderer'

describe('AlbumSongs', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Router>
        <AlbumSongs album={{}} track={{}} />
      </Router>
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
