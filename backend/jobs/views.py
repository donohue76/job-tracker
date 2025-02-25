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