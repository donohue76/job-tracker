import { defineStore } from 'pinia'
import { api } from '@/api'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchSettings() {
      this.loading = true
      try {
        const response = await api.get('/api/settings/')
        this.settings = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateSettings(settings) {
      this.loading = true
      try {
        const response = await api.put('/api/settings/', settings)
        this.settings = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})