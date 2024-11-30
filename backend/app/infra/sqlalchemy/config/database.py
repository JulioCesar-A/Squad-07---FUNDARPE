from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import asynccontextmanager
from sqlalchemy.exc import OperationalError
from fastapi import HTTPException


DATABASE_USERNAME = "User_Prod"
DATABASE_PASSWORD = "123456"
DATABASE_HOST = "localhost"
DATABASE_PORT = "3306"
DATABASE_NAME = "CPC_DB"


SQLALCHEMY_DATABASE_URL = (f"mysql+asyncmy://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}")


engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)


AsyncSessionLocal = sessionmaker(
    autoflush=False, autocommit=False, bind=engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()



async def criar_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:    
            yield session
        except OperationalError as e:
            raise HTTPException(status_code=503, detail="Erro ao conectar ao banco de dados. O serviço se encontra indisponível")
        finally:
            await session.close()