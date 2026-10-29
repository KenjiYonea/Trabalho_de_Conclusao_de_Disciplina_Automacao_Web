/// <reference types="cypress" />

describe('Automation Exercise - Carrinho', () => {


    it('Adicionar um produto ao carrinho com sucesso', () => {

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
            .should('be.visible')
            .and('be.enabled')
            .click()

        cy.contains('Added!')
            .should('be.visible')

        cy.contains('View Cart')
            .should('be.visible')
            .click()

        cy.location('pathname', { timeout: 15000 })
            .should('eq', '/view_cart')

        cy.get('#product-1', { timeout: 15000 })
            .should('be.visible')
            .and('contain.text', 'Blue Top')

        cy.get('#product-1 .cart_quantity button.disabled')
            .should('have.text', '1')

        cy.get('#product-1 .cart_price')
            .should('contain.text', 'Rs. 500')

        cy.get('#product-1 .cart_total_price')
            .should('contain.text', 'Rs. 500')

    })


    it('Remover um produto do carrinho com sucesso', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.get('a[href="/product_details/1"]')
            .first()
            .click()

        cy.get('button.cart').click()

        cy.contains('View Cart').click()

        cy.get('#product-1')
            .should('be.visible')

        cy.get('#product-1 .cart_quantity_delete')
            .click()

        cy.get('#product-1')
            .should('not.exist')

        cy.contains('Cart is empty!')
            .should('be.visible')
    })

    it('Realizar compra com cadastro antes do checkout', () => {

        const usuario = {
            nome: 'QA Teste',
            email: `qa.teste.${Date.now()}@email.com`,
            senha: 'Teste@12345'
        }

        cy.visit('https://www.automationexercise.com/login')

        cy.cadastrarUsuario(usuario)

        cy.get('[data-qa="continue-button"]')
            .should('be.visible')
            .click()

        cy.url()
            .should('eq', 'https://www.automationexercise.com/')

        cy.contains('Logged in as', { timeout: 15000 })
            .should('be.visible')
            .and('contain.text', usuario.nome)

        cy.get('a[href="/logout"]', { timeout: 15000 })
            .should('be.visible')

        cy.adicionarProdutoAoCarrinho()

        cy.contains('Proceed To Checkout')
            .should('be.visible')
            .click()

        cy.url()
            .should('include', '/checkout')

        cy.get('#address_delivery')
            .should('be.visible')
            .and('contain.text', 'Rua Teste, 100')
            .and('contain.text', 'Los Angeles')
            .and('contain.text', 'California')

        cy.get('#cart_info #product-1')
            .should('be.visible')
            .and('contain.text', 'Blue Top')

        cy.get('textarea[name="message"]')
            .type('Pedido automatizado - PGATS Cypress')

        cy.contains('a', 'Place Order')
            .should('be.visible')
            .click()

        cy.url()
            .should('include', '/payment')

        cy.preencherPagamento({
            nome: 'QA Teste',
            numero: '4111111111111111',
            cvc: '123',
            mes: '12',
            ano: '2030'
        })

        cy.get('[data-qa="pay-button"]')
            .should('be.visible')
            .and('be.enabled')
            .click()

        cy.location('pathname', { timeout: 15000 })
            .should('include', '/payment_done/')

        cy.contains('Order Placed!', { matchCase: false })
            .should('be.visible')

        cy.contains('Congratulations! Your order has been confirmed!')
            .should('be.visible')

        cy.get('a[href="/delete_account"]')
            .should('be.visible')
            .click()

        cy.get('[data-qa="account-deleted"]')
            .should('be.visible')
            .and('contain.text', 'Account Deleted!')
    })


    it('Realizar compra com login antes do checkout', () => {

        const usuario = {
            nome: 'Yonea QA',
            email: 'yonea.qa@email.com',
            senha: '123@Mudar'
        }

        // Acessar a página de login
        cy.visit('https://www.automationexercise.com/login')

        cy.intercept('POST', '**/login').as('requisicaoLogin')

        // Realizar login
        cy.preencherLogin(usuario.email, usuario.senha)

        // Validar a resposta da requisição
        cy.wait('@requisicaoLogin')
            .its('response.statusCode')
            .should('eq', 302)

        // Confirmar redirecionamento após login
        cy.location('pathname', { timeout: 15000 })
            .should('eq', '/')

        // Aguardar a interface apresentar o usuário autenticado
        cy.get('a[href="/logout"]', { timeout: 30000 })
            .should('be.visible')

        // Validar a identidade do usuário autenticado
        cy.contains('Logged in as', { timeout: 15000 })
            .should('be.visible')
            .and('contain.text', usuario.nome)

        // Garantir que o Blue Top não esteja no carrinho
        cy.limparCarrinho()

        // Adicionar somente uma unidade do produto
        cy.adicionarProdutoAoCarrinho()

        // Prosseguir para checkout
        cy.contains('Proceed To Checkout')
            .should('be.visible')
            .click()

        cy.location('pathname', { timeout: 15000 })
            .should('eq', '/checkout')

        // Validar endereço de entrega
        cy.get('#address_delivery')
            .should('be.visible')

        // Validar produto no resumo do pedido
        cy.get('#cart_info #product-1')
            .should('be.visible')
            .and('contain.text', 'Blue Top')

        // Adicionar comentário
        cy.get('textarea[name="message"]')
            .type('Pedido automatizado - PGATS Cypress')

        // Finalizar pedido
        cy.contains('a', 'Place Order')
            .should('be.visible')
            .click()

        cy.location('pathname', { timeout: 15000 })
            .should('eq', '/payment')

        // Preencher dados de pagamento
        cy.preencherPagamento({
            nome: 'Yonea QA',
            numero: '4111111111111111',
            cvc: '123',
            mes: '12',
            ano: '2030'
        })

        // Confirmar pagamento
        cy.get('[data-qa="pay-button"]')
            .should('be.visible')
            .and('be.enabled')
            .click()

        // Validar conclusão da compra
        cy.location('pathname', { timeout: 15000 })
            .should('include', '/payment_done/')

        cy.contains('Order Placed!', { matchCase: false })
            .should('be.visible')

        cy.contains('Congratulations! Your order has been confirmed!')
            .should('be.visible')

    })


})
