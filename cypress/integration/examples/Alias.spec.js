/// <reference types="Cypress" />

describe("Testing of ea ",( )=>{
    it("login application",( )=>{
        cy.visit('http://eaapp.somee.com');
   
        cy.get("#loginLink").then(($link)=>{
           return $link.text();
        }).as("linkText")
        cy.contains("Login").click({force:true});
        cy.get("@linkText").then(($x)=>{
            expect($x).is.eql('Login')
        })
        cy.url().should("include","/Account/Login")
        cy.get('#UserName').type("admin");
        cy.get('#Password').type("password");
        cy.get('.btn').click({force:true});
        cy.contains("Employee List").click({force:true});

        cy.get('.table').find('tr').contains("Prashanth").parent().contains("Benefits").click();
    })
})