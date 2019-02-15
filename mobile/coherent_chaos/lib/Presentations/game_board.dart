import 'package:flutter/material.dart';
import 'custom_colors.dart';

class Gameboard extends StatefulWidget {
  static String tag = 'game-board';
  @override
  _Gameboard createState() => new _Gameboard();
}

class _Gameboard extends State<Gameboard> {
  @override
  Widget build(BuildContext context) {
    CustomColors colors = new CustomColors();
    return Scaffold(
      backgroundColor: colors.bodyColor,
      appBar: AppBar(
        title: Text("Coherent Chaos"),
        backgroundColor: colors.barColor,
      ),
      body: Center(
        child: Text('Yet to Implement...', style: TextStyle(color: Colors.white),),
      ),
    );
  }
}