from http import HTTPStatus

from ninja import Router

from node.controllers import list_nodes_controller, get_node_controller, create_node_controller, update_node_controller, \
    delete_node_controller
from node.schemas import NodeOut, NodeIn

router = Router(tags=["Nodes"])


@router.get("", response={HTTPStatus.OK: list[NodeOut]})
def list_nodes(request):
    return list_nodes_controller()


@router.get("{node_id}/", response={HTTPStatus.OK: NodeOut})
def get_node(request, node_id: int):
    return get_node_controller(node_id)


@router.post("", response={HTTPStatus.OK: NodeOut})
def create_node(request, payload: NodeIn):
    return create_node_controller(payload)


@router.put("{node_id}", response={HTTPStatus.OK: NodeOut})
def update_node(request, payload: NodeIn, node_id: int):
    return update_node_controller(payload, node_id)


@router.delete("{node_id}/")
def delete_node(request, node_id: int):
    delete_node_controller(node_id)
    return {"success": True}