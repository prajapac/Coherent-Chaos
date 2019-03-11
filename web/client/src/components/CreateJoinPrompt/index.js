import React from 'react';

import './index.scss';
import Button from "../Button";
import PropTypes from "prop-types";

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
            this.setState({gameId: gameIdVal});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const gameId = this.state.gameId

        //TO DO: Add logic to send data to server for validation when Chirag's database is up
        this.state.join()
    }

    render() {
        return (
            <div className='createJoinDivWrapper'>
                <div className='gameStartInfo'>
                    <h2>Coherent chaos</h2>
                    <p>Create or join a game with the prompt to the right to enter into a battle royal styled
                        checkers where only one will make it out alive. Will you defeat your opponent or will the
                        circle decay be the end of you?</p>
                </div>
                <div className='createJoinDiv'>
                    <h2>Enter your game code</h2>
                    <p>To join a game in progress, enter your 2 character Game ID below and click the join game button
                        below.</p>
                    <form className='createJoinForm' onSubmit={this.handleSubmit}>
                        <input type='text' className='gameId-txt' placeholder='A4' value={this.state.gameId}
                               onChange={this.handleGameIdChange} maxLength='2' minLength='2'/>
                        <br/>
                        <br/>
                        <Button type="submit primary" className='join-btn' bold text='Join Game'/>
                    </form>
                    <br/>
                    <Button className='create-btn' bold text='Create Game' type='secondary' onClick={this.state.create}/>
                </div>
            </div>
        )
    }
};

CreateJoinPrompt.propTypes = {
    gameId: PropTypes.number,
    create: PropTypes.func,
    join: PropTypes.func,
};


export default CreateJoinPrompt;
