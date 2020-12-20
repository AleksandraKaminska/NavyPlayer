import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Space, Typography, Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { changePlaylist } from '../../helperFunctions'
import { StateContext, DispatchContext } from '../../context/Context'
import { StateType } from '../../reducers'
import { PlaylistType, TrackType } from '../../types/deezerData'
import { searchArtistInfo } from '../../helpers/search'
import { fetchPlaylist } from '../../helpers/requests'
import Spin from '../Spin/Spin'
import './PlaylistPage.less'

const numberWithSpaces = (n?: number) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

const convertTime = (time: number): string => {
  const h = Math.floor(time / 3600)
  const min = Math.floor((time % 3600) / 60)
  return `${h ? h + ' h ' : ''}${min ? min + ' min ' : ''}${time < 60 ? time + ' s' : ''}`
}

const columns: ColumnsType<{
  key: number
  number: number
  title: JSX.Element
}> = [
  {
    title: '#',
    dataIndex: 'number',
    key: 'number',
    width: 50
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
  }
]

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

  const selectSong = (item: TrackType) => {
    dispatch({ type: 'PREV_TRACK', payload: state.track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const dataSource = playlist?.tracks?.data?.map((track, id) => {
    const handleClick = () => selectSong(track)
    return {
      key: track.id,
      number: id + 1,
      title: (
        <span onClick={handleClick} className="track">
          {track.title_short}
        </span>
      )
    }
  })

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
      <Table className="Tracks" dataSource={dataSource} columns={columns} pagination={false} size="middle" />
    </div>
  ) : (
    <Spin />
  )
}

export default PlaylistPage
