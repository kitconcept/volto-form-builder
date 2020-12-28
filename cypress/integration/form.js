context('Form Blocks Tests', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page?fullobjects');
    cy.navigate('/my-page/edit');
    cy.get(`.block.title [data-contents]`);
  });

  it('As editor I can add a single-line text field to a form', () => {
    // add input field block
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser > .accordion > .title').contains('Form').click();
    cy.get('.ui.basic.icon.button.inputBlock').contains('Input').click();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain input label
    cy.get('#field-input-form-view label').contains('enter input label');
  });

  it('As editor I can add a submit button to a form', () => {
    // add submit block
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser > .accordion > .title').contains('Form').click();
    // XXX: This is inconsistent!!! we have "inputBlock" above but "submit" here!!!
    cy.get('.ui.basic.icon.button.submit').contains('Submit').click();
    cy.get('#sidebar-properties input#field-submit-button-label').type('Send');
    cy.get('#sidebar-properties input#field-submit-button-email').type(
      'to@example.com',
    );

    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain a submit button with the label 'Send'
    cy.get('#page-document button.submit-block-button').contains('Send');
  });

  it('As system I send an email to the site administrator when an anonymous user submits a form', () => {
    // add input field block
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser > .accordion > .title').contains('Form').click();
    cy.get('.ui.basic.icon.button.inputBlock').contains('Input').click();

    // add submit block
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser > .accordion > .title').contains('Form').click();
    // XXX: This is inconsistent!!! we have "inputBlock" above but "submit" here!!!
    cy.get('.ui.basic.icon.button.submit').contains('Submit').click();
    cy.get('#sidebar-properties input#field-submit-button-label').type('Send');
    cy.get('#sidebar-properties input#field-submit-button-email').type(
      'to@example.com',
    );

    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain a submit button with the label 'Send'
    cy.get('#page-document button.submit-block-button').contains('Send');

    // click send button
    cy.get('#page-document button.submit-block-button').click();
  });

  it('As editor I can add a multi-line text field to a form', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.findByText('Form').click();
    cy.findByText('Textarea').click();
    cy.get('input[id=field-textarea-label]').type('My name');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.findByText('My name').should('exist');
  });

  it('As editor I can add a email field to a form', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.findByText('Form').click();
    cy.findByText('Email').click();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.findByText('Email').should('exist');
  });

  it('As editor I can add a checkbox field to a form', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.findByText('Form').click();
    cy.findByText('Checkbox').click();
    cy.get('input[id=field-external]').type('Checkbox');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.findByText('Checkbox').should('exist');
  });

  it('As editor I can add a Select field to a form', () => {
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.findByText('Form').click();
    cy.findByText('Select').click();
    cy.get('input[id=field-select-label]').type('Select');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.findByText('Select').should('exist');
  });
});
