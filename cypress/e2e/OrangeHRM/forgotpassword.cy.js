import ForgotPasswordPage from "../../pom/forgotPassword/forgotpassword.cy";

describe("Forgot Password Tests - OrangeHRM", () => {
  const baseUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode";
  const loginUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("TC-001: Verify 'Forgot Password' page loads correctly", () => {
    ForgotPasswordPage.pageTitle().should("contain.text", "Reset Password");
    ForgotPasswordPage.usernameInput().should("be.visible");
    ForgotPasswordPage.resetButton()
      .should("be.visible")
      .and("contain.text", "Reset Password");
  });

  it("TC-002: User resets password with valid username", () => {
    ForgotPasswordPage.usernameInput().type("admin");
    cy.intercept("POST", "**/requestResetPassword").as("requestResetPassword");
    cy.intercept("GET", "**/messages").as("messageRequest");
    cy.intercept("GET", "**/sendPasswordReset").as("sendPasswordReset");
    ForgotPasswordPage.resetButton().click();
    ForgotPasswordPage.successMessage().should(
      "contain.text",
      "Reset Password link sent successfully"
    );
    cy.wait("@requestResetPassword");
    cy.wait("@messageRequest");
    cy.wait("@sendPasswordReset");
  });

  it("TC-003: User resets password with invalid username", () => {
    ForgotPasswordPage.usernameInput().type("InvalidUser");
    ForgotPasswordPage.resetButton().click();
    ForgotPasswordPage.successMessage().should(
      "contain.text",
      "Reset Password link sent successfully"
    );
  });

  it("TC-004: User tries to reset password without entering data", () => {
    ForgotPasswordPage.resetButton().click();
    ForgotPasswordPage.errorMessage()
      .should("be.visible")
      .and("contain.text", "Required");
  });

  it("TC-005: User verifies 'Cancel' button functionality", () => {
    ForgotPasswordPage.cancelButton().click();
    cy.url().should("eq", loginUrl);
  });
});
