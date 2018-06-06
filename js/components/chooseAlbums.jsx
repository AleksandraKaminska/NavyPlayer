import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import PlayAlbum from './playAlbum.jsx';
import AlbumsTracks from './albumsTracks.jsx';

class ChooseAlbums extends React.Component {
    constructor(props) {
        super(props);
        this.scaling = 2;
        this.controlsWidth = 40;
        this.state = {
            currentSliderCount: 0,
            showCount: $(window).width() <= 414 ? 2 : $(window).width() >= 414 && $(window).width() <= 768 ? 3 : 7
        }
    }

    init(){
        let sliderFrame = $(".slider-frame");
        let sliderContainer = $(".slider-container");
        this.setState({
            scrollWidth: 0
        });

        let windowWidth = $(window).width();

        this.setState({
            showCount: windowWidth <= 414 ? 2 : windowWidth >= 414 &&  windowWidth <= 768 ? 3 : 7
        });

        let videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        let videoHeight = Math.round(videoWidth / (16/9));
        let videoHeightDiff = (videoHeight * this.scaling) - videoHeight;
      
        sliderFrame.width(windowWidth);
        sliderFrame.height(videoHeight * this.scaling);
        
        sliderContainer.height(videoHeight * (this.scaling));
        sliderContainer.css({top: videoHeightDiff / 2, marginLeft: this.controlsWidth});
        
        this.controls();
    }

    controls() {
        let scrollWidth = 0;
        let frameWidth = $(window).width() - 80;
        let sliderCount;
        let prev = $(".prev");
        let next = $(".next");

        next.on("click", () => {
            sliderCount = this.props.albums.length / this.state.showCount - 1;
            scrollWidth = scrollWidth + frameWidth;
            $('.slider-container').animate({
                left: -scrollWidth
            }, 300, () => { 
                if ( this.state.currentSliderCount >= sliderCount ) {
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
        let windowWidth = $(window).width();
        const el = e.currentTarget;
        let videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        let videoHeight = Math.round(videoWidth / (16/9));
        let videoWidthDiff = (videoWidth * this.scaling) - videoWidth;
        let videoHeightDiff = (videoHeight * this.scaling) - videoHeight;
        
        $(el).css({width: videoWidth * this.scaling, height: videoHeight * this.scaling, top: -(videoHeightDiff / 2)}).find('p').css('display', 'block');
        
        if ((parseInt(el.dataset.i) + 1) % this.state.showCount === 0) {
            $(el).parent().css("margin-left", -(videoWidthDiff - this.controlsWidth));
        } else if (parseInt(el.dataset.i) % this.state.showCount) {
            $(el).parent().css("margin-left", - (videoWidthDiff / 2));
        }
    }

    mouseout(e) {
        e.preventDefault();
        const el = e.currentTarget;
        let windowWidth = $(window).width();
        let videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        let videoHeight = Math.round(videoWidth / (16/9));
        
        $(el).css({width: videoWidth, height: videoHeight, top: 0}).parent().css("margin-left", this.controlsWidth);
        $(el).find('p').css('display', 'none');
    }

    componentDidMount() {
        this.init();
    }

    showAlbumsTracks(e) {
        e.preventDefault();
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/album/${e.currentTarget.dataset.id}?output=jsonp`,
            success: response => store.dispatch({
                type: 'FIND_ALBUMSTRACKS',
                album: response
            })
        });
        this.mouseout(e);
        if ($(window).width() >= 870 && $('.songs').css("right") !== '0em') {
            $('.songs').removeClass('slidein').addClass('slideout');
            $('.close').removeClass('buttonSlidein').addClass('buttonSlideout');
        }
    }

    render() {
        let songs;
        if (this.props.album.tracks) {
            songs = this.props.album.tracks.data.map((song, i) => <AlbumsTracks song={song} i={i} key={i} />);
        }

        let win = $(window);
        let slide = $(".slide");
        let sliderContainer = $(".slider-container");

        //sizes
        let windowWidth = win.width();
        let frameWidth = win.width() - 80;
    
        let videoWidth = ((windowWidth - this.controlsWidth * 2) / this.state.showCount );
        let videoHeight = Math.round(videoWidth / (16/9));

        let videoWidthDiff = (videoWidth * this.scaling) - videoWidth;
        sliderContainer.width((videoWidth * this.props.albums.length) + videoWidthDiff);

        slide.height(videoHeight);
        slide.width(videoWidth); 

        return (
            <section id="albums">
                <h2>Albums</h2>
                <div className="slider-frame">
                    <div className="btn prev"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                    <div className="btn next"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                    <div className="slider-container">
                        {this.props.albums.map((elem, i) => <div key={i} 
                            data-i={i} data-id={elem.id} className="slide" 
                            onMouseOver={this.mouseover.bind(this)} 
                            onMouseOut={this.mouseout.bind(this)} 
                            onClick={this.showAlbumsTracks.bind(this)}
                            style={{
                                width: videoWidth, 
                                height: videoHeight, 
                                backgroundImage: `url(${elem.cover_big})`
                            }}>
                            <p style={{display: 'none'}}>{elem.title}</p>
                        </div>)}
                    </div>
                </div>
                {windowWidth >= 870 ? <div className="close" onClick={()=>{
                  $('.close').removeClass('buttonSlideout buttonSlidein');
                  $('.songs').removeClass('slideout').addClass('slidein');
                }}><i className="fa fa-arrow-right" aria-hidden="true"></i></div> : null}
                <div className="songs" style={windowWidth >= 870 ? {width: '25em', right: '-27em'} : {width: '100%'}}>
                    <PlayAlbum/>
                    {songs ? <ul>{songs}</ul> : null}
                </div>
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
