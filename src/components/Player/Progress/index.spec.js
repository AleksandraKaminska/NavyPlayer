import React from 'react'
import Progress from './index'
import renderer from 'react-test-renderer'

describe('Progress', () => {
  it('should render self', () => {
    const rendered = renderer.create(<Progress />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
