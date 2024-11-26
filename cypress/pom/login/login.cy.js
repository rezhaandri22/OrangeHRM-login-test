export default class LoginPage {
  static verifyLoginPage() {
    return cy.get("h5").contains("Login");
  }

  static inputUsername() {
    return cy.get('[name="username"]');
  }

  static inputPassword() {
    return cy.get('[name="password"]');
  }

  static buttonLogin() {
    return cy.get('[type="submit"]');
  }

  static dashboardPage() {
    return cy.get("h6").contains("Dashboard");
  }

  static errorMessage() {
    return cy.get(".oxd-alert");
  }

  static usernameErrorMessage() {
    return cy.get(".oxd-input-field-error-message").eq(0);
  }

  static passwordErrorMessage() {
    return cy.get(".oxd-input-field-error-message").eq(1);
  }
  static passwordErrorMessage() {
    return cy.get(".oxd-input-field-error-message");
  }
}
