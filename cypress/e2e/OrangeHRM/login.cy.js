describe("Login Feature", () => {
  it("User Login with valid data", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get("h5").should("contain.text", "Login");
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.intercept("GET", "**/messages").as("messages");
    cy.intercept("GET", "**/action-summary").as("actionSummary");
    cy.intercept("GET", "**/shortcuts").as("shortcuts");
    cy.intercept("GET", "**/subunit").as("subunit");
    cy.intercept("POST", "**/push").as("push");
    cy.intercept("GET", "**/locations").as("locations");
    cy.get('[type="submit"]').click();
    cy.wait("@messages");
    cy.wait("@actionSummary");
    cy.wait("@shortcuts");
    cy.wait("@subunit");
    cy.wait("@push");
    cy.wait("@locations");
    cy.get("h6").should("contain.text", "Dashboard");
  });
});
