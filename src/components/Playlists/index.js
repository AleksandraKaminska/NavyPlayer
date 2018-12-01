import React, { Component } from 'react'
import Slider from 'react-slick'
import store from 'store'
import { connect } from 'react-redux'
import Playlist from './Playlist'
import fetchJsonp from 'fetch-jsonp'
import * as actions from 'actions'
import { randomAlbumTrack } from 'helperFunctions'
import { NavLink } from 'react-router-dom'
import './style.scss'

function NextArrow(props) {
  return (
    <button className="btn next" onClick={props.onClick}>
      <i className="fas fa-chevron-right" />
    </button>
  )
}

function PrevArrow(props) {
  return (
    <button className="btn prev" onClick={props.onClick}>
      <i className="fas fa-chevron-left" />
    </button>
  )
}

export class Playlists extends Component {
  constructor() {
    super()
    this.state = {
      indexPlaylists: 20,
      indexAlbums: 20
    }
  }

  componentDidMount() {
    fetchJsonp(`https://api.deezer.com/chart?index=0&limit=20&output=jsonp`)
      .then(resp => resp.json())
      .then(({ albums, playlists }) =>
        store.dispatch(actions.fetchChartAction({ albums, playlists }))
      )
  }

  loadMorePlaylists = () => {
    fetchJsonp(
      `https://api.deezer.com/chart?index=${
        this.state.indexPlaylists
      }&limit=20&output=jsonp`
    )
      .then(resp => resp.json())
      .then(data => {
        const { top } = this.props
        store.dispatch(
          actions.fetchChartAction({
            ...top,
            playlists: {
              data: [...top.playlists.data, ...data.playlists.data]
            }
          })
        )
        this.setState({
          indexPlaylists: this.state.indexPlaylists + 20
        })
      })
  }

  loadMoreAlbums = () => {
    fetchJsonp(
      `https://api.deezer.com/chart?index=${
        this.state.indexAlbums
      }&limit=20&output=jsonp`
    )
      .then(resp => resp.json())
      .then(data => {
        const { top } = this.props
        store.dispatch(
          actions.fetchChartAction({
            ...top,
            albums: {
              data: [...top.albums.data, ...data.albums.data]
            }
          })
        )
        this.setState({
          indexAlbums: this.state.indexAlbums + 20
        })
      })
  }

  findAlbum = id => {
    fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
      .then(resp => resp.json())
      .then(album => {
        store.dispatch(actions.changeAlbumAction(album))
        randomAlbumTrack({ ...this.props, album })
      })
    store.dispatch(actions.changePlaylistAction(0))
    store.dispatch(actions.changeArtistPlaylistAction([]))
  }

  render() {
    const {
      top: { playlists, albums }
    } = this.props
    if (!albums) return null

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
      adaptiveHeight: true,
      autoplay: true,
      focusOnSelect: false,
      autoplaySpeed: 5000,
      nextArrow: <NextArrow onClick={() => this.slickNext} />,
      prevArrow: <PrevArrow onClick={() => this.slickPrev} />
    }

    return (
      <main>
        <section className="playlists">
          <h3>Top Charts</h3>
          <Slider {...settings} {...{ beforeChange: this.loadMorePlaylists }}>
            {playlists.data.map((elem, i) => (
              <Playlist elem={elem} key={i} />
            ))}
          </Slider>
        </section>
        <section className="top-albums">
          <h3>Trending Albums</h3>
          <Slider {...settings} {...{ beforeChange: this.loadMoreAlbums }}>
            {albums.data.map(
              ({ id, cover_medium, title, artist: { name } }) => (
                <div key={id}>
                  <NavLink
                    to={`/album/${id}`}
                    onClick={() => this.findAlbum(id)}
                  >
                    <figure>
                      <img
                        src={
                          cover_medium &&
                          cover_medium.replace(/(250)x\1/, '200x200')
                        }
                        alt=""
                      />
                      <figcaption>
                        <p>{title}</p>
                        <div className="album-artist">
                          <p>{name}</p>
                        </div>
                      </figcaption>
                    </figure>
                  </NavLink>
                </div>
              )
            )}
          </Slider>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ top, track, album }) => ({ top, track, album })

export default connect(mapStateToProps)(Playlists)
