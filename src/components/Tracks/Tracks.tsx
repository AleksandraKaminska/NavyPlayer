import React, { useContext } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { Table, Space, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Icon } from '../Search/Search'
import { searchArtistInfo } from '../../helpers/search'
import { DispatchContext, StateContext } from '../../context/Context'
import { TrackType } from '../../types/deezerData'
import './Tracks.less'
import { StateType } from '../../reducers'
const { Title } = Typography

type TracksProps = {
  data?: Array<TrackType>
  title: string
  link?: LinkProps['to']
}

function Tracks({ data, title, link }: TracksProps) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const { track } = useContext<StateType>(StateContext)
  const { state }: any = useLocation()

  const selectSong = (item: TrackType) => {
    dispatch({ type: 'PREV_TRACK', payload: track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const dataSource = data?.map((track) => {
    const handleClick = () => selectSong(track)
    return {
      key: track.id,
      cover: <img src={track.album?.cover_small} alt={track.title_short} onClick={handleClick} />,
      title: (
        <Link to={{ pathname: '/search', state }} onClick={handleClick}>
          {track.title_short}
        </Link>
      ),
      artist: <Link to={`/artists/${track.artist.id}`}>{track.artist?.name}</Link>,
      album: <Link to={`/albums/${track.album?.id}`}>{track.album?.title}</Link>
    }
  })

  const columns: ColumnsType<{
    key: number
    cover: JSX.Element
    title: JSX.Element
    artist: JSX.Element
    album: JSX.Element
  }> = [
    {
      title: 'Cover',
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
    }
  ]

  return (
    <Table
      className="Tracks"
      dataSource={dataSource}
      showHeader={false}
      columns={columns}
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
