describe("AddPayment Component", () => {
  beforeEach(() => {
    cy.loginCommand('johndoe@example.com', '123');
  });

  it("should render the form and required fields correctly", () => {
    cy.visit('/addPayment');
    cy.get('#title').should("exist");
    cy.get('#description').should("exist");
    cy.get('#amount').should("exist");
    cy.get('#date').should("exist");
    cy.get('#image').should("exist");
    cy.get('#addPaymentButton').should("exist");

    
    cy.get('#title').should("have.attr", "required");
    cy.get('#amount').should("have.attr", "required");
    cy.get('#description').should("have.attr", "required");
  });

  it("should show error message when required fields are not filled", () => {
    cy.visit('/addPayment');
    cy.get('#addPaymentButton').click();
    cy.contains(/value 'title' is required!/i);
  });

  // it("should submit the form successfully with valid data", () => {
  //   // Fill the form with valid data
  //   cy.addCategoryCommand('New Category')
  //   cy.visit('/addPayment');
  //   cy.get('#title').type("New Payment Title");
  //   cy.get('#description').type("New Payment Description");
  //   cy.get('#amount').type("50");
  //   cy.get('select').select('New Category').should('have.value', '456')
  //   cy.get('#date').type("2023-03-23");
    
  //   // Submit the form and check that the payment is added successfully
  //   cy.get('#addPaymentButton').click();
  //   cy.url().should("include", "/payments");
  //   cy.contains("New Payment Title");
  //   cy.contains("New Payment Description");
  //   cy.contains("50");
  //   });
});