class Game{
  String id;
  List<dynamic> board;

  Game({this.id, this.board});

  factory Game.fromJson(Map<String, dynamic> json)
  {
    return Game(
      id: json['game_id'],
      board: json['board_state'],
      );
  }
}