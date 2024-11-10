from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Variáveis de conexão com banco de dados (teste)

DATABASE_USERNAME = "User_Prod"
DATABASE_PASSWORD = "User_Prod"
DATABASE_HOST = "localhost"
DATABASE_PORT = "3306"
DATABASE_NAME = "CPC_DB"


# Conexão assíncrona com o MySQL
SQLALCHEMY_DATABASE_URL = (f"mysql+asyncmy://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}")


# Cria o objeto responsável pela gerenciamento da conexão
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)


# Configura conexão assíncrona
AsyncSessionLocal = sessionmaker(
    autoflush=False, autocommit=False, bind=engine, class_=AsyncSession
)

Base = declarative_base()



def criar_db():
    Base.metadata.create.all(bind=engine)


# Função de dependência
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session