class FormPage {
    constructor() {
        this.inputFields = [
            { name: 'fullName', locator: '#userName' },
            { name: 'email', locator: '#userEmail' },
            { name: 'currentAddress', locator: '#currentAddress' },
            { name: 'permanentAddress', locator: '#permanentAddress' }
        ];

        this.submitButton = '#submit';
        this.output = '#output';

        this.outputFields = [
            { name: 'OutputFullName', locator: '#name' },
            { name: 'OutputEmail', locator: '#email' },
            { name: 'OutputCurrentAddress', locator: '#currentAddress' },
            { name: 'OutputPermanentAddress', locator: '#permanentAddress' }
        ];
    }

    fillForm(data) {
        this.inputFields.forEach(({ name, locator }) => {
            cy.get(locator).clear().type(data[name]);
        });
    }

    clearForm() {
        this.inputFields.forEach(({ locator }) => {
            cy.get(locator).clear();
        });
    }

    clickSubmitButton() {
        cy.get(this.submitButton).click();
    }

    verifyTextEntered(data) {
        this.inputFields.forEach(({ name, locator }) => {
            cy.get(locator).should('have.value', data[name]);
        });
    }

    extractOutputData() {
        return cy.get(this.output).then(($output) => {
            const outputData = {};

            this.outputFields.forEach(field => {
                const text = $output.find(field.locator).text().replace(/^[^:]*:\s*/, '').trim();
                outputData[field.name] = text;
            });

            return outputData;
        });
    }

    verifyOutputData(expectedData) {
        this.extractOutputData().then((data) => {
            expect(data.OutputFullName).to.equal(expectedData.fullName);
            expect(data.OutputEmail).to.equal(expectedData.email);
            expect(data.OutputCurrentAddress).to.equal(expectedData.currentAddress);
            expect(data.OutputPermanentAddress).to.equal(expectedData.permanentAddress);
        });
    }
}

export const formPage = new FormPage();