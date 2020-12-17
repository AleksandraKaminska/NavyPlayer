import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Button, Space, Tooltip } from 'antd'
import { DispatchContext, StateContext } from '../../context/Context'
// import { random } from '../../helperFunctions'
import PlayIcon from './play.svg'
import RewindIcon from './rewind.svg'
import ForwardIcon from './forward.svg'
import { StateType } from '../../reducers'
import { CurrentTrackType } from '../../types/deezerData'
const { DZ } = window

function Controls() {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const changeIsPlaying = (): void => {
    setIsPlaying(!isPlaying)
    isPlaying ? DZ?.player.pause() : DZ?.player.play()
  }

  useEffect(() => {
    DZ?.ready(() => {
      DZ?.Event.subscribe('current_track', ({ track, index }: { track: CurrentTrackType; index: number }) => {
        dispatch({ type: 'CHANGE_TRACK', payload: track })
      })
    })
  }, [])

  return (
    <Space className="Controls" align="center">
      <Tooltip title="Previous">
        <Button onClick={() => DZ.player.prev()} type="text" disabled={state.previousTracks?.length === 0}>
          <ReactSVG src={RewindIcon} />
        </Button>
      </Tooltip>
      <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
        <Button onClick={changeIsPlaying} type="text">
          {isPlaying ? (
            <img src="/assets/images/pause.png" alt="pause button" width="24px" style={{ verticalAlign: 'baseline' }} />
          ) : (
            <ReactSVG src={PlayIcon} />
          )}
        </Button>
      </Tooltip>
      <Tooltip title="Next">
        <Button onClick={() => DZ.player.next()} type="text">
          <ReactSVG src={ForwardIcon} />
        </Button>
      </Tooltip>
    </Space>
  )
}

export default Controls
