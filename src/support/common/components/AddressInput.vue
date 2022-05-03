<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  street: {
    type: String,
    default: null,
  },
  district: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  number: {
    type: String,
    default: null,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:street',
  'update:district',
  'update:city',
  'update:number',
])

const splitAddress = (value: string) => {
  if (!value) return { street: '', district: '', city: '', number: '' }
  const [street, district, city, number] = value.split(',')
  return { street, district, city, number }
}

const localValue = computed<string>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    const splitedAdress = splitAddress(value)
    emit('update:street', splitedAdress.street)
    emit('update:district', splitedAdress.district)
    emit('update:city', splitedAdress.city)
    emit('update:number', splitedAdress.number)
  },
})
</script>

<template>
  <BaseInput
    v-bind="$attrs"
    v-model="localValue"
    label="Endereço"
    name="endereco"
    hint="Ex: Rua, Bairro, Cidade, Número"
  />
</template>
