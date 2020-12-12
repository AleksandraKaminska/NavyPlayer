import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { Context } from '../../context/Context'
import './Cover.less'

const Cover: React.FC = () => {
  const {
    state: { track }
  } = useContext(Context)

  return (
    <Space className="Cover">
      <img src={track?.album.cover_small} alt={track?.album.title} />
      <div className="data">
        <p className="title">{track?.title_short}</p>
        <p className="name">{track?.artist.name}</p>
      </div>
    </Space>
  )
}

export default Cover
