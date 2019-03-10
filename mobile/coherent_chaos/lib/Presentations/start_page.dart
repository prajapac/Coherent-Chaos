import 'package:flutter/material.dart';
import 'custom_colors.dart';
import 'game_board.dart';

class StartPage extends StatefulWidget {
  static String tag = 'start-page';
  @override
  _StartPage createState() => new _StartPage();
}

class _StartPage extends State<StartPage> {
  CustomColors colors = new CustomColors();
  @override
  Widget build(BuildContext context) {
    final createGame = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: MaterialButton(
        minWidth: 200.0,
        height: 60.0,
        onPressed: () {
          Navigator.of(context).pushNamed(Gameboard.tag);
        },
        color: colors.primaryColor,
        child: Text('CREATE GAME', style: TextStyle(color: Colors.black, fontSize: 16.0, fontWeight: FontWeight.bold)),
      ),
    );
    final joinGame = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: MaterialButton(
        minWidth: 200.0,
        height: 60.0,
        onPressed: () {
          Navigator.of(context).pushNamed(Gameboard.tag);
        },
        color: colors.secondaryColor,
        child: Text('JOIN GAME', style: TextStyle(color: Colors.black, fontSize: 16.0, fontWeight: FontWeight.bold)),
      ),
    );
    final tstBtn = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: MaterialButton(
        elevation: 5.0,
        minWidth: 200.0,
        height: 60.0,
        onPressed: () {
          Navigator.of(context).pushNamed(Gameboard.tag);
        },
        color: colors.tertiaryColor,
        child: Text('Test Btn1', style: TextStyle(color: Colors.black, fontSize: 16.0, fontWeight: FontWeight.bold)),
      ),
    );

    return Scaffold(
      backgroundColor: colors.bodyColor,
      appBar: AppBar(
        title: Text("Coherent Chaos"),
        backgroundColor: colors.barColor,
      ),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[
            createGame,
            SizedBox(
              height: 24.0,
            ),
            joinGame,
            SizedBox(
              height: 24.0,
            ),
            tstBtn,
          ],
        ),
      ),
    );
  }
}
