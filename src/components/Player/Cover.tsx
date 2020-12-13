import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { Context } from '../../context/Context'
import './Cover.less'

const Cover = () => {
  const {
    state: { track }
  } = useContext(Context)

  return (
    <Space className="Cover">
      <img src={track?.album?.cover_small} alt={track?.album?.title} />
      <div className="data">
        <Link to={`/album/${track?.album?.id}`} className="title">
          {track?.title_short}
        </Link>
        <Link to={`/artist/${track?.artist.id}`} className="name">
          {track?.artist.name}
        </Link>
      </div>
    </Space>
  )
}

export default Cover
