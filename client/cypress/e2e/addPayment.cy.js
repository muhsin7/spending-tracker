describe("AddPayment Component", () => {
  beforeEach(() => {
    cy.visit('addPayment');
    // cy.visit('/login');
    // cy.get('#email').type('johndoe@example.com');
    // cy.get('#password').type('123');
    // cy.get('#loginButton').click();
    // cy.visit('/addPayment')
    // cy.url().should('include', '/dashboard');
  });

  it("should render the form and required fields correctly", () => {
    cy.get('[data-cy=title]').should("exist");
    cy.get('[data-cy=description]').should("exist");
    cy.get('[data-cy=amount]').should("exist");
    cy.get('[data-cy=category]').should("exist");
    cy.get('[data-cy=date]').should("exist");
    cy.get('[data-cy=image]').should("exist");
    cy.get('[data-cy=submit]').should("exist");

    // Check required fields are marked correctly
    cy.get('[data-cy=title]').should("have.attr", "required");
    cy.get('[data-cy=description]').should("have.attr", "required");
    cy.get('[data-cy=amount]').should("have.attr", "required");
    cy.get('[data-cy=date]').should("have.attr", "required");
    cy.get('[data-cy=category]').should("have.attr", "required");
  });

  it("should show error message when required fields are not filled", () => {
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=error-message]').should("exist");
  });

  it("should submit the form successfully with valid data", () => {
    // Fill the form with valid data
    cy.get('[data-cy=title]').type("New Payment Title");
    cy.get('[data-cy=description]').type("New Payment Description");
    cy.get('[data-cy=amount]').type("50");
    cy.get('[data-cy=category]').select("Category Name");
    cy.get('[data-cy=date]').type("2023-03-23");
    cy.get('[data-cy=image]').attachFile("example.jpg");
    
    // Submit the form and check that the payment is added successfully
    cy.intercept("POST", "/api/payment").as("addPayment");
    cy.get('[data-cy=submit]').click();
    cy.wait("@addPayment").then((interception) => {
      const response = interception.response.body;
      expect(response.title).to.equal("New Payment Title");
      expect(response.description).to.equal("New Payment Description");
      expect(response.amount).to.equal(50);
      expect(response.categoryId).to.equal("category-id");
      expect(response.date).to.equal("2023-03-23");
      expect(response.image).to.exist;
    });
  });
});