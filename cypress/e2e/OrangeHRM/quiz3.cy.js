describe("Login Tests - OrangeHRM", () => {
  const baseUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const errorMessage = "Required";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("TC-001: User dapat login menggunakan akun data valid", () => {
    cy.get("h5").should("contain.text", "Login");
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('[type="submit"]').click();
    cy.get("h6").should("contain.text", "Dashboard");
  });

  it("TC-002: User tidak dapat login dengan akun data invalid", () => {
    cy.get('[name="username"]').type("InvalidUser");
    cy.get('[name="password"]').type("WrongPassword");
    cy.get('[type="submit"]').click();
    cy.get(".oxd-alert").should("contain.text", "Invalid credentials");
  });

  it("TC-003: User tidak dapat login dengan username salah", () => {
    cy.get('[name="username"]').type("InvalidUser");
    cy.get('[name="password"]').type("admin123");
    cy.get('[type="submit"]').click();
    cy.get(".oxd-alert").should("contain.text", "Invalid credentials");
  });

  it("TC-004: User tidak dapat login dengan password salah", () => {
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("WrongPassword");
    cy.get('[type="submit"]').click();
    cy.get(".oxd-alert").should("contain.text", "Invalid credentials");
  });

  it("TC-005: User tidak dapat login dengan kolom username dan password kosong", () => {
    cy.get('[type="submit"]').click();
    cy.get(".oxd-input-field-error-message")
      .eq(0)
      .should("contain.text", errorMessage);
    cy.get(".oxd-input-field-error-message")
      .eq(1)
      .should("contain.text", errorMessage);
  });

  it("TC-006: User tidak dapat login dengan kolom username kosong", () => {
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-field-error-message")
      .eq(0)
      .should("contain.text", errorMessage);
  });

  it("TC-007: User tidak dapat login dengan kolom password kosong", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-field-error-message").should(
      "contain.text",
      errorMessage
    );
  });
});
