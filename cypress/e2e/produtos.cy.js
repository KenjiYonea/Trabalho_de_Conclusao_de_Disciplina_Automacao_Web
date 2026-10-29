/// <reference types="cypress" />

describe('Automation Exercise - Produtos', () => {

    it('Deve acessar a página de produtos', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.url().should('include', '/products')

        cy.contains('h2', 'All Products')
            .should('be.visible')

        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0)
    });


    it('TC-09 - Pesquisar um produto com sucesso', () => {

        cy.visit('https://www.automationexercise.com/products')

        cy.contains('h2', 'All Products')
            .should('be.visible')

        cy.get('#search_product')
            .should('be.visible')
            .type('Blue Top')

        cy.get('#submit_search')
            .should('be.visible')
            .click()

        cy.contains('h2', 'Searched Products')
            .should('be.visible')

        cy.get('#search_product')
            .should('have.value', 'Blue Top')

        cy.get('.features_items .productinfo')
            .should('have.length.greaterThan', 0)
            .each(($produto) => {

                cy.wrap($produto)
                    .should('contain.text', 'Blue Top')

            })

    })

    it('TC-08 - Visualizar os detalhes de um produto', () => {

        cy.visit('https://www.automationexercise.com/products')

        cy.contains('h2', 'All Products')
            .should('be.visible')

        cy.get('a[href="/product_details/1"]')
            .first()
            .should('be.visible')
            .click()

        cy.location('pathname')
            .should('eq', '/product_details/1')

        cy.get('.product-information')
            .should('be.visible')
            .within(() => {

                cy.get('h2')
                    .should('contain.text', 'Blue Top')

                cy.root()
                    .should('contain.text', 'Category')
                    .and('contain.text', 'Availability')
                    .and('contain.text', 'Condition')
                    .and('contain.text', 'Brand')

                cy.get('span span')
                    .should('be.visible')
                    .invoke('text')
                    .should('match', /Rs\.\s*\d+/)

            })

    })

})