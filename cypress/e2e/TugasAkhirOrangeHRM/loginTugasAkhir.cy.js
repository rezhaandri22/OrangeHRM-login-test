import loginPage from "../../pom/login/login.cy";

describe("Login Tests - OrangeHRM", () => {
  const baseUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const errorMessage = "Required";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("TC-001: User dapat login menggunakan akun data valid", () => {
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

  it("TC-002: User tidak dapat login dengan akun data invalid", () => {
    loginPage.inputUsername().type("admin10111");
    loginPage.inputPassword().type("WrongPassword");
    loginPage.buttonLogin().click();
    loginPage.errorMessage().should("contain.text", "Invalid credentials");
  });

  it("TC-003: User tidak dapat login dengan username salah", () => {
    loginPage.inputUsername().type("admin10111");
    loginPage.inputPassword().type("admin123");
    loginPage.buttonLogin().click();
    loginPage.errorMessage().should("contain.text", "Invalid credentials");
  });

  it("TC-004: User tidak dapat login dengan password salah", () => {
    loginPage.inputUsername().type("Admin");
    loginPage.inputPassword().type("WrongPassword");
    loginPage.buttonLogin().click();
    loginPage.errorMessage().should("contain.text", "Invalid credentials");
  });

  it("TC-005: User tidak dapat login dengan kolom username dan password kosong", () => {
    loginPage.buttonLogin().click();
    loginPage.usernameErrorMessage().should("contain.text", errorMessage);
    loginPage.passwordErrorMessage().should("contain.text", errorMessage);
  });

  it("TC-006: User tidak dapat login dengan kolom username kosong", () => {
    loginPage.inputPassword().type("admin123");
    loginPage.buttonLogin().click();
    loginPage.usernameErrorMessage().should("contain.text", errorMessage);
  });

  it("TC-007: User tidak dapat login dengan kolom password kosong", () => {
    loginPage.inputUsername().type("Admin");
    loginPage.buttonLogin().click();
    loginPage.passwordErrorMessage().should("contain.text", errorMessage);
  });
});
