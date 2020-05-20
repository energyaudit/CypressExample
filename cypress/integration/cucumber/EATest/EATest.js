import {Given, And, Then} from "cypress-cucumber-preprocessor/steps"
import {loginPage} from "../../examples/pages/ealoginpage"

    
Given('I visit EA Site',() => {
    cy.visit('http://eaapp.somee.com')
})

Given('I click login link',() => {
    cy.contains("Login").click({force:true});
})

// Given('I log in as user with {string} and {string}',(userName,password) => {
//     cy.url().should("include","/Account/Login")
//     cy.get('#UserName').type(userName);
//     cy.get('#Password').type(password);
//     cy.get('.btn').click({force:true});
// })
Given('I login as following', datatable => {

    datatable.hashes().forEach(row => {
        //version1
        // cy.get('#UserName').type(row.userName);
        // cy.get('#Password').type(row.Password,{log:false});
        //version2
       loginPage.performLogin(row.userName,row.Password)
    });

//   cy.get('.btn').click();
  loginPage.clickLoginButton();
})