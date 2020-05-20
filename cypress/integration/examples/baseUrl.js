/// <reference types="Cypress" />

describe("Testing of ea appliction ",( )=>{
    before("login application",( )=>{
        cy.visit('/')
        cy.fixture("eauser").as("user")
        cy.get("@user").then((user)=>{
            cy.Login(user.UserName,user.Password)
            cy.get("#loginLink").invoke('text').as("linkText");
     
        cy.get("@linkText").then(($x)=>{
            expect($x).is.eql('Login')
        })
          });
        });

   it ("perfomring benefit check",()=>{
        
        cy.url().should("include","/Account/Login");
       
       

        cy.get('.btn').click({force:true});
        cy.contains("Employee List").click({force:true});

        cy.get('.table').find('tr').contains("Prashanth").parent().contains("Benefits").click();
        cy.get('.table').find('tr').as("rows");
        cy.get("@rows").then(($row)=>{
            cy.wrap($row).click({multiple:true});
        })

   })
})