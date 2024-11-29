export default class DirectoryPage {
  static directoryHeader() {
    return cy.get("h6").contains("Directory");
  }

  static searchInput() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  static searchButton() {
    return cy.get("button").contains("Search");
  }

  static autocompleteDropdown(employeeName) {
    return cy.contains(".oxd-autocomplete-dropdown", employeeName);
  }

  static employeeCards() {
    return cy.get(".oxd-grid-item");
  }

  static noRecordsMessage() {
    return cy.contains("No Records Found");
  }

  static employeeCard(employeeName) {
    return cy.contains(".oxd-grid-item", employeeName);
  }
}
