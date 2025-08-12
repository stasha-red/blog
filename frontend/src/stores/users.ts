import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { ApiResponse, User } from '@/types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')

      if (!response.ok) {
        throw new Error('Ошибка запроса данных пользователей')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка получения пользователей', error)
    }
  }

  const deleteUser = async (userId:string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления пользователя')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка удаления пользователя', error)
    }
  }

  const changeUserRole = async (userId:string, userRole:number): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roleId: userRole }),
      })

      if (!response.ok) {
        throw new Error('Ошибка обновления роли пользователя')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка обновления роли пользователя', error)
      throw error
    }
  }

  return { users, fetchUsers, changeUserRole, deleteUser }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
