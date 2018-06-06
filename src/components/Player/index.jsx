import React from 'react'
import Controls from './Controls'
import Progress from './Progress'
import SmallCover from './SmallCover'
import './style.css'

const Player = () => (
  <section className='player'>
    <SmallCover />
    <Controls />
    <Progress />
  </section>
)

export default Player
