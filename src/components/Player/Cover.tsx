import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { StateContext } from '../../context/Context'
import './Cover.less'
import { StateType } from '../../reducers'

const Cover = () => {
  const { track } = useContext<StateType>(StateContext)

  return (
    <Space className="Cover">
      <img src={track?.album?.cover_small} alt={track?.album?.title} />
      <div className="data">
        <Link to={`/albums/${track?.album?.id}`} className="title">
          {track?.title_short}
        </Link>
        <Link to={`/artists/${track?.artist.id}`} className="name">
          {track?.artist.name}
        </Link>
      </div>
    </Space>
  )
}

export default Cover
