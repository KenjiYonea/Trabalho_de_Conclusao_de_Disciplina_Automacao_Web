# Automação de Testes Web com Cypress

Projeto de automação de testes End-to-End (E2E) desenvolvido com **Cypress e JavaScript**, utilizando a aplicação [Automation Exercise](https://www.automationexercise.com/).

O projeto foi desenvolvido como parte do **Trabalho de Conclusão de Disciplina da pós-graduação em Automação de Testes de Software**, com o objetivo de automatizar os cenários solicitados, validar comportamentos da aplicação e aplicar boas práticas de testes automatizados.

## Tecnologias utilizadas

- JavaScript
- Cypress 13.7.3
- Node.js
- Git e GitHub
- GitHub Actions

## Cenários automatizados

Os testes estão organizados por funcionalidade, permitindo a execução individual de cada módulo ou da suíte completa.

### Autenticação — 5 testes

- Cadastrar um novo usuário com sucesso
- Efetuar login com e-mail e senha corretos
- Efetuar login com senha incorreta
- Efetuar logout
- Tentar cadastrar usuário com e-mail já cadastrado

### Produtos — 3 testes

- Deve acessar a página de produtos
- Pesquisar um produto com sucesso
- Visualizar os detalhes de um produto

### Carrinho e checkout — 4 testes

- Adicionar um produto ao carrinho com sucesso
- Remover um produto do carrinho com sucesso
- Realizar compra com cadastro antes do checkout
- Realizar compra com login antes do checkout

### Newsletter — 1 teste

- Deve realizar inscrição na newsletter com sucesso

**Total: 13 cenários automatizados.**

## Estrutura do projeto

```text
automacao-web/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── autenticacao.cy.js
│   │   ├── carrinho.cy.js
│   │   ├── inscricaoNewsletter.cy.js
│   │   └── produtos.cy.js
│   ├── fixtures/
│   └── support/
│       └── commands.js
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Como executar o projeto

**Pré-requisitos:** Node.js e npm instalados.

### 1. Clonar o repositório

```bash
git git clone https://github.com/KenjiYonea/Trabalho_de_Conclusao_de_Disciplina_Automacao_Web.git
```

### 2. Acessar a pasta

```bash
cd Trabalho_de_Conclusao_de_Disciplina_Automacao_Web
```

### 3. Instalar as dependências

```bash
npm ci
```

### 4. Executar o Cypress em modo interativo

```bash
npx cypress open
```

### 5. Executar todos os testes em modo headless

```bash
npx cypress run
```

Para executar somente os testes de carrinho:

```bash
npx cypress run --spec "cypress/e2e/carrinho.cy.js"
```

## Integração contínua — GitHub Actions

O projeto possui um workflow configurado para executar os testes automaticamente em eventos de `push` e `pull_request` na branch `main`.

O workflow utiliza:

- GitHub Actions
- `actions/checkout@v4`
- `cypress-io/github-action@v7`
- Navegador Electron

Após a publicação do repositório, os resultados das execuções poderão ser acompanhados pela aba **Actions** do GitHub.

## Última execução no GitHub Actions

- Branch: `main`
- Commit: `6892ea7`
- Resultado: Success
- Testes aprovados: 13
- Falhas: 0
- Duração total do workflow: 1 minuto e 43 segundos
- Artefatos gerados: 1

[Consultar execuções no GitHub Actions](https://github.com/KenjiYonea/Trabalho_de_Conclus-o_de_Disciplina_Automa-o_Web/actions)



## Resultado da execução local

Na última execução completa da suíte, realizada com `npx cypress run`, todos os testes foram aprovados.

| Funcionalidade | Testes aprovados |
|---|---:|
| Autenticação | 5/5 |
| Carrinho e checkout | 4/4 |
| Newsletter | 1/1 |
| Produtos | 3/3 |
| **Total** | **13/13** |

**Resultado:** 13 testes aprovados, 0 falhas.

**Tempo total:** 2 minutos e 12 segundos.

**Ambiente:** Cypress 13.7.3, Electron 118 (headless), Node.js 24.14.1.

Os resultados e os tempos de execução podem variar conforme o ambiente, a disponibilidade da aplicação e os recursos externos carregados pelo site.

## Boas práticas aplicadas

Durante o desenvolvimento foram utilizados:

- Organização dos testes por funcionalidade.
- Assertions para validar comportamentos e resultados esperados.
- Seletores CSS e atributos específicos dos elementos.
- Custom Commands para reutilização de operações.
- Geração dinâmica de e-mails para cadastros.
- Preparação do estado do carrinho antes de determinados cenários.
- Validação de respostas HTTP em fluxos de autenticação.
- Execução automatizada em modo headless.

## Relatórios de testes

O projeto utiliza Mochawesome para gerar relatórios das execuções automatizadas.

Após executar a suíte, os resultados são gerados em formato JSON.

Para consolidar os relatórios e gerar o HTML:

```bash
npx mochawesome-merge "cypress/reports/mochawesome/*.json" -o cypress/reports/relatorio-final.json
npx marge cypress/reports/relatorio-final.json -f relatorio-final -o cypress/reports/html


Os comandos acima pressupõem que os arquivos JSON do Mochawesome já foram gerados.

### Sobre os caracteres estranhos no terminal

A saída mostra `Automa├º├úo` no lugar de `Automação`. Isso normalmente acontece porque o CMD está interpretando a codificação UTF-8 incorretamente.

**Não significa necessariamente que o README esteja corrompido.** Confira se os acentos aparecem normalmente no VS Code ou no GitHub.

Se quiser visualizar corretamente no CMD, tente:

```cmd
chcp 65001
type README.md

## Considerações

O projeto utiliza uma aplicação pública destinada à prática de automação de testes.

Por depender de um ambiente externo, podem ocorrer oscilações de desempenho, atrasos no carregamento das páginas e falhas intermitentes.

A execução local apresentada neste documento corresponde a uma execução completa bem-sucedida da suíte.

## Autor

**Bruno Kenji Nishioka Yonea**

[GitHub — KenjiYonea](https://github.com/KenjiYonea)