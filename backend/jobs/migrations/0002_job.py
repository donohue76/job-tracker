# Generated by Django 5.1.6 on 2025-03-02 16:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Job",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("company", models.CharField(max_length=255)),
                ("location", models.CharField(blank=True, max_length=255, null=True)),
                ("date_applied", models.DateField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("applied", "Applied"),
                            ("interview", "Interview Scheduled"),
                            ("offer", "Offer Received"),
                            ("rejected", "Rejected"),
                            ("withdrawn", "Withdrawn"),
                        ],
                        max_length=50,
                    ),
                ),
            ],
        ),
    ]
