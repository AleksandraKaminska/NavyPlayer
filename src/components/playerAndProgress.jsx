import React from 'react';
import Player from './player';
import Progress from './progress';
import SmallCover from './smallCover';

const PlayerAndProgress = () => (
    <section className="playerAndProgress">
        <SmallCover />
        <Player />
        <Progress />
    </section>
);

export default PlayerAndProgress;
