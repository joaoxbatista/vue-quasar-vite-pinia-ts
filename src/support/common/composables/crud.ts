import { ref, UnwrapRef } from 'vue'

interface CrudParams<T, F, G extends Array<unknown>, H extends Array<unknown>> {
  fetchItems: (...args: G) => Promise<T[]>
  fetchItem: (...args: H) => Promise<T>
  createItem: (form: F) => Promise<T>
  updateItem?: (form: F) => Promise<T>
  deleteItem?: (id: string | number) => Promise<T>
  id: keyof F & keyof T
  cache?: boolean
}

export const useCrud = <
  T,
  F,
  G extends Array<unknown>,
  H extends Array<unknown>
>(
  crudParams: CrudParams<T, F, G, H>
) => {
  const items = ref<T[]>([])
  const globalItems = ref<T[]>([])

  const fetchItems = async (
    filter?: (arg0: T) => boolean,
    ...args: G
  ): Promise<T[]> => {
    let resp
    if (globalItems.value.length > 0 && crudParams.cache) {
      resp = globalItems.value as T[]
    } else {
      resp = await crudParams.fetchItems(...args)
    }
    globalItems.value = resp as UnwrapRef<typeof items>
    const filteredItem = resp.filter((item) => {
      if (filter) {
        const result = filter(item)
        return result
      }

      return true
    })
    items.value = filteredItem as UnwrapRef<typeof items>
    return filteredItem
  }

  const fetchItem = async (id: string | number, ...args: H): Promise<T> => {
    if (items.value) {
      const item = items.value.find((item) => item[crudParams.id] === id)
      if (item) {
        return item as T
      }
    }

    const resp = await crudParams.fetchItem(...args)
    return resp
  }

  const saveItem = async (form: F): Promise<T> => {
    let item: T
    if (form[crudParams.id]) {
      if (!crudParams.updateItem) {
        throw new Error('updateItem not defined')
      }
      item = await crudParams.updateItem(form)
    } else {
      item = await crudParams.createItem(form)
    }
    return item
  }

  const deleteItem = async (id: string | number): Promise<T> => {
    if (crudParams.deleteItem) {
      const resp = await crudParams.deleteItem(id.toString())

      return resp
    } else {
      throw new Error('deleteItem not implemented')
    }
  }

  return {
    items,
    fetchItems,
    fetchItem,
    saveItem,
    deleteItem,
  }
}
