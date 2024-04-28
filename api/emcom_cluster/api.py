from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("node/", "node.views.router")
