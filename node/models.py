from django.db import models
from utils.models import TimestampedModel

class Node(TimestampedModel):
    node_name = models.CharField(max_length=20)
    qth_locator = models.CharField(max_length=10)
    last_seen = models.DateTimeField()

