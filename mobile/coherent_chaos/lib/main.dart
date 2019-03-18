import 'package:flutter/material.dart';
import 'Presentations/start_page.dart';
import 'Presentations/game_board.dart';

void main() async => runApp(MyApp());

class MyApp extends StatelessWidget {

  final routes = <String, WidgetBuilder> {
    StartPage.tag: (context) =>StartPage(),
    Gameboard.tag: (context) =>Gameboard(),
  };


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coherent Chaos',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Nunito'
      ),
      home: StartPage(),
      routes: routes,
    );
  }
}