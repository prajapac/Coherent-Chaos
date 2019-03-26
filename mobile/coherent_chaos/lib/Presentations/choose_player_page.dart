import 'package:coherent_chaos/Assets/dialogue.dart';
import 'package:coherent_chaos/Business/handleApiCalls.dart';
import 'package:coherent_chaos/Model/game.dart';
import 'package:coherent_chaos/Assets/custom_colors.dart';
import 'package:coherent_chaos/Model/toastr.dart';
import 'package:coherent_chaos/Presentations/game_page.dart';
import 'package:flutter/material.dart';

final dialouges = new CustomDialogues();
double screenHeight;
double screenWidth;

class ChoosePlayerPage extends StatelessWidget {
  static String tag = 'game-page';
  final Game game;
  final CustomColors colors = new CustomColors();
  final HandleAPIs handleAPIs = new HandleAPIs();

  ChoosePlayerPage({Key key, @required this.game}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    screenHeight = MediaQuery.of(context).size.height;
    screenWidth = MediaQuery.of(context).size.width;

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
      padding: EdgeInsets.symmetric(vertical: screenHeight * 0.05),
      child: Container(
        child: Text(
          dialouges.chooseSide,
          style: TextStyle(
              color: colors.textColor,
              fontSize: screenHeight * 0.03,
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
              builder: (context) => GamePage(game: game, playerSide: 1),
            ),
          );
        } catch (e) {
          Toastr().showErrorMessage(e.toString());
        }
      },
      color: game.player1Active ? colors.disabledColor : colors.primaryColor,
      height: screenHeight * 0.08,
      minWidth: screenWidth * 0.5,
      child: Text(
        dialouges.player1,
        style: TextStyle(
            color: colors.buttonTextColor,
            fontSize: screenHeight * 0.03,
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
              builder: (context) => GamePage(game: game, playerSide: 2),
            ),
          );
        } catch (e) {
          Toastr().showErrorMessage(e.toString());
        }
      },
      color: game.player2Active ? colors.disabledColor : colors.secondaryColor,
      height: screenHeight * 0.08,
      minWidth: screenWidth * 0.5,
      child: Text(
        dialouges.player2,
        style: TextStyle(
            color: colors.buttonTextColor,
            fontSize: screenHeight * 0.03,
            fontWeight: FontWeight.bold),
      ),
    );
  }
}
