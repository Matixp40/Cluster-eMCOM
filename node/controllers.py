from django.shortcuts import get_object_or_404

from node.models import Node
from node.schemas import NodeOut, NodeIn


def list_nodes_controller() -> list[NodeOut]:
    return Node.objects.all()


def get_node_controller(node_id: int) -> Node:
    return Node.objects.get(id=node_id)


def create_node_controller(payload: NodeIn) -> Node:
    node = Node(**payload.dict())
    node.full_clean()
    node.save()
    return node


def update_node_controller(payload: NodeIn, node_id: int) -> Node:
    node = get_object_or_404(Node, id=node_id)
    for attr, value in payload.dict().items():
        setattr(node, attr, value)

    node.save()
    return node


def delete_node_controller(node_id: int):
    node = get_object_or_404(Node, id=node_id)
    node.delete()
