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

  GameCell({this.row, this.col, this.cellType});

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
      case CellType.targetCell:
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
          onPressed: () {
            setState(() {
              if (widget.cellType != CellType.emptyCell &&
                  widget.cellType != CellType.targetCell) {
                //TODO: check if selected cell is current player cell
                if (GamePage.of(context).selectedCellRow == widget.row &&
                    GamePage.of(context).selectedCellCol == widget.col) {
                  GamePage.of(context).row = null;
                  GamePage.of(context).col = null;
                } else {
                  GamePage.of(context).row = widget.row;
                  GamePage.of(context).col = widget.col;
                }
              }
            });
          },
          color: cellColor,
        ),
      ),
    );
  }
}
