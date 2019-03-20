import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../Model/game.dart';

final baseURI = "http://18.191.224.215:5000/api/game";

class HandleAPIs {
  Future<Game> getGameBoard(String gameId) async {
    final response = await http.get(baseURI + "/" + gameId);
    print(response);
    if (response.statusCode == 200) {
      return Game.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to create Game');
    }
  }

  Future<Game> intializeGame() async {
    final response = await http.post(baseURI,
        headers: {HttpHeaders.contentTypeHeader: 'application/json'});

    if (response.statusCode == 200) {
      return Game.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to create Game with response code: ' + response.statusCode.toString());
    }
  }
}
