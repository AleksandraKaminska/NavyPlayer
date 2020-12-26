import React from 'react'
import { Button, Layout, Space } from 'antd'
import { login } from '../../helpers/login'
import DeezerLogo from './deezerLogo.svg'
import './Footer.less'

const Footer = () => (
  <Layout.Footer className="Footer">
    <div onClick={login} className="deezer">
      <Space align="baseline">
        <p>Powered by Deezer</p>
        <Button type="link" href="https://deezer.com" target="_blank" name="deezer logo">
          <img src={DeezerLogo} alt="Deezer Logo" className="deezerLogo" />
        </Button>
      </Space>
    </div>
  </Layout.Footer>
)

export default Footer
