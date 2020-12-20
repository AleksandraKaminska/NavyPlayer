import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { changePlaylist } from '../../helperFunctions'
import { DispatchContext, StateContext } from '../../context/Context'
import { PlaylistType } from '../../types/deezerData'
import { StateType } from '../../reducers'

function Playlist({ data }: { data?: PlaylistType }) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  return data ? (
    <div className="Playlist">
      <Link to={`/playlists/${data.id}`} data-testid="playlist" onClick={() => changePlaylist(state, dispatch, data)}>
        <img src={data.picture_medium} alt={data.title} />
      </Link>
      <Link to={`/playlists/${data.id}`}>
        <p>{data.title}</p>
      </Link>
      {data.nb_tracks && <span>{data.nb_tracks} tracks</span>}
    </div>
  ) : null
}

export default Playlist
