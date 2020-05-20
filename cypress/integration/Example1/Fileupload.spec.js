/// <reference types="Cypress" />
context('Actions',()=>{
    beforeEach (()=>{
    cy.visit("https://fineuploader.com/demos.html");
    })
    it("File upload demo",()=>{
        cy.fixture('GalGadot.png','base64').then(fileContent => {
            cy.percySnapshot("Before");
           cy.get('#fine-uploader-gallery > .qq-uploader-selector > .qq-upload-button-selector > input').upload({
               fileContent,
               fileName:'GalGadot.png',
               mimeType:'image/png'
           },
           {uploadType:'input'})
        })
        cy.percySnapshot("After");
    })


})