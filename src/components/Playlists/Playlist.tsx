import React, { useContext } from 'react'
import { changePlaylist } from '../../helperFunctions'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { PlaylistType } from '../../types/deezerData'

type PlaylistProps = {
  playlist: PlaylistType
}

function Playlist({ playlist: { id, title, picture_medium } }: PlaylistProps) {
  const { state, dispatch } = useContext(Context)
  return (
    <Link to={`/playlist/${id}`} onClick={() => changePlaylist(state, dispatch, id)}>
      <div className="playlist">
        <img src={picture_medium} alt={title} />
        <p>{title}</p>
      </div>
    </Link>
  )
}

export default Playlist
