import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { defineQuery } from './define-query'
import type { User } from '../types'

export const USERS_QUERY_KEY = 'query/users'

export const useUsersStore = defineQuery(USERS_QUERY_KEY, () => {
  const queryClient = useQueryClient()
  const userId = ref(2)

  const query = useQuery({
    queryKey: [USERS_QUERY_KEY, userId],
    initialDataUpdatedAt: 0,
    initialData: () => ({ id: -1, name: 'Unknown' }),
    queryFn: async ({ signal }) => {
      const req = await fetch(`/api/users/${userId.value}`, {
        headers: { 'Content-Type': 'applications/json' },
        signal,
      })
      const res = await req.json() as User
      return res
    },
  })

  function invalidate() {
    queryClient.invalidateQueries({
      queryKey: [USERS_QUERY_KEY],
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
