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
        <Col span={5} className="align-start">
          <SmallCover />
        </Col>
        <Col span={3}>
          <Controls repeat={repeat} />
        </Col>
        <Col span={14}>
          <Progress />
        </Col>
        <Col span={2}>
          <Volume repeat={repeat} changeRepeat={toggleRepeat} />
        </Col>
      </Row>
    </section>
  )
}

export default Player
