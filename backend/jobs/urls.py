"""backend/jobs/urls.py"""

from django.urls import path
from .views import job_list, job_detail, RecommendedJobsView

urlpatterns = [
    path('jobs/', job_list, name='job-list'),
    path('jobs/<int:pk>/', job_detail, name='job-detail'),
    path("recommended-jobs/", RecommendedJobsView.as_view(), name="recommended-jobs"),
]