export default class DashboardPage {
  static dashboardHeader() {
    return cy.get(".oxd-topbar-header-breadcrumb > .oxd-text");
  }

  static directoryMenu() {
    return cy.get('a[href*="/directory/viewDirectory"]');
  }
}
