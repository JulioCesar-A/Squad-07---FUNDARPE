from enum import Enum as PyEnum

class StatusGerais(PyEnum):

    VALIDO = "valido"
    INVALIDO = "invalido"
    EM_ANALISE = "em_analise"
    APROVADO = "aprovado"
    NEGADO = "negado"
    RECEBIDO = "recebido"


class NomeAnexos(PyEnum):

    IDENTIDADE = "Identidade"
    CONTRATO_SOCIAL = "Contrato_Social"
    CURRICULO = "Curriculo"
    COMP_ENDERECO = "Comp_Endereco"
    CARTAO_CNPJ = "Cartao_CNPJ"
    CERT_PREST_CONTA = "Cert_Prest_Conta"
    CERT_REG_FISCAL = "Cert_Reg_Fiscal"