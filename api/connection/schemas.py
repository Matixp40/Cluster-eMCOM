from ninja import ModelSchema

from connection.models import Connection


class ConnectionIn(ModelSchema):
    class Meta:
        model = Connection
        fields = ['caller', 'frequency', 'logged_by', 'called', 'connection_type']
        fields_optional = ['caller', 'called', 'connection_type']


class ConnectionOut(ModelSchema):
    class Meta:
        model = Connection
        fields = ['id','caller', 'frequency',
                  'logged_by', 'called', 'connection_type',
                  'created', 'updated']
