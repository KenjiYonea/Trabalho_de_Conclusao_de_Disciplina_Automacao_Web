
/// <reference types="cypress" />

Cypress.Commands.add('preencherLogin', (email, senha) => {

    cy.get('[data-qa="login-email"]')
        .type(email)

    cy.get('[data-qa="login-password"]')
        .type(senha, { log: false })

    cy.get('[data-qa="login-button"]')
        .click()

})

Cypress.Commands.add('cadastrarUsuario', (usuario) => {

    cy.get('[data-qa="signup-name"]')
        .type(usuario.nome)

    cy.get('[data-qa="signup-email"]')
        .type(usuario.email)

    cy.get('[data-qa="signup-button"]')
        .click()

    cy.get('#id_gender1').check()

    cy.get('[data-qa="password"]')
        .type(usuario.senha, { log: false })

    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('March')
    cy.get('[data-qa="years"]').select('1990')

    cy.get('[data-qa="first_name"]').type(usuario.nome)
    cy.get('[data-qa="last_name"]').type('Teste')

    cy.get('[data-qa="company"]').type('PGATS')
    cy.get('[data-qa="address"]').type('Rua Teste, 100')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('Los Angeles')
    cy.get('[data-qa="zipcode"]').type('90001')
    cy.get('[data-qa="mobile_number"]').type('9999999999')

    cy.get('[data-qa="create-account"]').click()

    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain.text', 'Account Created!')

})

Cypress.Commands.add('adicionarProdutoAoCarrinho', () => {

    cy.visit('https://www.automationexercise.com/products')

    cy.get('a[href="/product_details/1"]')
        .first()
        .click()

    cy.location('pathname', { timeout: 15000 })
        .should('eq', '/product_details/1')

    cy.get('.product-information h2', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', 'Blue Top')

    cy.get('button.cart')
        .click()

    cy.contains('Added!')
        .should('be.visible')

    cy.contains('View Cart')
        .click()

    cy.location('pathname')
        .should('eq', '/view_cart')

    cy.get('#product-1')
        .should('be.visible')
        .and('contain.text', 'Blue Top')

    // Validar quantidade somente depois de abrir o carrinho
    cy.get('#product-1 .cart_quantity button.disabled')
        .should('have.text', '1')

    cy.get('#product-1 .cart_price')
        .should('contain.text', 'Rs. 500')

    cy.get('#product-1 .cart_total_price')
        .should('contain.text', 'Rs. 500')

})


Cypress.Commands.add('preencherPagamento', (dadosPagamento) => {

    cy.get('[data-qa="name-on-card"]')
        .type(dadosPagamento.nome)

    cy.get('[data-qa="card-number"]')
        .type(dadosPagamento.numero, { log: false })

    cy.get('[data-qa="cvc"]')
        .type(dadosPagamento.cvc, { log: false })

    cy.get('[data-qa="expiry-month"]')
        .type(dadosPagamento.mes)

    cy.get('[data-qa="expiry-year"]')
        .type(dadosPagamento.ano)

})

Cypress.Commands.add('limparCarrinho', () => {

    cy.visit('https://www.automationexercise.com/view_cart')

    cy.location('pathname', { timeout: 15000 })
        .should('eq', '/view_cart')

    cy.get('body').then(($body) => {

        if ($body.find('#product-1').length > 0) {

            cy.get('#product-1 .cart_quantity_delete')
                .click()

        }

    })

    cy.get('#product-1')
        .should('not.exist')

})