import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.playlists = [
            1479458365, 1925105902, 1934257882,
            1911222042, 2272152422, 1320283135,
            1910344822, 801618141, 1358731495, 733113466,
            1282483245, 3155776842, 3188520162,
            1242578051, 1057779131, 1653487581,
            715214945, 3570967222, 2097558104,
            2734448044, 1282495565, 1728093421,
            1306931615, 2178064502, 1977689462,
            1964028802, 1677006641, 1290756705,
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
