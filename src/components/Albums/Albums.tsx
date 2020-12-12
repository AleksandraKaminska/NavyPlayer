import React, { useRef, useState, useContext } from 'react'
// import AlbumSongs from './albumSongs'
import fetchJsonp from 'fetch-jsonp'
import { Context } from '../../context/Context'
// import './style.scss'

const windowWidth = window.innerWidth
const showCount = windowWidth <= 414 ? 2 : windowWidth > 414 && windowWidth < 768 ? 3 : 7

function Albums() {
  const { state, dispatch } = useContext(Context)
  const sliderRef = useRef(null)
  const closeRef = useRef(null)
  const songsRef = useRef(null)
  const [currentSliderCount, setCurrentSliderCount] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const handleNext = () => {
    // const { currentSliderCount, scrollWidth } = this.state
    // this.sliderCount = this.props.albums.length / showCount - 1
    // this.setState(
    //   {
    //     scrollWidth: scrollWidth + windowWidth
    //   },
    //   () => {
    //     if (currentSliderCount >= this.sliderCount) {
    //       this.sliderRef.current.style.left = 0
    //       this.setState({
    //         currentSliderCount: 0,
    //         scrollWidth: 0
    //       })
    //     } else {
    //       this.sliderRef.current.style.left = `${-this.state.scrollWidth}px`
    //       this.setState({
    //         currentSliderCount: currentSliderCount + 1
    //       })
    //     }
    //   }
    // )
  }

  const handlePrev = () => {
    // sliderCount = state.albums.length / showCount
    // this.setState(
    //   {
    //     scrollWidth: scrollWidth - windowWidth
    //   },
    //   () => {
    //     if (currentSliderCount) {
    //       sliderRef.current.style.left = `${-scrollWidth}px`
    //       setCurrentSliderCount(currentSliderCount - 1)
    //     } else {
    //       sliderRef.current.style.left = 0
    //       setCurrentSliderCount(0)
    //       setScrollWidth(0)
    //     }
    //   }
    // )
  }

  const showAlbumsTracks = (e) => {
    e.preventDefault()
    fetchJsonp(`https://api.deezer.com/album/${e.currentTarget.dataset.id}?output=jsonp`)
      .then((resp) => resp.json())
      .then((album) =>
        dispatch({
          type: 'FIND_ALBUMS_TRACKS',
          payload: album
        })
      )
    // if (songsRef.current.style.right !== '0em') {
    // this.songsRef.current.classList.remove('slidein')
    // this.songsRef.current.classList.add('slideout')
    // this.closeRef.current.classList.remove('buttonSlidein')
    // this.closeRef.current.classList.add('buttonSlideout')
    // }
  }

  return (
    <section className="albums">
      <h2>Albums</h2>
      <div className="slider-frame">
        <div className="btn prev" onClick={handlePrev}>
          <i className="fas fa-chevron-left" />
        </div>
        <div className="btn next" onClick={handleNext}>
          <i className="fas fa-chevron-right" />
        </div>
        <div className="slider-container" ref={sliderRef}>
          {state.albums?.map((elem, i) => (
            <div
              key={elem.id}
              data-i={i}
              data-id={elem.id}
              className="slide"
              onClick={showAlbumsTracks}
              style={{ backgroundImage: `url(${elem.cover_big})` }}
            >
              <p>{elem.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="close"
        ref={closeRef}
        // onClick={() => {
        //   closeRef?.current?.classList.remove('buttonSlideout', 'buttonSlidein')
        //   songsRef?.current?.classList.remove('slideout')
        //   songsRef?.current?.classList.add('slidein')
        // }}
      >
        <i className="fa fa-arrow-right" aria-hidden="true" />
      </div>
      {/* <AlbumSongs songsRef={songsRef} /> */}
    </section>
  )
}

export default Albums
