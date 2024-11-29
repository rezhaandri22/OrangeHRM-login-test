export default class ForgotPasswordPage {
  static pageTitle() {
    return cy.get("h6");
  }

  static usernameInput() {
    return cy.get('input[name="username"]');
  }

  static resetButton() {
    return cy.get('button[type="submit"]');
  }

  static cancelButton() {
    return cy.get('button[type="button"]').contains("Cancel");
  }

  static successMessage() {
    return cy.get(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title");
  }

  static errorMessage() {
    return cy.get(".oxd-input-field-error-message");
  }
}
