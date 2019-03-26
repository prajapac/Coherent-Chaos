import 'package:coherent_chaos/Assets/cell_type.dart';
import 'package:coherent_chaos/Assets/custom_colors.dart';
import 'package:coherent_chaos/Presentations/game_page.dart';
import 'package:flutter/material.dart';
import 'package:polygon_clipper/polygon_clipper.dart';

final CustomColors colors = CustomColors();

class GameCell extends StatefulWidget {
  final double cellSize = 34.0;
  final int row, col;
  final CellType cellType;
  final int playerSide;

  GameCell({this.row, this.col, this.cellType, this.playerSide});

  @override
  _GameCellState createState() => _GameCellState();
}

class _GameCellState extends State<GameCell> {
  Color cellColor, borderColor;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    switch (widget.cellType) {
      case CellType.p1Cell:
        cellColor = colors.c1Color;
        borderColor = colors.c1BorderColor;
        break;
      case CellType.p2Cell:
        cellColor = colors.c2Color;
        borderColor = colors.c2BorderColor;
        break;
      case CellType.selectedCell:
        cellColor = colors.csColor;
        borderColor = colors.csBorderColor;
        break;
      case CellType.suggestedCell:
        cellColor = colors.ctColor;
        borderColor = colors.ctBorderColor;
        break;
      default:
        cellColor = colors.ceColor;
        borderColor = colors.ceBorderColor;
    }

    return Container(
      width: widget.cellSize,
      child: ClipPolygon(
        sides: 6,
        boxShadows: [PolygonBoxShadow(color: borderColor, elevation: 2.0)],
        child: MaterialButton(
          onPressed: !GamePage.of(context).isPlayerTurn ? null : () {
            setState(() {
              if (widget.cellType == CellType.suggestedCell) {
                GamePage.of(context).targetRow = widget.row;
                GamePage.of(context).targetCol = widget.col;
              } else if ((widget.playerSide == 1 &&widget.cellType == CellType.p1Cell) ||
                  (widget.playerSide == 2 && widget.cellType == CellType.p2Cell)) {
                GamePage.of(context).selectedRow = widget.row;
                GamePage.of(context).selectedCol = widget.col;
              } else if (widget.cellType == CellType.selectedCell) {
                GamePage.of(context).selectedRow = null;
                GamePage.of(context).selectedCol = null;
              }
            });
          },
          color: cellColor,
        ),
      ),
    );
  }
}
