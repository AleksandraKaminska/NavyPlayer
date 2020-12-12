import React, { useEffect, useState } from 'react'
import { Progress as AntProgress, Row, Col } from 'antd'
const { DZ } = window
import './Progress.less'

const Progress = () => {
  const [elapsed, setElapsed] = useState<string>('00:00')
  const [duration, setDuration] = useState<string>('00:00')
  const [progress, setProgress] = useState<number>(0)

  const convertTime = (time: number): string => {
    const min = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${min}:${(s < 10 ? '0' : '') + s}`
  }

  const showPosition = (): void =>
    DZ?.Event.subscribe('player_position', ([elapsed, duration]: Array<number>): void => {
      setElapsed(convertTime(elapsed))
      setDuration(convertTime(duration))
      if (duration) {
        setProgress((elapsed / duration) * 100)
      }
    })

  const changeSeek = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const node = event.target as HTMLElement
    const { x, width } = node.getBoundingClientRect()
    DZ?.player.seek(((event.clientX - x) / width) * 100)
  }

  useEffect(showPosition)

  return (
    <Row className="Progress">
      <Col span={2} className="elapsed">
        {elapsed}
      </Col>
      <Col span={20}>
        <div className="controller" onClick={changeSeek}>
          <AntProgress percent={progress} showInfo={false} strokeWidth={3} />
        </div>
      </Col>
      <Col span={2} className="duration">
        {duration}
      </Col>
    </Row>
  )
}

export default Progress
