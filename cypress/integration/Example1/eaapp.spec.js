/// <reference types="Cypress" />

describe("Test EA Application", () => {

    before("Login to application", () => {
        //Visiting website
        cy.visit("/",{retryOnStatusCodeFailure:true});
        cy.fixture("eauser").as("user");

        cy.get("@user").then((user) => {
            cy.login(user.UserName, user.Password);
        })

    })

    it("Performing Benefit check", () => {
        cy.percySnapshot();
        //Click Employee List
        cy.contains("Employee List").click();

        cy.get('.table').find('tr').contains('Prashanthsss').parent().contains('Benefits').click();

        cy.get('.table').find('tr').as("rows");

        cy.get("@rows").then(($row) => {
            cy.wrap($row).click({ multiple: true });
        })

        //Verify the value from a property
        cy.wrap({ name: 'Karthik' }).should('have.property', 'name').and('eq', 'Karthik');

        // //Using Wrap
        // cy.get('.table').find('tr > td').then(($td) => {
        //     cy.wrap($td).contains("John").invoke("wrap").parent().contains("Benefits").click();
        // })
        cy.percySnapshot("After");


    })
})