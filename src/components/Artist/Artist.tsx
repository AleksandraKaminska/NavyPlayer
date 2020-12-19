import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { changeArtistTrackList } from '../../helperFunctions'
import { StateContext, DispatchContext } from '../../context/Context'
import { ArtistType } from '../../types/deezerData'
import { StateType } from '../../reducers'

function Artist({ data }: { data?: ArtistType }) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  return data ? (
    <div className="Artist">
      <Link
        to={`/artists/${data.id}`}
        data-testid="artist"
        onClick={() => changeArtistTrackList(state, dispatch, data.id)}
      >
        <img src={data.picture_medium} alt={data.name} />
      </Link>
      <Link to={`/artists/${data.id}`}>
        <p>{data.name}</p>
      </Link>
      {data.nb_fan && <span>{data.nb_fan} Fans</span>}
    </div>
  ) : null
}

export default Artist
