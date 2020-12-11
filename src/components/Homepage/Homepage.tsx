import React, { useEffect, useContext } from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../../context/Context'
import Playlists from './Playlists'
import Albums from './Albums'
import './Homepage.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Homepage = () => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/chart?index=0&limit=20&output=jsonp`)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: 'TOP_CHART', payload: data }))
  }, [])

  return state.topChart ? (
    <div className="Homepage">
      <Playlists />
      <Albums />
    </div>
  ) : (
    <Spin indicator={antIcon} />
  )
}

export default Homepage
