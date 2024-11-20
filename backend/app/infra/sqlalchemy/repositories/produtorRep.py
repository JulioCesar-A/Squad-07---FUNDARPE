import os
from typing import List
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

    async def inserir_produtor_pessoa_fisica(self, dados_produtor: schemas.ProdutorPessoaFisicaCreateRequest, dados_anexos : List[schemas.Anexo]):
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

            # Verificar se o produtor já existe (via e-mail)
            query = select(models.ProdutorPessoaJuridica).where(models.ProdutorCultural.email == dados_produtor.email)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este e-mail já está registrado"
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
            await self.db.flush() 
            
            for anexo in dados_anexos:

                arquivo = await anexo.arquivo.read()

                anexo_inserir = models.Anexo(
                    
                    id_cadastro = cadastro.id,
                    
                    nome_anexo = anexo.nome_anexo.value,
                    data_upload = date.today(),
                    extensao = os.path.splitext(anexo.arquivo.filename)[1].lower(),
                    arquivo = arquivo
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

    async def inserir_produtor_pessoa_juridica (self, dados_produtor : schemas.ProdutorPessoaJuridicaCreateRequest, dados_anexos : List[schemas.Anexo]):
        try:
            # Verificar se o produtor já existe (via CNPJ)
            query = select(models.ProdutorPessoaJuridica).where(models.ProdutorPessoaJuridica.cnpj == dados_produtor.cnpj)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este CNPJ já está registrado"
                )

            # Verificar se o produtor já existe (via e-mail)
            query = select(models.ProdutorPessoaJuridica).where(models.ProdutorCultural.email == dados_produtor.email)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este e-mail já está registrado"
                )

            # Criando instâncias com dados pré-validados para cada tabela do banco de dados
            produtor = models.ProdutorCultural(
            
                id = "654321",  # Implementar lógica de criação de IDs
            
                email = dados_produtor.email,
                senha = dados_produtor.senha, # Implementar Hashing da senha com bcrypt
            
                ativo = True
            
            )
            
            self.db.add(produtor)

            pessoa_juridica = models.ProdutorPessoaJuridica(

                id = produtor.id,

                cnpj = dados_produtor.cnpj,
                razao_soc = dados_produtor.razao_soc,
                nome_fant = dados_produtor.nome_fant
            )
           
            self.db.add(pessoa_juridica)

            representante_pj = models.RepresentantePessoaJuridica(

                id = pessoa_juridica.id,

                nome = dados_produtor.representante.nome,
                cpf = dados_produtor.representante.cpf,
                data_nasc = dados_produtor.representante.data_nasc

            )

            self.db.add(representante_pj)

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
            await self.db.flush() 

           
            for anexo in dados_anexos:

                arquivo = await anexo.arquivo.read()

                anexo_inserir = models.Anexo(
                    
                    id_cadastro = cadastro.id,
                    
                    nome_anexo = anexo.nome_anexo.value,
                    data_upload = date.today(),
                    extensao = os.path.splitext(anexo.arquivo.filename)[1].lower(),
                    arquivo = arquivo
                )

                self.db.add(anexo_inserir)
            
            # Commit e refresh da instância recém-adicionada
            await self.db.commit()
            await self.db.refresh(produtor)

            return {"message": "Produtor cultural pessoa jurídica inserido com sucesso!"}

        except IntegrityError:
            await self.db.rollback()
            raise HTTPException(
                status_code=400,
                detail="Erro de integridade: dados duplicados ou incorretos"
            )
        

    