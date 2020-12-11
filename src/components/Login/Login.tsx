import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/Context'
import { randomFlowTrack } from '../../helperFunctions'
import { login } from '../../helpers/login'
// import './style.scss'
const { DZ } = window

function Login() {
  const { state, dispatch } = useContext(Context)
  const [logged, setLogged] = useState(false)
  const getLoginStatus = () =>
    DZ?.getLoginStatus(({ status }) => {
      setLogged(status === 'connected')
      if (!logged && status === 'connected') {
        login(dispatch)
      }
    })

  useEffect(() => {
    getLoginStatus()
  }, [])

  const playFlow = () => {
    dispatch({ type: 'FIND_ALBUMS_TRACKS', payload: 0 })
    dispatch({ type: 'ARTIST_PLAYLIST', payload: [] })
    randomFlowTrack(state, dispatch)
  }

  const handleClick = () => {
    if (logged && state.flow.length) {
      playFlow()
    } else {
      login(dispatch)
    }
  }

  return (
    <button className="login" onClick={handleClick}>
      {logged ? 'FLOW' : 'Log In'}
    </button>
  )
}

export default Login
