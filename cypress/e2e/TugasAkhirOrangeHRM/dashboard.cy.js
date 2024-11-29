import LoginPage from "../../pom/Dashboard/loginPage.cy";
import DashboardPage from "../../pom/Dashboard/dashboard.cy";
import DirectoryPage from "../../pom/Dashboard/directory.cy";

describe("Dashboard Directory Tests", () => {
  const loginUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const dashboardUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
  const directoryUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory";

  beforeEach(() => {
    LoginPage.login("Admin", "admin123");
  });

  it("TC-001: User dapat mengakses Dashboard dengan kredensial valid", () => {
    DashboardPage.dashboardHeader().should("contain.text", "Dashboard");
  });

  it("TC-002: User melihat data direktori karyawan pada halaman Directory", () => {
    cy.intercept("GET", "**/viewDirectory").as("viewDirectory");
    cy.intercept("GET", "**/messages").as("messageRequest");
    DashboardPage.directoryMenu().click();
    DirectoryPage.directoryHeader().should("be.visible");
    DirectoryPage.employeeCards().should("be.visible");
    DirectoryPage.employeeCards().its("length").should("be.gte", 4);
    DirectoryPage.employeeCards().then((cards) => {
      cy.log(cards.text());
    });
    DirectoryPage.employeeCard("Peter Mac Anderson").should("be.visible");
    cy.wait("@viewDirectory");
    cy.wait("@messageRequest");
  });

  it("TC-003: User mencoba mencari data karyawan dengan input tidak valid", () => {
    cy.intercept("GET", "**/viewDirectory").as("viewDirectory");
    cy.intercept("GET", "**/messages").as("messageRequest");
    DashboardPage.directoryMenu().click();
    DirectoryPage.searchInput().type("xyz123");
    DirectoryPage.searchButton().click();
    DirectoryPage.noRecordsMessage().should("be.visible");
    cy.wait("@viewDirectory");
    cy.wait("@messageRequest");
  });

  it("TC-004: User dapat mencari dan memilih karyawan berdasarkan nama", () => {
    cy.intercept("GET", "**/viewDirectory").as("viewDirectory");
    cy.intercept("GET", "**/messages").as("messageRequest");
    DashboardPage.directoryMenu().click();
    DirectoryPage.searchInput().type("Peter");
    DirectoryPage.autocompleteDropdown("Peter Mac Anderson")
      .should("be.visible")
      .click();
    DirectoryPage.searchButton().click();
    DirectoryPage.employeeCard("Peter Mac Anderson").should("be.visible");
    cy.wait("@viewDirectory");
    cy.wait("@messageRequest");
  });
});
