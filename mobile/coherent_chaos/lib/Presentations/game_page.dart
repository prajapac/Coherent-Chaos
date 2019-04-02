import 'dart:async';

import 'package:coherent_chaos/Assets/cell_type.dart';
import 'package:coherent_chaos/Assets/custom_colors.dart';
import 'package:coherent_chaos/Business/handleApiCalls.dart';
import 'package:coherent_chaos/Controllers/game_cell.dart';
import 'package:coherent_chaos/Model/game.dart';
import 'package:coherent_chaos/Model/toastr.dart';
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
  bool gameOver;

  Game newGameState;
  int selectedCellRow,
      selectedCellCol,
      targetCellRow,
      targetCellCol,
      hoppedCellRow,
      hoppedCellCol;

  set gameState(Game gameState) => setState(() => newGameState = gameState);
  set selectedRow(int row) => setState(() => selectedCellRow = row);
  set selectedCol(int col) => setState(() => selectedCellCol = col);
  set targetRow(int row) => setState(() => targetCellRow = row);
  set targetCol(int col) => setState(() => targetCellCol = col);
  set hoppedRow(int row) => setState(() => hoppedCellRow = row);
  set hoppedCol(int col) => setState(() => hoppedCellCol = col);

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    startPolling();

    if (newGameState != null) {
      updateGameState(newGameState);
      newGameState = null;
    }

    gameBoard = widget.game.board;
    isPlayerTurn = widget.game.whoseTurn == widget.playerSide;

    if (targetCellRow != null && targetCellCol != null) {
      getHoppedCell();
      makeMove();
    } else if (selectedCellRow != null && selectedCellCol != null) {
      gameBoard = updateGameBoard(gameBoard);
    }

    return WillPopScope(
      onWillPop: () {
        gameOver = true;
        Navigator.pop(context);
        if (Navigator.canPop(context)) {
          Navigator.pop(context);
        }
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
      hoppedCellRow = null;
      hoppedCellCol = null;
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
        } else if (CellType.values[col] == CellType.emptyCell &&
            (isCellAdjacent(old, x, y) || isHoppable(old, x, y))) {
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

  bool isHoppable(List<dynamic> boardState, int x, int y) {
    bool hoppable = false;
    int rowDifference = x - selectedCellRow;
    int colDifference = y - selectedCellCol;
    //same row
    if (rowDifference == 0) {
      if (colDifference == -2) {
        hoppable = isCellEnemy(boardState, x, y + 1);
      } else if (colDifference == 2) {
        hoppable = isCellEnemy(boardState, x, y - 1);
      }
    }

    //two row down
    else if (rowDifference == 2) {
      //rows around the middle row
      if (boardState[x].length == boardState[selectedCellRow].length) {
        if (colDifference == 1) {
          hoppable = isCellEnemy(boardState, x - 1, y);
        } else if (colDifference == -1) {
          hoppable = isCellEnemy(boardState, x - 1, y + 1);
        }
      } else if (boardState[x].length > boardState[selectedCellRow].length) {
        if (colDifference == 0) {
          hoppable = isCellEnemy(boardState, x - 1, y);
        } else if (colDifference == 2) {
          hoppable = isCellEnemy(boardState, x - 1, y - 1);
        }
      } else {
        if (colDifference == 0) {
          hoppable = isCellEnemy(boardState, x - 1, y);
        } else if (colDifference == -2) {
          hoppable = isCellEnemy(boardState, x - 1, y + 1);
        }
      }
    }

    //two row above
    else if (rowDifference == -2) {
      //rows around the middle row
      if (boardState[x].length == boardState[selectedCellRow].length) {
        if (colDifference == 1) {
          hoppable = isCellEnemy(boardState, x + 1, y);
        } else if (colDifference == -1) {
          hoppable = isCellEnemy(boardState, x + 1, y + 1);
        }
      }

      //rows after middle row
      else if (boardState[x].length > boardState[selectedCellRow].length) {
        if (colDifference == 0) {
          hoppable = isCellEnemy(boardState, x + 1, y);
        } else if (colDifference == 2) {
          hoppable = isCellEnemy(boardState, x + 1, y - 1);
        }
      }

      //rows before middle row
      else {
        if (colDifference == 0) {
          hoppable = isCellEnemy(boardState, x + 1, y);
        } else if (colDifference == -2) {
          hoppable = isCellEnemy(boardState, x + 1, y + 1);
        }
      }
    }
    return hoppable;
  }

  bool isCellEnemy(List<dynamic> boardState, int x, int y) {
    bool cellOpponent = false;
    CellType currentCell = CellType.values[boardState[x][y]];
    CellType selectedCellType =
        CellType.values[boardState[selectedCellRow][selectedCellCol]];
    if ((currentCell == CellType.p1Cell &&
            selectedCellType == CellType.p2Cell) ||
        (currentCell == CellType.p2Cell &&
            selectedCellType == CellType.p1Cell)) {
      cellOpponent = true;
    }
    return cellOpponent;
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

  void startPolling() {
    const INTERVAL = const Duration(seconds: 2);
    gameOver = false;
    Game newGameState;

    Timer.periodic(INTERVAL, (Timer t) async {
      try {
        newGameState = await handleAPIs.pingBoardState(
            widget.game.gameId, widget.game.token);

        bool hasUpdates = newGameState.whoseTurn != widget.game.whoseTurn;

        if (newGameState.winner != null) {
          t.cancel();
          gameOver = true;
          gameState = newGameState;
        } else if (hasUpdates) {
          gameState = newGameState;
        }
      } catch (e) {
        Toastr().showErrorMessage(e.toString());
      }
    });
  }

  void getHoppedCell() {
    int rowDifference = targetCellRow - selectedCellRow;
    int colDifference = targetCellCol - selectedCellCol;

    if (rowDifference == 0) {
      hoppedCellRow = selectedCellRow;
    } else if (rowDifference == 2) {
      hoppedCellRow = selectedCellCol + 1;
    } else if (rowDifference == -2) {
      hoppedCellRow = selectedCellCol - 1;
    }
    switch (colDifference) {
      case -2:
        hoppedCellCol = selectedCellCol - 1;
        break;
      case -1:
        hoppedCellCol = selectedCellCol;
        break;
      case 0:
        hoppedCellCol = selectedCellCol;
        break;
      case 1:
        hoppedCellCol = targetCellCol;
        break;
      case 2:
        hoppedCellCol = selectedCellCol + 1;
        break;
      default:
    }
  }

 
}
