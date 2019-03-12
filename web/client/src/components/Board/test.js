import React from 'react';
import { shallow } from 'enzyme';

import Board, { getOppositeCell, isCellAdjacent, expandBoardStateToCellObjects, isCellVisitable } from './index';
import { CELL_PLAYER_1 as C1, CELL_PLAYER_2 as C2, CELL_EMPTY as CE } from 'constants';

test('Board renders without crashing', () => {
    const component = shallow(
        <Board />
    );
    expect(component.exists())
});

test('Board gets correct opposite cell', () => {
    let boardState = [
        [C1,C1,C1,C1,C1,C1],
        [CE,C1,C1,C1,C1,C1,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,C2,C2,C2,C2,C2,CE],
        [C2,C2,C2,C2,C2,C2]
    ];

    let resultCell = getOppositeCell( // Same row
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Pivot cell
            rowIndex: 5,
            columnIndex: 5,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(5);
    expect(resultCell.columnIndex).toBe(6);

    resultCell = getOppositeCell( // Same row
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 2,
            state: CE
        },
        { // Pivot cell
            rowIndex: 4,
            columnIndex: 3,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(4);
    expect(resultCell.columnIndex).toBe(4);

    resultCell = getOppositeCell( // Same row
        boardState,
        { // Source cell
            rowIndex: 7,
            columnIndex: 7,
            state: CE
        },
        { // Pivot cell
            rowIndex: 7,
            columnIndex: 6,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(7);
    expect(resultCell.columnIndex).toBe(5);

    resultCell = getOppositeCell( // Top left to bottom right
        boardState,
        { // Source cell
            rowIndex: 6,
            columnIndex: 6,
            state: CE
        },
        { // Pivot cell
            rowIndex: 7,
            columnIndex: 6,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(8);
    expect(resultCell.columnIndex).toBe(6);

    resultCell = getOppositeCell( // Top left to bottom right
        boardState,
        { // Source cell
            rowIndex: 2,
            columnIndex: 3,
            state: CE
        },
        { // Pivot cell
            rowIndex: 3,
            columnIndex: 3,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(4);
    expect(resultCell.columnIndex).toBe(3);

    resultCell = getOppositeCell( // Top left to bottom right through center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 5,
            state: CE
        },
        { // Pivot cell
            rowIndex: 5,
            columnIndex: 5,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(6);
    expect(resultCell.columnIndex).toBe(4);

    resultCell = getOppositeCell( // Top right to bottom left through center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 6,
            state: CE
        },
        { // Pivot cell
            rowIndex: 5,
            columnIndex: 5,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(6);
    expect(resultCell.columnIndex).toBe(5);

    resultCell = getOppositeCell( // Bottom right to top left through center
        boardState,
        { // Source cell
            rowIndex: 6,
            columnIndex: 6,
            state: CE
        },
        { // Pivot cell
            rowIndex: 5,
            columnIndex: 5,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(4);
    expect(resultCell.columnIndex).toBe(5);

    resultCell = getOppositeCell( // Bottom left to top right through center
        boardState,
        { // Source cell
            rowIndex: 6,
            columnIndex: 5,
            state: CE
        },
        { // Pivot cell
            rowIndex: 5,
            columnIndex: 5,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(4);
    expect(resultCell.columnIndex).toBe(4);

    resultCell = getOppositeCell( // Bottom left to top right long opposite
        boardState,
        { // Source cell
            rowIndex: 0,
            columnIndex: 3,
            state: CE
        },
        { // Pivot cell
            rowIndex: 2,
            columnIndex: 5,
            state: CE
        });
    expect(resultCell.rowIndex).toBe(4);
    expect(resultCell.columnIndex).toBe(7);

});

test('Board gets correct adjacent cell', () => {
    let boardState = [
        [C1,C1,C1,C1,C1,C1],
        [CE,C1,C1,C1,C1,C1,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,C2,C2,C2,C2,C2,CE],
        [C2,C2,C2,C2,C2,C2]
    ];

    expect(isCellAdjacent( // Same row on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 5,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Same row on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 3,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Same row on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 2,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Same row on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 6,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Above row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Above row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 3,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Above row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 2,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Above row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 5,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Below row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 6,
            columnIndex: 4,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Below row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 6,
            columnIndex: 3,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Below row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 6,
            columnIndex: 2,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Below row  on center
        boardState,
        { // Source cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 6,
            columnIndex: 5,
            state: CE
        })
    ).toBe(false);

    ///////////////////////

    expect(isCellAdjacent( // Same row above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 5,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Same row above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 3,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Same row above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 2,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Same row above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 4,
            columnIndex: 6,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Above row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 3,
            columnIndex: 4,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Above row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 3,
            columnIndex: 3,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Above row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 3,
            columnIndex: 2,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Above row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 3,
            columnIndex: 5,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Below row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Below row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 4,
            state: CE
        })
    ).toBe(true);

    expect(isCellAdjacent( // Below row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 2,
            state: CE
        })
    ).toBe(false);

    expect(isCellAdjacent( // Below row  above center
        boardState,
        { // Source cell
            rowIndex: 4,
            columnIndex: 4,
            state: CE
        },
        { // Test cell
            rowIndex: 5,
            columnIndex: 6,
            state: CE
        })
    ).toBe(false);
});

test('Board marks correct cells visitable', () => {
    let boardState = [
        [C1,C1,C1,C1,C1,C1],
        [CE,C1,C1,C1,C1,C1,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,C2,C2,C2,C2,C2,CE],
        [C2,C2,C2,C2,C2,C2]
    ];

    expect(isCellVisitable(
        boardState,
        { // Source cell
            rowIndex: 1,
            columnIndex: 1,
            state: C1
        },
        { // Dest cell
            rowIndex: 1,
            columnIndex: 0,
            state: CE
        })
    ).toBe(true);

    expect(isCellVisitable(
        boardState,
        { // Source cell
            rowIndex: 1,
            columnIndex: 1,
            state: C1
        },
        { // Dest cell
            rowIndex: 1,
            columnIndex: 2,
            state: C1
        })
    ).toBe(false);

    expect(isCellVisitable(
        boardState,
        { // Source cell
            rowIndex: 1,
            columnIndex: 1,
            state: C1
        },
        { // Dest cell
            rowIndex: 2,
            columnIndex: 1,
            state: CE
        })
    ).toBe(true);

    expect(isCellVisitable(
        boardState,
        { // Source cell
            rowIndex: 1,
            columnIndex: 1,
            state: C1
        },
        { // Dest cell
            rowIndex: 3,
            columnIndex: 1,
            state: CE
        })
    ).toBe(false);
});

test('Board expands to objects properly', () => {
    let boardState = [
        [C1,C1,C1,C1,C1,C1],
        [CE,C1,C1,C1,C1,C1,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,CE,CE,CE,CE,CE,CE,CE],
        [CE,C2,C2,C2,C2,C2,CE],
        [C2,C2,C2,C2,C2,C2]
    ];

    let expandedBoard = expandBoardStateToCellObjects(
        boardState,
        { // Selected cell
            rowIndex: 1,
            columnIndex: 1,
            state: C1
        }
    );

    expect(expandedBoard[1][1].selected).toBe(true);
    expect(expandedBoard[1][2].selected).toBe(false);
    expect(expandedBoard[2][1].visitable).toBe(true);
    expect(expandedBoard[0][1].selectable).toBe(true);
    expect(expandedBoard[3][1].selectable).toBe(false);
    expect(expandedBoard[3][1].state).toBe(CE);
    expect(expandedBoard[5][7].rowIndex).toBe(5);
    expect(expandedBoard[5][7].columnIndex).toBe(7);
});
