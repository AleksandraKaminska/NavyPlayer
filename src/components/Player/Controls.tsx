import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/Context'
import { searchArtistInfo } from '../../helpers/search'
import { random } from '../../helperFunctions'
import Rewind from './Rewind'
import Forward from './Forward'
import icons from '../../icons'
import previousTracksReducer from '../../reducers/previousTracksReducer'

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
      const previousTrack = previousTracksReducer[previousTracksReducer.length - 1]
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
    <div className="controls">
      <button>
        <Rewind onClick={rewind} />
      </button>
      <button onClick={changeIsPlaying}>
        <img src={isPlaying ? '/assets/images/pause.png' : icons.play} alt="play button" />
      </button>
      <button>
        <Forward onClick={changeTrack} />
      </button>
    </div>
  )
}

export default Controls
