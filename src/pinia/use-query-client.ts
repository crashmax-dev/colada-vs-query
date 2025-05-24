import { useQueryCache } from '@pinia/colada'

interface InvalidateQueriesParams {
  activeKeys?: string[]
  inactiveKeys?: string[]
}

export function useQueryClient() {
  const queryCache = useQueryCache()

  function invalidateQueries(params: InvalidateQueriesParams) {
    const invalidateKeys = [params.activeKeys, params.inactiveKeys]

    invalidateKeys.forEach((keys, index) => {
      if (!keys) return

      for (const key of keys) {
        const entries = queryCache.getEntries({
          key: [key],
          active: !index,
        })

        if (entries.length === 0) continue

        const latest = entries.reduce((latest, current) => {
          return current.when > latest.when ? current : latest
        })

        queryCache.invalidateQueries(latest)
      }
    })
  }

  return {
    invalidateQueries,
  }
}
