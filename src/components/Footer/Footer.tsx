import React from 'react'
import { Button, Layout, Space } from 'antd'
import { login } from '../../helpers/login'
import DeezerLogo from './deezerLogo.svg'
import Player from '../Player/Player'
import './Footer.less'

const Footer = () => (
  <Layout.Footer className="Footer" style={{ position: 'fixed', bottom: 0, zIndex: 1, width: '100%' }}>
    <Player />
    <div onClick={login}>
      <Space align="baseline">
        <p>Powered by Deezer</p>
        <Button type="link" href="https://deezer.com" target="_blank" rel="noopener noreferrer">
          <img src={DeezerLogo} alt="Deezer Logo" className="deezerLogo" />
        </Button>
      </Space>
    </div>
  </Layout.Footer>
)

export default Footer
