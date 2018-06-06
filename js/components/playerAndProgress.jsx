import React from 'react';

import Player from './player.jsx';
import Progress from './progress.jsx';
import SmallCover from './smallCover.jsx';

class PlayerAndProgress extends React.Component {
    render() {
        return (
            <section className="playerAndProgress">
			    	    <SmallCover />
                <Player />
                <Progress />
            </section>
        );
    }
}

export default PlayerAndProgress;
