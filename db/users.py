from pymongo.database import Database
from pymongo import MongoClient
from bson import ObjectId
from helpers.schema import AddUserSchema, UpdateUserSchema
from security import jwtHandler as jwt, bcryptHandler as bcrypt


class UserDB:
    def __init__(self, client: MongoClient):
        self.client = client
        self.db = Database(self.client, "kzblogs")
        self.users = self.db.get_collection("users")

    def get_user(self, query: str = None, **kwargs):
        result = self.users.find_one({"_id": ObjectId(query)})
        if not result:
            return {
                "message": "The user is not present in the database",
                "status": False,
            }
        result = dict(result)
        result["id"] = str(result.pop("_id"))
        return result

    def add_user(self, data: AddUserSchema):
        if self.users.find_one({"email": data.email}):
            return {
                "message": "User already exists.",
                "status": False,
            }
        information: dict = data.dict()
        information["password"] = bcrypt.generateHash(information["password"])
        information["is_admin"] = False
        self.users.insert_one(information)

        return {
            "message": "User added successfully.",
            "status": True,
        }

    def update_user(self, id: str, data: UpdateUserSchema):
        if existing_data := self.users.find_one({"_id": ObjectId(id)}):
            if not data.old_password or not bcrypt.compareHashToPassword(
                data.old_password, dict(existing_data)["password"]
            ):
                return {
                    "message": "Incorrect password. The old password is wrong",
                    "status": False,
                }
            data = dict(data)
            if "id" in data:
                data.pop("id")
            if "password" in data:
                data["password"] = bcrypt.generateHash(data["password"])
            existing_data.update(data)
            existing_data["admin"] = False
            self.users.update_one({"_id": ObjectId(id)}, {"$set": data})
            return {"status": True, "message": "User updated successfully!"}
        else:
            return {
                "message": "The user is not present in the database",
                "status": False,
            }

    def login(self, data: AddUserSchema):
        if result := self.users.find_one({"email": data.email}):
            result = dict(result)
            if bcrypt.compareHashToPassword(data.password, result["password"]):
                return {
                    "status": True,
                    "message": "Login successful.",
                    "token": jwt.signJWT(result),
                }
            else:
                return {
                    "status": False,
                    "message": "Incorrect password.",
                }
        else:
            return {
                "status": False,
                "message": "User not found.",
            }
