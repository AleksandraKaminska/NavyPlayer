import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import Albums from './albums.jsx';
import PlayAlbum from './playAlbum.jsx';
import AlbumsTracks from './albumsTracks.jsx';
import { LeftArrow, RightArrow } from './arrows.jsx';

class ChooseAlbums extends React.Component {
    constructor(props) {
        super(props);
        this.scaling = 1.5;
        this.controlsWidth = 40;
        this.state = {
            current: 0,
            currentSliderCount: 0,
            videoCount: 0,
            scrollWidth: 0,
            showCount: 4         
        }
    }

    previousSlide(e) {
        e.preventDefault();
        let current = this.state.current;
        let imageArray = this.props.albums.length - 1;

        if (current >= 1) {
            this.setState({
                current: current - 1
            })
        }
        if (current <= 0) {
            this.setState({
                current: imageArray
            })
        }
    }

    nextSlide(e) {
        e.preventDefault();
        let current = this.state.current;
        let imageArray = this.props.albums.length - 1;

        if ((current >= 0) && (current < imageArray)) {
            this.setState({
                current: current + 1
            })
        }
        if (current >= imageArray) {
            this.setState({
                current: 0
            })
        }
    }

    init(){
        // elements
        var sliderFrame = $(".slider-frame");
        var sliderContainer = $(".slider-container");
        this.setState({
            scrollWidth: 0
        });

        //sizes
        var windowWidth = window.innerWidth;
        var frameWidth = window.innerWidth - 80;
        this.setState({
            showCount: windowWidth >= 0 && windowWidth <= 414 ? 2 : windowWidth >= 414 &&  windowWidth <= 768 ? 3 : 4
        });
        var videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        var videoHeight = Math.round(videoWidth / (16/9));
        
        var videoHeightDiff = (videoHeight * this.scaling) - videoHeight;
      
        
        //set sizes
        sliderFrame.width(windowWidth);
        sliderFrame.height(videoHeight * this.scaling);
        
        sliderContainer.height(videoHeight * (this.scaling));
        sliderContainer.css("top", (videoHeightDiff / 2));
        sliderContainer.css("margin-left", (this.controlsWidth));
        
        // controls
        this.controls(frameWidth, this.state.scrollWidth);
    }

    controls(frameWidth, scrollWidth) {
        let sliderCount;
        var prev = $(".prev");
        var next = $(".next");

        next.on("click", () => {
            sliderCount = this.props.albums.length / this.state.showCount;
            scrollWidth = scrollWidth + frameWidth;
            $('.slider-container').animate({
                left: -scrollWidth
            }, 300, () => { 
                if ( this.state.currentSliderCount >= sliderCount - 1 ) {
                    $(".slider-container").css("left", 0);
                    this.setState({
                        currentSliderCount: 0
                    });
                    scrollWidth = 0;
                } else {
                    this.setState({
                        currentSliderCount: this.state.currentSliderCount + 1
                    });
                }
            });        
        });
        prev.on("click", () => {
            sliderCount = this.props.albums.length / this.state.showCount;
            scrollWidth = scrollWidth - frameWidth;
            $('.slider-container').animate({
                left: -scrollWidth
            }, 300, () => { 
                if ( this.state.currentSliderCount === 0 ) {
                    $(".slider-container").css("left", 0);
                    this.setState({
                        currentSliderCount: 0
                    });
                    scrollWidth = 0;
                } else {
                    this.setState({
                        currentSliderCount: this.state.currentSliderCount - 1
                    });
                }
            });
        });
    };

