export const mapAPIStateToAppState = (state) => {
    return {
        id: state.game_id,
        board: state.board_state,
        turnNumber: state.num_turns,
        whoseTurn: state.whose_turn,
        player1Active: state.player_1_active,
        player2Active: state.player_2_active
    }
};
