import { formPage } from '../support/formPage';
import { users } from '../support/users';



describe('textbox page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/text-box')
  })



  it('#1.1 Verify full name field is visible', () => {
    cy.get(formPage.inputFields.find(field => field.name[0]).locator).should('be.visible');
  });

  it('#1.2 Verify email field is visible', () => {
    cy.get(formPage.inputFields.find(field => field.name[1]).locator).should('be.visible');
  });

  it('#1.3 Verify current address field is visible', () => {
    cy.get(formPage.inputFields.find(field => field.name[2]).locator).should('be.visible');
  });

  it('#1.4 Verify permanent address field is visible', () => {
    cy.get(formPage.inputFields.find(field => field.name[3]).locator).should('be.visible');
  });

  it('#1.5 Verify submit button is visible', () => {
    cy.get(formPage.submitButton).should('be.visible');
  });



  it('#2 Verify that the fields accepts text input', () => {
    //fillout all fields in the forma via set 1 and submit
    formPage.fillForm(users.userValid_1);

    //verify that entered text is displayed in the fields
    formPage.verifyTextEntered(users.userValid_1);
  })



  it('#3 Verify that clicking the "Submit" button adds a new record to the display area with the correct information entered in the form', () => {
    //fillout all fields in the forma via set 1 and submit
    formPage.fillForm(users.userValid_1);
    formPage.clickSubmitButton();

    //check that created record contains all specified values entered before
    formPage.verifyOutputData(users.userValid_1);
  })



  it('#4 Verify that the new record completely overwrites the previous record without leaving any old data behind', () => {
    //fillout all fields in the forma via set 1 and submit
    formPage.fillForm(users.userValid_1);
    formPage.clickSubmitButton();

    //fillout all fields in the forma via set 2 and submit
    formPage.fillForm(users.userValid_2);
    formPage.clickSubmitButton();

    //check that created record overwrites all specified values entered via set 2
    formPage.verifyOutputData(users.userValid_2);
  })



  it('#5 Verify that the new record partialy overwrites the previous record with leaving old data behind', () => {
    //fillout all fields in the forma via set 1 and submit
    formPage.fillForm(users.userValid_1);
    formPage.clickSubmitButton();

    //change only full name field and submit
    cy.get(formPage.inputFields.find(field => field.name === 'fullName').locator).clear().type(users.userValid_2.fullName);
    formPage.clickSubmitButton();

    //check that only full name was changed, but the rest fields wasn't
    formPage.extractOutputData().then((data) => {
      expect(data.OutputFullName).to.equal(users.userValid_2.fullName);
      expect(data.OutputEmail).to.equal(users.userValid_1.email);
      expect(data.OutputCurrentAddress).to.equal(users.userValid_1.currentAddress);
      expect(data.OutputPermanentAddress).to.equal(users.userValid_1.permanentAddress);
    })
  })



  it('#6 Verify that the empty form deletes the whole record completely', () => {
    //fillout all fields in the forma via set 1 and submit
    formPage.fillForm(users.userValid_1);
    formPage.clickSubmitButton();

    //check that created record contains all specified values entered before
    formPage.verifyOutputData(users.userValid_1);

    //clear value in the fields and submit
    formPage.clearForm();
    formPage.clickSubmitButton();

    //check that output element is empty and contains no data
    cy.get(formPage.output).find('div').should('not.have.text');
    cy.get(formPage.output).find('div').should('be.empty');
  })



  it('#7 Verify that with invalid email new record was not created', () => {
    //fillout all fields in the forma, use invalid email and submit
    formPage.fillForm(users.userInvalidEmail);
    formPage.clickSubmitButton();

    //check that email field returns error because of invalid email. Check that borderline changed colour to red
    cy.get(formPage.inputFields.find(field => field.name === 'email').locator).should('have.class', 'field-error');
    cy.get(formPage.inputFields.find(field => field.name === 'email').locator).should('have.css', 'border-color', 'rgb(255, 0, 0)');

    //check that output element is empty and contains no data. New record wasn't created
    cy.get(formPage.output).find('div').should('not.have.text');
    cy.get(formPage.output).find('div').should('be.empty');
  })



  it('#8 Verify that with invalid email old record is not edited', () => {
    //fillout all fields in the forma via set 1 and submit
    formPage.fillForm(users.userValid_1);
    formPage.clickSubmitButton();

    //check that created record contains all specified values entered before
    formPage.verifyOutputData(users.userValid_1);

    //fillout all fields in the forma with different values and invalid email, submit
    formPage.fillForm(users.userInvalidEmail);
    formPage.clickSubmitButton();

    //check that email field returns error because of invalid email. Check that borderline changed colour to red
    cy.get(formPage.inputFields.find(field => field.name === 'email').locator).should('have.class', 'field-error');
    cy.get(formPage.inputFields.find(field => field.name === 'email').locator).should('have.css', 'border-color', 'rgb(255, 0, 0)');

    //check that record wasn't changed by new data with invalid email. Record contains data from set 1
    formPage.verifyOutputData(users.userValid_1);
  })
})