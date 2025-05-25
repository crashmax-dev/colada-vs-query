import { useQueryClient } from '@tanstack/vue-query'
import { defineStore } from 'pinia'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import type {
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  Store,
} from 'pinia'

export function defineQuery<
  Id extends string,
  T extends UseQueryReturnType<unknown, unknown>,
>(
  id: Id,
  setupFn: () => T,
): () => Store<
    Id,
    _ExtractStateFromSetupStore<T>,
    _ExtractGettersFromSetupStore<T>,
    _ExtractActionsFromSetupStore<T>
  > {
  const storeQueryFn = defineStore(id, setupFn)

  return () => {
    const queryClient = useQueryClient()
    const query = storeQueryFn()
    const queryOption = {
      ...queryClient.getDefaultOptions().queries,
      ...query.options,
    }

    if ('refetch' in query
      && !query.isFetching
      && ((queryOption.refetchOnMount && query.isStale)
        || queryOption.refetchOnMount === 'always')
    ) {
      query.refetch()
    }

    return query
  }
}
