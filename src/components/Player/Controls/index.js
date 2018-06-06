import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import store from 'store';
import { searchArtistInfo, random } from 'helperFunctions';
import Rewind from './rewind';
import Forward from './forward';

const { DZ } = window;

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Controls extends Component {
    constructor() {
        super();
        this.state = { isPlaying: false }
        this.progress = React.createRef()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.track.id && nextProps.track !== this.props.track ) {
            this.setState({ isPlaying: true });
        }
    }

    changeIsPlaying = () => {
        this.setState(
            { isPlaying: !DZ.player.isPlaying() },
            () => DZ.player.isPlaying() ? DZ.player.pause() : DZ.player.play()
        );
    }

    changeTrack = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause()
            random(this.props)
        });
    }

    changeVolume = ({ target, clientY }) => {
        const { y, height } = target.getBoundingClientRect()
        const perc = ( clientY - y ) / height * 100
        DZ.player.setVolume(perc)
    }

    rewind = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause();
            const { prev } = this.props;
            if (prev.length) {
                promise.then(result => {
                    store.dispatch(actions.changeTrackAction(prev.slice(-1)[0]));
                    store.dispatch(actions.prevTrackAction(prev.slice(-1)[0]));
                    DZ.player.playTracks([this.props.track.id]);
                    searchArtistInfo(this.props.track);
                }, err => console.log(err));
            } else {
                random(this.props)
            }
        });
    }

    render() {
        return (
            <div className="controls">
                <button>
                    <img
                        onClick={() => this.progress.current.style.display = this.progress.current.style.display === 'none' ? 'block' : 'none' }
                        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDc5LjE0NCA3OS4xNDQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDc5LjE0NCA3OS4xNDQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDUuNzgsNTAuNjEzYy0wLjg2MSwwLjY5MS0wLjk5OSwxLjk1LTAuMzA4LDIuODEyYzAuMzk2LDAuNDkyLDAuOTc2LDAuNzQ4LDEuNTYxLDAuNzQ4YzAuNDM5LDAsMC44ODItMC4xNDQsMS4yNTEtMC40NCAgICBjNC4zMDMtMy40NTUsNi43Ny04LjU5Nyw2Ljc2OS0xNC4xMDhjMC01LjUzLTIuNDgtMTAuNjg0LTYuODA3LTE0LjEzOGMtMC44NjEtMC42OS0yLjEyMi0wLjU0OC0yLjgxMSwwLjMxNCAgICBjLTAuNjg5LDAuODYzLTAuNTQ5LDIuMTIxLDAuMzE0LDIuODExYzMuMzcsMi42OTEsNS4zMDMsNi43MDUsNS4zMDMsMTEuMDEzQzUxLjA1NCw0My45MTYsNDkuMTMyLDQ3LjkyMSw0NS43OCw1MC42MTN6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPHBhdGggZD0iTTU1LjQ5LDYyLjE5NmMwLjQzOSwwLDAuODgyLTAuMTQ0LDEuMjUxLTAuNDRjNi43NDctNS40MTcsMTAuNjE2LTEzLjQ4MSwxMC42MTUtMjIuMTI1ICAgIGMtMC4wMDItOC42Ny0zLjg5NC0xNi43NS0xMC42NzYtMjIuMTY5Yy0wLjg2MS0wLjY4OS0yLjEyMi0wLjU1Mi0yLjgxMSwwLjMxNGMtMC42ODksMC44NjItMC41NDksMi4xMjEsMC4zMTQsMi44MTEgICAgYzUuODI3LDQuNjU2LDkuMTcsMTEuNTk4LDkuMTcyLDE5LjA0NGMwLjAwMSw3LjQyNS0zLjMyMywxNC4zNTMtOS4xMTksMTkuMDA2Yy0wLjg2MSwwLjY5MS0wLjk5OSwxLjk1LTAuMzA4LDIuODEyICAgIEM1NC4zMjUsNjEuOTQsNTQuOTA1LDYyLjE5Niw1NS40OSw2Mi4xOTZ6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPHBhdGggZD0iTTYzLjM5LDcwLjMwNGMwLjQzOSwwLDAuODgyLTAuMTQ1LDEuMjUxLTAuNDRjOS4yMTctNy40MDIsMTQuNTAzLTE4LjQxOSwxNC41MDMtMzAuMjI2ICAgIEM3OS4xNDEsMjcuNzk2LDczLjgyNSwxNi43NTcsNjQuNTYsOS4zNTNjLTAuODY0LTAuNjg5LTIuMTItMC41NTEtMi44MTIsMC4zMTNjLTAuNjg5LDAuODYzLTAuNTQ5LDIuMTIyLDAuMzEzLDIuODEyICAgIGM4LjMxMiw2LjY0MiwxMy4wNzksMTYuNTQxLDEzLjA4MiwyNy4xNjFjMCwxMC41ODctNC43NDEsMjAuNDY3LTEzLjAwNywyNy4xMDVjLTAuODYxLDAuNjkxLTAuOTk5LDEuOTUxLTAuMzA4LDIuODEyICAgIEM2Mi4yMjUsNzAuMDQ4LDYyLjgwNSw3MC4zMDQsNjMuMzksNzAuMzA0eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTxwYXRoIGQ9Ik0wLDI4LjYyNXYyMi4wNjJjMCwzLjc0NCwzLjI1Nyw2LjQxLDYuNjQ2LDYuNDFoOS43NDljMi4wNTMsMSwxMS42MDQsOC41MDMsMTkuODA2LDE1LjUxICAgIGMwLjM2OSwwLjMxNSwwLjgzMSwwLjU3NCwxLjI5OSwwLjU3NGMwLjI4NCwwLDAuMzE5LTAuMDEzLDAuNTg3LTAuMTM2QzM4Ljc5Niw3Mi43MTgsMzksNzIuMDU3LDM5LDcxLjI3NlY4LjAzNSAgICBjMC0wLjc4OC0wLjIxMi0xLjUwMi0wLjkzMS0xLjgyNGMtMC43MTgtMC4zMjMtMS40MzYtMC4zODUtMi4wMjMsMC4xNGMtOC4xNzksNy4yNzEtMTcuNTg2LDE1Ljc0Ni0xOS42NjUsMTUuNzQ2SDYuNjQ3ICAgIEMzLjA4NSwyMi4wOTcsMCwyNS4wNjMsMCwyOC42MjV6IE00LDI4LjYyNWMwLTEuMzI0LDEuMzIyLTIuNTI4LDIuNjQ2LTIuNTI4aDkuOTI4YzAuNzQyLDAsMi40MjYsMC4zODEsMTguNDI2LTEzLjYzMXY1NC40OTMgICAgQzE5LDUzLjQ3OCwxNy4zMTIsNTMuMDk3LDE2LjU3NCw1My4wOTdINi42NDZDNS4zNjIsNTMuMDk3LDQsNTIuMDM1LDQsNTAuNjg3VjI4LjYyNXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
                        alt=""
                    />
                    <progress
                        onClick={this.changeVolume}
                        className="volume"
                        max="1"
                        value={DZ.player.getVolume()}
                        ref={this.progress}
                    />
                </button>
                <button>
                    <Rewind onClick={this.rewind} />
                </button>
                <button onClick={this.changeIsPlaying}>
                    <img
                        src={this.state.isPlaying
                            ? '/assets/images/pause.png'
                            : "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQxLjk5OSA0MS45OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQxLjk5OSA0MS45OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBkPSJNMzYuMDY4LDIwLjE3NmwtMjktMjBDNi43NjEtMC4wMzUsNi4zNjMtMC4wNTcsNi4wMzUsMC4xMTRDNS43MDYsMC4yODcsNS41LDAuNjI3LDUuNSwwLjk5OXY0MCAgYzAsMC4zNzIsMC4yMDYsMC43MTMsMC41MzUsMC44ODZjMC4xNDYsMC4wNzYsMC4zMDYsMC4xMTQsMC40NjUsMC4xMTRjMC4xOTksMCwwLjM5Ny0wLjA2LDAuNTY4LTAuMTc3bDI5LTIwICBjMC4yNzEtMC4xODcsMC40MzItMC40OTQsMC40MzItMC44MjNTMzYuMzM4LDIwLjM2MywzNi4wNjgsMjAuMTc2eiBNNy41LDM5LjA5NVYyLjkwNGwyNi4yMzksMTguMDk2TDcuNSwzOS4wOTV6IiBmaWxsPSIjRkZGRkZGIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
                        }
                        alt=""
                    />
                </button>
                <button>
                    <Forward onClick={this.changeTrack} />
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({ track, prev, chosenPlaylist, album, flow, artist, artistPlaylist }) => ({
    track,
    prev,
    chosenPlaylist,
    album,
    flow,
    artist,
    artistPlaylist
});

export default connect(mapStateToProps)(Controls);
