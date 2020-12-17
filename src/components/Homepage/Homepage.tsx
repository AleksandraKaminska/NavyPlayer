import React, { useEffect, useContext, useState } from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Context } from '../../context/Context'
import Playlist from '../Playlist/Playlist'
import Carousel from '../Carousel/Carousel'
import Album from '../Album/Album'
import './Homepage.less'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Homepage = () => {
  const { state, dispatch } = useContext(Context)
  const [index, setIndex] = useState<number>(0)

  const loadMore = async () => {
    const resp = await (await fetchJsonp(`https://api.deezer.com/chart?index=${index}&limit=20&output=jsonp`)).json()
    const data = await resp
    dispatch({
      type: 'TOP_CHART',
      payload: data
    })
    setIndex(index + 20)
  }

  const onSlideChange = (currentSlide: number, nextSlide: number) => {
    if (nextSlide < currentSlide) {
      loadMore()
    }
  }

  useEffect(() => {
    if (!state.topChart) {
      loadMore()
    }
  }, [])

  return state.topChart ? (
    <div className="Homepage" data-testid="homepage">
      <Carousel
        className="playlists"
        title="Popular playlists"
        slider
        data={state.topChart?.playlists?.data}
        onSlideChange={onSlideChange}
      >
        <Playlist />
      </Carousel>
      <Carousel
        className="albums"
        title="Most streamed albums"
        slider
        data={state.topChart?.albums?.data}
        onSlideChange={onSlideChange}
      >
        <Album />
      </Carousel>
    </div>
  ) : (
    <Spin indicator={antIcon} />
  )
}

export default Homepage
