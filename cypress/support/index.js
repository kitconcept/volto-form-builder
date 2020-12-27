// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import 'cypress-file-upload';
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