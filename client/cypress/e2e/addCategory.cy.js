describe("AddCategory Tests", () => {
  beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");
    cy.visit("/addCategory");
  });

  it("should add a new category succesfully", () => {
    cy.get("input").type("New category");
    cy.get("#addCategoryButton").click();
    cy.url().should("include", "/categories");
    cy.contains(/New category/i);
  });

  it("should display an error message if the category name is empty", () => {
    cy.get("#addCategoryButton").click();
    cy.contains(/category name is required!/i);
  });
});
