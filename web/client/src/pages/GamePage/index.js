import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Button from 'components/Button';
import Page from 'components/Page';
import Board from 'components/Board';
import HexagonLabel from 'components/HexagonLabel';

import { CELL_PLAYER_1, CELL_PLAYER_2, PLAYER_1, DECAY_TURN_NUMBER} from 'constants';

import './index.scss';

const GamePage = ({isOurTurn, chosenPlayer, whoseTurn, gameState, onExitGame, onCellMove}) => {
    return (
        <Page className='game'>
            <Header
                className='game-header'
                left={<Button className='header-btn left' text='< Leave' onClick={onExitGame}/>}
                right={<div className='header-gid'>#{gameState.id}</div>}
            />
            <div className='body'>
                <div className='gutter'>
                    <div className='player-hud'>
                        <HexagonLabel
                            cellState={chosenPlayer}
                            children={
                                <div>
                                    <div>YOU</div>
                                </div>
                            }
                        />
                        <HexagonLabel
                            cellState={whoseTurn === PLAYER_1 ? CELL_PLAYER_1 : CELL_PLAYER_2}
                            children={
                                <div>
                                    <div>TURN</div>
                                    <div>{gameState.turnNumber}</div>
                                </div>
                            }
                        />
                    </div>
                    <div className='player-hud'>
                        <HexagonLabel
                            cellState={chosenPlayer}
                            children={
                                <div>
                                    <div>DECAY IN:</div>
                                    <div>{DECAY_TURN_NUMBER - (gameState.turnNumber % DECAY_TURN_NUMBER)} TURNS</div>
                                </div>
                            }
                        />
                    </div>
                </div>
                <div className='gutter board-gutter'>
                    <Board isOurTurn={isOurTurn} moveCell={onCellMove} boardState={gameState.board} selectedPlayer={chosenPlayer} className='game-board'/>
                    <div className='winner-text'>
                        {
                            gameState.winner
                                ? gameState.winner === chosenPlayer ? 'You win!' : ' You lose!'
                                : null
                        }
                    </div>
                </div>
                <div className='gutter'>
                </div>
            </div>

        </Page>
    );
};

GamePage.propTypes = {
    isOurTurn: PropTypes.bool,
    chosenPlayer: PropTypes.number,
    whoseTurn: PropTypes.number,
    gameState: PropTypes.object,
    onExitGame: PropTypes.func,
    onCellMove: PropTypes.func
};

GamePage.defaultProps = {
    gameState: {}
};

export default GamePage;
