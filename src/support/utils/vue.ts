import { Ref, ref, watch, computed, getCurrentInstance } from 'vue'
import storage, { StorageData } from './storage'

export const createStorageRef = (
  ref: Ref<StorageData | undefined>,
  key: string,
  convertType?: 'string' | 'number'
) => {
  const value = storage.get(key)
  if (value) {
    if (convertType === 'string') {
      ref.value = value.toString()
    } else if (convertType === 'number') {
      ref.value = Number(value)
    } else {
      ref.value = value
    }
  }

  watch(
    () => ref.value,
    (newValue) => {
      if (!newValue) {
        newValue = null
      }
      storage.set(key, newValue)
    }
  )
}

export const processedRef = <T>(
  value: Ref<T> | T,
  process: (value: T) => T
) => {
  const refVariable = ref(value) as Ref<T>
  const variable = computed<T>({
    get: () => refVariable.value,
    set: (newValue) => {
      refVariable.value = process(newValue)
    },
  })

  return variable
}

export const twoWayBinding = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  props: T,
  variableName: K
) => {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('Cannot get current instance')
  }
  const refVariable = ref<T[K]>()

  watch(
    () => props[variableName as string],
    (newValue) => {
      refVariable.value = newValue as T[K]
    },
    {
      immediate: true,
    }
  )

  watch(
    () => refVariable.value,
    (newValue) => {
      instance.emit(`update:${variableName}`, newValue)
    }
  )

  return refVariable
}
