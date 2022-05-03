<script lang="ts" setup>
import { twoWayBinding } from '@/support/utils/vue'
import moment from 'moment'
import { computed } from 'vue'
import type { PropType } from 'vue'

const ptLocale = {
  months:
    'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split(
      '_'
    ),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  days: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split(
    '_'
  ),
  daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
  pluralDay: 'dias',
  format24h: true,
  firstDayOfWeek: 1,
}

const props = defineProps({
  modelValue: {
    type: [String, Object] as PropType<string | { to: string; from: string }>,
    required: true,
  },
  range: {
    type: Boolean,
    default: false,
  },
  inputFormat: {
    type: String,
    required: false,
    default: 'YYYY-MM-DD',
  },
  displayFormat: {
    type: String,
    required: false,
    default: 'DD/MM/YYYY',
  },
})

const emit = defineEmits(['update:modelValue'])

const displayMask = computed(() => {
  const mask = props.displayFormat.replace(/[YMD]/g, '#')
  if (props.range) {
    return `${mask} - ${mask}`
  }
  return mask
})
const displayValue = computed<string>({
  get() {
    const value = props.modelValue
    if (!value) return ''
    if (props.range && typeof value == 'object') {
      const { from, to } = value

      return `${moment(from, props.inputFormat).format(
        props.displayFormat
      )} - ${moment(to, props.inputFormat).format(props.displayFormat)}`
    } else {
      return moment(value as string, props.inputFormat).format(
        props.displayFormat
      )
    }
  },
  set(value) {
    if (value) {
      if (props.range) {
        const [from, to] = value.split(' - ')
        const fromDate = moment(from, props.displayFormat)
        const toDate = moment(to, props.displayFormat)
        if (fromDate.isValid() && toDate.isValid()) {
          emit('update:modelValue', {
            from: fromDate.format(props.inputFormat),
            to: toDate.format(props.inputFormat),
          })
        } else {
          emit('update:modelValue', '')
        }
      } else {
        const date = moment(value, props.displayFormat)
        if (date.isValid()) {
          emit('update:modelValue', date.format(props.inputFormat))
        } else {
          emit('update:modelValue', '')
        }
      }
    }
  },
})

const localValue = twoWayBinding(props, 'modelValue')
</script>

<template>
  <BaseInput v-bind="$attrs" v-model="displayValue" :mask="displayMask">
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="localValue"
            :locale="ptLocale"
            :range="range"
            :mask="inputFormat"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </BaseInput>
</template>
