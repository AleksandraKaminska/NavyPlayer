import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Button, Space, Tooltip } from 'antd'
import { Context } from '../../context/Context'
import { searchArtistInfo } from '../../helpers/search'
import { random } from '../../helperFunctions'
import PlayIcon from './play.svg'
import RewindIcon from './rewind.svg'
import ForwardIcon from './forward.svg'
const { DZ } = window

function Controls({ repeat }: { repeat: boolean }) {
  const { state, dispatch } = useContext(Context)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const changeIsPlaying = (): void => {
    setIsPlaying(!isPlaying)
    isPlaying ? DZ?.player.pause() : DZ?.player.play()
  }

  const changeTrack = (): void => {
    setIsPlaying(true)
    DZ?.player.pause()
    repeat ? DZ?.player.playTracks([state.track?.id]) : random(state, dispatch)
  }

  const rewind = (): void => {
    setIsPlaying(true)
    DZ?.player.pause()
    if (state.previousTracks?.length && state.track) {
      const previousTrack = state.previousTracks[state.previousTracks.length - 1]
      dispatch({ type: 'CHANGE_TRACK', payload: previousTrack })
      dispatch({ type: 'PREV_TRACK', payload: previousTrack })
      DZ?.player.playTracks([state.track?.id])
      searchArtistInfo(state.track, dispatch)
    } else {
      random(state, dispatch)
    }
  }

  useEffect(() => {
    setIsPlaying(true)
  }, [state.track])

  return (
    <Space className="Controls" align="center">
      <Tooltip title="Previous">
        <Button onClick={rewind} type="text">
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
        <Button onClick={changeTrack} type="text">
          <ReactSVG src={ForwardIcon} />
        </Button>
      </Tooltip>
    </Space>
  )
}

export default Controls
