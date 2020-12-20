import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import { Row, Col, Tabs } from 'antd'
import Header from './Header'
import Carousel from '../Carousel/Carousel'
import Tracks from '../Tracks/Tracks'
import Playlist from '../Playlist/Playlist'
import Artist from '../Artist/Artist'
import Album from '../Album/Album'
import { StateContext, DispatchContext } from '../../context/Context'
import { searchArtistPlaylists, searchAlbums, searchSimilarArtists, ARTIST_API } from '../../helpers/search'
import { AlbumType, ArtistType, PlaylistType } from '../../types/deezerData'
import { StateType } from '../../reducers'
const { TabPane } = Tabs
import Spin from '../Spin/Spin'
import { fetchArtist } from '../../helpers/requests'
import './ArtistPage.less'

const stateLink = (type: 'playlists' | 'artists' | 'albums' | 'tracks' | 'all') => ({
  pathname: '/artists',
  state: { type }
})

const ArtistPage: React.FC = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const { state: locationState }: any = useLocation()
  const { id } = useParams<{ id?: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [artist, setArtist] = useState<ArtistType | undefined>(state.artist)

  useEffect(() => {
    const url = ARTIST_API + artist?.id
    searchArtistPlaylists(dispatch, url)
    searchAlbums(dispatch, url)
    searchSimilarArtists(dispatch, url)
  }, [id, artist?.id])

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchArtist(id).then((data: ArtistType) => {
        setArtist(data)
        setLoading(false)
      })
    }
  }, [id])

  return artist && !loading ? (
    <div className="ArtistPage">
      <Header artist={artist} />
      <Tabs activeKey={locationState?.type || 'all'}>
        <TabPane tab={<Link to={stateLink('all')}>Discography</Link>} key="all">
          <Row justify="start">
            <Col span={12}>
              <Tracks
                data={state.artistTrackList?.data?.slice(0, 10)}
                title="Popular Tracks"
                link={stateLink('tracks')}
              />
            </Col>
            <Col span={11} offset={1}>
              <Playlists data={state.artistPlaylists?.data?.slice(0, 3)} wrap={false} />
              <Artists data={state.similarArtists?.data?.slice(0, 3)} wrap={false} />
            </Col>
          </Row>
          <Row justify="start">
            <Col span={24}>
              <Albums data={state.albums} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={<Link to={stateLink('tracks')}>Top tracks</Link>} key="tracks">
          <Tracks data={state.artistTrackList?.data} title="Popular Tracks" link={stateLink('tracks')} />
        </TabPane>
        <TabPane tab={<Link to={stateLink('artists')}>Similar artists</Link>} key="artists">
          <Artists data={state.similarArtists?.data} />
        </TabPane>
        <TabPane tab={<Link to={stateLink('playlists')}>Playlists</Link>} key="playlists">
          <Playlists data={state.artistPlaylists?.data} />
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <Spin />
  )
}

const Playlists = (props: { data?: Array<PlaylistType>; wrap?: boolean }) => (
  <Carousel title="Playlists" type="playlist" link={stateLink('playlists')} {...props}>
    <Playlist />
  </Carousel>
)

const Artists = (props: { data?: Array<ArtistType>; wrap?: boolean }) => (
  <Carousel title="Similar artists" type="artist" link={stateLink('artists')} {...props}>
    <Artist />
  </Carousel>
)

const Albums = (props: { data?: Array<AlbumType>; wrap?: boolean }) => (
  <Carousel title="Albums" type="album" {...props}>
    <Album />
  </Carousel>
)

export default ArtistPage
