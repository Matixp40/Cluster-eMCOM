import json
from datetime import datetime

from django.test import TestCase

from node.models import Node


class NodeTestCase(TestCase):
    def setUp(self):
        self.test_node = Node.objects.create(node_name='test', last_seen=datetime.now())

    def tearDown(self):
        Node.objects.all().delete()
        self.test_node = None

    def test_create_node(self):
        body = {
            'node_name': 'SP10Q'
        }
        response = self.client.post('/api/node/', data=body, content_type='application/json')

        print(response)
        assert response.status_code == 200, "Status code should be 200"
        assert response.json()['node_name'] == 'SP10Q'
        assert response.json()['created'] is not None, "Created should be automatically set"

    def test_list_nodes(self):
        response = self.client.get('/api/node/')
        assert response.status_code == 200, "Response code should be 200"

        content = response.json()
        assert isinstance(content, list), "Response content should be an list"
        assert content[0]['node_name'] == self.test_node.node_name, "Node name should be other"

    def test_get_node(self):
        response = self.client.get('/api/node/1/')
        assert response.status_code == 200, "Response code should be 200"

        content = response.json()
        assert content['node_name'] == self.test_node.node_name, "Node name should be other"

    def test_delete_node(self):
        response = self.client.delete('/api/node/1/')
        assert response.status_code == 200, "Response code should be 200"

        content = response.json()
        assert content['success'], "Nothing should be here"
        assert list(Node.objects.all()) == []

    def test_update_node(self):
        body = {
            "qth_locator": "KNML"
        }
        response = self.client.put('/api/node/1', data=body, content_type='application/json')
        assert response.status_code == 200, "Response code should be 200"
        assert response.json()['qth_locator'] == "KNML", "Response from put is inproper"
