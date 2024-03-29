describe("Login Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs in successfully with valid email and password", () => {
    cy.get("#email").type("johndoe@example.com");
    cy.get("#password").type("123");
    cy.get("#loginButton").click();
    cy.url().should("include", "/dashboard");
  });

  it("displays error message when credentials are incorrect", () => {
    cy.get("#email").type("invalidemail@example.com");
    cy.get("#password").type("invalidpassword");
    cy.get("#loginButton").click();
    cy.get(".error-message").should("contain","Your credentials don't match our system!");
  });

  it('navigates to register page when "Register here!" link is clicked', () => {
    cy.get(".login-signup-link a").click();
    cy.url().should("include", "/register");
  });
});
