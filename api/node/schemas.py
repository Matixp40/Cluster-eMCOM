from ninja import ModelSchema

from node.models import Node


class NodeIn(ModelSchema):
    class Meta:
        model = Node
        fields = ['node_name', 'qth_locator', 'last_seen']
        fields_optional = ['node_name', 'qth_locator', 'last_seen']


class NodeOut(ModelSchema):
    class Meta:
        model = Node
        fields = ['id', 'node_name', 'qth_locator', 'last_seen', 'created', 'updated']
