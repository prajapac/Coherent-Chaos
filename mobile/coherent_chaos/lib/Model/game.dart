class Game {
  String gameId;
  List<dynamic> board;
  int numTurns;
  int whoseTurn;
  String token;
  bool player1Active;
  bool player2Active;

  Game({this.gameId, this.board, this.numTurns, this.whoseTurn, this.token, this.player1Active, this.player2Active});

  factory Game.fromJson(Map<String, dynamic> json) {
    return Game(
      gameId: json['game_id'],
      board: json['board_state'],
      numTurns: json['num-turns'],
      whoseTurn: json['whose-turn'],
      token: json['token'],
      player1Active: json['player_1_active'],
      player2Active: json['player_2_active'],
    );
  }
}
