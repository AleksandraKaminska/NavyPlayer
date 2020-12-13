import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { changePlaylist } from '../../helperFunctions'
import { Context } from '../../context/Context'
import { PlaylistType } from '../../types/deezerData'

function Playlist({ data }: { data?: PlaylistType }) {
  const { state, dispatch } = useContext(Context)
  return data ? (
    <div className="Playlist">
      <Link to={`/playlists/${data.id}`} onClick={() => changePlaylist(state, dispatch, data.id)}>
        <img src={data.picture_medium} alt={data.title} />
      </Link>
      <Link to={`/playlists/${data.id}`}>
        <p>{data.title}</p>
      </Link>
      <span>{data.nb_tracks} tracks</span>
    </div>
  ) : null
}

export default Playlist
