import React from 'react';

const LeftArrow = (props) => {
  return (
    <span className="backArrow" onClick={props.previousSlide}>&lt;</span>
  );
}

const RightArrow = (props) => {
  return (
    <span className="nextArrow" onClick={props.nextSlide}>&gt;</span>
  );
}

export { LeftArrow, RightArrow };
