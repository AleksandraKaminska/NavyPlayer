import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { randomArtistTrack } from '../../helperFunctions'
import { Context } from '../../context/Context'
// import './style.scss'

function Artist() {
  const { state, dispatch } = useContext(Context)

  const runArtistPlaylist = () => {
    dispatch({ type: 'CHANGE_PLAYLIST', payload: 0 })
    dispatch({ type: 'FIND_ALBUMS_TRACKS', payload: 0 })
    randomArtistTrack(state, dispatch)
  }

  return (
    <section className="Artist">
      <h1 className="name">
        {state.artist?.name}
        <Link to={`/artist/${state.artist?.id}`} className="listen">
          <button onClick={runArtistPlaylist}>Listen</button>
        </Link>
      </h1>

      {/* <p className="bio">{(data && data.artistBio) || ''}</p>
      <div className="genres">
        {data &&
          data.artistGeneres.map((e) => (
            <div key={e} className="artist__info__genre">
              {e}
            </div>
          ))}
      </div> */}
    </section>
  )
}

export default Artist
