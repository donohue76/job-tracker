from rest_framework import serializers
from .models import Job, JobApplication  # Ensure both models are imported

class JobSerializer(serializers.ModelSerializer):
    def validate_decision_status(self, value):
        allowed_statuses = ["Applied", "Interviewing", "Offer", "Accepted", "Rejected", "Withdrawn"]
        if value and value not in allowed_statuses:
            raise serializers.ValidationError("Invalid decision status.")
        return value  # Keep capitalization intact

    class Meta:
        model = Job
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):  # Ensure this class is properly defined
    class Meta:
        model = JobApplication  # Reference JobApplication correctly
        fields = '__all__'
        read_only_fields = ['id']