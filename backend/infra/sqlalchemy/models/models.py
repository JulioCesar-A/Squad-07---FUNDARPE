from sqlalchemy import Column, ForeignKey, String, BLOB, Boolean, Enum, DATE, Integer
from config.database import Base
from app.schemas.enums import StatusGerais, NomeAnexos



class ProdutorCultural(Base):
    __tablename__ = "PROD_CULT_TB"

    id = Column("ID_PROD_CULT", String, primary_key=True, index=True)
    
    email = Column("EMAIL", String(100), nullable=False)
    senha = Column("SENHA_HASH", String(60), nullable=False)
    ativo = Column("ATIVO", Boolean, nullable=False)



class ProdutorPessoaFisica(Base):
    __tablename__ = "PROD_PF_TB"

    id = Column("FK_PROD_CULT", String, ForeignKey('PROD_CULT_TB.ID_PROD_CULT'), primary_key=True)
    
    nome = Column("NOME_COMP", String, nullable=False)
    cpf = Column("CPF", String(11), nullable=False)
    data_nasc = Column("DATA_NASC", DATE, nullable=False)



class ProdutorPessoaJuridica(Base):
    __tablename__ = "PROD_PJ_TB"

    id = Column("FK_PROD_CULT", String, ForeignKey('PROD_CULT_TB.ID_PROD_CULT'), primary_key=True)

    cnpj = Column("CNPJ", String(14), nullable=False, unique=True)
    razao_soc = Column("RAZAO_SOCIAL", String, nullable=False)
    nome_fant = Column("NOME_FANT", String, nullable=False)



class Endereco(Base):
    __tablename__ = "ENDERECO_TB"

    id = Column("FK_PROD_CULT", String, ForeignKey('PROD_CULT_TB.ID_PROD_CULT'), primary_key=True)
    
    logradouro = Column("LOGRADOURO", String(100), nullable=False)
    numero = Column("NUMERO", String(7), nullable=False)
    bairro = Column("BAIRRO", String(50), nullable=False)
    cidade = Column("CIDADE", String(50), nullable=False)
    estado = Column("ESTADO", String(20), nullable=False)
    cep = Column("CEP", String(8), nullable=False)



class RepresentantePessoaJuridica(Base):
    __tablename__ = "REPRESENTANTE_TB"

    id = Column("FK_PROD_PJ", String, ForeignKey('PROD_PJ_TB.FK_PROD_CULT'), primary_key=True)
    
    nome = Column("NOME_COMP", String, nullable=False)
    cpf = Column("CPF", String(11), nullable=False, unique=True)
    data_nasc = Column("DATA_NASC", DATE, nullable=False)




class Cadastro(Base):
    __tablename__ = "CADASTRO_TB"

    id = Column("ID_CAD", Integer, primary_key=True)

    id_produtor = Column("FK_PROD_CULT", String, ForeignKey('PROD_CULT_TB.ID_PROD_CULT'), nullable=False)
    
    status = Column("STATUS_CAD", Enum(StatusGerais), nullable=False, default=StatusGerais.RECEBIDO)
    data_cadastro = Column("DATA_CAD", DATE, nullable=False)

    @classmethod
    def status_validos(cls):
        return [StatusGerais.RECEBIDO, StatusGerais.EM_ANALISE, StatusGerais.VALIDO, StatusGerais.INVALIDO]



class Renovacao(Base):
    __tablename__ = "RENOVACAO_TB"

    id = Column("ID_RENOVACAO", Integer, primary_key=True)

    id_produtor = Column("FK_PROD_CULT", String, ForeignKey('PROD_CULT_TB.ID_PROD_CULT'), nullable=False)
    id_cadastro = Column("FK_CAD", Integer, ForeignKey('CADASTRO_TB.ID_CAD'), nullable=False)
    
    status = Column("STATUS", Enum(StatusGerais), nullable=False, default=StatusGerais.RECEBIDO)
    data_ren =  Column("DATA_REN", DATE, nullable=False)
    data_exp =  Column("DATA_EXP", DATE, nullable=False)

    @classmethod
    def status_validos(cls):
        return [StatusGerais.RECEBIDO, StatusGerais.EM_ANALISE, StatusGerais.NEGADO, StatusGerais.APROVADO]



class Anexo(Base):
    __tablename__ = "ANEXO_TB"

    id = Column("ID_ANEXO", Integer, primary_key=True)

    id_cadastro = Column("FK_CAD", Integer, ForeignKey(), nullable=True)
    id_renovacao = Column("FK_REN", Integer, ForeignKey(), nullable=True)
    
    nome_anexo = Column("NOME_ANEXO", Enum(NomeAnexos), nullable=False)
    data_upload = Column("DATA_UPLOAD", DATE, nullable=False)
    status = Column("STATUS", Enum(StatusGerais), nullable=False, default=StatusGerais.RECEBIDO)
    extensao = Column("EXTENSAO", String(6), nullable=False)

    arquivo = Column("ARQUIVO", BLOB, nullable=False)

    @classmethod
    def status_validos(cls):
        return [StatusGerais.RECEBIDO, StatusGerais.EM_ANALISE, StatusGerais.VALIDO, StatusGerais.INVALIDO]
