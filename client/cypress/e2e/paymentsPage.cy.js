describe("Payments page tests", () => {
  beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");

  });

  it("displays correct details of a payment", () => {
    cy.addPaymentCommand("Example Payment Title", "Example Payment Description", "50", 'Groceries', "2023-03-23");
    cy.visit('/payments')
    cy.get(".payment-title").should("contain", "Example Payment Title");
    cy.get(".payment-amount").should("contain", "50");
    cy.get(".payment-description").should("contain", "2023-03-23");
  });
  

  it("does not display View image button when payment does not have an image", () => {
    cy.get(".payment-image-button").should("not.exist");
  });

});