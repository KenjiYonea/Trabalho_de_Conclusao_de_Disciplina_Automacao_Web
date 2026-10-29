
describe('Automation Exercise - Inscrição Newsletter', () => {

    it('TC-10 - Realizar inscrição na newsletter com sucesso', () => {

        cy.visit('https://www.automationexercise.com/')

        // Confirmar que a página inicial carregou
        cy.location('pathname')
            .should('eq', '/')

        // Localizar a seção de inscrição
        cy.contains('h2', 'Subscription')
            .should('be.visible')

        // Preencher o e-mail
        cy.get('#susbscribe_email')
            .should('be.visible')
            .type(`qa.newsletter.${Date.now()}@email.com`)

        // Realizar inscrição
        cy.get('#subscribe')
            .should('be.visible')
            .and('be.enabled')
            .click()

        // Validar mensagem de sucesso
        cy.get('#success-subscribe')
            .should('be.visible')
            .and('contain.text', 'You have been successfully subscribed!')

    })

})
