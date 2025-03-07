from django.db import models

class Job(models.Model):
    DECISION_STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Interviewing', 'Interview Scheduled'),
        ('Offer', 'Offer Received'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
        ('Withdrawn', 'Withdrawn'),
    ]

    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    applied_date = models.DateField(null=True, blank=True)
    interview_date = models.DateField(null=True, blank=True)
    offer_date = models.DateField(null=True, blank=True)
    offer_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    decision_date = models.DateField(null=True, blank=True)
    decision_status = models.CharField(
        max_length=20,
        choices=DECISION_STATUS_CHOICES,
        null=True,
        blank=True
    )
    withdrawn_date = models.DateField(null=True, blank=True)
    withdrawal_reason = models.CharField(max_length=255, null=True, blank=True)
    custom_withdrawal_reason = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.position} at {self.company}"

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview Scheduled'),
        ('offer', 'Offer Received'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn'),
    ]

    position = models.CharField(max_length=255)  # Renamed from 'title' to 'position' for uniformity
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)  # Keep location here too
    date_applied = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.position} at {self.company}"