import { useQueryCache } from "@pinia/colada"

interface InvalidateQueriesParams {
  activeKeys?: string[]
  inactiveKeys?: string[]
}

export function useQueryClient() {
  const queryCache = useQueryCache()

  function invalidateQueries(params: InvalidateQueriesParams) {
    for (const key of params.activeKeys ?? []) {
      const entries = queryCache.getEntries({
        key: [key],
        active: true,
      })

      if (entries.length === 0) continue

      const latest = entries.reduce((latest, current) => {
        return current.when > latest.when ? current : latest
      })

      queryCache.invalidateQueries(latest)
    }

    for (const key of params.inactiveKeys ?? []) {
      const entries = queryCache.getEntries({
        key: [key],
        active: false,
      })

      if (entries.length === 0) continue

      const latest = entries.reduce((latest, current) => {
        return current.when > latest.when ? current : latest
      })

      queryCache.invalidateQueries(latest)
    }
  }

  return {
    invalidateQueries
  }
}
