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
    whose_turn: Alphanumeric String of length 8 (Player token),
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
- GET: Returns JSON object `{success: true}` if backend server is running properly  

#### `/api/game`  
- POST: Create a game, returns game state (which contains game ID)  

#### `/api/game/:id/`  
- GET: Returns the game state for game with ID provided in the URI  
- POST: Connect a player (Join a game), requires player1/player2 choice, returns player token  

POST data sent schema example (JSON):
```  
{  
	"playerChoice": "player1",  
}  
```

Result schema example (JSON):
```  
{  
    "player1_token": "WXGN4RP8"  
}  
```

Above player1_token indicates the player was assigned as player 1,  
player2_token as result would have meant player was assigned as player 2  

- PATCH w/ gameID: Ping backend to keep connection alive, requires player token, returns game state  

PATCH data sent schema example (JSON):
```  
{  
    "player1_token": "WXGN4RP8"  
}  
```

#### `/api/game/:id/board`  
- POST: Make a game move, requires game ID, player token of maker of move and move info, returns updates game state (also does validation of move in backend)  

#### `/api/game/:id/chat`  
- POST: Send a chat message, requires player token of sender of message and the chat message, returns updated game state (containing chat message)  

POST data sent schema example (JSON):  
```
{  
    "player1_token": "WXGN4RP8",  
    "message": "Nice Move!"  
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
To run linter:
   * run `npm run lint-fix`
