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

#### getAllUsers
A requisição getAllUsers tem duas funcionalidades diferentes:

Caso nada seja escrito após "/users", será retornada a lista completa de usuários cadastrados, como podemos ver no exemplo "getAllUsersF1";

![getAllUsersF1Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/5424d632-891a-4d76-862c-4a27fae223c3)

![getAllUsersF1Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/63d219a8-b2a8-405f-b005-3043c6e65b5a)

Caso um usuário não cadastrado seja enviado como paramêtro, por exemplo, "/users?id=u010", será retornada uma lista vazia que é referenciada por [ ];
Caso não seja inserido um "id" completo, será retornado todos os usuários que contenham os paramêtros inseridos;
Caso um usuário cadastrado seja enviado como paramêtro, apenas ele será retornado, como podemos ver no exemplo "getAllUsersF2".

![getAllUsersF2Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/e8d3b8cf-918d-49f6-a937-b0892360b25c)

![getAllUsersF2Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/5e8859c4-1e98-4dac-9401-e1155e977167)


#### getAllProducts
A requisição getAllProducts tem duas funcionalidades diferentes:

Caso nada seja escrito após "/products", será retornada a lista completa de produtos cadastrados, como podemos ver no exemplo "getAllProductsF1";

![getAllProductsF1Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/b7c9ffc1-b7f0-42b8-bcc0-b7cfe95f097d)

![getAllProductsF1Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/1e4b9f30-ef7a-4bc0-b5a6-f2359482a260)

Caso um produto não cadastrado seja enviado como paramêtro, por exemplo, "/products?name=escovaDeDente", será retornada uma lista vazia que é referenciada por [ ];
Caso não seja inserido um "name" completo, será retornado todos os produtos que contenham os paramêtros inseridos;
Caso um produto cadastrado seja enviado como paramêtro, apenas ele será retornado, como podemos ver no exemplo "getAllProductsF2".

![getAllProductsF2Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/6635c622-f9fc-4fe6-b290-3cdf7d3350e9)

![getAllProductsF2Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/9c7d0ad8-7a01-4919-9052-ac87c5047e8f)


#### createUser
A requisição createUser tem apenas a funcionalidade de criar um novo usuário, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"id",
"name",
"email",
"password".
Contudo, foram implementadas as seguintes restrições:
Caso o "id" já tenha sido cadastrado por outro usuário, não será possível concluir o cadastro;
Caso o "email" já tenha sido cadastrado por outro usuário ou, não possua o formato de email "@email.com" não será possível concluir o cadastro;
É obrigatório que o "password" tenha entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.

![createUserRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/42d905d3-2277-4a42-9eaa-03613f6a557c)

![createUserResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/69e437d2-97bf-46da-b0b4-02feb482afbd)


##### createProduct
A requisição createProduct possui apenas a funcionalidade de criar um novo produto, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"id",
"name",
"price",
"description",
"imageUrl".
Contudo, foi implementada a seguinte restrição:
Caso o "id" já tenha sido cadastrado por outro usuário, não será possível concluir o cadastro.

![createProductRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/cd7de88a-e7d8-4430-9441-b01852dbfe86)

![createProductResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/b2bcdcbe-eeac-423a-a44d-9a3541dca6c6)


#### deleteUserById
A requisição deleteUserById tem apenas a funcionalidade de apagar um usuário, onde é necessário enviar um "id" de um usuário junto ao caminho da requisição, contudo, caso o mesmo não esteja dentro do banco de dados, a deleção não será realizada e o usuário será informado da inconformidade.

![deleteUserByIdRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/0df690e5-e949-4281-a741-71692831fa6d)

![deleteUserByIdResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/32b4eecc-3a74-46f9-b184-8bf2b941fe18)


#### deleteProductById
A requisição deleteProductById tem apenas a funcionalidade de apagar um produto, onde é necessário enviar um "id" de um produto junto ao caminho da requisição, contudo, caso o mesmo não esteja dentro do banco de dados, a deleção não será realizada e o usuário será informado da inconformidade.

![deleteProductByIdRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/55defc99-6db7-45c3-bd44-515ab721e8a9)

![deleteProductByIdResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/da3e2efa-af32-48a0-b7c1-71364cbad681)


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
