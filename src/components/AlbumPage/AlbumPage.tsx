import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Space, Typography, Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { changeAlbum } from '../../helperFunctions'
import { StateContext, DispatchContext } from '../../context/Context'
import { StateType } from '../../reducers'
import { AlbumType, TrackType } from '../../types/deezerData'
import { searchArtistInfo } from '../../helpers/search'
import { fetchAlbum } from '../../helpers/requests'
import Spin from '../Spin/Spin'
import './AlbumPage.less'

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

const AlbumPage = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [album, setAlbum] = useState<AlbumType | undefined>(state.album)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchAlbum(id).then((data: AlbumType) => {
        setAlbum(data)
        setLoading(false)
      })
    }
  }, [id])

  const selectSong = (item: TrackType) => {
    dispatch({ type: 'PREV_TRACK', payload: state.track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const dataSource = album?.tracks?.data?.map((track, id) => {
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

  return !loading && album ? (
    <div className="AlbumPage">
      <Row gutter={32} align="bottom">
        <Col>
          <img src={album?.cover_medium} alt={album?.title} />
        </Col>
        <Col>
          <Row gutter={[16, 12]} className="name">
            <Col>
              <Typography.Title>{album?.title}</Typography.Title>
              <Link to={`/artists/${album?.artist?.id}`}>
                <Typography.Text className="artist">{album?.artist?.name}</Typography.Text>
              </Link>
            </Col>
            <Col>
              <Space size="large">
                <Typography.Text className="info">
                  {new Date(album?.release_date).getFullYear()}•{numberWithSpaces(album?.tracks.data.length)} tracks,{' '}
                  {convertTime(album?.duration || 0)}
                </Typography.Text>
              </Space>
            </Col>
            <Col>
              <Button type="primary" onClick={() => changeAlbum(state, dispatch, album)}>
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

export default AlbumPage
