/// <reference types="Cypress" />

describe("Testing of ea ",( )=>{
    it("login application",( )=>{
        cy.visit('http://eaapp.somee.com');
        cy.contains("Login").click({force:true});
        cy.url().should("include","/Account/Login")
        cy.get('#UserName').type("admin");
        cy.get('#Password').type("password");
        cy.get('.btn').click({force:true});
        cy.contains("Employee List").click({force:true});

        cy.get('.table').find('tr').contains("Prashanth").parent().contains("Benefits").click();
    })
})