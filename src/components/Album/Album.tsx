import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PlayCircleFilled } from '@ant-design/icons'
import { StateContext, DispatchContext } from '../../context/Context'
import { AlbumType } from '../../types/deezerData'
import { changeAlbum } from '../../helperFunctions'
import { StateType } from '../../reducers'

function Album({ data }: { data?: AlbumType }) {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  return data ? (
    <div className="Album">
      <Link to={`/albums/${data.id}`}>
        <img src={data?.cover_medium} alt={data.title} />
        <div className="overlay">
          <PlayCircleFilled onClick={() => changeAlbum(state, dispatch, data)} />
        </div>
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
