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
    player1_token: Alphanumeric String of length 8,
    player2_token: Alphanumeric String of length 8,
    board_state: An array of arrays [
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
    player2_last_ping: timestamp (milliseconds since epoch),
    whos_turn: Alphanumeric String of length 8 (Player token),
    num_turns: Integer >= 0,

    // Note: For board state, actual values stored would be int values: 0, 1, 2, 3
    // Above is just a template for easy visualization

}

Note: All MongoDB documents have an '_id' field generated
and used by MongoDB. This is different from the gameID field 
that we use to refer to a particular game instance, i.e.
it's still unique but more manageable/readable

API endpoints:
0)/api/
a) GET: Returns JSON object ({success: true}) if backend server is running properly

1)/api/game
a) POST: Create a game, returns game state (which contains game ID)

2)/api/game/:id/
a) GET: Returns the game state for game with ID provided in the URI
b) POST: Connect a player (Join a game), requires player1/player2 choice, returns player token

POST data sent schema example (JSON):
{
	"playerChoice": "player1",
}

Result schema example (JSON):
{
    "player1_token": "WXGN4RP8"
}

Above player1_token indicates the player was assigned as player 1, 
player2_token as result would have meant player was assigned as player 2

c) PATCH w/ gameID: Ping backend to keep connection alive, requires player token, returns game state

PATCH data sent schema example (JSON):
{
    "player1_token": "WXGN4RP8"
}

3)/api/game/:id/board
a) POST: Make a game move, requires game ID, player token of maker of move and move info, returns updates game state (also does validation of move in backend)

4)/api/game/:id/chat
a) POST: Send a chat message, requires player token of sender of message and the chat message, returns updated game state (containing chat message)

POST data sent schema example (JSON):
{
    "player1_token": "WXGN4RP8",
    "message": "Nice Move!"
}

# Code Styling

## Naming Convention
In general, use functionNamesLikeThis, variableNamesLikeThis, ClassNamesLikeThis, EnumNamesLikeThis, methodNamesLikeThis, CONSTANT_VALUES_LIKE_THIS, foo.namespaceNamesLikeThis.bar, and ~~filenameslikethis.js~~ file-names-like-this.js.

# Linting
To run linter:
   * run `npm run lint-fix`
