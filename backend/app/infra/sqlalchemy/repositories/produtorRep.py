import os
import uuid
from typing import List
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from schemas import schemas
from ..models import models
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from services.geradorHashing import gerar_hashing_senha
class RepositorioProdutor():

    def __init__(self, db: AsyncSession):
        self.db = db




    async def calcular_id_anexo_por_cadastro(self, db, fk_cad):

        query = select(models.Anexo).filter(models.Anexo.id_cadastro == fk_cad).order_by(models.Anexo.id.desc()).limit(1)
        result = await db.execute(query)
        maior_anexo = result.scalar_one_or_none()

        proximo_id = (maior_anexo.id_cadastro if maior_anexo else 0) + 1
        return proximo_id


    async def inserir_produtor_pessoa_fisica(self, dados_produtor: schemas.ProdutorPessoaFisicaCreateRequest, dados_anexos : List[schemas.Anexo]):
        try:

            query = select(models.ProdutorPessoaFisica).where(models.ProdutorPessoaFisica.cpf == dados_produtor.cpf)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este CPF já está registrado"
                )


            query = select(models.ProdutorPessoaFisica).where(models.ProdutorCultural.email == dados_produtor.email)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este e-mail já está registrado"
                )


            produtor = models.ProdutorCultural(
            
                id - uuid.uuid4(),

                email = dados_produtor.email,
                senha = await gerar_hashing_senha(dados_produtor.senha),
            
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
            
            novo_id = await self.calcular_id_anexo_por_cadastro(self.db, cadastro.id)
            for index, anexo in enumerate(dados_anexos):

                arquivo = await anexo.arquivo.read()


                anexo_inserir = models.Anexo(
                    
                    id = novo_id + index,
                    id_cadastro = cadastro.id,
                    nome_anexo = anexo.nome_anexo,
                    data_upload = date.today(),
                    extensao = os.path.splitext(anexo.arquivo.filename)[1].lower(),
                    arquivo = arquivo
                )
                self.db.add(anexo_inserir)

            

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

            query = select(models.ProdutorPessoaJuridica).where(models.ProdutorPessoaJuridica.cnpj == dados_produtor.cnpj)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este CNPJ já está registrado"
                )


            query = select(models.ProdutorPessoaJuridica).where(models.ProdutorCultural.email == dados_produtor.email)
            result = await self.db.execute(query)
            produtor_existente = result.scalar()

            if produtor_existente:
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este e-mail já está registrado"
                )


            produtor = models.ProdutorCultural(
            
                id = uuid.uuid4(),
            
                email = dados_produtor.email,
                senha = await gerar_hashing_senha(dados_produtor.senha),
            
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

                nome = dados_produtor.representante.nome_completo,
                cpf = dados_produtor.representante.cpf,
                data_nasc = dados_produtor.representante.data_nascimento

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

           
            novo_id = await self.calcular_id_anexo_por_cadastro(self.db, cadastro.id)
            for index, anexo in enumerate(dados_anexos):

                arquivo = await anexo.arquivo.read()


                anexo_inserir = models.Anexo(
                    
                    id = novo_id + index,
                    id_cadastro = cadastro.id,
                    nome_anexo = anexo.nome_anexo,
                    data_upload = date.today(),
                    extensao = os.path.splitext(anexo.arquivo.filename)[1].lower(),
                    arquivo = arquivo
                )
                self.db.add(anexo_inserir)
            

            await self.db.commit()
            await self.db.refresh(produtor)

            return {"message": "Produtor cultural pessoa jurídica inserido com sucesso!"}

        except IntegrityError:
            await self.db.rollback()
            raise HTTPException(
                status_code=400,
                detail="Erro de integridade: dados duplicados ou incorretos"
            )
        

    
