import { When } from 'cypress-cucumber-preprocessor/steps'

/**
 * Usage:
 *  When scroll page "1200" pixels down
 */
When(/scroll page \"(.*?)\" pixels down/, (px) => {
  cy
    .window()
    .then(win => {
      win.scrollTo(0, parseInt(px, 10))
    })
})

/**
 * Usage:
 *  When click on ".AMRewardBlockImage__image" element
 *
 * Note:
 *  "element" should be clickable (e.g. button, anchor, or it has a Click event listener attached)
 */
When(/click on \"(.*?)\" element/, (tag) => {
  // NOTE: prevent Cypress from failing
  // Somehow Cypress throws an error (Uncaught ReferenceError: Void is not defined)
  // after click event, even if click action was successful
  cy.on('uncaught:exception', () => false)

  cy.get(tag)
    .first()
    .invoke('removeAttr','target')
    .click({
      force: true
    })
})

/**
 * Usage:
 *  When click on "[data-track-id='partners']" menu link
 */
When(/click on \"(.*?)\" menu link/, (tag) => {
  // NOTE: prevent Cypress from failing
  // Somehow Cypress throws an error (Uncaught ReferenceError: Void is not defined)
  // after click event, even if click action was successful
  cy.on('uncaught:exception', () => false)

  cy.get(tag)
    .first()
    .invoke('removeAttr','target')
    .click({
      force: true
    })
})
