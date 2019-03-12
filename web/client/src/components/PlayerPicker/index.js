import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button';

import { PLAYER_1, PLAYER_2 } from 'constants';

import './index.scss';

const PlayerPicker = ({className, onChoose}) => {
    const classes = classNames(className, 'playerPicker');

    return (
        <div className={classes}>
            <Button className='picker-btn' bold text='Player 1' type='primary' onClick={()=>{onChoose(PLAYER_1);}}/>
            <p>Choose Your Side</p>
            <Button className='picker-btn' bold text='Player 2' type='secondary' onClick={()=>{onChoose(PLAYER_2);}}/>
        </div>
    );
};

PlayerPicker.propTypes = {
    className: PropTypes.string,
    onChoose: PropTypes.func
};

PlayerPicker.defaultProps = {
    onChoose: () => {}
};

export default PlayerPicker;
