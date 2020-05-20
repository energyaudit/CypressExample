/// <reference types="Cypress" />

describe("Test Lambdatet Website XHR",()=> {

    before("Navigate to LambdaTest",()=>{
        cy.visit("https://accounts.lambdatest.com/login");
    })
    it("Perform login and verify XHR",()=>{
  cy.fixture("lamdaUser").as("lamdauser");  
  cy.get("@lamdauser").then((lamdauser)=>{
    cy.get("[name='email']").debug().type(lamdauser.UserName);
    cy.get("[name='password']").debug().type(lamdauser.Password,{log:false});
    cy.get('.btn').click()
})

})
})