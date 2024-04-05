from datetime import datetime

from django.test import TestCase

from node.models import Node


class NodeTestCase(TestCase):
    def test_list_nodes(self):
        test_node = Node.objects.create(node_name='test', last_seen=datetime.now())
        response = self.client.get('/api/node/')
        assert (
                response.status_code == 200
        ), "Response code should be 200"

        content = response.json()
        assert (
                type(content) == list
        ), "Response content should be an list"
        assert (
                content[0]['node_name'] == test_node.node_name
        ), "Node name should be other"

    def test_get_node(self):
        pass

    def test_delete_node(self):
        pass

    def test_update_node(self):
        pass
