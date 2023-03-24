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

Cypress.Commands.add('addPaymentCommand', (title, description, amount, select, date) => {
    
    cy.visit('/addPayment');
  
    cy.get('#title').type(title);
    cy.get('#description').type(description);
    cy.get('#amount').type(amount);
    cy.get('select').select(select)
    cy.get('#date').type(date);
})
