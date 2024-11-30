from pydantic import BaseModel, EmailStr, field_validator, Field, model_validator
from typing import List, Optional
from datetime import date
from fastapi import UploadFile
from dateutil.relativedelta import relativedelta
from .enums import StatusGerais, NomeAnexos

import re


def get_data_atual():
    return date.today()

def get_data_mais_um_ano():
    return get_data_atual() + relativedelta(year=1)



def checar_data_nascimento(dt_nasc : date) -> date:

    dt_18_anos_atras = date.today() - relativedelta(years=18)

    if dt_nasc > date.today():
        raise ValueError("A data de nascimento não pode ser uma data futura")
    if dt_nasc > dt_18_anos_atras:
        raise ValueError("Apenas pessoas maiores de 18 anos podem ter seus dados armazenados no sistema")
    return dt_nasc 

def validar_senha(senha : str) -> str:

    if len(senha) < 8:
        raise ValueError("A senha de ter no mínimo 8 caracteres.")
    if not re.search(r"[A-Z]", senha):
        raise ValueError("A senha deve conter pelo menos uma letra maiúscula.")
    if not re.search(r"[a-z]", senha):
        raise ValueError("A senha deve conter pelo menos uma letra minúscula")
    if not re.search(r"\d", senha):
        raise ValueError("A senha deve conter pelo menos um dígito.")
    if not re.search(r"[!@#$%^&*,.?\":|]", senha):
        raise ValueError("A senha deve conter pelo menos uma caracter especial.")
    return senha


class Anexo(BaseModel):
    nome_anexo : NomeAnexos
    arquivo : UploadFile

class Endereco(BaseModel):
    logradouro : str
    numero : str
    bairro : str
    cidade : str
    estado : str
    cep : str = Field(min_length=8, max_length=8)

class RepresentantePessoaJuridica(BaseModel):
    nome_completo : str = Field(min_length=1)
    cpf : str = Field(min_length=11, max_length=11)
    data_nascimento : date

    _validar_data_nascimento = field_validator('data_nascimento')(checar_data_nascimento)



class ProdutorCulturalBase(BaseModel):
    email : EmailStr
    senha : str = Field(min_length=8, description="Senha com no mínimo 8 caracteres")
    endereco : Endereco
    _validar_senha = field_validator("senha")(validar_senha)



<<<<<<< HEAD
=======
Classes de Requisição para criação de Produtores Culturais
>>>>>>> cc609d4afafb80cd6928caac89860155b3667d9f
class ProdutorPessoaFisicaCreateRequest(ProdutorCulturalBase):
    nome_completo : str
    cpf : str = Field(min_length=11, max_length=11)
    data_nascimento : date

    _validar_data_nascimento = field_validator('data_nascimento')(checar_data_nascimento)



class ProdutorPessoaJuridicaCreateRequest(ProdutorCulturalBase):
    cnpj : str 
    razao_soc : str
    nome_fant : str
    representante : RepresentantePessoaJuridica



<<<<<<< HEAD
=======
Classes de Requisição para atualização de Produtores Culturais
>>>>>>> cc609d4afafb80cd6928caac89860155b3667d9f
class EnderecoUpdate(BaseModel):
    logradouro : Optional[str] = None
    numero : Optional[str] = None
    bairro : Optional[str] = None
    cidade : Optional[str] = None
    estado : Optional[str] = None
    cep : Optional[str] = None

class RepresentantePessoaJuridicaUpdate(BaseModel):
    nome_completo : Optional[str] = None
    cpf : Optional[str] = None
    data_nascimento : Optional[date] = None

    _validar_data_nascimento = field_validator('data_nascimento')(checar_data_nascimento)

class ProdutorCulturalUpdateRequest(BaseModel):
    email : Optional[EmailStr] = None
    senha : Optional[str] = Field(None,min_length=8, description="Senha com no mínimo 8 caracteres (opcional)")
    ativo : Optional[int] = None
    endereco : Optional[Endereco] = None

    _validar_senha = field_validator("senha")(validar_senha)


class ProdutorPessoaFisicaUpdateRequest(ProdutorCulturalUpdateRequest):
    nome_completo : Optional[str] = None
    cpf : Optional[str] = None
    data_nascimento : Optional[date] = None

    _validar_data_nascimento = field_validator('data_nascimento')(checar_data_nascimento)



class ProdutorPessoaJuridicaUpdateRequest(ProdutorCulturalUpdateRequest):
    razao_social : Optional[str] = None
    nome_fantasia : Optional[str] = None
    cnpj : Optional[str] = None
    representante : Optional[RepresentantePessoaJuridica] = None

class RenovacaoCreateRequest(BaseModel):
    data_renovacao : date = Field(default_factory=get_data_atual)
    data_expiracao : date = Field(default_factory=get_data_mais_um_ano)



<<<<<<< HEAD
=======
Classes de Requisição para atualização de Status dos Cadastros e Renovações
>>>>>>> cc609d4afafb80cd6928caac89860155b3667d9f
class CadastroUpdateRequest(BaseModel):
    status : Optional[StatusGerais] = None

class RenovacaoUpdateRequest(BaseModel):
    status : Optional[StatusGerais] = None




<<<<<<< HEAD
=======
Classes de Resposta de Requisição
>>>>>>> cc609d4afafb80cd6928caac89860155b3667d9f
class AnexosRetorno(BaseModel):
    id_anexo : int
    id_cadastro : int
    id_renovacao : Optional[int] = None
    nome_anexo : NomeAnexos
    extensao : str
    data_upload : date
    status : StatusGerais

    
class CadastroRetorno(BaseModel):
    id : int
    status : StatusGerais
    data_cadastro : date
    anexos : List[AnexosRetorno]

class RenovacaoRetorno(BaseModel):
    id : int
    data_renovacao : date
    data_expiracao : date
    status : StatusGerais
    anexos : List[AnexosRetorno]

class RepresentantePessoaJuridicaRetorno(BaseModel):
    nome_completo : str

class ProdutorCulturalRetorno(BaseModel):
    id : str
    email : EmailStr
    ativo : int = 1
    cadastro : CadastroRetorno
    renovacoes : Optional[List[RenovacaoRetorno]] = None

class ProdutorPessoaFisicaRetorno(ProdutorCulturalRetorno):
    nome_completo : str
    data_nascimento : date

class ProdutorPessoaJuridicaRetorno(ProdutorCulturalRetorno):
    razao_social : str
    nome_fantasia : str
    cnpj : str
    representante : RepresentantePessoaJuridica
    endereco : Endereco