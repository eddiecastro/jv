## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Launches the test runner

### `npm run build`

Builds the app for production

### `npm run server:prd`
Only use npm run server:prd when .env.local is set.
consider

SALESLOFT_API_KEY=v2_xx_00000_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SALESLOFT_API_KEY_PREFIX=Bearer
NODE_ENV=production

Start the production server and go to http://localhost:4000/
consider to set ENV variables when starting prod server, or add them to an .env.local file for test

### `SALESLOFT_API_KEY=v2_xx_00000_xxxxxxxxxxxxxxxxxxxxxxxxxxx SALESLOFT_API_KEY_PREFIX=Bearer NODE_ENV=production node server/server.js`
Pass env variables on command line
Start the production server and go to http://localhost:4000/

### `npm run eject`

**Note: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

