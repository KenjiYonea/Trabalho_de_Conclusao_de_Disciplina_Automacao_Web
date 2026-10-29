/// <reference types="cypress" />

describe('Automation Exercise', () => {

    const usuario = {
        nome: 'Yonea QA',
        email: 'yonea.qa@email.com',
        senha: '123@Mudar'
    }

    it('TC-01 - Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/login')

        iniciarCadastro()
        preencherCadastro()
        verificarSeCadastroFoiEfetuadoComSucesso()
    })

    it('TC-02 - Efetuar login com e-mail e senha corretos', () => {

        const usuarioTeste = {
            nome: 'QA Login',
            email: `qa.login.${Date.now()}@email.com`,
            senha: 'Teste@12345'
        }

        // Preparar uma conta exclusiva para o teste
        cy.visit('https://www.automationexercise.com/login')

        cy.cadastrarUsuario(usuarioTeste)

        cy.get('[data-qa="account-created"]')
            .should('be.visible')
            .and('contain.text', 'Account Created!')

        cy.get('[data-qa="continue-button"]')
            .should('be.visible')
            .click()

        // Confirmar que o cadastro redirecionou para a página inicial
        cy.location('pathname', { timeout: 15000 })
            .should('eq', '/')

        // Confirmar que o usuário está autenticado
        verificarSeLoginFoiEfetuadoComSucesso(usuarioTeste.nome)

        // Encerrar a sessão para testar um novo login
        cy.get('a[href="/logout"]', { timeout: 15000 })
            .should('be.visible')
            .click()

        cy.location('pathname')
            .should('eq', '/login')

        // Realizar login
        cy.intercept('POST', '**/login').as('login')

        cy.preencherLogin(usuarioTeste.email, usuarioTeste.senha)

        // Validar a resposta HTTP
        cy.wait('@login')
            .its('response.statusCode')
            .should('eq', 302)

        // Validar o redirecionamento
        cy.location('pathname')
            .should('eq', '/')

        // Validar usuário autenticado
        verificarSeLoginFoiEfetuadoComSucesso(usuarioTeste.nome)

        // Excluir a conta criada para este teste
        cy.get('a[href="/delete_account"]')
            .should('be.visible')
            .click()

        cy.get('[data-qa="account-deleted"]')
            .should('be.visible')
            .and('contain.text', 'Account Deleted!')

        cy.get('[data-qa="continue-button"]')
            .should('be.visible')
            .click()

    })

    it('TC-03 - Efetuar login com e-mail e senha incorretos', () => {

        cy.visit('https://www.automationexercise.com/login')

        const emailInvalido = `usuario.inexistente.${Date.now()}@email.com`
        const senhaInvalida = '4545747441'

        cy.preencherLogin(emailInvalido, senhaInvalida)

        verificarSeMensagemDeErroFoiExibidaNoLogin()

    })

    it('TC-04 — Efetuar logout', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.intercept('POST', '**/login').as('login')

        cy.preencherLogin(usuario.email, usuario.senha)

        cy.wait('@login')
            .its('response.statusCode')
            .should('eq', 302)

        verificarSeLoginFoiEfetuadoComSucesso(usuario.nome)

        efetuarLogout()

        verificarSeOUsuarioFoiDeslogado()

    })

    it('TC-05 - Impedir cadastro com e-mail já cadastrado', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.get('[data-qa="signup-name"]').type(usuario.nome)
        cy.get('[data-qa="signup-email"]').type(usuario.email)
        cy.get('[data-qa="signup-button"]').click()

        verificarSeMensagemDeCadastroExistenteFoiExibida()
    })

})

// CADASTRO

function iniciarCadastro() {
    cy.get('[data-qa="signup-name"]').type('PGATS Aut')

    cy.get('[data-qa="signup-email"]')
        .type(`pgtas-aut-test-${Date.now()}@email.com`)

    cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro() {
    cy.get('#id_gender1').check()

    cy.get('[data-qa="password"]').type('123456')

    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('March')
    cy.get('[data-qa="years"]').select('1990')

    cy.get('[data-qa="first_name"]').type('PGATS1001')
    cy.get('[data-qa="last_name"]').type('2026')
    cy.get('[data-qa="company"]').type('POS')
    cy.get('[data-qa="address"]').type('Endereço 1001')

    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('Chicago')
    cy.get('[data-qa="city"]').type('Chic')
    cy.get('[data-qa="zipcode"]').type('123')
    cy.get('[data-qa="mobile_number"]').type('99999999')

    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="address2"]').type('Complemento 101')

    cy.get('[data-qa="create-account"]').click()
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain.text', 'Account Created!')

    cy.get('[data-qa="continue-button"]')
        .should('be.visible')
        .click()

    verificarSeLoginFoiEfetuadoComSucesso('PGATS Aut')

    cy.get('a[href="/delete_account"]')
        .should('be.visible')
        .click()

    cy.get('[data-qa="account-deleted"]')
        .should('be.visible')
        .and('contain.text', 'Account Deleted!')

    cy.get('[data-qa="continue-button"]')
        .should('be.visible')
        .click()
}

function verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario) {

    cy.contains('Logged in as', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', nomeUsuario)

    cy.get('a[href="/logout"]', { timeout: 15000 })
        .should('be.visible')

}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
    cy.get('form[action*="login"] p')
        .should('be.visible')
        .and('contain.text', 'Your email or password is incorrect!')
}

// LOGOUT

function efetuarLogout() {
    cy.get('a[href="/logout"]')
        .should('be.visible')
        .click()
}

function verificarSeOUsuarioFoiDeslogado() {

    cy.location('pathname')
        .should('eq', '/login')

    cy.get('.login-form > h2')
        .should('be.visible')
        .and('contain.text', 'Login to your account')

    cy.get('a[href="/logout"]')
        .should('not.exist')
}

// CADASTRO DUPLICADO

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
    cy.get('form[action*="signup"] p')
        .should('be.visible')
        .and('contain.text', 'Email Address already exist!')
}