from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date



class Endereco(BaseModel):
    logradouro : str
    numero : str
    bairro : str
    cidade : str
    estado : str
    cep : str

class RepresentantePessoaJuridica(BaseModel):
    nome_completo: str
    cpf: str
    data_nascimento: date

class ProdutorCulturalBase(BaseModel):
    email: EmailStr
    senha: str
    ativo: int
    endereco: Endereco




