import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button';

import { GAME_ID_LENGTH } from 'constants';

import './index.scss';

class GameCreateJoinPrompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: '',
            error: props.error
        };
    }

    handleGameIdChange = (event) => {
        let reg = /[^A-Za-z0-9]+/;
        let gameId = event.target.value;

        if (!reg.test(gameId)) {
            this.setState({gameId: gameId.toUpperCase()});
        }

        if (this.state.error) {
            this.setState({
                error: false
            });
        }
    };

    handleJoin = () => {
        if (this.state.gameId.length === GAME_ID_LENGTH) {
            this.setState({
                error: false
            }, () => {
                this.props.onJoinGame(this.state.gameId);
            });
        } else {
            this.setState({
                error: true
            });
        }
    };

    render() {
        return (
            <div className='create-join-prompt'>
                <div className='game-start-info'>
                    <h2>Coherent Chaos</h2>
                    <p>Create or join a game with the prompt to the right to enter into a battle royal styled
                        checkers where only one will make it out alive. Will you defeat your opponent or will the
                        circle decay be the end of you?
                    </p>
                </div>
                <div className='create-join-box'>
                    <h2>Start Playing!</h2>
                    <p>Enter a game ID and click Join Game, or start a new game.</p>
                    <input
                        className={classNames('game-id-input', 'item', {'error': this.state.error})}
                        type='text'
                        onChange={this.handleGameIdChange}
                        value={this.state.gameId}
                        placeholder='A4B6'
                        maxLength={GAME_ID_LENGTH}
                    />
                    <Button
                        type="primary"
                        className='join-btn item'
                        bold
                        text='Join Game'
                        onClick={this.handleJoin}
                    />
                    <Button
                        type='secondary'
                        className='create-btn item'
                        bold
                        text='Create Game'
                        onClick={this.props.onCreateGame}
                    />
                </div>
            </div>
        )
    }
}

GameCreateJoinPrompt.propTypes = {
    onCreateGame: PropTypes.func,
    onJoinGame: PropTypes.func,
    error: PropTypes.bool
};

GameCreateJoinPrompt.defaultProps = {
    onJoinGame: () => {},
    onCreateGame: () => {},
    error: false
};

export default GameCreateJoinPrompt;
