import { defineStore } from 'pinia'
import type { UseQueryDefinedReturnType } from '@tanstack/vue-query'
import type {
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  Store,
} from 'pinia'

export function defineQuery<
  Id extends string,
  T extends UseQueryDefinedReturnType<unknown, unknown>,
>(
  id: Id,
  setupFn: () => T,
): () => Store<
    Id,
    _ExtractStateFromSetupStore<T>,
    _ExtractGettersFromSetupStore<T>,
    _ExtractActionsFromSetupStore<T>
  > {
  const storeFn = defineStore(id, setupFn)

  return () => {
    const store = storeFn()

    if (!('refetch' in store)) {
      console.warn(`\`refetch\` is not available on this defineQuery('${id}') store.`)
      return store
    } else if (store.isStale && !store.isFetching) {
      store.refetch()
    }

    return store
  }
}
