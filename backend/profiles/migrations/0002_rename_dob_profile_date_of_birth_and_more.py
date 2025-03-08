# Generated by Django 5.1.6 on 2025-03-08 04:29

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="profile",
            old_name="dob",
            new_name="date_of_birth",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="company_preferences",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="employment_types",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="first_name",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="industries",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="last_name",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="phone",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="profile_image",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="roles",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="work_locations",
        ),
        migrations.AddField(
            model_name="profile",
            name="address",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="profile",
            name="avatar_url",
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name="profile",
            name="created_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="profile",
            name="desired_role",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="profile",
            name="industry",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="profile",
            name="preferred_location",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="profile",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="profile",
            name="salary_range",
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
