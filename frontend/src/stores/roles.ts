import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Role } from '@/types'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref<Role[]>([])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/users/roles')

      if (!response.ok) {
        throw new Error('Ошибка запроса ролей пользователей')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка получения ролей пользователей', error)
    }
  }

  return { roles, fetchRoles }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}
