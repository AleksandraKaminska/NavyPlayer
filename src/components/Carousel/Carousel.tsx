import React, { useRef, useEffect, useContext } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { Row, Col, Carousel, Button } from 'antd'
import { Context } from '../../context/Context'
import { searchApi } from '../../helpers/search'
import './Carousel.less'

export interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void
  next: () => void
  prev: () => void
  autoPlay: boolean
  innerSlider: any
}

type CarouselProps = {
  children: React.ReactElement
  className?: string
  title: string
  link?: LinkProps['to']
  data?: Array<any>
  slider?: boolean
  onSlideChange?: any
  rounded?: boolean
  type?: string
}

function Slider({ children, title, link, data, slider, onSlideChange, className, rounded, type }: CarouselProps) {
  const carousel = useRef<CarouselRef | null>(null)
  const { state }: any = useLocation()
  const {
    state: { searchResults },
    dispatch
  } = useContext(Context)
  const currentType = type && state?.type === type + 's'

  const header = link ? (
    currentType ? (
      `${data?.length} ${title}`
    ) : (
      <Link to={link}>
        {title} <RightOutlined style={{ fontSize: '14px', verticalAlign: 'baseline' }} />
      </Link>
    )
  ) : (
    title
  )

  useEffect(() => {
    if (currentType) {
      searchApi('hello', type, 100).then(({ data }) =>
        dispatch({ type: 'SEARCH', payload: { ...searchResults, [type + 's']: { data } } })
      )
    }
  }, [state?.type, type])

  return (
    <div className={`Carousel ${className || ''}`}>
      <h2>{header}</h2>
      {slider ? (
        <>
          <Carousel
            ref={carousel}
            slidesToShow={6}
            slidesToScroll={6}
            draggable
            arrows
            dots={false}
            adaptiveHeight
            prevArrow={<ArrowLeft />}
            nextArrow={<ArrowRight />}
            swipeToSlide
            beforeChange={onSlideChange}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4
                }
              },
              {
                breakpoint: 1600,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5
                }
              }
            ]}
          >
            {data?.map((element) => (
              <div key={element.id} className="slide" data-rounded={rounded}>
                {React.cloneElement(children, { data: element, rounded: rounded })}
              </div>
            ))}
          </Carousel>
        </>
      ) : (
        <Row justify="space-between">
          {data?.map((element) => (
            <Col key={element.id} data-rounded={rounded}>
              {React.cloneElement(children, { data: element, rounded: rounded })}
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

const ArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <Button
    {...props}
    className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
    icon={<LeftOutlined />}
  />
)
const ArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <Button
    {...props}
    className={'slick-next slick-arrow' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
    icon={<RightOutlined />}
  />
)

export default Slider
