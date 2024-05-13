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
            content[0]['connection_name'] == test_connection.connection_name
        ), "Connection name should match"

    def test_post_connection(self, request):
        
    def test_get_connection(self, request):
        pass

    def test_delete_connection(self, request):
        pass

    def test_update_connection(self, request):
        pass
