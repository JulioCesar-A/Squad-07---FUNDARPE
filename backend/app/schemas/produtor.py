from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date
import cadastro as cad


class Endereco(BaseModel):
    logradouro : str
    numero : str
    bairro : str
    cidade : str
    estado : str
    cep : str

class RepresentantePessoaJuridica(BaseModel):
    nome_completo : str
    cpf : str
    data_nascimento : date

class ProdutorCulturalBase(BaseModel):
    email : EmailStr
    senha : str
    ativo : int
    endereco : Endereco



# Classes de Requisição para criação de Produtores Culturais
class ProdutorPessoaFisicaCreateRequest(ProdutorCulturalBase):
    nome_completo : str
    cpf : str
    data_nascimento : date

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

class ProdutorCulturalUpdateRequest(BaseModel):
    email : Optional[EmailStr] = None
    senha : Optional[str] = None
    ativo : Optional[int] = None
    endereco : Optional[Endereco] = None

class ProdutorPessoaFisicaUpdateRequest(ProdutorCulturalUpdateRequest):
    nome_completo : Optional[str] = None
    cpf : Optional[str] = None
    data_nascimento : Optional[date] = None

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
    ativo : int
    cadastro : cad.CadastroRetorno
    renovacoes : Optional[List[cad.RenovacaoRetorno]] = None

class ProdutorPessoaFisicaRetorno(ProdutorCulturalRetorno):
    nome_completo : str

class ProdutorPessoaJuridicaRetorno(ProdutorCulturalRetorno):
    razao_social : str
    nome_fantasia : str
    cnpj : str
    representante : RepresentantePessoaJuridica
    endereco : Endereco
