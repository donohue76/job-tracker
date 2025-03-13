from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import JobApplication
from .serializers import JobApplicationSerializer

@api_view(['GET', 'POST'])
def job_list(request):
    if request.method == 'GET':
        jobs = JobApplication.objects.all()
        serializer = JobApplicationSerializer(jobs, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def job_detail(request, pk):
    try:
        job = JobApplication.objects.get(pk=pk)
    except JobApplication.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JobApplicationSerializer(job)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = JobApplicationSerializer(job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class RecommendedJobsView(APIView):
    """
    API endpoint to return a list of recommended jobs.
    """

    def get(self, request):
        # Example static data (Replace this with a database query if needed)
        recommended_jobs = [
            {"id": 1, "title": "Frontend Developer", "company": "Google", "location": "Remote", "salary": "$100k - $120k", "tags": ["React", "Vue", "CSS"], "postedDate": "2024-03-10"},
            {"id": 2, "title": "Backend Engineer", "company": "Amazon", "location": "Seattle, WA", "salary": "$110k - $130k", "tags": ["Python", "Django", "API"], "postedDate": "2024-03-12"},
            {"id": 3, "title": "DevOps Engineer", "company": "Microsoft", "location": "Redmond, WA", "salary": "$120k - $140k", "tags": ["AWS", "Terraform", "CI/CD"], "postedDate": "2024-03-08"},
        ]

        return Response(recommended_jobs, status=status.HTTP_200_OK)