import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { AlbumType } from '../../types/deezerData'
import { changeAlbum } from '../../helperFunctions'

function Album({ data }: { data?: AlbumType }) {
  const { state, dispatch } = useContext(Context)
  return data ? (
    <div className="Album" onClick={() => changeAlbum(state, dispatch, data.id)}>
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
