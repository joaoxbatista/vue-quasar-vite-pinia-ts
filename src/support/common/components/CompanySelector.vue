<template>
  <q-select
    v-model="selectedCompanyId"
    class="company-select"
    data-cy="company-select"
    emit-value
    map-options
    :options="options"
    :loading="loading"
    standout
    use-input
    dense
    input-debounce="0"
    :display-value="getDisplayValue(selectedCompanyId)"
    @update:model-value="(event) => emit('update:model-value', event)"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCompanyStore } from '@/domains/dashboard/company/store'
import { useSelect } from '../composables/select'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['update:model-value'])
const companyStore = useCompanyStore()
const { companies, selectedCompanyId } = storeToRefs(companyStore)
const { options, loading, fetchOptions, getDisplayValue } = useSelect(
  async () => {
    if (companies.value.length) {
      return Promise.resolve(companies.value)
    } else {
      return companyStore.fetchCompanies()
    }
  },
  {
    map: (company) => ({
      label: company.nome,
      value: company._id.toString(),
    }),
  }
)

onMounted(async () => {
  await fetchOptions()
})
</script>

<style lang="sass" scoped>
:deep(.q-field__control)
  background-color: $dark-page !important

.company-select
  width: 250px
</style>
