import { defineQuery, useQuery, useQueryCache } from '@pinia/colada'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQueryClient } from './use-query-client'
import { USERS_QUERY_KEY_2 } from './use-users-2'
import type { User } from '../types'

// 0.14.2
// заменить defineStore на defineQuery
// искать актуальный запрос active запрос по when

// 0.13.8
// не работает invalidateQueries на inactive запросы

const USERS_QUERY_KEY = 'users'

export const useUsersQuery = defineQuery(() => {
  const { invalidateQueries } = useQueryClient()

  const userId = ref(1)

  const query = useQuery({
    // staleTime: 0,
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
    invalidateQueries({
      activeKeys: [USERS_QUERY_KEY],
      inactiveKeys: [USERS_QUERY_KEY_2],
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

export const useUsersStore = defineStore('pinia-users', () => {
  const queryCache = useQueryCache()

  const userId = ref(1)

  const query = useQuery({
    // staleTime: 0,
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
    queryCache.invalidateQueries({
      key: [USERS_QUERY_KEY],
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
