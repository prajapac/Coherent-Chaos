import 'package:coherent_chaos/Assets/cell_type.dart';
import 'package:coherent_chaos/Assets/custom_colors.dart';
import 'package:coherent_chaos/Business/handleApiCalls.dart';
import 'package:coherent_chaos/Controllers/game_cell.dart';
import 'package:coherent_chaos/Model/game.dart';
import 'package:coherent_chaos/Model/toastr.dart';
import 'package:coherent_chaos/Presentations/start_page.dart';
import 'package:flutter/material.dart';

CustomColors colors = new CustomColors();
HandleAPIs handleAPIs = new HandleAPIs();

class GamePage extends StatefulWidget {
  static String tag = 'game-page';
  final Game game;
  final int playerSide;

  GamePage({Key key, @required this.game, @required this.playerSide})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => new _GamePage();

  static _GamePage of(BuildContext context) {
    final _GamePage navigator =
        context.ancestorStateOfType(const TypeMatcher<_GamePage>());

    assert(() {
      if (navigator == null) {
        throw new FlutterError(
            '_GamePage operation requested with a context that does '
            'not include a GamePage.');
      }
      return true;
    }());

    return navigator;
  }
}

class _GamePage extends State<GamePage> {
  List<dynamic> gameBoard;
  bool isPlayerTurn;

  int selectedCellRow,
      selectedCellCol,
      targetCellRow,
      targetCellCol,
      hoppedCellRow,
      hoppedCellCol;

  set selectedRow(int row) => setState(() => selectedCellRow = row);
  set selectedCol(int col) => setState(() => selectedCellCol = col);
  set targetRow(int row) => setState(() => targetCellRow = row);
  set targetCol(int col) => setState(() => targetCellCol = col);

  @override
  Widget build(BuildContext context) {
    gameBoard = widget.game.board;

    isPlayerTurn = widget.game.whoseTurn == widget.playerSide;

    if (targetCellRow != null && targetCellCol != null) {
      makeMove();
    } else if (selectedCellRow != null && selectedCellCol != null) {
      gameBoard = updateGameBoard(gameBoard);
    }

    return WillPopScope(
      onWillPop: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => StartPage(),
          ),
        );
      },
      child: Scaffold(
        backgroundColor: colors.bodyColor,
        body: Center(
          child: Stack(
            alignment: Alignment.center,
            children: getGamePage(context),
          ),
        ),
      ),
    );
  }

  void makeMove() async {
    Game newGameState;
    Map data = {
      'move': {
        'selectedCell': {
          'rowIndex': selectedCellRow,
          'columnIndex': selectedCellCol
        },
        'targetCell': {'rowIndex': targetCellRow, 'columnIndex': targetCellCol},
        'hoppedCell': hoppedCellRow == null
            ? null
            : {'rowIndex': hoppedCellRow, 'columnIndex': hoppedCellCol}
      },
      'token': widget.game.token
    };

    isPlayerTurn = false;
    gameBoard[selectedCellRow][selectedCellCol] = 0;
    gameBoard[targetCellRow][targetCellCol] = widget.playerSide;
    if (hoppedCellRow != null) {
      gameBoard[hoppedCellRow][hoppedCellCol] = 0;
    }

    clearState();

    try {
      newGameState = await handleAPIs.makeMove(widget.game.gameId, data);
    } catch (e) {
      Toastr().showErrorMessage(e.toString());
    }

    updateGameState(newGameState);
  }

  void updateGameState(Game game) {
    if (game != null) {
      widget.game.board = game.board;
      widget.game.numTurns = game.numTurns;
      widget.game.whoseTurn = game.whoseTurn;
      widget.game.winner = game.winner;
    }
  }

  void clearState() {
    setState(() {
      selectedCellRow = null;
      selectedCellCol = null;
      targetCellRow = null;
      targetCellCol = null;
    });
  }

  List<dynamic> updateGameBoard(List<dynamic> old) {
    List<dynamic> gameBoard = new List<dynamic>();
    int x = 0;
    for (var row in old) {
      int y = 0;
      List<dynamic> newRow = new List<dynamic>();
      for (var col in row) {
        if (x == selectedCellRow && y == selectedCellCol) {
          newRow.add(3);
        } else if (isCellAdjacent(old, x, y) &&
            CellType.values[col] == CellType.emptyCell) {
          newRow.add(4);
        } else {
          newRow.add(col);
        }
        y++;
      }
      gameBoard.add(newRow);
      x++;
    }

    return gameBoard;
  }

  bool isCellAdjacent(List<dynamic> boardState, int x, int y) {
    int rowIndexOffset = x - selectedCellRow;
    int colIndexOffset = y - selectedCellCol;
    int cellRowShift =
        boardState[x].length - boardState[selectedCellRow].length;

    switch (rowIndexOffset * rowIndexOffset) {
      case 0:
        return colIndexOffset * colIndexOffset == 1;
      case 1:
        return y == selectedCellCol || y == selectedCellCol + cellRowShift;
      default:
        return false;
    }
  }

  List<Positioned> getGamePage(BuildContext context) {
    List<Positioned> gamePage = getBoardRows(context);
    gamePage.add(Positioned(
      top: MediaQuery.of(context).size.height * 0.06,
      right: MediaQuery.of(context).size.width * 0.05,
      child: Text('Game ID: ' + widget.game.gameId,
          style: Theme.of(context).textTheme.title),
    ));

    return gamePage;
  }

  List<Positioned> getBoardRows(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;
    List<List<GameCell>> gameCells = new List();
    List<Positioned> boardRows = new List();
    final double rowDist = 29.5;

    if (widget.game != null) {
      int x = 0;
      for (var row in gameBoard) {
        int y = 0;
        List<GameCell> newRow = new List<GameCell>();
        for (var col in row) {
          if (CellType.values[col] == CellType.p1Cell) {
            GameCell gameCell = GameCell(
                row: x,
                col: y,
                cellType: CellType.p1Cell,
                playerSide: widget.playerSide);
            newRow.add(gameCell);
          } else if (CellType.values[col] == CellType.p2Cell) {
            GameCell gameCell = GameCell(
                row: x,
                col: y,
                cellType: CellType.p2Cell,
                playerSide: widget.playerSide);
            newRow.add(gameCell);
          } else if (CellType.values[col] == CellType.selectedCell) {
            GameCell gameCell = GameCell(
                row: x,
                col: y,
                cellType: CellType.selectedCell,
                playerSide: widget.playerSide);
            newRow.add(gameCell);
          } else if (CellType.values[col] == CellType.suggestedCell) {
            GameCell gameCell = GameCell(
                row: x,
                col: y,
                cellType: CellType.suggestedCell,
                playerSide: widget.playerSide);
            newRow.add(gameCell);
          } else {
            GameCell gameCell = GameCell(
                row: x,
                col: y,
                cellType: CellType.emptyCell,
                playerSide: widget.playerSide);
            newRow.add(gameCell);
          }
          y++;
        }
        gameCells.add(newRow);
        x++;
      }
    }

    for (int i = 0; i < gameCells.length; i++) {
      boardRows.add(
        Positioned(
          top: (screenHeight - rowDist * gameCells.length) / 2.0 + rowDist * i,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: gameCells[i],
          ),
        ),
      );
    }
    return boardRows;
  }
}
