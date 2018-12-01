import React from 'react'
import { Playlists } from './index'
import renderer from 'react-test-renderer'

describe('Playlists', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Playlists top={{}} />)
    expect(tree).toMatchSnapshot()
  })
})
