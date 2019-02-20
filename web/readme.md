# Prerequisite
Install `Node.js` and `npm` from https://nodejs.org/en/ 

# Initial Setup
1. Navigate to `/web/client` in terminal
   * run `npm install`
   * run `npm run build`
2. Navigate to `/web` in terminal
   * run `npm install`
   * run `npm run start`

*for client details, refer to `/web/client`*

# MongoDB Database
There is one collection: 'games'
Collections are like Tables in Relational Databases
Collections in MongoDB are made up of documents

Schemas of documents

Game state schema:
{
    game_id: Alphanumeric String of length 4,
    player1Token: Alphanumeric String of length 8,
    player2Token: Alphanumeric String of length 8,
    boardState: An array of arrays [
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
    ],
    player1_last_message: String,
    player2_last_message: String,,
    player1_last_ping: timestamp (milliseconds since epoch),
    player1_last_ping: timestamp (milliseconds since epoch),
    whos_turn: Alphanumeric String of length 8 (Player token),
    num_turns: Integer >= 0,

    // Note: For board state, actual values stored would be int values: -1, 0, 1, 2
    // Above is just a template for easy visualization
}

Note: All MongoDB documents have an '_id' field generated
and used by MongoDB. This is different from the gameID field 
that we use to refer to a particular game instance, i.e.
it's still unique but more manageable/readable

API endpoints:

1)/api/game
a) GET: Join a game, requires game ID, returns game state
b) POST: Create a game, returns game state (which contains game ID)
c) POST/gameID: Connect a player, requires game ID and player1/player choice, returns player token
d) PUT: Make a game move, requires game ID, player token of maker of move and move info, returns updates game state (also does validation of move in backend)

2)/api/ping
a) POST/gameID: Ping backend to keep connection alive, requires game ID and player token, returns game state

3)/api/chat
a) POST: Send a chat message, requires game ID, player token of sender of message and the chat message, returns updates game state (containing chat message)

# Code Styling

## Naming Convention
In general, use functionNamesLikeThis, variableNamesLikeThis, ClassNamesLikeThis, EnumNamesLikeThis, methodNamesLikeThis, CONSTANT_VALUES_LIKE_THIS, foo.namespaceNamesLikeThis.bar, and filenameslikethis.js.

# Linting
To run linter:
   * run `npm run lint-fix`
