import React, { useContext, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Tabs, Empty } from 'antd'
import Header from './Header'
import Carousel from '../Carousel/Carousel'
import Tracks from '../Tracks/Tracks'
import Playlist from '../Playlist/Playlist'
import Artist from '../Artist/Artist'
import Album from '../Album/Album'
import { Context } from '../../context/Context'
import { searchArtistPlaylists, searchAlbums, searchSimilarArtists, ARTIST_API } from '../../helpers/search'
import './ArtistPage.less'
const { TabPane } = Tabs

const ArtistPage: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  const { artist } = state
  const { state: locationState }: any = useLocation()

  useEffect(() => {
    const url = ARTIST_API + artist?.id
    searchArtistPlaylists(dispatch, url)
    searchAlbums(dispatch, url)
    searchSimilarArtists(dispatch, url)
  }, [state.artist?.id])

  return artist ? (
    <div className="ArtistPage">
      <Header />
      <Tabs activeKey={locationState?.type || 'all'}>
        <TabPane tab={<Link to={{ pathname: '/artists', state: { type: 'all' } }}>Discography</Link>} key="all">
          <Row justify="start">
            <Col span={12}>
              <Tracks
                data={state.artistTrackList?.data?.slice(0, 10)}
                title="Popular Tracks"
                link={{ pathname: '/artists', state: { type: 'tracks' } }}
              />
            </Col>
            <Col span={11} offset={1}>
              <Carousel
                data={state.artistPlaylists?.data?.slice(0, 3)}
                title="Playlists"
                type="playlist"
                link={{ pathname: '/artists', state: { type: 'playlists' } }}
                wrap={false}
              >
                <Playlist />
              </Carousel>
              <Carousel
                data={state.similarArtists?.data?.slice(0, 3)}
                title="Similar artists"
                type="artist"
                link={{ pathname: '/artists', state: { type: 'artists' } }}
                wrap={false}
              >
                <Artist />
              </Carousel>
            </Col>
          </Row>
          <Row justify="start">
            <Col span={24}>
              <Carousel
                data={state.albums}
                title="Albums"
                type="album"
                link={{ pathname: '/artists', state: { type: 'albums' } }}
              >
                <Album />
              </Carousel>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={<Link to={{ pathname: '/artists', state: { type: 'tracks' } }}>Top tracks</Link>} key="tracks">
          <Tracks
            data={state.artistTrackList?.data}
            title="Popular Tracks"
            link={{ pathname: '/artists', state: { type: 'tracks' } }}
          />
        </TabPane>
        <TabPane
          tab={<Link to={{ pathname: '/artists', state: { type: 'artists' } }}>Similar artists</Link>}
          key="artists"
        >
          <Carousel
            data={state.similarArtists?.data}
            title="Similar artists"
            type="artist"
            link={{ pathname: '/artists', state: { type: 'artists' } }}
          >
            <Artist />
          </Carousel>
        </TabPane>
        <TabPane
          tab={<Link to={{ pathname: '/artists', state: { type: 'playlists' } }}>Playlists</Link>}
          key="playlists"
        >
          <Carousel
            data={state.artistPlaylists?.data}
            title="Playlists"
            type="playlist"
            link={{ pathname: '/artists', state: { type: 'playlists' } }}
          >
            <Playlist />
          </Carousel>
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}

export default ArtistPage
