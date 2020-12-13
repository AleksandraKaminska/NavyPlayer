import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { changeArtistTrackList } from '../../helperFunctions'
import { Context } from '../../context/Context'
import { ArtistType } from '../../types/deezerData'

function Artist({ data }: { data?: ArtistType }) {
  const { state, dispatch } = useContext(Context)
  return data ? (
    <div className="Artist">
      <Link to={`/artists/${data.id}`} onClick={() => changeArtistTrackList(state, dispatch, data.id)}>
        <img src={data.picture_medium} alt={data.name} />
      </Link>
      <Link to={`/artists/${data.id}`}>
        <p>{data.name}</p>
      </Link>
      <span>{data.nb_fan} Fans</span>
    </div>
  ) : null
}

export default Artist
