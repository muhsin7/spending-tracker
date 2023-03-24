describe("AddPayment Tests", () => {
  beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");
  });

  it("should render the payment form correctly", () => {
    cy.visit("/addPayment");
    cy.get("#title").should("exist");
    cy.get("#description").should("exist");
    cy.get("#amount").should("exist");
    cy.get("#date").should("exist");
    cy.get("#image").should("exist");
    cy.get("#addPaymentButton").should("exist");

    cy.get("#title").should("have.attr", "required");
    cy.get("#amount").should("have.attr", "required");
    cy.get("#description").should("have.attr", "required");
  });

  it("should show error message when required fields are empty", () => {
    cy.visit("/addPayment");
    cy.get("#addPaymentButton").click();
    cy.contains(/value 'title' is required!/i);
  });

  it("should submit the form successfully with valid data", () => {
    // cy.addCategoryCommand('New Category13')
    cy.visit('/addPayment');
    cy.get('#title').type("Example Title");
    cy.get('#description').type("Example Description");
    cy.get('#amount').type("50");
    cy.get('select').select('Groceries')
    cy.get('#date').type("2023-03-23");

    cy.get('#addPaymentButton').click();
    cy.url().should("include", "/payments");
    cy.contains("Example Title");
    cy.contains("Example Description");
    cy.contains("50");
    });
});
