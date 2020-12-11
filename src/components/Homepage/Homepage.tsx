import React, { useEffect, useContext } from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Context } from '../../context/Context'
import Playlists from './Playlists'
import Albums from './Albums'
import './Homepage.scss'

const Homepage = () => {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/chart?index=0&limit=20&output=jsonp`)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: 'TOP_CHART', payload: data }))
  }, [])

  return (
    <div className="Homepage">
      <Playlists />
      <Albums />
    </div>
  )
}

export default Homepage
