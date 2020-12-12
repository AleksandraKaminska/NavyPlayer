import React, { useState, useContext, useEffect } from 'react'
// import Login from '../Login'
// import Nav from '../Nav'
// import Player from '../Player'
// import Footer from '../Footer'
// import ArtistInfo from '../Artist'
// import Songs from '../Songs'
// import ArtistPlaylists from '../ArtistPlaylist'
// import Similar from '../Similar'
// import Albums from '../Albums'
import fetchJsonp from 'fetch-jsonp'
import { Context } from '../../context/Context'
// import './artist.less'

const ArtistPage: React.FC = () => {
  const { state, dispatch } = useContext(Context)
  const [artist, setArtist] = useState('')
  const [artistImage, setArtistImage] = useState('')
  const [artistGeneres, setArtistGeneres] = useState([])
  const [artistBio, setArtistBio] = useState('')

  const fetchArtistInfo = (artist) =>
    fetchJsonp(`https://api.deezer.com/artist/${artist}?output=jsonp`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setArtist(artist)
        setArtistImage(data.picture_xl)
        setArtistBio('')
        setArtistGeneres([])
      })

  useEffect(() => {
    fetchArtistInfo(state.artist)
  }, [state.artist])

  return (
    <div
      className="ArtistPage"
      // style={{
      //   backgroundImage: `linear-gradient(to left,rgba(0,0,0,0) 5%, #000a11 92%), url(${artist.replace(
      //     /(300)x\1/,
      //     '1000x1000'
      //   )})`
      // }}
    >
      {/* <ArtistInfo data={this.state} /> */}
      {/* <Songs />
      <ArtistPlaylists />
      <Similar />
      <Albums /> */}
    </div>
  )
}

export default ArtistPage
