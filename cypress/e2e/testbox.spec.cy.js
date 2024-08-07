import locators from './locators';
import forma from './forma';
import { extractOutputData } from '../support/extractOutputData';
import { filloutForma } from '../support/filloutForma';
import { clearForma } from '../support/filloutForma';



describe('textbox page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/text-box')
  })



  it('#1 Verify that the form loads correctly with all the fields and the submit button', () => {
    cy.get(locators.textBoxPage.fullNameField).should('be.visible')
    cy.get(locators.textBoxPage.emailField).should('be.visible')
    cy.get(locators.textBoxPage.currentAddressField).should('be.visible')
    cy.get(locators.textBoxPage.permanentAddressField).should('be.visible')
    cy.get(locators.textBoxPage.submitButton).should('be.visible')
  })



  it('#2 Verify that the fields accepts text input', () => {
    //fillout all fields in the forma
    filloutForma(forma.forma1)

    //check that the entered value is entered to the fields
    cy.get(locators.textBoxPage.fullNameField).should('have.value', forma.forma1.fullName)
    cy.get(locators.textBoxPage.emailField).should('have.value', forma.forma1.email)
    cy.get(locators.textBoxPage.currentAddressField).should('have.value', forma.forma1.currentAddress)
    cy.get(locators.textBoxPage.permanentAddressField).should('have.value', forma.forma1.permanentAddress)
  })



  it('#3 Verify that clicking the "Submit" button adds a new record to the display area with the correct information entered in the form', () => {
    //fillout all fields in the forma and submit
    filloutForma(forma.forma1)
    cy.get(locators.textBoxPage.submitButton).click();

    //check that created record contains all specified values entered before
    extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(forma.forma1.fullName);
      expect(data.OutputEmail).to.equal(forma.forma1.email);
      expect(data.OutputCurrentAddress).to.equal(forma.forma1.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(forma.forma1.permanentAddress);
    })
  })



  it('#4 Verify that the new record completely overwrites the previous record without leaving any old data behind', () => {
    //fillout all fields in the forma via set 1 and submit
    filloutForma(forma.forma1)
    cy.get(locators.textBoxPage.submitButton).click();

    //fillout all fields in the forma via set 2 and submit
    filloutForma(forma.forma2)
    cy.get(locators.textBoxPage.submitButton).click();

    //check that created record overwrites all specified values entered via set 2
    extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(forma.forma2.fullName);
      expect(data.OutputEmail).to.equal(forma.forma2.email);
      expect(data.OutputCurrentAddress).to.equal(forma.forma2.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(forma.forma2.permanentAddress);
    })
  })



  it('#5 Verify that the new record partialy overwrites the previous record with leaving old data behind', () => {
    //fillout all fields in the forma via set 1 and submit
    filloutForma(forma.forma1)
    cy.get(locators.textBoxPage.submitButton).click();

    //change only full name field and submit
    cy.get(locators.textBoxPage.fullNameField).clear().type(forma.forma2.fullName);
    cy.get(locators.textBoxPage.submitButton).click();

    //check that only full name was changed, but the rest fields wasn't
    extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(forma.forma2.fullName);
      expect(data.OutputEmail).to.equal(forma.forma1.email);
      expect(data.OutputCurrentAddress).to.equal(forma.forma1.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(forma.forma1.permanentAddress);
    })
  })



  it('#6 Verify that the empty form deletes the whole record completely', () => {
    //fillout all fields in the forma via set 1 and submit
    filloutForma(forma.forma1)
    cy.get(locators.textBoxPage.submitButton).click();

    //check that created record contains all specified values entered before
    extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(forma.forma1.fullName);
      expect(data.OutputEmail).to.equal(forma.forma1.email);
      expect(data.OutputCurrentAddress).to.equal(forma.forma1.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(forma.forma1.permanentAddress);
    })

    //clear value in the fields and submit
    clearForma()
    cy.get(locators.textBoxPage.submitButton).click();

    //check that output element is empty and contains no data
    cy.get('#output').find('div').should('not.have.text');
    cy.get('#output').find('div').should('be.empty');
  })



  it('#7 Verify that with invalid email new record was not created', () => {
    //fillout all fields in the forma, use invalid email and submit
    filloutForma(forma.formaInvalidEmail)
    cy.get(locators.textBoxPage.submitButton).click();

    //check that email field returns error because of invalid email. Check that borderline changed colour to red
    cy.get('#userEmail').should('have.class', 'field-error');
    cy.get('#userEmail').should('have.css', 'border-color', 'rgb(255, 0, 0)');

    //check that output element is empty and contains no data. New record wasn't created
    cy.get('#output').find('div').should('not.have.text');
    cy.get('#output').find('div').should('be.empty');
  })



  it('#8 Verify that with invalid email old record is not edited', () => {
    //fillout all fields in the forma via set 1 and submit
    filloutForma(forma.forma1)
    cy.get(locators.textBoxPage.submitButton).click();

    //check that created record contains all specified values entered before
    extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(forma.forma1.fullName);
      expect(data.OutputEmail).to.equal(forma.forma1.email);
      expect(data.OutputCurrentAddress).to.equal(forma.forma1.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(forma.forma1.permanentAddress);
    })

    //fillout all fields in the forma with different values and invalid email, submit
    filloutForma(forma.formaInvalidEmail)
    cy.get(locators.textBoxPage.submitButton).click();

    //check that email field returns error because of invalid email. Check that borderline changed colour to red
    cy.get('#userEmail').should('have.class', 'field-error');
    cy.get('#userEmail').should('have.css', 'border-color', 'rgb(255, 0, 0)');

    //check that record wasn't changed by new data with invalid email. Record contains data from set 1
    extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(forma.forma1.fullName);
      expect(data.OutputEmail).to.equal(forma.forma1.email);
      expect(data.OutputCurrentAddress).to.equal(forma.forma1.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(forma.forma1.permanentAddress);
    })
  })
})