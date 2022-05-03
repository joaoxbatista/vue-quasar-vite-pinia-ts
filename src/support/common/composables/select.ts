import { ref, Ref, computed, UnwrapRef } from 'vue'
import { QSelect } from 'quasar'
import { KeysWithValsOfType } from '../types/helpers'

export interface SelectOption {
  label: string
  value: string | number
}

export interface OptionPromiseResponse {
  _id: string | number
  nome: string
}

interface Option {
  value: string | number
  label: string
}

type OptionPromise<T, H extends unknown[]> = (...args: H) => Promise<Array<T>>

interface GlobalSelectOptions<G extends string | number = string> {
  filter?: (option: Option) => boolean
  model?: Ref<G | undefined>
  map?: never
  label?: never
  value?: never
}

interface OptionsWithMap<T> {
  map: (option: T) => Option
}

interface OptionWithLabelValue<T> {
  label: keyof T & KeysWithValsOfType<T, string>
  value: keyof T & KeysWithValsOfType<T, string | number>
}

type SelectOptions<T, G extends string | number> =
  | (Omit<GlobalSelectOptions<G>, 'map'> & OptionsWithMap<T>)
  | (Omit<GlobalSelectOptions<G>, 'label' | 'value'> & OptionWithLabelValue<T>)

export const useSelect = <T, G extends string | number, H extends unknown[]>(
  optionsSource: Array<T> | OptionPromise<T, H>,
  selectParams: SelectOptions<T, G>
) => {
  const raw = ref<Array<T>>([])
  const options = ref<Array<Option>>([]) as Ref<Array<Option>>
  const startOptions = ref<Array<Option>>([]) as Ref<Array<Option>>

  const refValue = computed<G | undefined>({
    get: () => {
      return selectParams.model?.value
    },
    set: (value) => {
      if (value && selectParams.model) {
        selectParams.model.value = value
      }
    },
  })

  const loading = ref(false)
  const filterFn = (
    val: string,
    update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void
  ) => {
    if (val === '') {
      update(() => {
        options.value = startOptions.value
      })
      return
    }
    const baseFilter = (option: SelectOption) =>
      option.label.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
    update(() => {
      const filter = selectParams?.filter || baseFilter
      options.value = startOptions.value.filter(filter)
    })
  }

  const processOptions = (options: Array<T>): Option[] => {
    if (selectParams.map) {
      return options.map((option) => selectParams.map(option))
    } else if (selectParams.label && selectParams.value) {
      return options.map((option) => {
        const value = option[selectParams.value] as unknown as string
        const label = option[selectParams.label] as unknown as string
        return {
          value,
          label,
        }
      })
    } else {
      throw new Error(
        'Invalid options, please provide either map or label and value'
      )
    }
  }

  const getDisplayValue = (value: string | number | undefined) => {
    if (!value) {
      return ''
    }
    const option = options.value.find(
      (opt) => opt.value.toString() === value.toString()
    )
    if (option) {
      return option.label
    }
    return ''
  }

  const fetchOptions = async (...args: H) => {
    try {
      if (Array.isArray(optionsSource)) {
        throw new Error('optionsSource is not function')
      }
      loading.value = true
      const res = await optionsSource(...args)
      options.value = processOptions(res)
      raw.value = res as UnwrapRef<typeof raw>
      startOptions.value = options.value
    } finally {
      loading.value = false
    }
  }

  if (Array.isArray(optionsSource)) {
    options.value = processOptions(optionsSource)
  }

  return {
    options,
    loading,
    refValue,
    filterFn,
    fetchOptions,
    getDisplayValue,
  }
}
