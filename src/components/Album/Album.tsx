import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DispatchContext } from '../../context/Context'
import { AlbumType } from '../../types/deezerData'
import { playAlbum } from '../../helperFunctions'

function Album({ data }: { data?: AlbumType }) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  return data ? (
    <div className="Album" onClick={() => playAlbum(dispatch, data)}>
      <Link to={`/albums/${data.id}`}>
        <img src={data?.cover_medium} alt={data.title} />
      </Link>
      <Link to={`/albums/${data.id}`}>
        <p>{data.title}</p>
      </Link>
      <Link to={`/artist/${data.artist?.id}`}>
        <span>{data.artist?.name}</span>
      </Link>
    </div>
  ) : null
}

export default Album
