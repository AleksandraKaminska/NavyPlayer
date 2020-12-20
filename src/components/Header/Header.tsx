import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, Space } from 'antd'
import Login from '../Login/Login'
import Search from '../Search/SearchInput'
import './Header.less'

const Header = () => (
  <Layout.Header className="Header">
    <Row justify="space-between">
      <Col xs={{ span: 12 }} xl={{ span: 8 }}>
        <Space>
          <Link to="/">
            <img src="/assets/images/logo.png" alt="navy player logo" className="logo" width={156.3} height={35} />
          </Link>
        </Space>
      </Col>
      <Col className="align-center" xs={{ span: 11, offset: 1 }} xl={{ span: 8, offset: 2 }}>
        <Search />
      </Col>
      <Col xl={{ span: 2, offset: 4 }}>
        <Login />
      </Col>
    </Row>
  </Layout.Header>
)

export default Header
