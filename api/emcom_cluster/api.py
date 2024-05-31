from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("node/", "node.views.router")
api.add_router("connection/", "connection.views.router")
