from django.urls import path
from .views import job_list, job_detail

urlpatterns = [
    path("jobs/", job_list, name="job-list"),  # Ensure trailing slash
    path("jobs/<int:pk>/", job_detail, name="job-detail"),
]