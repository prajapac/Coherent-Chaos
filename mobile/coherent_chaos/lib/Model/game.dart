class Game {
  String gameId;
  List<dynamic> board;
  int numTurns;
  int whoseTurn;
  String token;
  bool player1Active;
  bool player2Active;
  int winner;

  Game({this.gameId, this.board, this.numTurns, this.whoseTurn, this.token, this.player1Active, this.player2Active, this.winner});

  factory Game.fromJson(Map<String, dynamic> json) {
    return Game(
      gameId: json['game_id'],
      board: json['board_state'],
      numTurns: json['num_turns'],
      whoseTurn: json['whose_turn'],
      token: json['token'],
      player1Active: json['player_1_active'],
      player2Active: json['player_2_active'],
      winner: json['winner'],
    );
  }
}
