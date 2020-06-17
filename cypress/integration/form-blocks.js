describe('Text Block Tests', () => {
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

  it('As editor I can add a text block', () => {
    // when I add a text block
    cy.get('.block.inner.text .public-DraftEditor-content')
      .click()
      .type('My text')
      .get('span[data-text]')
      .contains('My text');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page?fullobjects');

    // then the page view should contain the text block
    cy.get('#page-document p').contains('My text');
  });
});
