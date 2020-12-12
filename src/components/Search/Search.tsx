import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Divider, Row, Col, Table } from 'antd'
// import { randomAlbumTrack, randomArtistTrack, choosePlaylist } from '../../helperFunctions'
import { searchArtistInfo } from '../../helpers/search'
import { Context } from '../../context/Context'
import { ArtistType } from '../../types/deezerData'
import './Search.less'
import { ColumnsType } from 'antd/lib/table'

type ItemType = {
  item: {
    id: number
    name?: string
    title?: string
    title_short?: string
    artist: ArtistType
    picture_medium?: string
    album: any
  }
  type: string
  onClick?: any
  title: string
  image: string
}

function SearchResults() {
  const {
    state: { searchResults, track },
    dispatch
  } = useContext(Context)

  const handlerRenderItem = (item, type) => {
    const props = {
      key: item.id,
      item,
      type
    }
    switch (type) {
      case 'albums':
        return (
          <Item
            {...props}
            title={item.title}
            image={item.cover_medium}
            // onClick={() => randomAlbumTrack({ album: item, track })}
          />
        )

      case 'artists':
        return (
          <Item
            {...props}
            title={item.name}
            image={item.picture_medium}
            // onClick={() => randomArtistTrack({ artist: item, track })}
          />
        )

      case 'playlists':
        return (
          <Item
            {...props}
            title={item.title}
            image={item.picture_medium}
            // onClick={() => choosePlaylist(item.id, this.props)}
          />
        )

      default:
        return null
    }
  }

  return searchResults ? (
    <section className="Search">
      <Menu className="menu" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">All</Menu.Item>
        <Menu.Item key="2">Tracks</Menu.Item>
        <Menu.Item key="3">Albums</Menu.Item>
        <Menu.Item key="4">Artists</Menu.Item>
        <Menu.Item key="5">Playlists</Menu.Item>
      </Menu>
      <div className="results">
        <Tracks />
        {/* {Object.keys(searchResults).map((el) => (
          <div key={el}>
            <h2>{el}</h2>
            <div>{searchResults[el].data.map((item) => handlerRenderItem(item, el))}</div>
            <Divider />
          </div>
        ))} */}
      </div>
    </section>
  ) : null
}

function Tracks() {
  const {
    state: { searchResults, track },
    dispatch
  } = useContext(Context)

  const selectSong = (item) => {
    dispatch({ type: 'PREV_TRACK', payload: track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const dataSource = searchResults
    ? searchResults?.tracks.data.slice(0, 6).map((track) => {
        const handleClick = () => selectSong(track)
        return {
          key: track.id,
          cover: <img src={track.album.cover_small} alt={track.title_short} onClick={handleClick} />,
          title: <span onClick={handleClick}>{track.title_short}</span>,
          artist: <Link to={`/artists/${track.artist.id}`}>{track.artist?.name}</Link>,
          album: <Link to={`/albums/${track.album.id}`}>{track.album?.title}</Link>
        }
      })
    : []

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
      key: 'cover'
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
      title={() => <h2>Songs</h2>}
    />
  )
}

function Item({ item, type, onClick, title, image }: ItemType) {
  if (type == 'track') console.log(item)
  return (
    <Link to={`/${type}/${item.id}`} className="result" onClick={onClick}>
      <p>
        <span>{title}</span>
        {item.artist?.name}
      </p>
      <img src={image} alt={title} />
    </Link>
  )
}

export default SearchResults
