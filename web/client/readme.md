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

## Running the Unit Tests

- Run `npm test`.

## Running the Acceptance Tests

- Run `npx codeceptjs run --steps`.
