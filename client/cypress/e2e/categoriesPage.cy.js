describe('CategoryCard component', () => {
    beforeEach(() => {
      cy.loginCommand('johndoe@example.com', '123');
      cy.addCategoryCommand('New Category')
      cy.visit('/categories')
    });
  
    it('displays category name and spending limit', () => {
      cy.get('.category-card .category-title').should('contain', 'New Category');
    //   cy.get('.category-card .category-spending-limit').should('contain', '£100 / month');
    });
  
    it('succesfully edits the name of a category', () => {
      cy.get('.category-card .category-card-button').contains('Edit').click();
      cy.get('#category-card-edit-title').type("New Category Title");
      cy.get('#confirmNewTitle').click();
      cy.url().should('include', '/categories');
      cy.contains(/New Category Title/i)
    });
  
    it('opens confirmation dialog on clicking delete button', () => {
      cy.get('.category-card .category-card-button').contains('Delete').click();
      cy.get('.react-confirm-alert').should('be.visible');
      cy.contains(/Yes/i).click();
      cy.url().should('include', '/categories');
    });
  
    it('opens add spending limit form on clicking add limit button', () => {
      cy.get('.category-card .category-card-button').contains('Add Spending Limit').click();
      cy.url().should('include', '/addSpendingLimit');
    });
  
    it('opens edit spending limit form on clicking edit limit button', () => {
      cy.get('.category-card .category-card-button').contains('Edit Spending Limit').click();
      cy.url().should('include', '/editSpendingLimit');
    });
  });