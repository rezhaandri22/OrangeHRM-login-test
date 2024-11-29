export default class LoginPage {
  static visitLoginPage() {
    return cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  static enterUsername(username) {
    return cy.get('input[name="username"]').type(username);
  }

  static enterPassword(password) {
    return cy.get('input[name="password"]').type(password);
  }

  static clickLoginButton() {
    return cy.get('button[type="submit"]').click();
  }

  static verifyDashboardUrl() {
    return cy.url().should("include", "/dashboard/index");
  }

  static login(username, password) {
    this.visitLoginPage();
    this.enterUsername(username);
    this.enterPassword(password);
    return this.clickLoginButton(); // Tambahkan return jika ingin chainable
  }
}
