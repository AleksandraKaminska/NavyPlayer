import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const SmallCover: React.FC = () => {
  const {
    state: { track }
  } = useContext(Context)

  return (
    <Link to="/">
      <div className="small">
        <img className="smallCover" src={track?.album.cover_medium} alt={track?.album.title} />
        <div className="smallTitle">
          <p>{track?.title_short}</p>
          <p>{track?.artist.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default SmallCover
