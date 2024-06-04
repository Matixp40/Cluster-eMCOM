from django.shortcuts import get_object_or_404

from connection.models import Connection
from connection.schemas import ConnectionIn, ConnectionsOut
from node.models import Node


def list_connections_controller() -> list[ConnectionsOut]:
    objects = Connection.objects.all()
    response = []
    for i in objects:
        logged_by_name = Node.objects.get(pk=i.logged_by.id).node_name
        caller_by_name = Node.objects.get(pk=i.logged_by.id).node_name
        called_by_name = Node.objects.get(pk=i.logged_by.id).node_name
        response.append(
            {
                "id": i.id,
                "caller": i.caller.id,
                "frequency": i.frequency,
                "logged_by": i.logged_by.id,
                "called": i.called.id,
                "connection_type": i.connection_type,
                "logged_by_name": logged_by_name,
                "called_name": called_by_name,
                "caller_name": caller_by_name,
                "created": str(i.created),
                "updated": str(i.updated)
            }
        )

        return response


def get_connection_controller(connection_id: int) -> Connection:
    return Connection.objects.get(id=connection_id)


def create_connection_controller(payload: ConnectionIn) -> Connection:
    connection = Connection(connection_type=payload.connection_type,
                            called_id=payload.called,
                            caller_id=payload.caller,
                            frequency=payload.frequency,
                            logged_by_id=payload.logged_by
                            )
    connection.full_clean()
    connection.save()
    return connection


def update_connection_controller(payload: ConnectionIn, connection_id: int) -> Connection:
    connection = get_object_or_404(Connection, id=connection_id)
    connection.frequency = payload.frequency
    connection.connection_type = payload.connection_type
    connection.called_id = payload.called
    connection.caller_id = payload.caller
    connection.logged_by_id = payload.logged_by

    connection.save()
    return connection


def delete_connection_controller(connection_id: int):
    connection = get_object_or_404(Connection, id=connection_id)
    connection.delete()
