import bcrypt

async def gerar_hashing_senha(senha_prod : str):
    senha = senha_prod.encode()

    salt = bcrypt.gensalt()

    senha_hasheada = bcrypt.hashpw(senha, salt)

    return senha_hasheada