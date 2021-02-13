import React, { useEffect, useState } from 'react'
import { Slider, Row, Col } from 'antd'
const { DZ } = window
import './Progress.less'

export const convertTime = (time: number): string => {
  const min = Math.floor(time / 60)
  const s = Math.floor(time % 60)
  return `${min}:${(s < 10 ? '0' : '') + s}`
}

const Progress = () => {
  const [elapsed, setElapsed] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  const showPosition = (): void =>
    DZ?.Event.subscribe('player_position', ([elapsed, duration]: Array<number>): void => {
      setElapsed(elapsed)
      setDuration(duration)
      if (duration) {
        const percent = (elapsed / duration) * 100
        setProgress(percent)
      }
    })

  const onChange = (value: number) => setProgress(value)

  const onAfterChange = (value: number) => DZ?.player.seek(value)

  const tipFormatter = (value?: number) => {
    if (value) {
      return convertTime((value * duration) / 100)
    }
  }

  useEffect(() => showPosition)

  return (
    <Row className="Progress">
      <Col span={2} className="elapsed">
        {convertTime(elapsed)}
      </Col>
      <Col span={20}>
        <Slider value={progress} onChange={onChange} onAfterChange={onAfterChange} tipFormatter={tipFormatter} />
      </Col>
      <Col span={1} offset={1} className="duration">
        {convertTime(duration)}
      </Col>
    </Row>
  )
}

export default Progress
