import 'package:flutter/material.dart';
import 'package:polygon_clipper/polygon_clipper.dart';
import 'custom_colors.dart';

class GameCell extends StatefulWidget {
  static String tag = 'game-cell';
  final CustomColors colors = CustomColors();
  final double cellSize = 34.0;

  final Color cellColor, borderColor;

  GameCell({this.cellColor, this.borderColor});

  @override
  _GameCell createState() => _GameCell();
}

class _GameCell extends State<GameCell> {
  @override
  Widget build(BuildContext context) {
    bool pressed = false;
    return Container(
      width: widget.cellSize,
      child: ClipPolygon(
        sides: 6,
        boxShadows: [
          PolygonBoxShadow(color: widget.borderColor, elevation: 2.0)
        ],
        child: MaterialButton(
          onPressed: () {
            pressed = !pressed; //TODO: placeholder for pawn selected action
          },
          color: pressed ? widget.borderColor : widget.cellColor,
        ),
      ),
    );
  }
}
