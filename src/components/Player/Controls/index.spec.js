import React from 'react'
import { Controls } from './index'
import Forward from './forward'
import Rewind from './rewind'
import renderer from 'react-test-renderer'

jest.mock('./forward', () => 'Forward')
jest.mock('./rewind', () => 'Rewind')

describe('Controls', () => {
  it('Controls renders correctly', () => {
    const tree = renderer.create(<Controls />)
    expect(tree).toMatchSnapshot()
  })
})

describe('Forward', () => {
  it('Forward renders correctly', () => {
    const tree = renderer.create(<Forward />)
    expect(tree).toMatchSnapshot()
  })
})

describe('Rewind', () => {
  it('Rewind renders correctly', () => {
    const tree = renderer.create(<Rewind />)
    expect(tree).toMatchSnapshot()
  })
})
