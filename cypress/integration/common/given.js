import { Given } from "cypress-cucumber-preprocessor/steps";

const HOST_DOMAIN = Cypress.env("HOST_DOMAIN");
const envPara = Cypress.env();
console.log(envPara);

console.log("HOST_DOMAIN:", HOST_DOMAIN);

const langMap = {
  English: "en",
  French: "fr"
};

Given("cookies has been cleared", () => {
  cy.clearCookies();
});

/**
 * Usage:
 *  Given visit "rewards" page
 */
Given(/visit \"(.*?)\" page/, url => {
  // hide "Beta alert" popup message
  cy.setCookie("betacookie", "NO");

  cy.visit(`${HOST_DOMAIN}/${url === "home" ? "" : url}`);
});

/**
 * Usage:
 *  Given page switched to "French" translation
 */
Given(/page switched to \"(.*?)\" translation/, lang => {
  const url = cy.url();
  const pageSuffix = `/${langMap[lang]}.html`;
  const tag = ".AMProfileTools__languageToggle";

  cy.get(tag)
    .first()
    .should("have.attr", "href", pageSuffix)
    .click();
});

/**
 * Usage:
 *  Given page should be on "English" translation
 */
Given(/page should be on \"(.*?)\" translation/, lang => {
  const url = cy.url();
  const pageSuffix = `${langMap[lang]}.html`;
  const tag = `html[lang="${langMap[lang]}-CA"]`;

  url.should("include", pageSuffix) && cy.get(tag).should("have.length", 1);
});

/**
 * Usage:
 *  Given we have "less-bonus-offers" mocked response from the "offers" API via "REGIONAL_OFFERS_URL"
 *
 *  where:
 *    "less-bonus-offers" is a file name for fixture in "cypress/fixtures" folder
 *    "offers" is a suffix for mocked response alias name (you should use it as ".wait('@offersApi')")
 *    "REGIONAL_OFFERS_URL" is a variable from .env file
 */
Given(
  /we have \"(.*?)\" mocked response from the \"(.*?)\" API via \"(.*?)\"/,
  (type, api, url) => {
    cy.fixture(type).as("fxResponse");

    cy.server()
      .route({
        method: "GET",
        url: Cypress.env("REGIONAL_OFFERS_URL"),
        response: "@fxResponse"
      })
      .as(`${api}Api`);
  }
);

/**
 * Usage:
 *  Given response from the "offers" API via "REGIONAL_OFFERS_URL" failed
 */
Given(/response from the \"(.*?)\" API via \"(.*?)\" failed/, (api, url) => {
  cy.server()
    .route({
      method: "GET",
      url: `${Cypress.env(url)}on`,
      response: ""
    })
    .as(`${api}Api`);
});
