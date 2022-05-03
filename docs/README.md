# New project

[[toc]]

[test](./project_patterns/Routes.md)
[test2](./project_patterns/Form.md)

## Descrição do projeto

Baseado em câmeras que capturam a face do consumidor, nosso sistema gera informações que contribuem para tomadas de decisões mais assertivas

## Estrutura do app

```
📦cypress/ # diretório com os testes
📦docs/ # documentação dos componentes e páginas
📦src/ # código fonte do aplicativo
┣ 📂app/
  ┣ 📂 pages/ # rotas e componentes das rotas, apenas lógica de exibição
┣ 📂 assets/ # arquivos estáticos (imagens, css, js)
┣ 📂 domains/ # domínios de aplicação, regras de negócio, serviços...
  ┣ 📂 auth/ # domínio de autenticação
    ┣ interface.ts # Arquivo que define os tipos de dados que o domínio deve conter
    ┣ services.ts # Contem as chamadas da API e os métodos de negócio do domínio
    ┣ store.ts # Responsável por armazenar os dados do domínio e lidar com a lógica de negócio
┣ 📂 router/ # rotas da aplicação
  ┣ index.ts # importa e expõe as rotas de src/app
  ┣ 📂 validators/ # validações de rotas da aplicação (Funções que vão validar se o usuário pode acessar a rota)
    ┣ isAuthenticated.ts # Valida se o usuário está autenticado
┣ 📂 store/ # cria o store baseado nos módulos e plugins da aplicação
┣ 📂 support/ # camada de apoio, tanto app quanto domains podem usar
  ┣ 📂 common/ # componentes, composables, types, layouts... que podem ser usados por todas as paginas
  ┣ 📂 constants/ # Arquivo que define constantes globais
  ┣ 📂 http/ # camada que lida com as chamadas da API
  ┣ 📂 plugins/ # plugins para as bibliotecas instaladas
  ┣ 📂 utils/ # funções e modulos auxiliares
```

## Tecnologias utilizadas

Esta aplicação foi desenvolvida utilizando o framework [vue.js](https://vuejs.org/) na sua versão 3 e [typescript](https://www.typescriptlang.org/). A interface foi desenvolvida utilizando o framework [quasar](https://quasar.dev/), o [vue-router](https://router.vuejs.org/) foi utilizado para a criação das rotas da aplicação e o [pinia](https://vuex.vuejs.org/) foi utilizado para a criação do sistema de armazenamento e centralização dos dados. A documentação foi gerada utilizando a ferramenta [vuepress](https://vuepress.vuejs.org/) e os testes foram feitos utilizando o framework [cypress](https://www.cypress.io/).

## Padrão de codificação

O 


## Setup

### Inicialização do servidor de desenvolvimento

Pre-requisitos:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)

Antes de iniciar o servidor, é necessário definir as seguintes variáveis de ambiente no arquivo `.env`:

```bash
# variável que contém a url da api
VITE_VUE_APP_BASEURL=https://api/v1
# variável que contém a url do aplicativo
VITE_URL=http://localhost:3000
```

Para executar o servidor de desenvolvimento execute os comandos abaixo:

```bash
yarn install
yarn serve
```

### Execução do teste de integração

Pre-requisitos:

- Execução do comando `yarn install`
- Inicialização do servidor de [desenvolvimento](#inicializacao-do-servidor-de-desenvolvimento)

Antes de executar os testes, é necessário criar o seguinte arquivo `cypress.env.json`:

```json
{
  "username": "username", // usuário da api
  "password": "password", // senha do usuário da api
  "apiUrl": "https://api/v1" // url da api
}
```

````bash

Para rodar os testes de integração execute os comandos abaixo:

```bash
yarn cy:run
````

### Execução do servidor de desenvolvimento da documentação

```bash
yarn docs:dev
```
