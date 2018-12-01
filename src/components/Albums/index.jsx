import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from 'store'
import AlbumSongs from './albumSongs'
import fetchJsonp from 'fetch-jsonp'
import { changeAlbumAction } from 'actions/index.js'
import './style.scss'

const windowWidth = window.innerWidth
const showCount =
  windowWidth <= 414 ? 2 : windowWidth > 414 && windowWidth < 768 ? 3 : 7

export class Albums extends Component {
  constructor() {
    super()
    this.sliderRef = React.createRef()
    this.closeRef = React.createRef()
    this.songsRef = React.createRef()
    this.state = {
      currentSliderCount: 0,
      scrollWidth: 0
    }
  }

  handleNext = () => {
    const { currentSliderCount, scrollWidth } = this.state
    this.sliderCount = this.props.albums.length / showCount - 1
    this.setState(
      {
        scrollWidth: scrollWidth + windowWidth
      },
      () => {
        if (currentSliderCount >= this.sliderCount) {
          this.sliderRef.current.style.left = 0
          this.setState({
            currentSliderCount: 0,
            scrollWidth: 0
          })
        } else {
          this.sliderRef.current.style.left = `${-this.state.scrollWidth}px`
          this.setState({
            currentSliderCount: currentSliderCount + 1
          })
        }
      }
    )
  }

  handlePrev = () => {
    const { currentSliderCount, scrollWidth } = this.state
    this.sliderCount = this.props.albums.length / showCount
    this.setState(
      {
        scrollWidth: scrollWidth - windowWidth
      },
      () => {
        if (currentSliderCount) {
          this.sliderRef.current.style.left = `${-this.state.scrollWidth}px`
          this.setState({
            currentSliderCount: currentSliderCount - 1
          })
        } else {
          this.sliderRef.current.style.left = 0
          this.setState({
            currentSliderCount: 0,
            scrollWidth: 0
          })
        }
      }
    )
  }

  showAlbumsTracks = e => {
    e.preventDefault()
    fetchJsonp(
      `https://api.deezer.com/album/${e.currentTarget.dataset.id}?output=jsonp`
    )
      .then(resp => resp.json())
      .then(album => store.dispatch(changeAlbumAction(album)))
    if (this.songsRef.current.style.right !== '0em') {
      this.songsRef.current.classList.remove('slidein')
      this.songsRef.current.classList.add('slideout')
      this.closeRef.current.classList.remove('buttonSlidein')
      this.closeRef.current.classList.add('buttonSlideout')
    }
  }

  render() {
    const { albums } = this.props
    return (
      <section className="albums">
        <h2>Albums</h2>
        <div className="slider-frame">
          <div className="btn prev" onClick={this.handlePrev}>
            <i className="fas fa-chevron-left" />
          </div>
          <div className="btn next" onClick={this.handleNext}>
            <i className="fas fa-chevron-right" />
          </div>
          <div className="slider-container" ref={this.sliderRef}>
            {albums &&
              albums.map((elem, i) => (
                <div
                  key={i}
                  data-i={i}
                  data-id={elem.id}
                  className="slide"
                  onClick={this.showAlbumsTracks}
                  style={{ backgroundImage: `url(${elem.cover_big})` }}
                >
                  <p>{elem.title}</p>
                </div>
              ))}
          </div>
        </div>
        <div
          className="close"
          ref={this.closeRef}
          onClick={() => {
            this.closeRef.current.classList.remove(
              'buttonSlideout',
              'buttonSlidein'
            )
            this.songsRef.current.classList.remove('slideout')
            this.songsRef.current.classList.add('slidein')
          }}
        >
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </div>
        <AlbumSongs songsRef={this.songsRef} />
      </section>
    )
  }
}

const mapStateToProps = ({ albums }) => ({ albums })

export default connect(mapStateToProps)(Albums)

Albums.propTypes = {
  albums: PropTypes.array.isRequired
}
