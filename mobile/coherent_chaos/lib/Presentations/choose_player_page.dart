import 'package:coherent_chaos/Assets/dialogue.dart';
import 'package:coherent_chaos/Business/handleApiCalls.dart';
import 'package:coherent_chaos/Model/game.dart';
import 'package:coherent_chaos/Assets/custom_colors.dart';
import 'package:coherent_chaos/Presentations/game_page.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:async';

final dialouges = new CustomDialogues();

class ChoosePlayerPage extends StatelessWidget {
  static String tag = 'game-page';
  final Game game;
  final CustomColors colors = new CustomColors();
  final HandleAPIs handleAPIs = new HandleAPIs();

  ChoosePlayerPage({Key key, @required this.game}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;
    final double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: colors.bodyColor,
      appBar: AppBar(
        title: Text(dialouges.title + '    ' + game.gameId),
        backgroundColor: colors.barColor,
      ),
      body: Center(
        child: Container(
          width: screenWidth * 0.8,
          height: screenHeight * 0.6,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(4)),
              color: colors.createJoinGameBgColor),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              getPlayer1Button(context),
              getChoosePlayerDialouge(),
              getPlayer2Button(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget getChoosePlayerDialouge() {
    return Padding(
      padding: EdgeInsets.only(top: 30.0, bottom: 30.0),
      child: Container(
        child: Text(
          dialouges.chooseSide,
          style: TextStyle(
              color: Colors.grey[700],
              fontSize: 23.0,
              fontFamily: 'Montserrat'),
        ),
      ),
    );
  }

  Widget getPlayer1Button(BuildContext context) {
    return MaterialButton(
      onPressed: game.player1Active ? null : () async {
        try {
          Map playerChoice = {'playerChoice': 1};
          final String playerToken =
              await handleAPIs.joinGame(game.gameId, playerChoice);
          game.token = playerToken;
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => GamePage(game: game),
            ),
          );
        } catch (e) {
          showErrorMessage(e.toString());
        }
      },
      color: game.player1Active ? colors.disabledColor : colors.primaryColor,
      height: 60.0,
      minWidth: MediaQuery.of(context).size.width * 0.5,
      child: Text(
        dialouges.player1,
        style: TextStyle(
            color: Colors.grey[200].withOpacity(0.9),
            fontSize: 20.0,
            fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget getPlayer2Button(BuildContext context) {
    return MaterialButton(
      onPressed: game.player2Active ? null : () async {
        try {
          Map playerChoice = {'playerChoice': 2};
          final String playerToken =
              await handleAPIs.joinGame(game.gameId, playerChoice);
          game.token = playerToken;
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => GamePage(game: game),
            ),
          );
        } catch (e) {
          showErrorMessage(e.toString());
        }
      },
      color: game.player2Active ? colors.disabledColor : colors.secondaryColor,
      height: 60.0,
      minWidth: MediaQuery.of(context).size.width * 0.5,
      child: Text(
        dialouges.player2,
        style: TextStyle(
            color: Colors.grey[200].withOpacity(0.9),
            fontSize: 20.0,
            fontWeight: FontWeight.bold),
      ),
    );
  }

  Future<bool> showErrorMessage(String msg) {
    return Fluttertoast.showToast(
        msg: msg,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIos: 8,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0);
  }
}
