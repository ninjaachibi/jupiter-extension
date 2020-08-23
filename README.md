# Jupiter Extension
This is the take home project from Jupiter-co.

On the front-end I used `React` and `material-ui`. On the backend, I used `Node.js`/`TypeScript` with Firebase CloudStore and Firebase Cloud Functions. 

## File structure
The main files of interest are in `./src`, the front-end, and `./functions`, the backend.
```
.
├── _package.json
├── _functions // our back-end
│   └── _src
│       └── index.ts 
├── _src //  our front end 
│   ├── App.js
│   ├── routes.js
│   └── components 
│       └── MyRecipes.js 
│       └── NewRecipes.js 
│       └── Recipes.js 
│       └── Sigup.js 
│       └── Login.js 
│       └── ...
...

```


## Demo
TODO

## TODO
* add update/deletion functionality for recipes
* migrate to typescript on the client side
* deploy firebase functions to prod
* add real-time event listeners for FireStore document updates
* move hard-coded fetch calls to some util function
* implement user access permissions for deleting/modifying only their own recipes

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Docker

This project works in a docker container as well

First run:
`docker build . -t material-sense`

Then:
`docker run -p 2222:2222 material-sense`

_the 2222 port intend to make work on Azure websites as container for default, cause is the port they use to expose the server_

### Publish at Github pages
`yarn deploy`

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/alexanmtz/material-sense/graphs/contributors"><img src="https://opencollective.com/material-sense/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/material-sense/contribute)]

#### Individuals

<a href="https://opencollective.com/material-sense"><img src="https://opencollective.com/material-sense/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/material-sense/contribute)]

<a href="https://opencollective.com/material-sense/organization/0/website"><img src="https://opencollective.com/material-sense/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/1/website"><img src="https://opencollective.com/material-sense/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/2/website"><img src="https://opencollective.com/material-sense/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/3/website"><img src="https://opencollective.com/material-sense/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/4/website"><img src="https://opencollective.com/material-sense/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/5/website"><img src="https://opencollective.com/material-sense/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/6/website"><img src="https://opencollective.com/material-sense/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/7/website"><img src="https://opencollective.com/material-sense/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/8/website"><img src="https://opencollective.com/material-sense/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/material-sense/organization/9/website"><img src="https://opencollective.com/material-sense/organization/9/avatar.svg"></a>
