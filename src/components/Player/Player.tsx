import React, { useState } from 'react'
import { Row, Col } from 'antd'
import Controls from './Controls'
import Progress from './Progress'
import Volume from './Volume'
import SmallCover from './Cover'
import './Player.less'

const Player = () => {
  const [repeat, setRepeat] = useState<boolean>(false)
  const toggleRepeat = () => setRepeat(!repeat)

  return (
    <section className="Player">
      <Row align="middle">
        <Col xs={{ span: 6 }} xl={{ span: 5 }} className="align-start">
          <SmallCover />
        </Col>
        <Col xs={{ span: 6, offset: 1 }} xl={{ span: 3, offset: 0 }}>
          <Controls repeat={repeat} />
        </Col>
        <Col xs={{ span: 3, offset: 1 }} xl={{ span: 12, offset: 1 }}>
          <Progress />
        </Col>
        <Col xs={{ span: 6, offset: 1 }} xl={{ span: 2, offset: 1 }}>
          <Volume repeat={repeat} changeRepeat={toggleRepeat} />
        </Col>
      </Row>
    </section>
  )
}

export default Player
