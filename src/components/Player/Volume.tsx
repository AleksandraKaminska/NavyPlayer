import React, { useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { Button, Row, Col, Tooltip } from 'antd'
import MutedVolumeIcon from './mutedVolume.svg'
import VolumeIcon from './volume.svg'
import RepeatIcon from './repeat.svg'
import './Volume.less'
const { DZ } = window

function Volume({ repeat, changeRepeat }: { repeat: number; changeRepeat: any }) {
  const line = useRef(null)
  const ball = useRef(null)
  const [muted, setMuted] = useState<boolean>(false)

  const setVolume = (event) => {
    const vol = getVolPercent(event)
    // if (line && ball && line.current && ball.current) {
    //   line.current.style.width = ball.current.style.left = vol + '%'
    // }
    DZ?.player.setVolume(vol)
  }

  const getVolPercent = ({ currentTarget, clientX }) => {
    const { left, right, width } = currentTarget.getBoundingClientRect()
    if (clientX <= left) {
      return 0
    } else if (clientX >= right) {
      return 100
    }
    const vol = ((clientX - left) / width) * 100
    if (vol <= 6) {
      return 0
    } else if (vol >= 94) {
      return 100
    }
    return vol
  }

  const handleMute = (): void => {
    DZ?.player.setMute(!muted)
    setMuted(!muted)
  }

  const className = `repeat ${repeat ? 'active' : ''}`

  return (
    <Row className="Volume">
      <Col span={12}>
        <Tooltip title="Repeat">
          <Button type="text" className={className} onClick={changeRepeat}>
            <ReactSVG src={RepeatIcon} />
          </Button>
        </Tooltip>
      </Col>
      <Col span={12}>
        <Tooltip title="Mute">
          <Button type="text" onClick={handleMute}>
            <ReactSVG src={muted ? MutedVolumeIcon : VolumeIcon} />
          </Button>
        </Tooltip>
        <div className="volumeSlider" onClick={(ev) => setVolume(ev)}>
          <div className="volumeSlider__bgLine" />
          <div className="volumeSlider__currentLine" ref={line} />
          <div className="volumeSlider__ball" ref={ball} />
        </div>
      </Col>
    </Row>
  )
}

export default Volume
