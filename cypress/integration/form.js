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

  it('As editor I can add a single-line text field to a form', function () {
    // add input field block
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser > .accordion > .title').contains('Form').click();
    cy.get('.ui.basic.icon.button.inputBlock').contains('Input').click();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain an embedded Vimeo video
    cy.get('#field-input-form-view label').contains('enter input label');
  });
});
