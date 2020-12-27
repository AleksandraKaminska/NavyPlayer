import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { Button, Row, Col, Tooltip, Slider } from 'antd'
import MutedVolumeIcon from './mutedVolume.svg'
import VolumeIcon from './volume.svg'
import RepeatIcon from './repeat.svg'
import './Volume.less'
const { DZ } = window

function Volume({ repeat, changeRepeat }: { repeat: boolean; changeRepeat: any }) {
  const [muted, setMuted] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(50)

  const onChange = (value: number) => {
    setVolume(value)
    DZ?.player.setVolume(value)
  }

  const handleRepeat = (): void => {
    DZ?.player.setRepeat(repeat ? 0 : 2)
    changeRepeat()
  }

  const handleMute = (): void => {
    DZ?.player.setMute(!muted)
    setVolume(muted ? DZ?.player.getVolume() : 0)
    setMuted(!muted)
  }

  const className = `repeat ${repeat ? 'active' : ''}`

  return (
    <Row className="Volume">
      <Col span={12}>
        <Tooltip title="Repeat">
          <Button type="text" className={className} onClick={handleRepeat}>
            <ReactSVG src={RepeatIcon} />
          </Button>
        </Tooltip>
      </Col>
      <Col span={12}>
        <Tooltip
          title={<Slider vertical value={volume} onChange={onChange} />}
          overlayClassName="volume-sider"
          arrowPointAtCenter
        >
          <Button type="text" onClick={handleMute}>
            <ReactSVG src={muted ? MutedVolumeIcon : VolumeIcon} />
          </Button>
        </Tooltip>
      </Col>
    </Row>
  )
}

export default Volume
