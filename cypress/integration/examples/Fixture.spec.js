/// <reference types="Cypress" />

describe("Testing of ea appliction ",( )=>{
    before("login application",( )=>{
        cy.visit('http://eaapp.somee.com')
        cy.fixture("eauser").as("user")
        });

   it ("perfomring benefit check",()=>{
        cy.get("#loginLink").invoke('text').as("linkText");
        cy.contains("Login").click({force:true});
        cy.get("@linkText").then(($x)=>{
            expect($x).is.eql('Login')
        })
        cy.url().should("include","/Account/Login")
      
        cy.get("@user").then((user)=>{
            cy.get('#UserName').type(user.UserName);
            cy.get('#Password').type(user.Password);
        })

        cy.get('.btn').click({force:true});
        cy.contains("Employee List").click({force:true});

        cy.get('.table').find('tr').contains("Prashanth").parent().contains("Benefits").click();
})

})