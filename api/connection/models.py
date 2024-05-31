from django.db import models

from node.models import Node
from utils.models import TimestampedModel


class Connection(TimestampedModel):
    class ConnectionType(models.TextChoices):
        LORA = 'LORA'
        UKF = 'UKF'
        VHF = 'VHF'
        GSM = 'GSM'
        KF = 'KF'
        CB = 'CB'
        PMR = 'PMR'
        UNKNOWN = 'NA'

    connection_type = models.CharField(
        max_length=4,
        choices=ConnectionType.choices,
        default=ConnectionType.UNKNOWN
    )

    logged_by = models.ForeignKey(Node, related_name="logged_connections", on_delete=models.CASCADE)
    caller = models.ForeignKey(Node, related_name="caller", on_delete=models.CASCADE)
    called = models.ForeignKey(Node, related_name="called", on_delete=models.CASCADE)

    frequency = models.IntegerField()
