describe("Login Feature", () => {
  it("User Login with valid data", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get("h5").should("contain.text", "Login");
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('[type="submit"]').click();
    cy.get("h6").should("contain.text", "Dashboard");
  });
});
