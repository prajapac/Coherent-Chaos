import 'package:coherent_chaos/Model/game.dart';
import 'package:flutter/material.dart';
import 'custom_colors.dart';
import 'game_cell.dart';
import '../Business/handleApiCalls.dart';

List<List<GameCell>> gameCells;
CustomColors colors = new CustomColors();
HandleAPIs handleAPIs = new HandleAPIs();
Game game;

GameCell c1 =
    GameCell(cellColor: colors.c1Color, borderColor: colors.c1BorderColor);
GameCell c2 =
    GameCell(cellColor: colors.c2Color, borderColor: colors.c2BorderColor);
GameCell ce =
    GameCell(cellColor: colors.ceColor, borderColor: colors.ceBorderColor);

class Gameboard extends StatefulWidget {
  static String tag = 'game-board';
  @override
  _Gameboard createState() => new _Gameboard();
}

class _Gameboard extends State<Gameboard> {
  @override
  void initState(){
    super.initState();
    waitForGame();
  }

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;
    List<Widget> getBoardRows() {
      List<Widget> list = new List();
      double rowDist = 29.5;

      for (int i = 0; i < gameCells.length; i++) {
        list.add(
          Positioned(
            top:
                (screenHeight - rowDist * gameCells.length) / 2.0 + rowDist * i,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: gameCells[i],
            ),
          ),
        );
      }
      return list;
    }

    return Scaffold(
      backgroundColor: colors.bodyColor,
      body: 
      Center(
        child: Stack(
          alignment: Alignment.center,
          children: getBoardRows(),
        ),
      ),
    );
  }

  void waitForGame() async {
    final Game game = await handleAPIs.intializeGame();
    gameCells = new List();
    if (game != null) {
      for (var row in game.board) {
        List<GameCell> newRow = new List<GameCell>();
        for (var col in row) {
          if (col == 1) {
            newRow.add(c1);
          } else if (col == 2) {
            newRow.add(c2);
          } else {
            newRow.add(ce);
          }
        }
        gameCells.add(newRow);
      }
    }
  }
}


/*gameCells = [
      [c1, c1, c1, c1, c1, c1],
      [ce, c1, c1, c1, c1, c1, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, ce, ce, ce, ce, ce, ce, ce],
      [ce, c2, c2, c2, c2, c2, ce],
      [c2, c2, c2, c2, c2, c2]
    ];*/