    mouseover(e) {
        e.preventDefault();
        let el = e.currentTarget;
        let windowWidth = window.innerWidth;
        let frameWidth = windowWidth - 80;
        let videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        let videoHeight = Math.round(videoWidth / (16/9));
        let videoWidthDiff = (videoWidth * this.scaling) - videoWidth;
        let videoHeightDiff = (videoHeight * this.scaling) - videoHeight;
        
        $(el).css("width", videoWidth * this.scaling);
        $(el).css("height", videoHeight * this.scaling);
        $(el).css("top", -(videoHeightDiff / 2));
        
        if(e.currentTarget.dataset.i === 0 || e.currentTarget.dataset.i % 4 === 0){
            // do nothing
        }
        else if(e.currentTarget.dataset.i + 1 % 4 === 0 && e.currentTarget.dataset.i !== 0){
            $(e).parent().css("margin-left", -(videoWidthDiff - this.controlsWidth));
        }
        else{
            $(e).parent().css("margin-left", - (videoWidthDiff / 2));
        }
    }

    mouseout(e) {
        e.preventDefault();
        let el = e.currentTarget;
        let windowWidth = window.innerWidth;
        
        let frameWidth = window.innerWidth - 80;
        let videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        let videoHeight = Math.round(videoWidth / (16/9));
        
        $(el).css("width", videoWidth);
        $(el).css("height", videoHeight);
        $(el).css("top", 0);
        $(e).parent().css("margin-left", this.controlsWidth);
    }

    componentDidMount() {
        this.setState({
            videoCount: this.props.albums.length
        });
        this.init();
    }

    render() {
        let li = this.props.albums
                 .map((elem, i) => <Albums
                                    key={i}
                                    elem={elem}
                                    current={this.state.current}
                                    length={this.props.albums.length}
                                    i={i} />);

        let songs = <li></li>;
        if (this.props.album.tracks) {
            songs = this.props.album.tracks.data
                .map((song, i) => <AlbumsTracks
                                      song={song}
                                      i={i}
                                      key={i} />);
        }

        let win = $(window);
        var slide = $(".slide");
        var sliderContainer = $(".slider-container");

        //sizes
        var windowWidth = win.width();
        var frameWidth = win.width() - 80;
    
        var videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        var videoHeight = Math.round(videoWidth / (16/9));

        var videoWidthDiff = (videoWidth * this.scaling) - videoWidth;
        sliderContainer.width((videoWidth * this.props.albums.length) + videoWidthDiff);

        slide.height(videoHeight);
        slide.width(videoWidth); 

        return (
            <section id="albums" style={{padding: '0 4em'}}>
                <h2>Albums</h2>
                <article className="list">
                        {this.props.albums.length > 9 || this.state.current !== 0 ? <LeftArrow previousSlide={this.previousSlide.bind(this)} /> : null}
                        <ul>{li}</ul>
                        {this.props.albums.length > 9 || this.state.current !== 0 ? <RightArrow nextSlide={this.nextSlide.bind(this)} /> : null}
                </article>
                {innerWidth >= 870 ? <div className="close" onClick={()=>{
                  document.querySelector('.close').classList.remove('buttonSlideout');
                  document.querySelector('.close').classList.remove('buttonSlidein');
                  document.querySelector('.songs').classList.remove('slideout');
                  document.querySelector('.songs').classList.add('slidein');
                }}><i className="fa fa-arrow-right" aria-hidden="true"></i></div> : null}
                <div className="songs" style={innerWidth >= 870 ? {width: '25em', right: '-27em'} : {width: '100%'}}>
                    <PlayAlbum/>
                    <ul>{songs}</ul>
                </div>
                {/*<div className="slider-frame" style={{marginBottom: '2em'}}>
    <div className="btn prev"></div>
    <div className="btn next"></div>
    <div className="slider-container">
        {this.props.albums.map((elem, i) => <div key={i} data-i={i} data-img={elem.cover_big} className="slide" 
            onMouseOver={this.mouseover.bind(this)} 
            onMouseOut={this.mouseout.bind(this)} style={{
                width: videoWidth, 
                height: videoHeight, 
                backgroundImage: `url(${elem.cover_big})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '10em'
            }}>
        </div>)}
    </div>
</div>*/}
            </section>
        );
    }
}

const mapStateToProps = store => {
    return {
        albums: store.albums,
        album: store.album
    };
};

export default connect(mapStateToProps)(ChooseAlbums);
