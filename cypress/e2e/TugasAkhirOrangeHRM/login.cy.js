import loginPage from "../../pom/login/login.cy";

describe("Login Feature", () => {
  it("User Login with valid data", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    loginPage.verifyLoginPage().should("have.text", "Login");
    loginPage.inputUsername().type("Admin");
    loginPage.inputPassword().type("admin123");
    cy.intercept("GET", "**/messages").as("messages");
    cy.intercept("GET", "**/action-summary").as("actionSummary");
    cy.intercept("GET", "**/shortcuts").as("shortcuts");
    cy.intercept("GET", "**/subunit").as("subunit");
    cy.intercept("POST", "**/push").as("push");
    cy.intercept("GET", "**/locations").as("locations");
    loginPage.buttonLogin().click();
    cy.wait("@messages");
    cy.wait("@actionSummary");
    cy.wait("@shortcuts");
    cy.wait("@subunit");
    cy.wait("@push");
    cy.wait("@locations");
    loginPage.dashboardPage().should("have.text", "Dashboard");
  });
});
