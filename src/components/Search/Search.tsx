import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import Tracks from '../Tracks/Tracks'
import Carousel from '../Carousel/Carousel'
import Album from '../Album/Album'
import Playlist from '../Playlist/Playlist'
import Artist from '../Artist/Artist'
import { DispatchContext, StateContext } from '../../context/Context'
import { searchApi } from '../../helpers/search'
import './Search.less'
import { StateType } from '../../reducers'

function Search() {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const { searchResults } = useContext<StateType>(StateContext)
  const { state }: any = useLocation()

  const getData: (type: string, slice?: number) => Array<any> = (type, slice = 5) =>
    state?.type === type ? searchResults?.[type]?.data : searchResults?.[type]?.data.slice(0, slice)

  useEffect(() => {
    if (state?.type !== 'all') {
      searchApi(searchResults?.value, state?.type.slice(0, -1), 100).then(({ data }) =>
        dispatch({ type: 'SEARCH', payload: { ...searchResults, [state?.type]: { data } } })
      )
    }
  }, [state?.type])

  if (searchResults) {
    const types = Object.entries(searchResults).filter(([type]) =>
      ['tracks', 'albums', 'artists', 'playlists'].includes(type)
    )

    const shouldShow = (type: string): boolean =>
      (state === undefined || state?.type === 'all' || state?.type === type) && searchResults[type]?.data?.length > 0

    return (
      <section className="Search">
        <Menu className="menu" mode="horizontal" selectedKeys={[state?.type || 'all']}>
          <Menu.Item key="all">
            <Link to={{ pathname: '/search', state: { type: 'all' } }}>All</Link>
          </Menu.Item>
          {types.map(([type], i) => (
            <Menu.Item key={type}>
              <Link to={{ pathname: '/search', state: { type } }}>{type}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className="results">
          {shouldShow('tracks') && (
            <Tracks
              data={getData('tracks', 6)}
              title="Tracks"
              link={{ pathname: '/search', state: { type: 'tracks' } }}
            />
          )}
          {shouldShow('albums') && (
            <Carousel
              className="albums"
              title="Albums"
              type="album"
              link={{ pathname: '/search', state: { type: 'albums' } }}
              data={getData('albums')}
            >
              <Album />
            </Carousel>
          )}
          {shouldShow('artists') && (
            <Carousel
              className="artists"
              data={getData('artists')}
              title="Artists"
              type="artist"
              link={{ pathname: '/search', state: { type: 'artists' } }}
              rounded
            >
              <Artist />
            </Carousel>
          )}
          {shouldShow('playlists') && (
            <Carousel
              className="playlists"
              data={getData('playlists')}
              title="Playlists"
              type="playlist"
              link={{ pathname: '/search', state: { type: 'playlists' } }}
            >
              <Playlist />
            </Carousel>
          )}
        </div>
      </section>
    )
  }

  return null
}

export const Icon = () => <RightOutlined style={{ fontSize: '14px', verticalAlign: 'baseline' }} />

export default Search
