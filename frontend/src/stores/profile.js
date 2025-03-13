import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProfile, updateProfile, uploadProfileImage } from '@/api'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref({
    avatar_url: '',
    date_of_birth: '',
    address: '',
    desired_role: '',
    preferred_location: '',
    salary_range: '',
    industry: ''
  })

  const loading = ref(false)
  const error = ref(null)

  async function fetchProfile() {
    loading.value = true
    error.value = null
    try {
      const data = await getProfile()
      profile.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function updateProfileData(profileData) {
    loading.value = true
    error.value = null
    try {
      const data = await updateProfile(profileData)
      profile.value = data
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  async function uploadAvatar(file) {
    loading.value = true
    error.value = null
    try {
      const data = await uploadProfileImage(file)
      profile.value.avatar_url = data.avatar_url
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfileData,
    uploadAvatar
  }
})