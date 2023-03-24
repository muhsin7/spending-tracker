describe("Dashboard Tests", () => {
  beforeEach(() => {
    cy.loginCommand("johndoe@example.com", "123");
    cy.visit("/dashboard");
    cy.intercept("GET", "/api/user/profile").as("getUserProfile");
    cy.intercept("GET", "/api/payment").as("getPayments");
  });

  it("should display the user's name in the header", () => {
    cy.wait("@getUserProfile").then((interception) => {
      const { name } = interception.response.body;

      cy.get(".dashboard-header h3").should("have.text",`Hi ${name.split(" ")[0]}, get your summary of your transactions here`);
    });
  });

  it("should display a line chart", () => {
    cy.wait("@getPayments").then((interception) => {
      const payments = interception.response.body;
      cy.get(".line-chart").should("be.visible");
    });
  });

  it("should display the account card on the right side", () => {
    cy.get(".dashboard-right").should("contain.text", "John");
  });

  it("should display the transactions preview and dashboard limits on the left side", () => {
    cy.get(".dashboard-bottom-left").should("be.visible");
    cy.get(".dashboard-bottom-middle").should("be.visible");
  });

  it("should display category data on the right", () => {
    cy.get(".dashboard-right h2").should("have.text", "Category Data");
  });
});
