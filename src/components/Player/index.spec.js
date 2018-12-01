import React from 'react'
import Player from './index'
import renderer from 'react-test-renderer'

jest.mock('./Controls', () => 'Controls')
jest.mock('./Progress', () => 'Progress')
jest.mock('./Volume', () => 'Volume')
jest.mock('./SmallCover', () => 'SmallCover')

describe('Player', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Player />)
    expect(tree).toMatchSnapshot()
  })
})
