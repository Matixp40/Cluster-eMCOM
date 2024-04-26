from ninja import ModelSchema

from connection.models import Connection


class ConnectionIn(ModelSchema):
    class Meta:
        model = Connection
        fields = ['caller', 'called', 'ConnectionType']
        fields_optional = ['caller', 'called', 'ConnectionType']


class ConnectionOut(ModelSchema):
    class Meta:
        model = Connection
        fields = ['caller', 'called', 'ConnectionType', 'created', 'updated']

