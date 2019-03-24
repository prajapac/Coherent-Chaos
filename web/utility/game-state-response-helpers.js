const prepareGameStateForResponse = (gameState={}, extraData={}) => {
    delete gameState.player1_token;
    delete gameState.player2_token;
    delete gameState.player1_last_ping;
    delete gameState.player2_last_ping;
    delete gameState._id;

    return {
        ...gameState,
        ...extraData
    };
};

module.exports = {
    prepareGameStateForResponse
};
