import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { Context } from '../../context/Context'
import { random } from '../../helperFunctions'
const { Title } = Typography
import './ArtistPage.less'

const ArtistPage: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  const { artist } = state

  return (
    <div
      className="ArtistPage"
      style={{
        backgroundImage: `linear-gradient(to left,rgba(0,0,0,0) 5%, #000a11 92%), url(${artist?.picture_xl})`
      }}
    >
      <Row align="middle">
        <Col>
          <Title>{artist?.name}</Title>
        </Col>
        <Col offset={1}>
          <Button type="primary" onClick={() => random(state, dispatch)} shape="round">
            Listen
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default ArtistPage
