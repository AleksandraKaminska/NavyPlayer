import React from 'react'
import { Button, Layout, Space } from 'antd'
import { login } from '../../helpers/login'
import DeezerLogo from './deezerLogo.svg'
import './Footer.scss'

const Footer: React.FC = () => (
  <Layout.Footer className="Footer" onClick={login}>
    <Space align="baseline">
      <p>Powered by Deezer</p>
      <Button type="link" href="https://deezer.com" target="_blank" rel="noopener noreferrer">
        <img src={DeezerLogo} alt="Deezer Logo" />
      </Button>
    </Space>
  </Layout.Footer>
)

export default Footer
