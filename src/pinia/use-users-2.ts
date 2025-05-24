import { defineQuery, useQuery } from '@pinia/colada'
import { ref } from 'vue'
import type { User } from '../types'

export const USERS_QUERY_KEY_2 = 'freaks'

export const useUsersStore2 = defineQuery(() => {
  const userId = ref(2)

  const query = useQuery({
    key: () => [USERS_QUERY_KEY_2, userId.value],
    initialData: () => ({ id: -1, name: 'initialData' }),
    placeholderData: () => ({ id: -1, name: 'placeholderData' }),
    query: async () => {
      const req = await fetch(`/api/users/${userId.value}`, {
        headers: { 'Content-Type': 'applications/json' },
      })
      const res = await req.json() as User
      return res
    },
  })

  return {
    ...query,
    userId,
  }
})
