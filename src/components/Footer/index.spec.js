import React from 'react'
import Footer from './index'
import renderer from 'react-test-renderer'

describe('components', () => {
  describe('Footer', () => {
    it('should render self', () => {
      const rendered = renderer.create(<Footer />)
      expect(rendered.toJSON()).toMatchSnapshot()
    })
  })
})
