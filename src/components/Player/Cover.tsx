import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { StateContext } from '../../context/Context'
import './Cover.less'
import { StateType } from '../../reducers'

const Cover = () => {
  const { track, album } = useContext<StateType>(StateContext)
  return (
    <Space className="Cover">
      <img src={album?.cover_small} alt={album?.title} />
      <div className="data">
        <Link to={`/albums/${album?.id}`} className="title">
          {track?.title}
        </Link>
        <Link to={`/artists/${track?.artist.id}`} className="name">
          {track?.artist.name}
        </Link>
      </div>
    </Space>
  )
}

export default Cover
