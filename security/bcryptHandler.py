import bcrypt


def generateHash(password: str):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())


def compareHashToPassword(password: str, hash: str):
    return bcrypt.checkpw(password.encode("utf-8"), hash.encode("utf-8"))
