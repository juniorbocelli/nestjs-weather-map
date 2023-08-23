# Nest OpenWeaher Map

Sistema construído usando **Node.js**, **NestJS** e Banco de dados **PostgreSQL** no _backend_ e **React.js** no _frontend_. Em ambas as camadas foi usado o **TypeScript**. Nele é possível se cadastrar, com um _username_ e um _password_, e inserir cidades, as quais você deseja ter informações sobre o clima.

A pesquisa sobre o clima é feita usando a API [OpenWeatherMap](https://openweathermap.org/).

Especificações completas [aqui](https://drive.google.com/file/d/128uHiLNQ-dhPXmtdugJKiBT-lEOjpXUc/view?usp=sharing).

Qualquer dúvida, entrar em contato através do e-mail _juniorbocelli.com_ ou WhatsApp (16) 99123-95055.

## Backend

Foi construído usando os princípios de _Clean Code_, _Clean Architecture_ e _SOLID_. Essa camada foi criada na pasta **server** do projeto. Para fazer a validação dos repositórios e operações SQL, usamos o **TypeORM**. A segurança do sistema foi feita usando _JWT_.

O backend tem 4 modos de execução, para a execução dos quais é necessário a criação de um arquivo _.env_ específico dentro da pasta _server/env_:

- Development (_development.env_);
- Production (_production.env_);
- Local (_local.env_);
- Test (_test.env_).

Esses arquivos contém configurações de conexão de banco de dados, configurações de geração de chave JWT e configurações básicas do CORS.

Os scripts de execução do sistema em cada modo já foram criados e estão em _server/package.json_.

### Como Executar

O foco desse tutorial será em como executar o servidor no modo local. Para executar nos outros modos, basta criar os arquivos _env_ específicos, como já foi dito.

#### 1) Instalação de Pacotes

Entrar na pasta _server_ e instalar os pacotes usando _npm_ ou _yarn_:

    npm install

#### 2) Conexão com o Banco de Dados

Para facilitar a execução do backend, foi criado o script _server/scrips/\_start_postgres_local_container.sh_, que baixa a imagem **Docker** do **PostgreSQL**, configura a conexão e começa a executar (é necessário ter o **Docker** instalado).

Caso não queira usar este recurso, você deve alterar o arquivo _server/env/local.env_ com os seus dados de conexão.

#### 3) Migração do Banco de Dados

É um processo do TypeORM que faz a sincronização do repositório representado por classes e decorators e que cria automaticamente as tabelas no Banco de Dados.

Na página _server_, executar:

    npm run typeorm:generate:win -n init

Será criada a pasta _server/database_ (**_lembrar de excluir essa pasta sempre que for executar novamente_**). Depois:

    npm run typeorm:generate:win -n init

Se tudo der certo, as tabelas já devem estar no Banco de Dados.

#### 4) Execução

Na pasta _server_, executar:

    npm run start:dev

O servidor deve rodar em _http://localhost:5000_.

### Testes

Foram criados 3 tipos de testes. Abaixo, instruções de como executá-los.

#### Testes Unitários

    npm run test

### Testes e2e

    npm run test:e2e

### Testes de Cobertura

    npm run test:cov

## Frontend

### Como Executar

Para executar o frontend, basta instalar os pacotes e executar o servidor.

#### 1) Instalação de Pacotes

Entrar na pasta _client_ e instalar os pacotes usando _npm_ ou _yarn_:

    yarn install

#### 2) Executar o Servidor

    yarn start

O frontend deve estar rodando em http://localhost:3000.
