import React, { useState, useEffect, useContext, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { Row, Col, Button, Space, Tooltip } from 'antd'
import Progress from './Progress'
import Cover from './Cover'
import { DispatchContext, StateContext } from '../../context/Context'
import { CurrentTrackType } from '../../types/deezerData'
import { StateType } from '../../reducers'
import PlayIcon from './play.svg'
import RewindIcon from './rewind.svg'
import ForwardIcon from './forward.svg'
import MutedVolumeIcon from './mutedVolume.svg'
import VolumeIcon from './volume.svg'
import RepeatIcon from './repeat.svg'
import RepeatSingleIcon from './repeat-single.svg'
import ShuffleIcon from './shuffle.svg'
import './Player.less'
import { fetchAlbum, searchArtist } from '../../helpers/requests'
const { DZ } = window

const Player = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const line = useRef(null)
  const ball = useRef(null)
  const [repeat, setRepeat] = useState<number>(0)
  const [shuffle, setShuffle] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const shuffleClassName = `shuffle ${shuffle ? 'active' : ''}`
  const repeatClassName = `repeat ${repeat ? 'active' : ''}`

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

  const handleRepeat = (): void => {
    setRepeat((repeat + 1) % 3)
    DZ?.player.setRepeat(repeat)
  }

  const handleShuffle = (): void => {
    setShuffle(!shuffle)
    DZ?.player.setShuffle(shuffle)
  }

  const changeIsPlaying = (): void => {
    setIsPlaying(!isPlaying)
    isPlaying ? DZ?.player.pause() : DZ?.player.play()
  }

  useEffect(() => {
    DZ?.ready(() => {
      DZ?.Event.subscribe('current_track', async ({ track, index }: { track: CurrentTrackType; index: number }) => {
        dispatch({ type: 'CHANGE_TRACK', payload: track })
        const albumId = parseInt(track.album.id)
        const artistId = parseInt(track.artist.id)
        if (state.album?.id !== albumId) {
          const albumData = await fetchAlbum(albumId)
          dispatch({ type: 'ALBUM', payload: albumData })
        }
        if (state.artist?.id !== artistId) {
          searchArtist(dispatch, artistId)
        }
      })
      DZ?.Event.subscribe('player_play', () => setIsPlaying(true))
      DZ?.Event.subscribe('player_paused', () => setIsPlaying(false))
    })
  }, [])

  return (
    <section className="Player">
      <Row align="middle">
        <Col xs={{ span: 6 }} xl={{ span: 5 }} className="align-start">
          <Cover />
        </Col>
        <Col xs={{ span: 6, offset: 1 }} xl={{ span: 3, offset: 0 }}>
          <Space className="Controls" align="center">
            <Tooltip title="Previous">
              <Button onClick={() => DZ.player.prev()} type="text" disabled={state.previousTracks?.length === 0}>
                <ReactSVG src={RewindIcon} />
              </Button>
            </Tooltip>
            <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
              <Button onClick={changeIsPlaying} type="text">
                {isPlaying ? (
                  <img
                    src="/assets/images/pause.png"
                    alt="pause button"
                    width="24px"
                    style={{ verticalAlign: 'baseline' }}
                  />
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
        </Col>
        <Col xs={{ span: 3, offset: 1 }} xl={{ span: 12, offset: 1 }}>
          <Progress />
        </Col>
        <Col xs={{ span: 6, offset: 1 }} xl={{ span: 2, offset: 1 }}>
          <Row className="Volume">
            <Col span={8}>
              <Tooltip title="Shuffle">
                <Button type="text" className={shuffleClassName} onClick={handleShuffle}>
                  <ReactSVG src={ShuffleIcon} />
                </Button>
              </Tooltip>
            </Col>
            <Col span={8}>
              <Tooltip title="Repeat">
                <Button type="text" className={repeatClassName} onClick={handleRepeat}>
                  <ReactSVG src={repeat === 2 ? RepeatSingleIcon : RepeatIcon} />
                </Button>
              </Tooltip>
            </Col>
            <Col span={8}>
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
        </Col>
      </Row>
    </section>
  )
}

export default Player
