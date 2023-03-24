describe("AddSpendingLimit Tests", () => {
    beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");
    
    });
  
    it("should add a new spending limit when form is submitted", () => {
      cy.addCategoryCommand("Example Category3");
      cy.visit("/addSpendingLimit");
      cy.get('[name="name"]').type("Test limit");
      cy.get('[name="amount"]').type("100");
      cy.get('[name="duration"]').select("MONTH").should('have.value', 'MONTH');
      cy.get('[name="categoryId"]').select("Example Category3");
      cy.get('[type="button"]').click();
      cy.url().should("include", "/categories");
    });
  
    it("should display existing categories in dropdown box", () => {
      cy.visit("/addSpendingLimit");
      cy.get('[name="categoryId"]').select("Groceries");
    });
  
  });