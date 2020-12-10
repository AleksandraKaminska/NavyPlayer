import React from 'react'
import { Volume } from './index'
import renderer from 'react-test-renderer'

describe('Volume', () => {
  it('should render self', () => {
    const rendered = renderer.create(<Volume />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
