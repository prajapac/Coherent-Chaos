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

# Running Backend Tests
1. Navigate to `/web` in terminal
   * run `npm install`
   * run `npm test`

# MongoDB Database

## Setup

### Windows
- Install MongoDB: https://www.mongodb.com/download-center/community
- Create a new database called `coherentchaos` with a collection called `games`

### Linux
- Install MongoDB: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-using-deb-packages:
    - Copy and paste the commands for steps 1-4 one by one
- Create a new database called `coherentchaos` with a collection called `games`:
    1) Start MongoDB: sudo service mongod start
    2) Verify that MongoDB has started successfully: inspect log file at /var/log/mongodb/mongod.log
        - look for [initandlisten] waiting for connections on port 27017
    3) Start mongo shell: mongo
    4) Create `coherentchaos` database: use coherentchaos
    5) Create `games` collection: db.createCollection("games")
    6) Exit mongo shell: 'Ctrl-C shortcut'
    7) Troubleshooting: Stop MongoDB: sudo service mongod stop, Restart MongoDB: sudo service mongod restart


## Info
There is one collection: 'games'
Collections are like Tables in Relational Databases
Collections in MongoDB are made up of documents

Schemas of documents

Game state schema:
{

    game_id: Alphanumeric String of length 4,
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
    player1_token: Alphanumeric String of length 8,
    player2_token: Alphanumeric String of length 8,
    player1_last_ping: timestamp (milliseconds since epoch),
    player2_last_ping: timestamp (milliseconds since epoch),
    whose_turn: Numeric / Enum: 1 = Player 1, 2 = Player 2,
    num_turns: Integer >= 0,

    // Note: For board state, actual values stored would be int values: 0, 1, 2, 3
    // Above is just a template for easy visualization

}

Note: All MongoDB documents have an '_id' field generated
and used by MongoDB. This is different from the gameID field
that we use to refer to a particular game instance, i.e.
it's still unique but more manageable/readable

### API endpoints
#### `/api/`
##### GET: Return JSON object `{"success": true}`.

#### `/api/game`  
##### POST: Create a game.  
- Example response:
```
{
    "game_id": "56WJ",
    "board_state": [...],
    "num_turns": 0,
    "whose_turn": 1,
    "token": "6H6XTC9M",
    "winner": null
}
```

#### `/api/game/:id/`  
##### GET: Returns the game state for game with ID provided in the URI.
- Example response:
```
{
    "game_id": "56WJ",
    "board_state": [...],
    "num_turns": 0,
    "whose_turn": 1,
    "winner": null,
    "player_1_active": false,
    "player_2_active": false
}
```

##### POST: Connect a player (Join a game).
- Example POST body:
```
{
    "playerChoice": 1
}
```
- Example responses:
```
{
    "token": "3SK7R5DW"
}
```
```
{
    "failure": true,
    "message": "Game is full",
    "gameID": "56WJ"
}
```
```
{
    "failure": true,
    "message": "Invalid player choice or player still connected",
    "gameID": "56WJ",
    "playerChoice": null
}
```

##### PATCH: Ping backend to keep connection alive.
- Example POST body:
```
{
    "token": "WXGN4RP8"
}
```
- Example responses:
```
{
    "game_id": "56WJ",
    "board_state": [...],
    "num_turns": 0,
    "whose_turn": 1,
    "winner": null,
    "player_1_active": false,
    "player_2_active": false
}
```
```
{
    "failure": true,
    "message": "Missing playerToken or improper POST body format"
}
``` 

#### `/api/game/:id/board`  
##### POST: Make a game move.  
- Example POST body:
```
{
    "token": "WXGN4RP8",
    "move": {
        selectedCell: {
            rowIndex: 1,
            columnIndex: 1
        },
        targetCell: {
            rowIndex: 1,
            columnIndex: 3
        },
        hoppedCell: {
            rowIndex: 1,
            columnIndex: 2
        }
    }
}
```
- Example responses:
```
{
    "game_id": "56WJ",
    "board_state": [...],
    "num_turns": 0,
    "whose_turn": 1,
    "winner": null,
    "player_1_active": false,
    "player_2_active": false
}
```
```
{
    "failure": true,
    "message": "Missing playerToken or improper POST body format"
}
``` 

# Code Styling

## Naming Convention
In general, use:
- functionNamesLikeThis
- variableNamesLikeThis
- ClassNamesLikeThis 
- EnumNamesLikeThis 
- methodNamesLikeThis
- CONSTANT_VALUES_LIKE_THIS
- foo.namespaceNamesLikeThis.bar 
- ~~filenameslikethis.js~~
- file-names-like-this.js.

# Linting
- To run linter: `npm run lint`  
- To automatically fix linting issues: `npm run lint-fix`
