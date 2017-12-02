import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.playlists = [
            3773396182, 3773404202, 3773392382, 2506704664, 3850597162,
            1057779131, 1266972311,
            715214945, 3570967222, 2097558104,
            1282483245, 2734448044, 1282495565,
            1728093421,
            1306931615, 2178064502, 1927928822,
            1977689462, 1964028802, 1677006641,
            1290756705, 1154685481, 515157085,
            1386209585, 1182263621, 2265794682,
            1661692771, 2558770224, 975986691
        ];
    }

    toggleOpacity = (event) => {
        if (window.innerWidth >= 870) {
            event.currentTarget.querySelectorAll('div > div:not(.active)')
            .forEach(e => e.className = e.className ? '' : 'fade');
        }
    }

    render() {
        return (
            <section id="playlists" onMouseEnter={this.toggleOpacity} onMouseLeave={this.toggleOpacity}>
                <div>
                    {this.playlists.map((elem, i) => <Playlist elem={elem} key={i} />)}
                </div>
            </section>
        );
    }
}

export default ChoosePlaylists;
