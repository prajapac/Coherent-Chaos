import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button';

import { CELL_PLAYER_1, CELL_PLAYER_2 } from 'constants';

import './index.scss';

const PlayerPicker = ({className, onClick, onChoose}) => {
    const classes = classNames(className, 'playerPicker');

    return (
        <div className={classes}>
            <Button className='btn' bold text='Player 1' type='primary' onClick={()=>{onChoose(CELL_PLAYER_1)}}/>
            <p>Choose Your Side</p>
            <Button className='btn' bold text='Player 2' type='secondary' onClick={()=>{onChoose(CELL_PLAYER_2)}}/>
        </div>
    )
};

PlayerPicker.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onChoose: PropTypes.func
};

export default PlayerPicker;
