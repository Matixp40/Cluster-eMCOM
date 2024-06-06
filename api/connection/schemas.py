from ninja import ModelSchema, Schema

from connection.models import Connection


class ConnectionIn(ModelSchema):
    class Meta:
        model = Connection
        fields = ['caller', 'frequency', 'logged_by', 'called', 'connection_type']
        fields_optional = ['caller', 'called', 'connection_type']


class ConnectionOut(ModelSchema):
    class Meta:
        model = Connection
        fields = ['id', 'caller', 'frequency', 'logged_by', 'called', 'connection_type']
        fields_optional = ['caller', 'called', 'connection_type']


class ConnectionsOut(Schema):
    id: int
    caller: int
    frequency: int
    logged_by: int
    logged_by_name: str
    called: int
    called_name: str
    connection_type: str
    caller_name: str
    created: str
    updated: str
