from enum import Enum as PyEnum

class StatusGerais(PyEnum):

    VALIDO = "valido"
    INVALIDO = "invalido"
    EM_ANALISE = "em_analise"
    APROVADO = "aprovado"
    NEGADO = "negado"
    RECEBIDO = "recebido"


class NomeAnexos(PyEnum):

    RG_CNH_CART_TRAB = "RG_CNH_Carteira_Trabalho"
    CONTRATO_SOCIAL = "Contrato_Social"
    CURRICULO = "Curriculo"
    COMPROV_END = "Comprovante de Endereco"
    CARTAO_CNPJ = "Cartao_CNPJ"
    CERT_PREST_CONTA = "Certidao_Prestacao_Contas"
    CERT_REG_FISCAL = "Certidao_Regularidade_Fiscal"