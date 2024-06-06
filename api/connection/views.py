from http import HTTPStatus

from ninja import Router
from connection.controllers import (
    list_connections_controller,
    get_connection_controller,
    create_connection_controller,
    update_connection_controller,
    delete_connection_controller,
)
from connection.schemas import ConnectionOut, ConnectionIn, ConnectionsOut

router = Router(tags=["Connections"])


@router.get("", response={HTTPStatus.OK: list[ConnectionsOut]})
def list_connections(request):
    a = list_connections_controller()
    return a


@router.get("{connection_id}/", response={HTTPStatus.OK: ConnectionOut})
def get_connection(request, connection_id: int):
    return get_connection_controller(connection_id)


@router.post("", response={HTTPStatus.CREATED: ConnectionOut})
def create_connection(request, payload: ConnectionIn):
    return create_connection_controller(payload)


@router.put("{connection_id}/", response={HTTPStatus.OK: ConnectionOut})
def update_connection(request, connection_id: int, payload: ConnectionIn):
    return update_connection_controller(payload, connection_id)


@router.delete("{connection_id}/")
def delete_connection(request, connection_id: int):
    delete_connection_controller(connection_id)
    return {"success": True}
