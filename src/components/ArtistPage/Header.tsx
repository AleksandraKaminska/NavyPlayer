import React, { useContext } from 'react'
import { Parallax } from 'react-parallax'
import { Row, Col, Typography, Button, Space } from 'antd'
import { StateContext, DispatchContext } from '../../context/Context'
import { changeArtistTrackList } from '../../helperFunctions'
import { StateType } from '../../reducers'
import { ArtistType } from '../../types/deezerData'

const numberWithSpaces = (n?: number) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

const Header = ({ artist }: { artist: ArtistType }) => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)

  return (
    <Parallax bgImage={artist.picture_xl} strength={-350} className="banner">
      <Row gutter={[16, 12]} className="name">
        <Col>
          <Typography.Title>{artist.name}</Typography.Title>
        </Col>
        <Col>
          <Space size="large">
            <Typography.Text>{numberWithSpaces(artist.nb_fan)} fans</Typography.Text>
            <Button type="primary" onClick={() => changeArtistTrackList(state, dispatch, artist)}>
              Listen
            </Button>
          </Space>
        </Col>
      </Row>
    </Parallax>
  )
}

export default Header
