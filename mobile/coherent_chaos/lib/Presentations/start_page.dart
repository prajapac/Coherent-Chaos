import 'package:flutter/material.dart';
import 'custom_colors.dart';
import 'game_board.dart';
import '../Assets/dialouge.dart';

final dialouges = new CustomDialouges();

class StartPage extends StatefulWidget {
  static String tag = 'start-page';
  @override
  _StartPage createState() => new _StartPage();
}

class _StartPage extends State<StartPage> {
  CustomColors colors = new CustomColors();
  @override
  Widget build(BuildContext context) {
    final gameDescription =Padding(
      padding: EdgeInsets.all(0),
      child: Container(
        child: Text(dialouges.startGameInstruction, style: TextStyle(fontSize: 16))
      ),
    );
    final gameIdBox =TextFormField(   
      decoration: InputDecoration(
        hintText: 'A4B6',
        filled: true,
        fillColor: colors.textFieldBgColor,
        contentPadding: EdgeInsets.only(left: 0, right: 0, top: 1, bottom: 1),
        border: OutlineInputBorder(
          borderSide: BorderSide(
            color: Colors.black,
            width: 1
          ),
        ),
      ),
    );
    final createGame = MaterialButton(
      onPressed: () {
          Navigator.of(context).pushNamed(Gameboard.tag);
        //Navigator.of(context).pushNamed(Gameboard.tag);
      },
      color: colors.secondaryColor,
      child: Text(dialouges.createGame,
          style: TextStyle(
              color: Colors.black,
              fontSize: 16.0,
              fontWeight: FontWeight.bold)),
    );
    final joinGame = MaterialButton(
      onPressed: () {
        
        Navigator.of(context).pushNamed(Gameboard.tag);
      },
      color: colors.primaryColor,
      child: Text(dialouges.joinGame,
          style: TextStyle(
              color: Colors.black,
              fontSize: 16.0,
              fontWeight: FontWeight.bold)),
    );

    return Scaffold(
      backgroundColor: colors.bodyColor,
      appBar: AppBar(
        title: Text(dialouges.title),
        backgroundColor: colors.barColor,
      ),
      body: Center(
        child: Container(
          //color: Colors.white,
          width: 300,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(8)),
              color: Colors.grey),
          child: ListView(
            shrinkWrap: true,
            padding: EdgeInsets.only(left: 24.0, right: 24.0),
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(top: 10),
                child: Container(
                  child: Text(dialouges.startGame, style: TextStyle(fontSize: 24)),
                ),
              ),
              SizedBox(
                height: 20.0,
              ),
              gameDescription,
              SizedBox(
                height: 10.0,
              ),
              gameIdBox,
              joinGame,
              createGame,
            ],
          ),
        ),
      ),
    );
  }
}
