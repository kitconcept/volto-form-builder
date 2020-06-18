# GH Actions

## Create gh action

.github/workflows/cy.yml

## prettier

Install prettier:

```
yarn add prettier -W
```

package.json:

````
{
  ...
  "scripts": {
    ...
    "prettier": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
    "prettier:fix": "./node_modules/.bin/prettier --single-quote --write 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
  }
}

## eslint

"lint": "./node_modules/eslint/bin/eslint.js --max-warnings=0 'src/**/*.{js,jsx,json}'",
    "lint:fix": "./node_modules/eslint/bin/eslint.js --fix 'src/**/*.{js,jsx,json}'",
    "i18n": "rm -rf build/messages && NODE_ENV=production node src/i18n.js",
    "code-analysis:i18n": "yarn i18n && git diff -G'^[^\"POT]' --exit-code"

## i18n

## Cypress

Install Cypress:

```
yarn add cypress -W
```

Create basic Cypress test setup:

```
yarn run cypress open
```

Add new files to repo:

```
git add cypress cypress.json
```

cypress/support/commands.js:

````
import '@plone/volto/cypress/support/commands';
````

cypress/support/index.js:

````
import 'cypress-file-upload';
import 'cypress-plugin-retries';
import './commands';
import 'cypress-axe';

beforeEach(function () {
  cy.log('Setting up API fixture');
  cy.exec('yarn cy:test:fixture:setup');
});

afterEach(function () {
  cy.log('Tearing down API fixture');
  cy.exec('yarn cy:test:fixture:teardown');
});
````

cypress/support/reset-fixture.js:

````
const xmlrpc = require('xmlrpc');

const args = process.argv;
const command = process.argv[2];

// create a client
const client = xmlrpc.createClient({
  host: 'localhost',
  port: 55001,
  path: '/plone/RobotRemote',
});

function setup() {
  // Setup site
  client.methodCall(
    'run_keyword',
    [
      'remote_zodb_setup',
      ['plone.app.robotframework.testing.PLONE_ROBOT_TESTING'],
    ],
    () => {},
  );
}

function teardown() {
  // Tearing down
  client.methodCall(
    'run_keyword',
    [
      'remote_zodb_teardown',
      ['plone.app.robotframework.testing.PLONE_ROBOT_TESTING'],
    ],
    () => {},
  );
}

switch (command) {
  case 'setup':
    return setup();
  case 'teardown':
    return teardown();
  default:
    return setup();
}
````

package.json:

````
  "jest": {
    ... 
    "moduleNameMapper": {
      ...
      "@plone/volto/cypress": "<rootDir>/node_modules/@plone/volto/cypress",
    }
  }
````

cypress.json:

````
{
  "baseUrl": "http://localhost:3000",
  "viewportWidth": 1280
}
````




