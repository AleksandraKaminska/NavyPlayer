import React from 'react'
import { Button, Image, Layout, Space } from 'antd'
import login from '../../helpers/login'
import './Footer.scss'

const { Footer } = Layout

const FooterPage: React.FC = () => (
  <Footer className="Footer" onClick={login}>
    <Space align="baseline">
      <p>Powered by Deezer</p>
      <Button type="link" href="https://deezer.com" target="_blank" rel="noopener noreferrer">
        <Image src="/assets/images/DeezerLogo.png" alt="Deezer Logo" />
      </Button>
    </Space>
  </Footer>
)

export default FooterPage
