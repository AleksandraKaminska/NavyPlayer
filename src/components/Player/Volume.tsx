import React, { useRef } from 'react'
import { Button } from 'antd'
import icons from '../../icons'
const { DZ } = window

function Volume({ repeat, changeRepeat }: { repeat: boolean; changeRepeat: any }) {
  const line = useRef(null)
  const ball = useRef(null)

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

  return (
    <div className="Volume">
      <Button type="text">
        <img
          src={repeat ? icons.repeatBlue : icons.repeatWhite}
          onClick={() => {
            DZ?.player.setRepeat(repeat ? 0 : 2)
            changeRepeat()
          }}
          alt="repeat"
        />
      </Button>
      <div>
        <Button type="text">
          <img src={icons.volume} alt="set volume" />
        </Button>
        <div className="volumeSlider" onClick={(ev) => setVolume(ev)}>
          <div className="volumeSlider__bgLine" />
          <div className="volumeSlider__currentLine" ref={line} />
          <div className="volumeSlider__ball" ref={ball} />
        </div>
      </div>
    </div>
  )
}

export default Volume
