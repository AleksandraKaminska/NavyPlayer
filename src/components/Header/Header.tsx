import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Row, Col, Space } from 'antd'
import Login from '../Login/Login'
import Search from '../Search/SearchInput'
import './Header.less'

const Header = () => {
  return (
    <Layout.Header className="Header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row justify="space-between">
        <Col>
          <Space>
            <Link to="/">
              <img src="/assets/images/logo.png" alt="navy player logo" />
            </Link>
            <Menu className="menu" mode="horizontal" selectedKeys={[location.pathname]}>
              <Menu.Item key="/">
                <Link to="/">Explore</Link>
              </Menu.Item>
              <Menu.Item key="/artist">
                <Link to="/artist">Artist</Link>
              </Menu.Item>
            </Menu>
          </Space>
        </Col>
        <Col className="align-center" span={8}>
          <Search />
        </Col>
        <Col>
          <Login />
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
