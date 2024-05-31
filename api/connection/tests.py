from django.test import TestCase

from connection.models import Connection
from node.models import Node


class ConnectionTestCase(TestCase):
    def setUp(self):
        self.test_node_1 = Node.objects.create(
            node_name="One"
        )
        self.test_node_2 = Node.objects.create(
            node_name="Two"
        )
        self.test_connection = Connection.objects.create(
            frequency=145500,
            connection_type=Connection.ConnectionType.LORA,
            logged_by=self.test_node_1,
            caller=self.test_node_1,
            called=self.test_node_2
        )

    def test_list_connections(self):
        response = self.client.get('/api/connection/')
        assert (
                response.status_code == 200
        ), "Response code should be 200"

        content = response.json()
        assert (
                type(content) == list
        ), "Response content should be a list"
        assert (
                content[0]['connection_type'] == self.test_connection.connection_type
        ), "Connection name should match"

    def test_create_connection(self):
        body = {
            "caller_id": self.test_node_1.id,
            "called_id": self.test_node_2.id,
            "connection_type": "LORA",
            "logged_by_id": self.test_node_1.id,
            "frequency": 145500
        }
        response = self.client.post(
            "/api/connection/", data=body, content_type="application/json"
        )
        assert response.status_code == 201, "Status code should be 200"
        assert response.json()["logged_by"] == self.test_node_1.id
        assert (
                response.json()["created"] is not None
        ), "Created should be automatically set"

    def test_get_connection(self):
        response = self.client.get("/api/connection/1/")
        assert response.status_code == 200, "Response code should be 200"

        content = response.json()
        assert (
                content["logged_by"] == self.test_connection.logged_by.id
        )

    def test_delete_connection(self):
        response = self.client.delete("/api/connection/1/")
        assert response.status_code == 200, "Response code should be 200"

        content = response.json()
        assert content["success"], "Nothing should be here"
        assert list(Connection.objects.all()) == []

    def test_update_connection(self):
        body = {
            "caller_id": 1,
            "frequency": 333,
            "logged_by_id": 2,
            "called_id": 2,
            "connection_type": "PMR"
        }
        response = self.client.put(
            "/api/connection/1/", data=body, content_type="application/json"
        )
        assert response.status_code == 200, "Response code should be 200"
        content = response.json()

        assert content["frequency"] == 333
