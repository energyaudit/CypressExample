/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://executeautomation.com/demosite/Login.html')
    })

    it('Perform login', () => {
        cy.get("[name='UserName']").type("admin")
        cy.get("[name='Password']").type("password");
        cy.get(':nth-child(3) > input').click();

        cy.get("[name='generate']").click();

        cy.on('window:confirm', (str) => {
            expect(str).to.eq('You generated a Javascript alert')
        //    return false;
        return true;
        })

    })

})