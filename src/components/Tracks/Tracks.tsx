import React, { useContext } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { Table, Space, Typography } from 'antd'
import { PlayCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { Icon } from '../Search/Search'
import { convertTime as durationTime } from '../Player/Progress'
import { searchArtistInfo } from '../../helpers/search'
import { DispatchContext, StateContext } from '../../context/Context'
import { TrackType } from '../../types/deezerData'
import { StateType } from '../../reducers'
const { Title } = Typography
import './Tracks.less'

type TracksProps = {
  data?: Array<TrackType>
  title: string
  link?: LinkProps['to']
  withNumbers?: boolean
  showHeader?: boolean
}

function Tracks({ data, title, link, withNumbers, showHeader = false }: TracksProps) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const { track } = useContext<StateType>(StateContext)
  const { state }: any = useLocation()

  const selectSong = (item: TrackType) => {
    dispatch({ type: 'PREV_TRACK', payload: track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const dataSource = data?.map((track, id) => {
    const handleClick = () => selectSong(track)
    const obj = {
      key: track.id,
      cover: (
        <div className="image">
          <img src={track.album?.cover_small} alt={track.title_short} />
          <div className="overlay">
            <PlayCircleFilled onClick={handleClick} />
          </div>
        </div>
      ),
      title: (
        <Link to={{ state }} onClick={handleClick}>
          {track.title_short}
        </Link>
      ),
      artist: <Link to={`/artists/${track.artist.id}`}>{track.artist?.name}</Link>,
      album: <Link to={`/albums/${track.album?.id}`}>{track.album?.title}</Link>,
      duration: durationTime(track.duration)
    }

    return withNumbers ? { ...obj, number: id + 1 } : obj
  })

  const columns: () => ColumnsType<{
    key: number
    number?: number
    cover: JSX.Element
    title: JSX.Element
    artist: JSX.Element
    album: JSX.Element
    duration: string
  }> = () => {
    const columns = [
      {
        title: '',
        dataIndex: 'cover',
        key: 'cover',
        width: 70
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true
      },
      {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist'
      },
      {
        title: 'Album',
        dataIndex: 'album',
        key: 'album',
        ellipsis: true
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        width: 80
      }
    ]

    return withNumbers
      ? [
          {
            title: '#',
            dataIndex: 'number',
            key: 'number',
            width: 50
          },
          ...columns
        ]
      : columns
  }

  return (
    <Table
      className="Tracks"
      dataSource={dataSource}
      showHeader={showHeader}
      columns={columns()}
      pagination={false}
      size="middle"
      title={() =>
        state?.type === 'tracks' ? (
          <Title level={2}>
            {data?.length} {title}
          </Title>
        ) : link ? (
          <Title level={2}>
            <Link to={link}>
              <Space align="baseline">
                {title} <Icon />
              </Space>
            </Link>
          </Title>
        ) : (
          <Title level={2}>{title}</Title>
        )
      }
    />
  )
}

export default Tracks
