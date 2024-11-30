# Módulo de Cadastro de Produtor Cultural - FUNDARPE

O objetivo do sistema é unificar e simplificar o Cadastro de Produtores Culturais (CPC) da FUNDARPE centralizando as informações, melhorando a experiência dos usuários e facilitando o acesso aos editais do FUNCULTURA, eliminando os desafios da operação fragmentada do sistema atual.


---
## Índice

1. [Tecnologias Usadas](#-tecnologias-usadas)

2. [Funcionalidades](#️-funcionalidades)

3. [Evoluções Futuras](#️-evoluções-futuras)

4. [Arquitetura do Projeto](#️-arquitetura-do-projeto)

5. [Configuração do Ambiente](#️-configuração-do-ambiente)

6. [Como Rodar o Projeto](#-como-rodar-o-projeto)

7. [Colaboradores - Squad 07 - (09/2024 - 11/2024)](#-colaboradores---squad-07---092024---112024)

---
## 🔧 Tecnologias/Ferramentas Usadas

### 🎨 Frontend


- Prototipação: Figma

- [React](https://reactjs.org/) com [Vite](https://vitejs.dev/) 

- React Router Dom

- Axios

### 🛠️ Backend

- [FastAPI (Python)](https://fastapi.tiangolo.com/)  

- Banco de Dados: [MySQL](https://www.mysql.com/)  

- [Uvicorn (Servidor)](https://www.uvicorn.org/)

- [SQLAlchemy (ORM)](https://www.sqlalchemy.org/)

- [Pydantic](https://docs.pydantic.dev/latest/)

- Bcrypt

- Cryptography

- Asyncmy

---

## ⚙️ Funcionalidades

- Cadastro de produtores culturais

- Upload de anexos

---

## 🗓️ Evoluções Futuras

- Renovação de cadastro

- Atualização de status de validação de cadastros e renovações

- Implementar autenticação e autorização com OAuth.

- Melhorar o desempenho do backend para lidar com alto volume de acessos simultâneos.

- Adicionar notificações automáticas por e-mail e SMS sobre prazos de editais.

- Criar dashboards personalizados para diferentes tipos de usuários (administradores e produtores culturais).


---

## 🏗️ Arquitetura do Projeto
```plaintext
📂 Squad-07---FUNDARPE
├── 📂 frontend/                           # Código do cliente (React)
|   ├── 📂 public/         
|   └── 📂 src/
|        ├── 📂 assets/                    # Recursos estáticos da aplicação
|        ├── 📂 components/  
|        └── 📂 pages/       
|
├── 📂 backend/                            # Código do servidor (FastAPI)
|   ├── 📝 requirements.txt         # Dependências do servidor
|   └── 📂 app/
|       ├── 📂 infra/      
|       |   └── 📂 sqlaclhemy/
|       |       ├── 📂 config/     
|       |       |   └── 📄 database.py         # Configurações de conexão com banco de dados
|       |       ├── 📂 models/             # Modelos de banco de dados
|       |       └── 📂 repositories/       # Implementação de repositórios de dados
|       ├── 📂 services/                   # Camada de serviços
|       ├── 📂 schemas/       # Schemas de validação Pydantic
|       ├── 📦 Banco_de_dados.sql
|       └── 📄 main.py        # Endpoints
└── 📚 README.md                # Documentação do projeto
```

---

## ⚙️ Configuração do Ambiente

### **Pré-Requisitos para desenvolvimento**
- [Node.js](https://nodejs.org/pt) versão 18.x ou superior

- [Python](https://www.python.org/downloads/) versão 3.9 ou superior

- [MySQL](https://dev.mysql.com/downloads/) versão 8.x ou superior

### 📦 Pré-requisitos do Banco de Dados

Para que o sistema funcione corretamente, é necessário configurar o banco de dados antes de executar a aplicação. Abaixo estão as etapas necessárias para o banco de dados.

### 1. Instale o MySQL Server:

- **Windows:**

    1. Baixe o instalador do MySQL Community Server no site oficial.
    
    2. Execute o instalador e siga as instruções, selecionando as opções apropriadas para sua instalação.

    3. Durante a instalação, configure a senha do usuário root (superusuário) e defina as portas de acesso (o padrão é 3306).

    4. Após a instalação, inicie o servidor MySQL.

- **Linux (Ubuntu/Debian):**

    1. Execute os seguintes comandos no terminal para instalar o MySQL Server:
 
            sudo apt update
            sudo apt install mysql-server
            sudo systemctl start mysql

    2. Após a instalação, verifique se o MySQL está rodando com o comando:
            
            sudo systemctl status mysql
    
    3. Execute o comando `sudo mysql_secure_installation` para configurar a senha do usuário root e garantir a segurança básica do MySQL

- **macOS:**

    1. Utilize o Homebrew para instalar o MySQL:
    
            brew install mysql

    2. Após a instalação, inicie o MySQL com o comando:

            brew services start mysql

### 2. Crie o banco de dados cujo está no diretório do projeto:
- Para criar o banco de dados, abra o terminal e faça login no MySQL com o usuário root ou com outro usuário com permissões adequadas:

        mysql -u root -p

- Após fazer login, crie o banco de dados utilizando o arquivo de schema (arquivo `banco_de_dados.sql`) com o comando:

        mysql -u root -p CPC_DB < /caminho/do/arquivo/banco_de_dados.sql

        
    - Substitua `/caminho/do/arquivo/banco_de_dados.sql` pelo caminho completo do arquivo .sql no seu projeto.
           
    - Isso irá criar a estrutura do banco de dados.

---

## 🚀 Como Rodar o Projeto 


### Clonando o Repositório:

```bash 
git clone https://github.com/JulioCesar-A/Squad-07---FUNDARPE.git
```

### Backend:

No terminal,

1. Navegue até a pasta do `backend`:

    ```bash
    cd backend
    ```

2. Instale as dependências:

    ```bash
    pip install -r requirements.txt
    ```

3. Execute o servidor:

    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend:


1. Navegue até a pasta do `frontend`:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

---

## 👥 Colaboradores - Squad 07 - (09/2024 - 11/2024)


#### Alice Muccini de Vasconcelos - [Github](https://github.com/alicemuccini)

#### Ana Beatriz Alves de Oliveira Santos - [Github](https://github.com/ctrlbeatriz)

#### Elton Silva Cavalcante - [Github](https://github.com/elton-cavalcante)

#### Ervisson Vidal da Silva - [Github](https://github.com/ervissonvidal)

#### Joana Elena Cardoso Santos - [Github](https://github.com/joana0411)

#### Júlio César Alves de Melo - [Github](https://github.com/JulioCesar-A)
 
#### Liliana Barbosa Alencar - [Github](https://github.com/LianaBarbosa)

#### Matheus Pereira de Lima - [Github](https://github.com/Teuslp)

#### Roselany Maria da Silva do Nascimento - [Github](https://github.com/Roselany-Nascimento)

#### Thiago Henrique Monteiro da Silva - [Github](https://github.com/ThiagoH28)