<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@/utils/dateFormaters';

import { useUsersStore } from '@/stores/users';
import { useRolesStore } from '@/stores/roles';

import LayoutContainer from '@/components/layout/LayoutContainer.vue';
import MessageBoxBase from '@/components/base/MessageBoxBase.vue';
import type { User } from '@/types';

const users = ref<User[]>([]);
const userMessage = ref<Record<string, string>>({})
const userMessageType = ref<Record<string, string>>({})

const usersStore = useUsersStore();
const rolesStore = useRolesStore();

const errorMessage = ref('');

onBeforeMount(async () => {
  Promise.all([
    rolesStore.fetchRoles(),
    usersStore.fetchUsers()
  ]).then(([rolesResponse, usersResponse]) => {
    if (rolesResponse.error || usersResponse.error) {
      console.error(rolesResponse.error || usersResponse.error);
      errorMessage.value = 'Ошибка загрузки данных'
    } else {
      rolesStore.roles = rolesResponse.data
      usersStore.users = JSON.parse(JSON.stringify(usersResponse.data));
      users.value = JSON.parse(JSON.stringify(usersResponse.data));
    }
  })
})

const handleUserDelete = async (userId: string) => {
  const response = await usersStore.deleteUser(userId);

  if (response.error) {
    console.error(response.error)
    errorMessage.value = response.error
  } else {
    usersStore.users = usersStore.users.filter(user => user.id !== userId)
    users.value = users.value.filter(user => user.id !== userId)
  }
}

const handleUserRole = async (user: User) => {
  const storedUser = usersStore.users.find(u => u.id === user.id)

  if (!storedUser || user.roleId === storedUser.roleId) {
    return
  }

  const response = await usersStore.changeUserRole(user.id, user.roleId);

  if (response.error) {
    console.error(response.error)
    errorMessage.value = response.error
    user.roleId = storedUser.roleId
  } else {
    userMessage.value[user.id] = 'Обновлено';
    userMessageType.value[user.id] = 'success'
    storedUser.roleId = user.roleId

    setTimeout(() => {
      userMessage.value[user.id] = '';
      userMessageType.value[user.id] = ''
    }, 3000)
  }
}
</script>

<template>
  <LayoutContainer>
    <h1 class="text-3xl font-bold text-center my-10">Пользователи</h1>

    <div class="bg-white rounded-md shadow-md p-8 mb-10">
      <MessageBoxBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageBoxBase>

      <table v-if="users.length > 0" class="min-w-full table-fixed">
        <thead>
          <tr>
            <th class="p-2">Логин</th>
            <th class="p-2">Дата регистрации</th>
            <th class="p-2">Роль</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="p-2 text-center">{{ user.login }}</td>
            <td class="p-2 text-center">{{ formatDate(user.registeredAt, {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })
              }}
            </td>
            <td class="p-2">
              <form class="flex gap-2 relative" @submit.prevent="handleUserRole(user)">
                <select :name="`user-${user.id}-role`" v-model="user.roleId"
                  class="w-full border border-gray-300 rounded-md p-2">
                  <option v-for="role in rolesStore.roles" :key="`${user.id}-${role.id}`" :value="role.id">{{
                    role.name }}</option>
                </select>
                <button type="submit"
                  class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white rounded-md py-1 px-3">
                  <FontAwesomeIcon :icon="faFloppyDisk" />
                </button>
                <MessageBoxBase class="absolute left-full ml-2" v-if="userMessage[user.id]"
                  :type="userMessageType[user.id]">
                  {{
                    userMessage[user.id] }}
                </MessageBoxBase>
              </form>
            </td>
            <td class="p-2 text-right">
              <button class="text-red-500 hover:text-red-700 cursor-pointer" @click="handleUserDelete(user.id)">
                <FontAwesomeIcon :icon="faTrash" />
                &nbsp;
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </LayoutContainer>
</template>
