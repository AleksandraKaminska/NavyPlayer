import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import Glider, { GliderMethods } from 'react-glider'
import { Context } from '../../context/Context'
import Playlist from './Playlist'
// import { randomAlbumTrack } from 'helperFunctions'
import 'glider-js/glider.min.css'

function Playlists() {
  const gliderRef = useRef<GliderMethods>(null)
  const { state, dispatch } = useContext(Context)
  const [indexPlaylists, setIndexPlaylists] = useState<number>(20)
  const [indexAlbums, setIndexAlbums] = useState<number>(20)

  // const loadMorePlaylists = () => {
  //   fetchJsonp(`https://api.deezer.com/chart?index=${this.state.indexPlaylists}&limit=20&output=jsonp`)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const { top } = this.props
  //       store.dispatch(
  //         actions.fetchChartAction({
  //           ...top,
  //           playlists: {
  //             data: [...top.playlists.data, ...data.playlists.data]
  //           }
  //         })
  //       )
  //       this.setState({
  //         indexPlaylists: this.state.indexPlaylists + 20
  //       })
  //     })
  // }

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 7,
  //   slidesToScroll: 7,
  //   adaptiveHeight: true,
  //   autoplay: true,
  //   focusOnSelect: false,
  //   autoplaySpeed: 5000,
  //   nextArrow: <NextArrow onClick={() => this.slickNext} />,
  //   prevArrow: <PrevArrow onClick={() => this.slickPrev} />
  // }

  return (
    <section className="Playlists">
      <h3>Top Charts</h3>
      {/* <Slider {...settings} {...{ beforeChange: this.loadMorePlaylists }}> */}
      {state.topChart && (
        <Glider
          draggable
          hasArrows
          hasDots
          slidesToScroll={7}
          slidesToShow={7}
          className="gradient-outline"
          ref={gliderRef}
        >
          {state.topChart.playlists.data.map((playlist) => (
            <Playlist playlist={playlist} key={playlist.id} />
          ))}
        </Glider>
      )}
    </section>
  )
}

export default Playlists
