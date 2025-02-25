from django.db import models

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview Scheduled'),
        ('offer', 'Offer Received'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn'),
    ]

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    date_applied = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} at {self.company}"