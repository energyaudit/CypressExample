/// <reference types="Cypress" />

describe("Testing of ea ",( )=>{

    before("Call for a particular it block",()=>{
        cy.visit('http://www.executeautomation.com/site'); 
    })
    it("Testing ea for assertion",()=>{
     //   cy.visit('http://www.executeautomation.com/site');
     //   cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should('have.class','ls-nav-active');

        cy.get("[aria-label='jump to slide 2']",{timeout:60000}).should(($x)=>{
           expect($x).to.have.class('ls-nav-active')
     
               })
            })

    it("login application",( )=>{
        cy.visit('http://eaapp.somee.com');
   
        // cy.get("#loginLink").then(($link)=>{
        //    return $link.text();
        // }).as("linkText");
        cy.get("#loginLink").invoke('text').as("linkText");
        cy.contains("Login").click({force:true});
        cy.get("@linkText").then(($x)=>{
            expect($x).is.eql('Login')
        })
        cy.url().should("include","/Account/Login")
        cy.get('#UserName').type("admin");
        cy.get('#Password').type("password");
        cy.get('.btn').click({force:true});
        cy.contains("Employee List").click({force:true});

    //    cy.get('.table').find('tr').contains("Prashanth").parent().contains("Benefits").click();
        // cy.get('.table').find('tr').as("rows");
        // cy.get("@rows").then(($row)=>{
        //     cy.wrap($row).click({multiple:true});

            //verify value from a property 
            cy.wrap({name:'Karthik'}).should('have.property','name').and('eq','Karthik');
            // cy.get('.table').find('tr>td').then(($td)=>{
            //   cy.wrap($td).contains("John").invoke("wrap").parent().contains("Benefits").click();
            // })
           
        }
        )
    }

    )
