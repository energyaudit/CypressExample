/// <reference types="Cypress" />

describe("Test Lambdatet Website XHR",()=> {

    before("Navigate to LambdaTest",()=>{
        cy.visit("https://accounts.lambdatest.com/login");
    })
    it("Perform login and verify XHR",()=>{
      cy.server();
      cy.route({
        method:'GET',
        url:'api/user/organization/team'
      }).as('team');

  cy.fixture("lamdaUser").as("lamdauser");  
  cy.get("@lamdauser").then((lamdauser)=>{
    cy.get("[name='email']").debug().type(lamdauser.UserName);
    cy.get("[name='password']").debug().type(lamdauser.Password,{log:false});
    cy.get('.btn').click()
cy.get("@team").then((xhr)=>{
  expect(xhr.status).to.eq(200);
  expect(xhr.response.body.data[0]).to.have.property("name");
  expect(xhr.response.body.data[0]).to.have.property("name","KelvinBerkley");
})



})

})
})