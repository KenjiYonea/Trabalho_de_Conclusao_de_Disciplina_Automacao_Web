/// <reference types="cypress" />

describe('Automation Exercise', () => {

    const usuario = {
        nome: 'Yonea QA',
        email: 'yonea.qa@email.com',
        senha: '123@Mudar'
    }

    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/login')

        iniciarCadastro()
        preencherCadastro()
        verificarSeCadastroFoiEfetuadoComSucesso()
    })

    it('Efetuar login com e-mail e senha corretos', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.intercept('POST', '**/login').as('login')

        cy.preencherLogin(usuario.email, usuario.senha)

        cy.wait('@login').then(({ response }) => {

            expect(response, 'Resposta do login').to.exist

            cy.log(`Status HTTP: ${response.statusCode}`)

            cy.log(
                `Redirecionamento: ${response.headers.location || 'Não informado'}`
            )

            cy.log(
                `Set-Cookie presente: ${Boolean(response.headers['set-cookie'])}`
            )

        })

        cy.location('pathname')
            .should('eq', '/')

        cy.getCookies().then((cookies) => {
            cy.log(`Quantidade de cookies: ${cookies.length}`)
        })

        verificarSeLoginFoiEfetuadoComSucesso(usuario.nome)


    })

    it('Efetuar login com senha incorreta', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.preencherLogin(usuario.email, '4545747441')
        verificarSeMensagemDeErroFoiExibidaNoLogin()
    })

    it('Efetuar logout', () => {

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

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
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

    cy.get('[data-qa="create-account"]').click()
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain.text', 'Account Created!')
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
