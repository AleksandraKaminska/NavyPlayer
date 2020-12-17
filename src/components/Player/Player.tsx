import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import Controls from './Controls'
import Progress from './Progress'
import Volume from './Volume'
import Cover from './Cover'
import './Player.less'
const { DZ } = window

const Player = () => {
  const [repeat, setRepeat] = useState<number>(0)
  const handleChangeRepeat = () => setRepeat((repeat + 1) % 3)

  useEffect(() => {
    console.log(repeat)
    DZ?.player.setRepeat(repeat)
  }, [repeat])

  return (
    <section className="Player">
      <Row align="middle">
        <Col xs={{ span: 6 }} xl={{ span: 5 }} className="align-start">
          <Cover />
        </Col>
        <Col xs={{ span: 6, offset: 1 }} xl={{ span: 3, offset: 0 }}>
          <Controls />
        </Col>
        <Col xs={{ span: 3, offset: 1 }} xl={{ span: 12, offset: 1 }}>
          <Progress />
        </Col>
        <Col xs={{ span: 6, offset: 1 }} xl={{ span: 2, offset: 1 }}>
          <Volume repeat={repeat} changeRepeat={handleChangeRepeat} />
        </Col>
      </Row>
    </section>
  )
}

export default Player
