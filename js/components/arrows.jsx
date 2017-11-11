import React from 'react';

const LeftArrow = (props) => {
    return (
      <a
        href="#"
        className="carousel__arrow backArrow"
        onClick={props.previousSlide}
      >
        <span className="fa fa-2x fa-angle-left" />
      </a>
    );
}

const RightArrow = (props) => {
    return (
        <a
          href="#"
          className="carousel__arrow nextArrow"
          onClick={props.nextSlide}
        >
          <span className="fa fa-2x fa-angle-right" />
        </a>
    );
}

export { LeftArrow, RightArrow };
