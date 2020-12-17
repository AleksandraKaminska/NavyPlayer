import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { playArtistTracks } from '../../helperFunctions'
import { DispatchContext } from '../../context/Context'
import { ArtistType } from '../../types/deezerData'

function Artist({ data }: { data?: ArtistType }) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  return data ? (
    <div className="Artist">
      <Link to={`/artists/${data.id}`} onClick={() => playArtistTracks(dispatch, data)}>
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
