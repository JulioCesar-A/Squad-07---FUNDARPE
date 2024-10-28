from enum import Enum as PyEnum

class StatusGerais(PyEnum):

    VALIDO = "válido"
    INVALIDO = "inválido"
    EM_ANALISE = "em análise"
    APROVADO = "aprovado"
    NEGADO = "negado"
    RECEBIDO = "recebido"


class NomeAnexos(PyEnum):

    RG_CNH_CART_TRAB = "RG/CNH/Carteira de Trabalho"
    CONTRATO_SOCIAL = "Contrato Social"
    CURRICULO = "Currículo"
    COMPROV_END = "Comprovante de Endereço"
    CARTAO_CNPJ = "Cartão CNPJ"
    CERT_PREST_CONTA = "Certidão Prestação de Contas"
    CERT_REG_FISCAL = "Certidão de Regularidade Fiscal"