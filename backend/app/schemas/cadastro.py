from pydantic import BaseModel, model_validator, Field
from typing import List, Optional
from datetime import date, timedelta
from .enums import StatusGerais, NomeAnexos

def get_data_atual():
    return date.today()

def get_data_mais_um_ano():
    return get_data_atual() + timedelta(days=365)



# Classes de Requisição para criação dos Cadastros e Renovações
class CadastroCreateRequest(BaseModel):
    data_cadastro : date = Field(default_factory=get_data_atual)

class RenovacaoCreateRequest(BaseModel):
    data_renovacao : date = Field(default_factory=get_data_atual)
    data_expiracao : date = Field(default_factory=get_data_mais_um_ano)




# Classes de Requisição para atualização de Status dos Cadastros e Renovações
class CadastroUpdateRequest(BaseModel):
    status : Optional[StatusGerais] = None

class RenovacaoUpdateRequest(BaseModel):
    status : Optional[StatusGerais] = None



# Classes de Resposta de Requisição
class AnexosRetorno(BaseModel):
    id_anexo : int
    id_cadastro : Optional[int] = None
    id_renovacao : Optional[int] = None
    extensao : str
    data_upload : date
    tipo_doc : NomeAnexos
    status : StatusGerais

    @model_validator(mode="before")
    def checar_ids(cls, values):
        id_cadastro = values.get('id_cadastro')
        id_renovacao = values.get('id_renovacao')

        
        if id_cadastro is not None and id_renovacao is not None:
            raise ValueError('Apenas um dos campos id_cadastro ou id_renovacao deve ser preenchido.')

        if id_cadastro is None and id_renovacao is None:
            raise ValueError('Um dos campos id_cadastro ou id_renovacao deve ser preenchido.')

        return values


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