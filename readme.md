# Access

## Development Server
http://18.191.224.215:5000/

## Production Server
http://52.14.173.109:5000/

## Feature Branch Server
http://3.17.203.100:5000/

# Setup

For web setup, please see `/web`.  
For mobile setup, please see `/mobile`.

## Deploying the Server

- SSH into appropriate server (eg. via PuTTY)
- `screen -r` or `screen` to open or reopen the server screen
- `ctrl + c` to kill the server (if applicable)
- `git clone [this repo]` or `git pull` to pull in the project
- `git checkout [develop or master]` to select the correct branch
- `cd` into `/web/client` and run `npm install`, then run `npm run [build or build-prod]`
- `cd` into `/web` and run `npm install`, then run `npm run start`
- `ctrl + a` then `d` to exit the screen
- You may now disconnect your SSH session

# Development Documentation

- [Feature Task Breakdown](https://docs.google.com/spreadsheets/d/1Of-uKO3uS7N0g9iKk9wQNg0DKotKLKIcH9sKwsX65v8/edit?usp=sharing)
