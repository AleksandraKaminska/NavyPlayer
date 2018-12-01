import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Login } from './index'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() })

describe('Login', () => {
  it('should render self', () => {
    const rendered = renderer.create(
      <Login track={{}} flow={[]} chosenPlaylist={0} />
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})

describe('>>>Login --- Shallow Render REACT COMPONENTS', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Login track={{}} flow={[]} chosenPlaylist={0} />)
  })

  it('+++ contains button', () => {
    expect(wrapper.find('button.login').exists()).toBe(true)
  })
})
