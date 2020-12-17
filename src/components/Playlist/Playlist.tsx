import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { playPlaylist } from '../../helperFunctions'
import { DispatchContext } from '../../context/Context'
import { PlaylistType } from '../../types/deezerData'

function Playlist({ data }: { data?: PlaylistType }) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  return data ? (
    <div className="Playlist">
      <Link to={`/playlists/${data.id}`} onClick={() => playPlaylist(dispatch, data)}>
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
