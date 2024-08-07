import locators from '../e2e/locators';

export function filloutForma(data) {
    cy.get(locators.textBoxPage.fullNameField).clear().type(data.fullName);
    cy.get(locators.textBoxPage.emailField).clear().type(data.email);
    cy.get(locators.textBoxPage.currentAddressField).clear().type(data.currentAddress);
    cy.get(locators.textBoxPage.permanentAddressField).clear().type(data.permanentAddress);
  }

  export function clearForma() {
    cy.get(locators.textBoxPage.fullNameField).clear();
    cy.get(locators.textBoxPage.emailField).clear();
    cy.get(locators.textBoxPage.currentAddressField).clear();
    cy.get(locators.textBoxPage.permanentAddressField).clear();
  }