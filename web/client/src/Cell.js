import React, { Component } from 'react';

class Cell extends Component {
    state = {
        cellStates: [
            {
                'state':'Player 1 pawn'
            },
            {
                'state':'Player 2 pawn'
            },
            {
                'state':'Out of play'
            },
            {
                'state':'Empty'
            }
        ]
    };
}

export default Cell;