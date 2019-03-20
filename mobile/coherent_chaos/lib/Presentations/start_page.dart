import 'package:coherent_chaos/Assets/dialogue.dart';
import 'package:coherent_chaos/Business/handleApiCalls.dart';
import 'package:coherent_chaos/Model/game.dart';
import 'package:coherent_chaos/Presentations/custom_colors.dart';
import 'package:coherent_chaos/Presentations/game_page.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:async';

final dialouges = new CustomDialogues();

class StartPage extends StatefulWidget {
  static String tag = 'start-page';
  @override
  _StartPage createState() => new _StartPage();
}

class _StartPage extends State<StartPage> {
  CustomColors colors = new CustomColors();
  HandleAPIs handleAPIs = new HandleAPIs();

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;
    final double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: colors.bodyColor,
      appBar: AppBar(
        title: Text(dialouges.title),
        backgroundColor: colors.barColor,
      ),
      body: Center(
        child: Container(
          width: screenWidth * 0.8,
          height: screenHeight * 0.6,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(4)),
              color: colors.createJoinGameBgColor),
          child: ListView(
            shrinkWrap: true,
            padding: EdgeInsets.only(left: 24.0, right: 24.0),
            children: <Widget>[
              getGameTitle(),
              getGameDescription(),
              getGameIdBox(),
              SizedBox(
                height: 20.0,
              ),
              getJoinGameButton(),
              SizedBox(
                height: 20.0,
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
      padding: EdgeInsets.only(top: 40.0, bottom: 20.0),
      child: Container(
        child: Text(
          dialouges.startGame,
          style: TextStyle(
              color: Colors.grey[700],
              fontSize: 26,
              fontFamily: 'Montserrat',
              fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  Widget getGameDescription() {
    return Padding(
      padding: EdgeInsets.only(top: 10.0, bottom: 30.0),
      child: Container(
        child: Text(
          dialouges.startGameInstruction,
          style: TextStyle(
              color: Colors.grey[700],
              fontSize: 23.0,
              fontFamily: 'Montserrat'),
        ),
      ),
    );
  }

  Widget getGameIdBox() {
    return TextFormField(
      decoration: InputDecoration(
        hintText: 'A4B6',
        filled: true,
        fillColor: colors.textFieldBgColor,
        contentPadding: EdgeInsets.only(left: 8, right: 8, top: 10, bottom: 10),
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
              builder: (context) => GamePage(game: game),
            ),
          );
        } catch (e) {
          showErrorMessage(e.toString());
        }
      },
      color: colors.secondaryColor,
      height: 60.0,
      child: Text(
        dialouges.createGame,
        style: TextStyle(
            color: Colors.grey[200].withOpacity(0.9),
            fontSize: 20.0,
            fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget getJoinGameButton() {
    return MaterialButton(
      onPressed: () async {
        final Game game =
            await handleAPIs.intializeGame(); //TODO: make request to Join game
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => GamePage(game: game),
          ),
        );
      },
      color: colors.primaryColor,
      height: 60.0,
      child: Text(
        dialouges.joinGame,
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
