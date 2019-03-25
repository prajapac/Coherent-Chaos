# Development

## Application

- Run `npm run build-watch` to automatically rebuild the app in **development** mode as changes are made.
- In the parent directory, run `npm run start` to start the local server.

The local server will serve the app, which is automatically rebuilt as you make changes.

## Styleguide

- Run `npm run styleguide` to start the styleguide, and visit `http://localhost:6060/` in your browser.  

Styleguidist should hot-reload your components as you work on them, but if this does not happen you should restart the styleguidist process.

## Building the App

- Run `npm run build` to build the app into the `build` directory, in **development** mode.  
- Run `npm run build-prod` to build the app into the `build` directory, in **production** mode.

The primary distinction between development and production mode is reflected in the config values exposed to the app.

## Deploying the App

- SSH into appropriate server (eg. via PuTTY)
- `screen -r` or `screen` to open or reopen the server screen
- `ctrl + c` to kill the server (if applicable)
- `git clone [this repo]` or `git pull` to pull in the project
- `git checkout [develop or master]` to select the correct branch
- `cd` into `/web/client` and run `npm install`, then run `npm run [build or build-prod]`
- `cd` into `/web` and run `npm install`, then run `npm run start`
- `ctrl + a` then `d` to exit the screen
- You may now disconnect your SSH session

## Running the Tests

- Run `npm test-unit`.
- Run `npm test-acceptance`.
