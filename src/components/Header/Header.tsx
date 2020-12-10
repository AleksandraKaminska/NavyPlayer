import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Login from '../Login'
import Nav from '../Nav'

const Header: React.FC = () => {
  const { Header } = Layout

  return (
    <Header className="Header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="/">
            <img src="/assets/images/logo.png" alt="navy player logo" />
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/">Explore</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/artist">Artist</Link>
        </Menu.Item>
        {/* <Nav /> */}
        {/* <Login /> */}
      </Menu>
    </Header>
  )
}

export default Header
