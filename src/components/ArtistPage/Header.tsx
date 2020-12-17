import React, { useContext } from 'react'
import { Row, Col, Typography, Button, Space } from 'antd'
import { StateContext, DispatchContext } from '../../context/Context'
import { random } from '../../helperFunctions'
import './ArtistPage.less'
import { StateType } from '../../reducers'

const { Title, Text } = Typography

const Header = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const { artist } = state

  const numberWithSpaces = (n?: number) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <Row
      gutter={[16, 12]}
      className="name"
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0) 10%, #000a11 95%), url(${artist?.picture_xl})`
      }}
    >
      <Col span={24}>
        <Title>{artist?.name}</Title>
      </Col>
      <Col>
        <Space size="large">
          <Text>{numberWithSpaces(artist?.nb_fan)} fans</Text>
          <Button type="primary" onClick={() => random(state, dispatch)}>
            Listen
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Header
