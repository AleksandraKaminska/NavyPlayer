import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Empty, Row, Col, Space, Typography, Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { random } from '../../helperFunctions'
import { StateContext, DispatchContext } from '../../context/Context'
import { StateType } from '../../reducers'
import './AlbumPage.less'
import { TrackType } from '../../types/deezerData'
import { searchArtistInfo } from '../../helpers/search'
const numberWithSpaces = (n?: number) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

const convertTime = (time: number): string => {
  const h = Math.floor(time / 3600)
  const min = Math.floor(time / 60)
  const s = Math.floor(time % 60)
  return `${h ? h + ' h ' : ''}${min ? min + ' min ' : ''}${s} s`
}

const AlbumPage: React.FC = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)

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

  const selectSong = (item: TrackType) => {
    dispatch({ type: 'PREV_TRACK', payload: state.track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const dataSource = state.album?.tracks?.data?.map((track, id) => {
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

  return state.album ? (
    <div className="AlbumPage">
      <Row gutter={32} align="bottom">
        <Col>
          <img src={state.album?.cover_medium} alt={state.album?.title} />
        </Col>
        <Col>
          <Row gutter={[16, 12]} className="name">
            <Col>
              <Typography.Title>{state.album?.title}</Typography.Title>
              <Link to={`/artists/${state.album?.artist?.id}`}>
                <Typography.Text className="artist">{state.album?.artist?.name}</Typography.Text>
              </Link>
            </Col>
            <Col>
              <Space size="large">
                <Typography.Text className="info">
                  {new Date(state.album?.release_date).getFullYear()}•
                  {numberWithSpaces(state.album?.tracks.data.length)} tracks, {convertTime(state.album?.duration || 0)}
                </Typography.Text>
              </Space>
            </Col>
            <Col>
              <Button type="primary" onClick={() => random(state, dispatch)}>
                Listen
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table className="Tracks" dataSource={dataSource} columns={columns} pagination={false} size="middle" />
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}

export default AlbumPage
