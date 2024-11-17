import os
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from schemas import schemas
from ..models import models
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

class RepositorioProdutor():

    def __init__(self, db: AsyncSession):
        self.db = db

    async def inserir_produtor_pessoa_fisica(self, dados_produtor: schemas.ProdutorPessoaFisicaCreateRequest, dados_anexos : schemas.Anexo):
        try:
            # Verificar se o produtor já existe (via CPF)
            query = select(models.ProdutorPessoaFisica).where(models.ProdutorPessoaFisica.cpf == dados_produtor.cpf)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este CPF já está registrado"
                )

            # Criando instâncias com dados pré-validados para cada tabela do banco de dados
            produtor = models.ProdutorCultural(
            
                id = "123456",  # Implementar lógica de criação de IDs
            
                email = dados_produtor.email,
                senha = dados_produtor.senha, # Implementar Hashing da senha com bcrypt
            
                ativo = True
            
            )
            
            self.db.add(produtor)

            pessoa_fisica = models.ProdutorPessoaFisica(
            
                id = produtor.id,
            
                nome = dados_produtor.nome_completo,
                cpf = dados_produtor.cpf,
                data_nasc = dados_produtor.data_nascimento
            
            )
            
            self.db.add(pessoa_fisica)

            endereco = models.Endereco(
                
                id = produtor.id,

                logradouro = dados_produtor.endereco.logradouro,
                numero = dados_produtor.endereco.numero,
                bairro = dados_produtor.endereco.bairro,
                cidade = dados_produtor.endereco.cidade,
                estado = dados_produtor.endereco.estado,
                cep = dados_produtor.endereco.cep
            
            )

            self.db.add(endereco)

            cadastro = models.Cadastro(
                
                id_produtor = produtor.id,
                
                data_cadastro = date.today()
            
            )

            self.db.add(cadastro)
            
            for anexo in dados_anexos:
                anexo_inserir = models.Anexo(
                    
                    id_cadastro = cadastro.id,
                    
                    nome_anexo = anexo.nome_anexo.value,
                    data_upload = date.today(),
                    extensao = os.path.splitext(anexo.arquivo.filename)[1].lower(),

                    arquivo = await anexo.arquivo.read()
                )

                self.db.add(anexo_inserir)
            
            # Commit e refresh da instância recém-adicionada
            await self.db.commit()
            await self.db.refresh(produtor)

            return {"message": "Produtor cultural pessoa física inserido com sucesso!"}

        except IntegrityError:
            await self.db.rollback()
            raise HTTPException(
                status_code=400,
                detail="Erro de integridade: dados duplicados ou incorretos"
            )
