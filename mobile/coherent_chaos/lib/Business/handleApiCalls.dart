import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../Model/game.dart';

final baseURI = "http://18.191.224.215:5000/api/game";

class HandleAPIs {
  Future<Game> intializeGame() async {
    final response = await http.post(baseURI,
        headers: {HttpHeaders.contentTypeHeader: 'application/json'});

    if (response.statusCode == 200) {
      return Game.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to create Game with response code: ' +
          response.statusCode.toString());
    }
  }

  Future<Game> getGame(String gameId) async {
    final response = await http.get(baseURI + "/" + gameId);

    if (response.statusCode == 200) {
      if (json.decode(response.body)['failure'] == true) {
        throw Exception(json.decode(response.body)['message']);
      }
      return Game.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to get Game: #' + gameId +
          ' response code: ' + response.statusCode.toString());
    }
  }

  Future<String> joinGame(String gameId, Map playerChoice) async {
    final response = await http.post(baseURI + "/" + gameId,
        headers: {HttpHeaders.contentTypeHeader: 'application/json'},
        body: json.encode(playerChoice));

    if (response.statusCode == 200) {
      if (json.decode(response.body)['failure'] == true) {
        throw Exception(json.decode(response.body)['message']);
      }
      return json.decode(response.body)['token'];
    } else {
      throw Exception('Failed to join Game with response code: ' +
          response.statusCode.toString());
    }
  }
}
