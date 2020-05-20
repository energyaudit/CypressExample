import { Then } from 'cypress-cucumber-preprocessor/steps'

/**
 * Usage:
 *  Then "url" should include "/get-help"
 */
Then(/\"(.*?)\" should include \"(.*?)\"$/, (section, partial) => {
  cy[section]()
    .should('include', partial)
})
