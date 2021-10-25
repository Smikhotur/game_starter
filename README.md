## Structure of project

Simple and dummy components should be stored in `src/app`.
Global Entities such as `comment`, `game` and `user` stored in `src/enitites`
Transation to different language is stored in `src/lang` file. Add new lang here or add new translation.
`src/modules` contains components which will be rendered in route file. And then inside this component import dummy and simple component from `src/app`.
Folder `src/utils` contains utils which can be moved between projects.
`src/firebase` incude setupping of firebase credentials and connecting to firebase and firebase database.
`.env` file required for this project as it has credential to work with firebase

## Git flow

For new features or new tasks please start branch name from `feature/YOUR_FEATURE` where YOUR_FEATURE name of feature.
For bug fix start branch from `bug/`
Main approvers of this project is Bohdan Boiko and Oleh Perehuda. Please add them as reviewers.
As a plus you can add screens or videos to your PR.
Remeber Main branch auto deploy to Heroku `https://gaming-agregator.herokuapp.com/`

## Features and libraries

`react-intl` as ligrary to multi lang.
`react-redux` as global store library
`redux-thunks` as midleware to create request to firebase
`react-json-to-csv` as library to conwert and dowload our json data to csv file
`node-sass` as pre-processor to improve writing styles
`typescript` to improve readable and better understanding of our aplication.
`firebase` as our database and auth service.
`react-router-dom` to create react routing. And to have private routes

## Available Scripts

In the project directory, you can run:

### `yarn start`

Start node server from file `server.ts` which hosted on 3000 by default and get files from build folder

### `yarn dev`

Start React aplication with hot reload and other features

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
