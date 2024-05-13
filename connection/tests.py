from datetime import datetime

from django.test import TestCase

from connection.models import Connection  # Assuming 'Connection' is the model name


class ConnectionTestCase(TestCase):
    def test_list_connections(self):
        test_connection = Connection.objects.create(connection_name='test', last_seen=datetime.now())
        response = self.client.get('/api/connection/')
        assert (
            response.status_code == 200
        ), "Response code should be 200"

        content = response.json()
        assert (
            type(content) == list
        ), "Response content should be a list"
        assert (
            content[0]['logged_by'] == test_connection.logged_by
        ), "Connection name should match"

    def test_create_connection(self):
        body= {"logged_by": "Rzeszow"}
        response = self.client.post(
            "/api/connection/", data=body, content_type="connection/json" 
        )
         assert response.status_code == 200, "Status code should be 200"
        assert response.json()["logged_by"] == "Rzeszow"
        assert (
            response.json()["created"] is not None
        ), "Created should be automatically set"
        
    def test_get_connection(self):
         response = self.client.get("/api/connection/1/")
        assert response.status_code == 200, "Response code should be 200"

        content = response.json()
        assert (
            content["logged_by"] == self.test_connection.logged_by
        ), 

    def test_delete_connection(self):
         response = self.client.delete("/api/connection/1/")
        assert response.status_code == 200, "Response code should be 200"

 content = response.json()
        assert content["success"], "Nothing should be here"
        assert list(Connection.objects.all()) == []

    def test_update_connection(self):
        body = {"called": "KNML"}
        response = self.client.put(
            "/api/node/1", data=body, content_type="application/json"
        )
        assert response.status_code == 200, "Response code should be 200"
        assert response.json()["qth_locator"] == "KNML", "Response from put is inproper"
        
