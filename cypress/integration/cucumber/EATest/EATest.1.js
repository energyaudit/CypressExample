import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";

Given("I visit EA Site", () => {
  cy.visit("http://eaapp.somee.com");
});

Given("I click login link", () => {
  cy.contains("Login").click({ force: true });
});

Given("I log in as user with {string} and {string}", (userName, password) => {
  cy.url().should("include", "/Account/Login");
  cy.get("#UserName").type(userName);
  cy.get("#Password").type(password, { log: false });
  cy.get(".btn").click({ force: true });
});
