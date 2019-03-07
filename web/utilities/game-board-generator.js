const generateInitBoard = function() {
    return [
        [1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 0],
        [2, 2, 2, 2, 2, 2],
    ];
    // Note: -1 would be a dropped cell when implemented
};

// Above maps to:
// [
//     [C1,C1,C1,C1,C1,C1],
//     [CE,C1,C1,C1,C1,C1,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,CE,CE,CE,CE,CE,CE,CE],
//     [CE,C2,C2,C2,C2,C2,CE],
//     [C2,C2,C2,C2,C2,C2]
// ]
// for the React Web Client
// where C1 = Player 1 Cell, C2 = Player 2 Cell, CE = Empty Cell

module.exports = generateInitBoard;
