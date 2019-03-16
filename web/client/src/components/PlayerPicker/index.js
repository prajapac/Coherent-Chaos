import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button';

import { PLAYER_1, PLAYER_2 } from 'constants';

import './index.scss';

const PlayerPicker = ({className, gameId, onChoose, player1Disabled, player2Disabled}) => {
    const classes = classNames(className, 'playerPicker');

    return (
        <div className={classes}>
            <Button
                className='picker-btn'
                bold
                text='Player 1'
                disabled={player1Disabled}
                type='primary'
                onClick={player1Disabled
                    ? null
                    : () => {
                        onChoose(gameId, PLAYER_1);
                    }
                }
            />
            <p>Choose Your Side</p>
            <Button
                className='picker-btn'
                bold
                text='Player 2'
                disabled={player2Disabled}
                type='secondary'
                onClick={player2Disabled
                    ? null
                    : () => {
                        onChoose(gameId, PLAYER_2);
                    }
                }
            />
        </div>
    );
};

PlayerPicker.propTypes = {
    className: PropTypes.string,
    gameId: PropTypes.string,
    onChoose: PropTypes.func,
    player1Disabled: PropTypes.bool,
    player2Disabled: PropTypes.bool
};

PlayerPicker.defaultProps = {
    onChoose: () => {}
};

export default PlayerPicker;
