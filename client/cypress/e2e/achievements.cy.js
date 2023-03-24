describe("Achievements tests", () => {
  beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");
    cy.visit("/achievements");
  });

  it("displays the user's current level and total experience", () => {
    cy.get(".level-text").should("contain", "Current Level: ");
    cy.get(".level-total-exp").should("contain", "Total exp gained: ");
  });

  it("displays the progress bar", () => {
    cy.get(".level-progress-section").should("exist");
    cy.get(".level-progress-text").should("contain","Progress until next level: ");
  });
});
