import 'package:flutter/material.dart';
import 'package:polygon_clipper/polygon_clipper.dart';
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

    Widget c1 = _gameCell(colors.c1Color, colors.c1BorderColor);
    Widget c2 = _gameCell(colors.c2Color, colors.c2BorderColor);
    Widget ce = _gameCell(colors.ceColor, colors.ceBorderColor);
    
    List<List<Widget>> gameCells = [
      [c1,c1,c1,c1,c1,c1],
      [ce,c1,c1,c1,c1,c1,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,ce,ce,ce,ce,ce,ce,ce],
      [ce,c2,c2,c2,c2,c2,ce],
      [c2,c2,c2,c2,c2,c2]
    ];

    return Scaffold(
      backgroundColor: colors.bodyColor,
      body: Center(
        child: 
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[0][0],
                  gameCells[0][1],
                  gameCells[0][2],
                  gameCells[0][3],
                  gameCells[0][4],
                  gameCells[0][5],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[1][0],
                  gameCells[1][1],
                  gameCells[1][2],
                  gameCells[1][3],
                  gameCells[1][4],
                  gameCells[1][5],
                  gameCells[1][6],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[2][0],
                  gameCells[2][1],
                  gameCells[2][2],
                  gameCells[2][3],
                  gameCells[2][4],
                  gameCells[2][5],
                  gameCells[2][6],
                  gameCells[2][7],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[3][0],
                  gameCells[3][1],
                  gameCells[3][2],
                  gameCells[3][3],
                  gameCells[3][4],
                  gameCells[3][5],
                  gameCells[3][6],
                  gameCells[3][7],
                  gameCells[3][8],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[4][0],
                  gameCells[4][1],
                  gameCells[4][2],
                  gameCells[4][3],
                  gameCells[4][4],
                  gameCells[4][5],
                  gameCells[4][6],
                  gameCells[4][7],
                  gameCells[4][8],
                  gameCells[4][9],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[5][0],
                  gameCells[5][1],
                  gameCells[5][2],
                  gameCells[5][3],
                  gameCells[5][4],
                  gameCells[5][5],
                  gameCells[5][6],
                  gameCells[5][7],
                  gameCells[5][8],
                  gameCells[5][9],
                  gameCells[5][10],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[6][0],
                  gameCells[6][1],
                  gameCells[6][2],
                  gameCells[6][3],
                  gameCells[6][4],
                  gameCells[6][5],
                  gameCells[6][6],
                  gameCells[6][7],
                  gameCells[6][8],
                  gameCells[6][9],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[7][0],
                  gameCells[7][1],
                  gameCells[7][2],
                  gameCells[7][3],
                  gameCells[7][4],
                  gameCells[7][5],
                  gameCells[7][6],
                  gameCells[7][7],
                  gameCells[7][8],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[8][0],
                  gameCells[8][1],
                  gameCells[8][2],
                  gameCells[8][3],
                  gameCells[8][4],
                  gameCells[8][5],
                  gameCells[8][6],
                  gameCells[8][7],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[9][0],
                  gameCells[9][1],
                  gameCells[9][2],
                  gameCells[9][3],
                  gameCells[9][4],
                  gameCells[9][5],
                  gameCells[9][6],
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  gameCells[10][0],
                  gameCells[10][1],
                  gameCells[10][2],
                  gameCells[10][3],
                  gameCells[10][4],
                  gameCells[10][5],
                ],
              ),
            ],
          ),
      ),
    );
  }

  Widget _gameCell(Color cellColor, Color borderColor) {
    return Container(
      padding: EdgeInsets.only(left: 1, right: 1),
      width: 34,
      child: ClipPolygon(
        sides: 6,
        boxShadows: [  
          PolygonBoxShadow(color: borderColor, elevation: 2.0)
        ],
        child: Container(color: cellColor)
      ),
    );
  }
}