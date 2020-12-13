import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Icon } from './Search'
import { searchArtistInfo, searchApi } from '../../helpers/search'
import { Context } from '../../context/Context'
import { TrackType } from '../../types/deezerData'
import './Search.less'

function Tracks() {
  const {
    state: { searchResults, track },
    dispatch
  } = useContext(Context)
  const { state }: any = useLocation()

  const selectSong = (item: TrackType) => {
    dispatch({ type: 'PREV_TRACK', payload: track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const data = state?.type === 'tracks' ? searchResults?.tracks?.data : searchResults?.tracks?.data.slice(0, 6)

  const dataSource = data?.map((track) => {
    const handleClick = () => selectSong(track)
    return {
      key: track.id,
      cover: <img src={track.album.cover_small} alt={track.title_short} onClick={handleClick} />,
      title: (
        <Link to={{ pathname: '/search', state }} onClick={handleClick}>
          {track.title_short}
        </Link>
      ),
      artist: <Link to={`/artists/${track.artist.id}`}>{track.artist?.name}</Link>,
      album: <Link to={`/albums/${track.album.id}`}>{track.album?.title}</Link>
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

  useEffect(() => {
    if (state?.type === 'tracks') {
      searchApi('hello', 'track', 100).then(({ data }) => {
        dispatch({ type: 'SEARCH', payload: { ...searchResults, tracks: { data } } })
      })
    }
  }, [state?.type])

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
          <h2>{searchResults?.tracks?.data.length} Tracks</h2>
        ) : (
          <h2>
            <Link to={{ pathname: '/search', state: { type: 'tracks' } }}>
              Tracks <Icon />
            </Link>
          </h2>
        )
      }
    />
  )
}

export default Tracks
