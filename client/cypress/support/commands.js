Cypress.Commands.add('loginCommand', (username, password) => {
    cy.visit('/login');
  
    cy.get('#email').type(username);

    cy.get('#password').type(password);

    cy.get('#loginButton').click();
  
    cy.url().should('include', '/dashboard');
})

Cypress.Commands.add('addCategoryCommand', (categoryName) => {
    
    cy.visit('/addCategory');
  
    cy.get('input').type(categoryName);

    cy.get('#addCategoryButton').click();
  
    cy.url().should("include", "/categories");
})