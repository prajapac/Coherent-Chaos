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

    List<Widget> boardRows() {
      List<Widget> list = new List();
      for (int i = 0; i<gameCells.length; i++) {
        list.add(
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: gameCells[i],
          )
        );
      }
      return list;
    }

    return Scaffold(
      backgroundColor: colors.bodyColor,
      body: Center(
        child: 
          Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: boardRows(),
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
        child: Container(
          color: cellColor,
        ),
      ),
    );
  }
}