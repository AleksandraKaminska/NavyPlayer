import React, { useState } from 'react'
import Controls from './Controls'
import Progress from './Progress'
import Volume from './Volume'
import SmallCover from './SmallCover'
// import './style.scss'

const Player: React.FC = () => {
  const [repeat, setRepeat] = useState<boolean>(false)

  const toggleRepeat = () => setRepeat(!repeat)

  return (
    <section className="player">
      <SmallCover />
      <Controls repeat={repeat} />
      <Progress />
      <Volume repeat={repeat} changeRepeat={toggleRepeat} />
    </section>
  )
}

export default Player
