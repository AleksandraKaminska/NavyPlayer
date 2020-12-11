import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
// import { randomAlbumTrack, randomArtistTrack, choosePlaylist } from '../../helperFunctions'
import { searchArtistInfo } from '../../helpers/search'
import { Context } from '../../context/Context'
import { ArtistType, TrackType } from '../../types/deezerData'
import './SearchResults.scss'

type SearchResultsProps = {
  results: {
    albums?: {
      data: Array<ArtistType>
      next?: string
      total: number
    }
    tracks?: {
      data: Array<TrackType>
      next?: string
      total: number
    }
    playlists?: {
      data: Array<any>
      next?: string
      total: number
    }
    artists?: {
      data: Array<any>
      next?: string
      total: number
    }
  }
}

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

function SearchResults({ results }: SearchResultsProps) {
  const {
    state: { track },
    dispatch
  } = useContext(Context)

  const selectSong = (item) => {
    dispatch({ type: 'PREV_TRACK', payload: track })
    dispatch({ type: 'CHANGE_TRACK', payload: item })
    searchArtistInfo(item, dispatch)
  }

  const handlerRenderItem = (item, type) => {
    const props = {
      key: item.id,
      item,
      type
    }
    switch (type) {
      case 'tracks':
        return (
          <Item {...props} title={item.title_short} image={item.album.cover_medium} onClick={() => selectSong(item)} />
        )
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

  return (
    <section className="search">
      {!isEmpty(results) && (
        <div className="results">
          {Object.keys(results).map((el) => (
            <div key={el}>
              <h2>{el}</h2>
              <div>{results[el].data.map((item) => handlerRenderItem(item, el))}</div>
            </div>
          ))}
        </div>
      )}
    </section>
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
