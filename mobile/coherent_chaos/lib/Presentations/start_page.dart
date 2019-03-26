import 'package:coherent_chaos/Assets/custom_colors.dart';
import 'package:coherent_chaos/Assets/dialogue.dart';
import 'package:coherent_chaos/Business/handleApiCalls.dart';
import 'package:coherent_chaos/Model/game.dart';
import 'package:coherent_chaos/Model/toastr.dart';
import 'package:coherent_chaos/Presentations/choose_player_page.dart';
import 'package:coherent_chaos/Presentations/game_page.dart';
import 'package:flutter/material.dart';

final dialouges = new CustomDialogues();

class StartPage extends StatefulWidget {
  static String tag = 'start-page';
  @override
  _StartPage createState() => new _StartPage();
}

class _StartPage extends State<StartPage> {
  CustomColors colors = new CustomColors();
  HandleAPIs handleAPIs = new HandleAPIs();
  TextEditingController gameIdController = TextEditingController();
  double screenHeight;
  double screenWidth;
  bool portraitView;

  @override
  Widget build(BuildContext context) {
    screenHeight = MediaQuery.of(context).size.height;
    screenWidth = MediaQuery.of(context).size.width;
    portraitView = MediaQuery.of(context).orientation == Orientation.portrait;

    return Scaffold(
      backgroundColor: colors.bodyColor,
      appBar: AppBar(
        title: new Image.asset('images/logo_long.png'),
        backgroundColor: colors.barColor,
      ),
      body: Center(
        child: Container(
          width: screenWidth * 0.8,
          height: portraitView ? screenHeight * 0.6 :screenHeight * 0.65,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(4)),
              color: colors.createJoinGameBgColor),
          child: ListView(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05, vertical: screenHeight * 0.04),
            children: <Widget>[
              getGameTitle(),
              getGameDescription(),
              getGameIdBox(),
              SizedBox(
                height: screenHeight * 0.03,
              ),
              getJoinGameButton(),
              SizedBox(
                height: screenHeight * 0.02,
              ),
              getCreateGameButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget getGameTitle() {
    return Padding(
      padding: EdgeInsets.only(bottom: screenHeight * 0.03),
      child: Container(
        child: Text(
          dialouges.startGame,
          style: TextStyle(
              color: colors.textColor,
              fontSize: screenHeight * 0.04,
              fontFamily: 'Montserrat',
              fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  Widget getGameDescription() {
    return Padding(
      padding: EdgeInsets.only(bottom: screenHeight * 0.04),
      child: Container(
        child: Text(
          dialouges.startGameInstruction,
          style: TextStyle(
              color: colors.textColor,
              fontSize: screenHeight * 0.025,
              fontFamily: 'Montserrat'),
        ),
      ),
    );
  }

  Widget getGameIdBox() {
    return TextFormField(
      controller: gameIdController,
      maxLength: 4,
      autocorrect: false,
      textCapitalization: TextCapitalization.characters,
      decoration: InputDecoration(
        hintText: 'A4B6',
        filled: true,
        hintStyle: TextStyle(color: Colors.grey),
        fillColor: colors.textFieldBgColor,
        contentPadding: EdgeInsets.symmetric(horizontal: screenWidth * 0.02, vertical: screenHeight * 0.02),
        border: OutlineInputBorder(
          borderSide: BorderSide(color: colors.textFieldBgColor, width: 1),
        ),
      ),
    );
  }

  Widget getCreateGameButton() {
    return MaterialButton(
      onPressed: () async {
        try {
          final Game game = await handleAPIs.intializeGame();
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
      color: colors.secondaryColor,
      height: screenHeight * 0.08,
      child: Text(
        dialouges.createGame,
        style: TextStyle(
            color: colors.buttonTextColor,
            fontSize: screenHeight * 0.03,
            fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget getJoinGameButton() {
    return MaterialButton(
      onPressed: () async {
        try {
          final game = await handleAPIs.getGame(gameIdController.text);
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ChoosePlayerPage(game: game),
            ),
          );
        } catch (e) {
          Toastr().showErrorMessage(e.toString());
        }
      },
      color: colors.primaryColor,
      height: screenHeight * 0.08,
      child: Text(
        dialouges.joinGame,
        style: TextStyle(
            color: colors.buttonTextColor,
            fontSize: screenHeight * 0.03,
            fontWeight: FontWeight.bold),
      ),
    );
  }
}
