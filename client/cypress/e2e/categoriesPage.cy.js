describe("CategoryCard Tests", () => {
  beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");
    cy.addCategoryCommand("New Category");
    cy.visit("/categories");
  });

  it("displays category name and spending limit", () => {
    cy.get(".category-card .category-title").should("contain", "New Category");
  });

  it("succesfully edits the name of a category", () => {
    cy.get(".category-card .category-card-button").contains("Edit").click();
    cy.get("#category-card-edit-title").type("New Category Title");
    cy.get("#confirmNewTitle").click();
    cy.url().should("include", "/categories");
    cy.contains(/New Category Title/i);
  });

  it("clicking delete button prompts a confirmation alert", () => {
    cy.get(".category-card .category-card-button").contains("Delete").click();
    cy.get(".react-confirm-alert").should("be.visible");
    cy.contains(/Yes/i).click();
    cy.url().should("include", "/categories");
  });

  it("clicking add spending limit button redirects to add spedning limit page", () => {
    cy.get(".category-card .category-card-button").contains("Add Spending Limit").click();
    cy.url().should("include", "/addSpendingLimit");
  });

  it("cliking edit limit button opens editing spending limit form", () => {
    cy.get(".category-card .category-card-button").contains("Edit Spending Limit").click();
    cy.url().should("include", "/editSpendingLimit");
  });
});
