describe('Automation Exercise - Inscrição Newsletter', () => {

    it('Deve realizar inscrição na newsletter com sucesso', () => {

        cy.visit('https://www.automationexercise.com/')

        cy.contains('h2', 'Subscription')
            .should('be.visible')

        cy.get('#susbscribe_email')
            .type('teste.newsletter@email.com')

        cy.get('#subscribe')
            .should('be.visible')
            .and('be.enabled')
            .click()

        cy.get('#success-subscribe')
            .should('be.visible')
            .and('contain.text', 'You have been successfully subscribed!')

    });

});