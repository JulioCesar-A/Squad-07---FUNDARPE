from typing import List
from fastapi import FastAPI, Depends, File, Form, HTTPException, UploadFile 
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from schemas import schemas
from pydantic import ValidationError
from infra.sqlalchemy.repositories import produtorRep
from infra.sqlalchemy.config.database import get_db
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI()

origins = [
    "http://127.0.0.1:3000" ,
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

@app.get("/")
async def home():
    return {"message" : "Bem-vindo à nossa API"}

@app.post("/produtor-pessoa-fisica", status_code=201)
async def criar_produtor_pessoa_fisica(
    nome_completo: str = Form(...),
    cpf: str = Form(...),
    email: str = Form(...),
    senha: str = Form(...),
    data_nascimento: date = Form(...),
    logradouro: str = Form(...),
    numero: str = Form(...),
    bairro: str = Form(...),
    cidade: str = Form(...),
    estado: str = Form(...),
    cep: str = Form(...),
    
    anexos : List[UploadFile] = File(...),
    nomes_anexos : List[str] = Form(...),
    
    db : AsyncSession = Depends(get_db)
):
    repositorio_produtor = produtorRep.RepositorioProdutor(db)





    try:

        endereco = schemas.Endereco(
            logradouro = logradouro,
            numero = numero,
            bairro = bairro,
            cidade = cidade,
            estado = estado,
            cep = cep
        )


        dados_produtor = schemas.ProdutorPessoaFisicaCreateRequest(
            email = email,
            senha = senha,
            nome_completo = nome_completo,
            cpf = cpf,
            data_nascimento = data_nascimento,
            endereco = endereco
        )

        nomes_anexos = nomes_anexos[0].split(",")

        if len(anexos) != len(nomes_anexos):
            print("Erro na quantidade de anexos")
            raise HTTPException(
                status_code=400
            )


        dados_anexos = []
    

        for index, arquivo in enumerate(anexos):
            dados_anexos.append(schemas.Anexo(
                nome_anexo = nomes_anexos[index],
                arquivo = arquivo
            ))


        resultado = await repositorio_produtor.inserir_produtor_pessoa_fisica(dados_produtor, dados_anexos)
        return resultado
    


    except HTTPException as e:
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=f"Ocorreu um erro inesperado: {str(e)}"
        )
    

@app.post("/produtor-pessoa-juridica", status_code=201)
async def criar_produtor_pessoa_juridica(
    email : str = Form(...),
    senha : str = Form(...),
    cnpj : str = Form(...),
    razao_social : str = Form(...),
    nome_fantasia : str = Form(...),

    nome_rep : str = Form(...),
    cpf_rep : str = Form(...),
    dt_nasc_rep : str = Form(...),

    logradouro : str = Form(...),
    numero : str = Form(...),
    bairro : str = Form(...),
    cidade : str = Form(...),
    estado : str = Form(...),
    cep : str = Form(...),

    anexos : List[UploadFile] = File(...),
    nomes_anexos : List[str] = Form(...),
    
    db : AsyncSession = Depends(get_db)
):
    repositorio_produtor = produtorRep.RepositorioProdutor(db)

    try: 

        endereco = schemas.Endereco(
            logradouro = logradouro,
            numero = numero,
            bairro = bairro,
            cidade = cidade,
            estado = estado,
            cep = cep
        )

        representante = schemas.RepresentantePessoaJuridica(
            nome_completo = nome_rep,
            cpf = cpf_rep,
            data_nascimento = dt_nasc_rep   
        )


        dados_produtor = schemas.ProdutorPessoaJuridicaCreateRequest(
            email = email,
            senha = senha,
            representante = representante,
            endereco = endereco,
            cnpj = cnpj,
            razao_soc = razao_social,
            nome_fant = nome_fantasia
        )

        nomes_anexos = nomes_anexos[0].split(",")

        if len(anexos) != len(nomes_anexos):
            raise HTTPException(
                status_code=400
            )
        
        dados_anexos = []

        for index, arquivo in enumerate(anexos):
            dados_anexos.append(schemas.Anexo(
                nome_anexo = nomes_anexos[index],
                arquivo = arquivo
            ))

        resultado = await repositorio_produtor.inserir_produtor_pessoa_juridica(dados_produtor, dados_anexos)
        return resultado

    except HTTPException as e:
        raise e
    
    except SQLAlchemyError as e:
        print(f"SQLAlchemy error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erro no banco de dados"
        )

    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = f"Ocorreu um erro inesperado: {str(e)}"
        )