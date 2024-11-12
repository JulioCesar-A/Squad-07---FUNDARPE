from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from backend.app.schemas import schemas
from models import models
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession

class RepositorioProdutor():

    def __init__(self):
        pass

    
    async def inserir_produtor_pessoa_fisica(self, db: AsyncSession, dados_produtor: schemas.ProdutorPessoaFisicaCreateRequest):
        try:

            # Verificar se o produtor já existe (via cpf)
            produtor_existente = await db.execute(
                db.query(models.ProdutorPessoaFisica).filter_by(cpf=dados_produtor.cpf).first()
            )
            if produtor_existente.scalar():
                raise HTTPException(
                    status_code=400,
                    detail="Um produtor com este CPF já está registrado"
                )   
           
            # Criando instâncias com dados pré-validados para cada tabela do banco de dados
            
            produtor = models.ProdutorCultural(
                id = "123456", # ID será gerado pela lógica da aplicação
                email = dados_produtor.email,
                senha = dados_produtor.senha,
                ativo = True
            )

            db.add(produtor)

            pessoa_fisica = models.ProdutorPessoaFisica(
                id = produtor.id,
                nome = dados_produtor.nome_completo,
                cpf = dados_produtor.cpf,
                data_nasc = dados_produtor.data_nascimento
            )

            db.add(pessoa_fisica)

            endereco = models.Endereco(
                id = produtor.pessoa_fisica,

                logradouro = dados_produtor.endereco.logradouro,
                numero = dados_produtor.endereco.numero,
                bairro = dados_produtor.endereco.bairro,
                cidade = dados_produtor.endereco.cidade,
                estado = dados_produtor.endereco.estado,
                cep = dados_produtor.endereco.cep
            )

            db.add(endereco)

            cadastro = models.Cadastro(
                id_produtor = produtor.id,
                status = "recebido",
                data_cadastro = date.today()
            )

            db.add(cadastro)

            await db.commit()
            return {"message" : "Produtor cultural pessoa física inserido com sucesso!"}

        except IntegrityError as e:
            await db.rollback()
            raise HTTPException(
                status_code=400,
                detail="Erro de integridade: dados duplicados ou incorretos"
            )
            