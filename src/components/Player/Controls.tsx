import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'antd'
import { Context } from '../../context/Context'
import { searchArtistInfo } from '../../helpers/search'
import { random } from '../../helperFunctions'
import Rewind from './rewind.svg'
import Forward from './forward.svg'
import icons from '../../icons'

const { DZ } = window

function Controls({ repeat }: { repeat: boolean }) {
  const { state, dispatch } = useContext(Context)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const changeIsPlaying = () => {
    const playing = DZ?.player.isPlaying() || false
    setIsPlaying(playing)
    playing ? DZ?.player.pause() : DZ?.player.play()
  }

  const changeTrack = () => {
    setIsPlaying(true)
    DZ?.player.pause()
    repeat ? DZ?.player.playTracks([state.track?.id]) : random(state, dispatch)
  }

  const rewind = () => {
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
    <div className="Controls">
      <Button onClick={rewind} type="text">
        <img src={Rewind} alt="rewind" />
      </Button>
      <Button onClick={changeIsPlaying} type="text">
        <img src={isPlaying ? '/assets/images/pause.png' : icons.play} alt="play button" />
      </Button>
      <Button onClick={changeTrack} type="text">
        <img src={Forward} alt="forward" />
      </Button>
    </div>
  )
}

export default Controls
