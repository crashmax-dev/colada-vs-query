import { defineQuery, useQuery } from '@pinia/colada'
import { ref } from 'vue'
import { useQueryClient } from './use-query-client'
import type { User } from '../types'

export const USERS_QUERY_KEY = 'pinia/users'

export const useUsersStore = defineQuery(() => {
  const queryClient = useQueryClient()

  const userId = ref(1)

  const query = useQuery({
    key: () => [USERS_QUERY_KEY, userId.value],
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

  function invalidate() {
    queryClient.invalidateQueries({
      activeKeys: [USERS_QUERY_KEY],
    })
  }

  function nextPage() {
    userId.value++
  }

  function prevPage() {
    userId.value--
  }

  return {
    ...query,
    userId,
    nextPage,
    prevPage,
    invalidate,
  }
})
