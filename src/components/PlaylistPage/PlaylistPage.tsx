import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Space, Typography, Button } from 'antd'
import { changePlaylist } from '../../helperFunctions'
import { StateContext, DispatchContext } from '../../context/Context'
import { StateType } from '../../reducers'
import { PlaylistType } from '../../types/deezerData'
import { fetchPlaylist } from '../../helpers/requests'
import Spin from '../Spin/Spin'
import './PlaylistPage.less'
import Tracks from '../Tracks/Tracks'

const numberWithSpaces = (n?: number) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

const convertTime = (time: number): string => {
  const h = Math.floor(time / 3600)
  const min = Math.floor((time % 3600) / 60)
  return `${h ? h + ' h ' : ''}${min ? min + ' min ' : ''}${time < 60 ? time + ' s' : ''}`
}

const PlaylistPage = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [playlist, setPlaylist] = useState<PlaylistType | undefined>(state.playlist)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchPlaylist(id).then((data: PlaylistType) => {
        setPlaylist(data)
        setLoading(false)
      })
    }
  }, [id])

  return !loading && playlist ? (
    <div className="PlaylistPage">
      <Row gutter={32} align="bottom">
        <Col>
          <img src={playlist?.picture_medium} alt={playlist?.title} />
        </Col>
        <Col>
          <Row gutter={[16, 12]} className="name">
            <Col>
              <Typography.Title>{playlist?.title}</Typography.Title>
              <Typography.Text className="description">{playlist?.description}</Typography.Text>
            </Col>
            <Col>
              <Space size="large">
                <Typography.Text className="info">
                  {new Date(playlist?.creation_date).toLocaleDateString()}•{numberWithSpaces(playlist?.nb_tracks)}{' '}
                  tracks, {convertTime(playlist?.duration || 0)}
                </Typography.Text>
              </Space>
            </Col>
            <Col>
              <Button type="primary" onClick={() => changePlaylist(state, dispatch, playlist)}>
                Listen
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Tracks data={playlist?.tracks?.data} title="" withNumbers showHeader />
    </div>
  ) : (
    <Spin />
  )
}

export default PlaylistPage
