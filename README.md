<img align="center" src="https://github.com/LucasHProenca/Labook/assets/106993403/2a90d4e0-9387-4d47-b774-99c6484c4302" width="100%;" alt="" />

---

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
</p>

## 💻 Sobre o projeto

🖥 Labook - Essa API foi desenvolvida baseada numa rede social famosa e com o objetivo de possibilitar o cadastro de novos usuários assim como a criação de publicações e a interação entre as pessoas, podendo cada uma manifestar se gostou ou não daquele conteúdo exibido por outro usuário.
Este projeto possui inumeras outras funcionalidades, as quais detalharemos mais adiante.

Projeto desenvolvido durante o **Bootcamp Web Full-Stack** da [Labenu](https://www.labenu.com.br/curso-de-programacao-web-full-stack-integral).
Esse bootcamp é uma experiência online é um programa com mais de 1000 horas de experiência prática em desenvolvimento Full-stack e projetos individuais.

---

## ⚙️ Funcionalidades

  - [x] getUsers
  - [x] signUp
  - [x] login
  - [x] editUser  
  - [x] deleteUser
  - [x] getPosts
  - [x] createPost
  - [x] editPost
  - [x] likeOrDislikePost
  - [x] deletePost

---

## 🚀 Como executar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Postman](https://www.postman.com/downloads/), é possível também utilizar a API pela versão web do Postman, no entanto, utilizaremos a versão para desktop para minimizar quaisquer chances de problemas.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando a API

```bash

# Clone este repositório
$ git clone link-do-repositório-git

# Acesse a pasta do projeto no terminal/cmd
$ cd Labook

# Para abrir o vsCode
$ code .

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3003 

```

### 🗃 Configurando o banco de dados

#### Extensão VSCode

Para manipularmos manualmente código SQL será necessário instalar no VSCode a extensão chamada MySQL, criada por Weijan Chen. E sim, apesar do nome ser MySQL iremos aplicar o uso do SQLite. Essa extensão é utilizada para se conectar com diversos tipos de bancos relacionais, inclusive não relacionais. Caso a extensão não esteja instalada no seu projeto, é possível acessa-la por aqui:

![image](https://github.com/LucasHProenca/Labook/assets/106993403/b7801296-501a-4abb-8b64-bb7afd964702)

#### Acessando o menu da extensão 

Se a extensão for instalada corretamente, aparecerá no menu de navegação lateral à esquerda o ícone de banco de dados (destacado com a seta laranja). Esse é o menu da extensão e é onde você irá se conectar com o arquivo labook.db.

![image](https://github.com/LucasHProenca/Labook/assets/106993403/ff86ed0e-4a23-4fa1-bc47-6254e0b40c5c)

#### Acessando o menu do SQLite

Ao clicar no botão “**Create Connection**” é aberta a aba de conexão da extensão.
Escolha o **Server Type** como sendo **SQLite** (indicado na seta laranja).

![image](https://github.com/LucasHProenca/Labook/assets/106993403/ffd8323b-38cc-4538-83a2-b51868767b18)


#### ATENÇÃO!

Caso seja a primeira vez que você está instalando essa extensão, talvez seja necessário instalar algumas dependências para o SQLite rodar em sua máquina. A própria extensão irá te avisar se for o caso e você precisará clicar no botão para instalá-las.
Se não aparecer nenhum aviso ou deu tudo certo, pode prosseguir!

##### Criando a conexão

1. Dê um nome para a conexão
2. Selecione o arquivo: **labook.db**
3. Salve a conexão

![image](https://github.com/LucasHProenca/Labook/assets/106993403/b0be9d2a-a2c3-4ede-9ba8-6f437ef6cf76)

#### Verificando se deu certo

Caso tenha dado tudo certo, irá aparecer no menu do banco de dados o nome de sua conexão junto com algumas informações.

![image](https://github.com/LucasHProenca/Labook/assets/106993403/f76ad74d-190a-4292-825d-40833f919b62)

#### Inserindo as tabelas no banco de dados

Para criar as tabelas, basta clicar em "execute" em cada um dos três como mostra a imagem abaixo:

![image](https://github.com/LucasHProenca/Labook/assets/106993403/d6417113-21de-4a81-81ca-3eb98861eed7)

### 💾 Configurando o .env

Lembre-se de configurar o arquivo .env como está feito no exemplo em .env.example

![image](https://github.com/LucasHProenca/Labook/assets/106993403/d831941b-7f6a-45b1-ac00-2e82aec1b36c)

Feito isso acesse a documentação da [API](https://documenter.getpostman.com/view/27682612/2s9Xy3trjx#abcf8822-c648-44df-901d-cbed6482d1e4) e clique em "Run in Postman" localizado no canto superior direito para abrir dentro do app.

### Requisições

#### ATENÇÃO! Todos os exemplos são fictícios, pois não haveria sentido em disponibilizarmos os dados de nossos usuários, portanto utilize essa API para construir a sua própria rede social.

#### getUsers
A requisição getAllUsers tem duas funcionalidades diferentes:
A requisição getUsers tem a funcionalidade de mostrar a lista de usuários cadastrados no banco de dados, no entanto, apenas "ADMINS" tem acesso a essa funcionalidade, passando um token de autorização compátivel.

![getUsersRequest](https://github.com/LucasHProenca/Labook/assets/106993403/eadecb90-6e5b-4b49-97d5-149ee141ae42)

![getUsersResponse](https://github.com/LucasHProenca/Labook/assets/106993403/dd887fc6-0792-419c-95c2-bcc95fd7ed9e)


#### signUp
A requisição signUp tem a funcionalidade de cadastrar uma nova conta, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"name",
"email",
"password".

Contudo, foram implementadas as seguintes restrições:
Caso o "email" já tenha sido cadastrado por outro usuário, não será possível concluir o cadastro;
Caso o "email" não esteja com a formatação correta (@email.com), não será possível concluir o cadastro;
Caso a senha não atenda a um padrão mínimo pré-estabelecido, não será possível concluir o cadastro, no caso do Labook, é obrigatório que "password" tenha entre 8 e 12 caracteres, com letras maiúsculas e minúsculas, e no minio um caractere especial.
Todos os usuários cadastrados vem com a "role" como "NORMAL" impedindo seu acesso a recursos que são reservados à administradores.
Como resposta da requisição, o usuário recebe um token de autorização, lembre-se de guarda-lo pois será necessário para acessar as outras funcionalidades do sistema.

![signUpRequest](https://github.com/LucasHProenca/Labook/assets/106993403/2c458ce6-0dda-4f80-9e2e-a90f03f1821a)

![signUpResponse](https://github.com/LucasHProenca/Labook/assets/106993403/469b8ae4-0960-4d1f-b03d-cb01f9d205f9)


#### login
A requisição login tem a funcionalidade de entrar na sua respectiva conta, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"email",
"password".

Contudo, foram implementadas as seguintes restrições:
Caso o "email" e o "password" não correspondam com os utilizados no endpoint "signup", não será possível acessar a conta.
Como resposta da requisição, o usuário recebe um token de autorização, lembre-se de guarda-lo pois será necessário para acessar as outras funcionalidades do sistema.

![loginRequest](https://github.com/LucasHProenca/Labook/assets/106993403/73ff1c27-97be-4bda-9d66-8342057df239)

![loginResponse](https://github.com/LucasHProenca/Labook/assets/106993403/f97768bb-5fb7-494d-9c17-5d478516105e)


##### editUser
A requisição editUser permite ao usuário editar suas informações pessoais como "name", "email" e "password", no entanto, algumas restrições foram implementadas para o uso dessa funcionalidade, são essas:
Apenas o dono da conta pode editar suas informações;
Será necessário passar o token gerado no login para comprovar que a pessoa é realmente quem ela diz ser;
Será necessário abrir uma solicitação para que um administrador informe ao usuário qual é seu "id" que foi gerado no momento em que fez o cadastro no sistema, pois o mesmo não tem acesso a essa informação por questão de segurança.
Com o id em mãos, basta inseri-lo no campo "Path Variables" na aba "Params" junto ao token no campo "Authorization" na aba "Headers", e torna-se possível editar as informações de cadastro citadas acima.

![editUserRequest](https://github.com/LucasHProenca/Labook/assets/106993403/a7112f68-10d3-415d-ac2d-7e819c27eb07)


#### deleteUser
A requisição deleteUser permite ao usuário excluir sua conta, no entanto, algumas restrições foram implementadas para o uso dessa funcionalidade, são essas:
Apenas o dono da conta ou um administrador podem apagar um usuário;
Será necessário passar o token gerado no login para comprovar que a pessoa é realmente quem ela diz ser;
Caso o usuário queira apagar sua própria conta, será necessário abrir uma solicitação para que um administrador informe a pessoa qual é seu "id" que foi gerado no momento em que fez o cadastro no sistema, pois o mesmo não tem acesso a essa informação por questão de segurança.
Com o id em mãos, basta inseri-lo no campo "Path Variables" na aba "Params" junto ao token no campo "Authorization" na aba "Headers", e torna-se possível apagar o cadastro do usuário.

![deleteUser](https://github.com/LucasHProenca/Labook/assets/106993403/34138930-9f9d-4d88-8b4e-d2af067e9d0d)


#### getPosts
A requisição getPosts possui duas funcionalides diferentes:
Caso nada seja escrito após "/posts" será retornada a lista completa de posts, como podemos ver no exemplo "getPostsF1";

![getPostsF1Request](https://github.com/LucasHProenca/Labook/assets/106993403/08f098a8-e84f-4c31-9e6e-a71e48d7deb1)

![getPostsF1Response](https://github.com/LucasHProenca/Labook/assets/106993403/90dcef9a-c41d-4c03-8214-3d57370928fe)

Caso um post não cadastrado seja enviado como paramêtro, por exemplo, "/posts?q=qualquer-coisa-aqui", será retornada uma lista vazia que é referenciada por [ ];
Caso não seja inserido um "id" completo representado pelo paramêtro "q", seram retornados todos os posts que contenham os paramêtros inseridos;
Caso um post cadastrado seja enviado como paramêtro, apenas ele será retornado, como podemos ver no exemplo "getPostsF2".

![getPostsF2Request](https://github.com/LucasHProenca/Labook/assets/106993403/42f4c7dc-5574-484c-ad0e-96d68a37b941)

![getPostsF2Response](https://github.com/LucasHProenca/Labook/assets/106993403/6c252e55-f898-45d3-b571-25be419e9430)

No entanto para ter acesso aos posts será necessário informar um token válido no campo "Authorization" na aba "Headers"


#### editProductById
A requisição deleteUserById tem apenas uma funcionalidade, onde torna-se possível editar um produto, caso o mesmo já esteja cadastrado no banco de dados.
Para isso, é necessário passar um "id" junto ao caminho da requisição, feito isso, o usuário pode decidir quais dados quer editar e quais não quer.
Com isso em mente, podemos concluir que, se, no corpo da requisição for passado apenas um "name" será alterado apenas esse campo no produto selecionado, isso é válido para todos os campos demonstrados no exemplo.

![editProductByIdRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/e73f4940-9908-453a-ba6a-3c9d6019c7a6)

![editProductByIdResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/027b90de-7ab5-4f31-bf5c-544d56045864)


#### createPurchase
A requisição createPurchase tem apenas a funcionalidade de criar um novo pedido, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"id",
"buyer",
"products",
"id",
"quantity".
Contudo, foram implementadas as seguintes restrições:
Caso o "id" já tenha sido cadastrado em outra compra, não será possível concluir o pedido;
Caso o "buyer" não se encontre na lista de usuários, não será possível concluir o pedido;
Caso o "id" do produto não se encontre na lista de produtos, não será possível concluir o pedido.

![createPurchaseRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/ab7439bf-a76d-487d-8e6a-9e07b89f88b7)

![createPurchaseResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/dcd95a8f-e2f2-4d40-913d-ed4e301ddb10)


#### getPurchaseById
A requisição getPurchaseById tem apenas a funcionalidade de verificar quais itens foram comprados em certo pedido, onde é necessário enviar um "id" de um pedido junto ao caminho da requisição, contudo, caso o mesmo não esteja dentro do banco de dados, nada acontecerá e o usuário será informado da inconformidade.

![getPurchaseByIdRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/18249efc-7a9a-43c6-9426-573fa1a237fb)

![getPurchaseByIdResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/2d8304bb-cd9e-4f10-88a4-a4ecb6644765)


#### deletePurchaseById
A requisição deletePurchaseById tem apenas a funcionalidade de cancelar um pedido, onde é necessário enviar um "id" de um pedido junto ao caminho da requisição, contudo, caso o mesmo não esteja dentro do banco de dados, a deleção não será realizada e o usuário será informado da inconformidade.

![deletePurchaseByIdRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/20d0e2fc-4d5c-4ceb-8897-bd0babef2aa9)

![deletePurchaseByIdResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/5b7292fe-ad11-40e0-acfe-735c0cf2df92)

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **API** ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[APIs & Express](https://expressjs.com/pt-br/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[SQLite](https://github.com/mapbox/node-sqlite3)**
-   **[Knex](https://knexjs.org/guide/query-builder.html)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**

---

## 🦸 Autor

 <img style="border-radius: 50%;"  src="https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/9abf8ee7-9527-42f8-9151-04ccd3db2d97" width="100px;" alt="" />
 <br />
 <sub><b>Lucas Henrique Proença</b></sub>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Lucas-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/lucas-proen%C3%A7a-512650106/)](https://www.linkedin.com/in/lucas-proen%C3%A7a-512650106/) 

---
