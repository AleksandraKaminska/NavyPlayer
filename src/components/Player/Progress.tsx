import React, { useEffect, useState } from 'react'
import { Progress as AntProgress } from 'antd'
const { DZ } = window

function Progress() {
  const [elapsed, setElapsed] = useState('00:00')
  const [duration, setDuration] = useState('00:00')
  const [progress, setProgress] = useState(0)

  const convertTime = (time) => {
    const min = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${min}:${(s < 10 ? '0' : '') + s}`
  }

  const showPosition = () =>
    DZ?.Event.subscribe('player_position', (e) => {
      setElapsed(convertTime(e[0]))
      setDuration(convertTime(e[1]))
      if (e[1]) {
        setProgress((e[0] / e[1]) * 100)
      }
    })

  const changeSeek = ({ target, clientX }) => {
    const { x, width } = target.getBoundingClientRect()
    DZ?.player.seek(((clientX - x) / width) * 100)
  }

  useEffect(showPosition, [])

  return (
    <div className="progress">
      <span className="elapsed">{elapsed}</span>
      <AntProgress
        // onClick={changeSeek}
        percent={progress}
        showInfo={false}
      />
      <span className="duration">{duration}</span>
    </div>
  )
}

export default Progress
