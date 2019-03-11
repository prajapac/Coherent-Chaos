import React from 'react';

import './index.scss';
import Button from "../Button";
import PropTypes from "prop-types";

import {
    GAME_ID_LEN
} from 'constants';

class CreateJoinPrompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: '',
            join: props.join,
            create: props.create
        };
    }

    handleGameIdChange = (event) => {
        let reg = /[^A-Za-z0-9]+/;
        let gameIdVal = event.target.value;

        if(!reg.test(gameIdVal)) {
            this.setState({gameId: gameIdVal.toUpperCase()});
        }
    }

    handleJoin = (event) => {
        event.preventDefault();
        const gameId = this.state.gameId

        if (gameId.length == GAME_ID_LEN) {
            document.getElementById('gameId-txt').removeAttribute('error');

            //TO DO: Add logic to send gameId to server for validation when Chirag's database is up,
            // and then transition page to player picker -- see tickets: 45 + 47

            this.state.join()
        } else {
            document.getElementById('gameId-txt').setAttribute('class', 'error');
        }
    }

    handleCreate = (event) => {
        event.preventDefault();

        //TO DO: Add logic to send creation to server to generate a new game board and id -- see ticket: 46

        this.state.create()
    }


    render() {
        return (
            <div className='createJoinDivWrapper'>
                <div className='gameStartInfo'>
                    <h2>Coherent Chaos</h2>
                    <p>Create or join a game with the prompt to the right to enter into a battle royal styled
                        checkers where only one will make it out alive. Will you defeat your opponent or will the
                        circle decay be the end of you?</p>
                </div>
                <div className='createJoinDiv'>
                    <h2>Enter your game code</h2>
                    <p>To join a game in progress, enter your Game ID below and click the join game button
                        below.</p>
                    <form className='createJoinForm' onSubmit={this.handleJoin}>
                        <input type='text' id='gameId-txt' onChange={this.handleGameIdChange} value={this.state.gameId}
                               placeholder='A4B6'  maxLength={GAME_ID_LEN} minLength={GAME_ID_LEN}/>
                        <br/>
                        <br/>
                        <Button type="submit primary" className='join-btn' bold text='Join Game'/>
                    </form>
                    <br/>
                    <Button className='create-btn' bold text='Create Game' type='secondary' onClick={this.handleCreate}/>
                </div>
            </div>
        )
    }
};

CreateJoinPrompt.propTypes = {
    gameId: PropTypes.string,
    create: PropTypes.func,
    join: PropTypes.func,
};


export default CreateJoinPrompt;
