describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display empty form fields by default', () => {
    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
    cy.get('#password2').should('have.value', '');
  });

  it('should display an error message if the passwords do not match', () => {
    cy.get('#name').type('Test User');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('password');
    cy.get('#password2').type('wrongpassword');
    cy.get('#createAccountButton').click();
    cy.get('.error-message').should('have.text', 'Passwords do not match');
  });

  it('should submit the form successfully when all fields are filled correctly', () => {
    cy.get('#name').type('Test User');
    cy.get('#email').type('testuser99@example.com');
    cy.get('#password').type('password');
    cy.get('#password2').type('password');
    cy.get('#createAccountButton').click();
    cy.url().should('include', '/login');
  });

  it('should redirect to the login page when the "Log in" link is clicked', () => {
    cy.get('.login-signup-link a').click();
    cy.url().should('include', '/login');
  });
});