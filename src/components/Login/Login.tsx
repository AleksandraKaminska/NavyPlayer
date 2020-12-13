import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'antd'
import { Context } from '../../context/Context'
import { randomFlowTrack } from '../../helperFunctions'
import { login } from '../../helpers/login'
// import './style.less'
const { DZ } = window

function Login() {
  const { state, dispatch } = useContext(Context)
  const [logged, setLogged] = useState(false)

  const getLoginStatus = () =>
    DZ?.ready(() =>
      DZ?.getLoginStatus(({ status }) => {
        setLogged(status === 'connected')
        if (!logged && status === 'connected') {
          login(dispatch)
        }
      })
    )

  useEffect(getLoginStatus, [])

  const playFlow = () => {
    dispatch({ type: 'ALBUMS_TRACKS', payload: 0 })
    dispatch({ type: 'ARTIST_TRACK_LIST', payload: undefined })
    randomFlowTrack(state, dispatch)
  }

  const handleClick = () => {
    if (logged) {
      playFlow()
    } else {
      login(dispatch)
    }
  }

  return (
    <Button className="login" size="large" type="primary" ghost onClick={handleClick}>
      {logged ? 'FLOW' : 'Log In'}
    </Button>
  )
}

export default Login
