from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import List, Optional
from datetime import date
from dateutil.relativedelta import relativedelta

import schemas.cadastro as cad



def checar_data_nascimento(dt_nasc : date):

    dt_18_anos_atras = date.today() - relativedelta(years=18)

    if dt_nasc > date.today():
        raise ValueError("A data de nascimento não pode ser uma data futura")
    if dt_nasc > dt_18_anos_atras:
        raise ValueError("Apenas pessoas maiores de 18 anos podem ter seus dados armazenados no sistema")
    

    return dt_nasc 

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

    _validar_data_nascimento = field_validator('data_nascimento', allow_reuse=True)(checar_data_nascimento)




class ProdutorCulturalBase(BaseModel):
    email : EmailStr
    senha : str = Field(min_length=8, description="Senha com no mínimo 8 caracteres")
    endereco : Endereco



# Classes de Requisição para criação de Produtores Culturais
class ProdutorPessoaFisicaCreateRequest(ProdutorCulturalBase):
    nome_completo : str
    cpf : str = Field(min_length=11, max_length=11)
    data_nascimento : date

    _validar_data_nascimento = field_validator('data_nascimento', allow_reuse=True)(checar_data_nascimento)



class ProdutorPessoaJuridicaCreateRequest(ProdutorCulturalBase):
    razao_social : str
    nome_fantasia : str
    cnpj : str 
    representante : RepresentantePessoaJuridica



# Classes de Requisição para atualização de Produtores Culturais
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

    _validar_data_nascimento = field_validator('data_nascimento', allow_reuse=True)(checar_data_nascimento)

class ProdutorCulturalUpdateRequest(BaseModel):
    email : Optional[EmailStr] = None
    senha : Optional[str] = None
    ativo : Optional[int] = None
    endereco : Optional[Endereco] = None

class ProdutorPessoaFisicaUpdateRequest(ProdutorCulturalUpdateRequest):
    nome_completo : Optional[str] = None
    cpf : Optional[str] = None
    data_nascimento : Optional[date] = None

    _validar_data_nascimento = field_validator('data_nascimento', allow_reuse=True)(checar_data_nascimento)



class ProdutorPessoaJuridicaUpdateRequest(ProdutorCulturalUpdateRequest):
    razao_social : Optional[str] = None
    nome_fantasia : Optional[str] = None
    cnpj : Optional[str] = None
    representante : Optional[RepresentantePessoaJuridica] = None



# Classes de Resposta de Requisição de Produtores Culturais
class RepresentantePessoaJuridicaRetorno(BaseModel):
    nome_completo : str


class ProdutorCulturalRetorno(BaseModel):
    id : str
    email : EmailStr
    ativo : int = 1
    cadastro : cad.CadastroRetorno
    renovacoes : Optional[List[cad.RenovacaoRetorno]] = None

class ProdutorPessoaFisicaRetorno(ProdutorCulturalRetorno):
    nome_completo : str
    data_nascimento : date

class ProdutorPessoaJuridicaRetorno(ProdutorCulturalRetorno):
    razao_social : str
    nome_fantasia : str
    cnpj : str
    representante : RepresentantePessoaJuridica
    endereco : Endereco
