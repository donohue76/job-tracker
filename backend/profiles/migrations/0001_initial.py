# Generated by Django 5.1.6 on 2025-03-07 22:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
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
                ("first_name", models.CharField(blank=True, max_length=50)),
                ("last_name", models.CharField(blank=True, max_length=50)),
                ("dob", models.DateField(blank=True, null=True)),
                ("phone", models.CharField(blank=True, max_length=15)),
                (
                    "profile_image",
                    models.ImageField(
                        blank=True, null=True, upload_to="profile_images/"
                    ),
                ),
                ("employment_types", models.JSONField(blank=True, default=list)),
                ("work_locations", models.CharField(blank=True, max_length=255)),
                ("salary_range", models.JSONField(blank=True, default=dict)),
                ("industries", models.JSONField(blank=True, default=list)),
                ("roles", models.JSONField(blank=True, default=list)),
                ("company_preferences", models.JSONField(blank=True, default=dict)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
