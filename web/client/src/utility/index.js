export const mapAPIStateToAppState = (state) => {
    return {
        id: state.game_id,
        board: state.board_state,
        turnNumber: state.num_turns,
        whoseTurn: state.whose_turn
    }
};
