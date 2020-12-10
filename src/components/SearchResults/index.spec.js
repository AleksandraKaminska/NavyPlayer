import React from 'react'
import { SearchResults } from './index'
import renderer from 'react-test-renderer'

describe('SearchResults', () => {
  it('should render self', () => {
    const rendered = renderer.create(<SearchResults />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
