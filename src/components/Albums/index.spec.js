import React from 'react'
import { Albums } from './index'
import renderer from 'react-test-renderer'

jest.mock('./albumSongs', () => 'AlbumSongs')

describe('Albums', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Albums albums={[]} />)
    expect(tree).toMatchSnapshot()
  })
})
