import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Context } from '../../context/Context'
import Playlist from './Playlist'
// import { randomAlbumTrack } from 'helperFunctions'
import 'swiper/swiper.scss'

function Playlists() {
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
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {state.topChart?.playlists.data.map((playlist) => (
          <SwiperSlide key={playlist.id}>
            <Playlist playlist={playlist} key={playlist.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Playlists
