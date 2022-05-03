import BaseInput from '../support/common/components/BaseInput.vue'
import BaseSelect from '../support/common/components/BaseSelect.vue'
import BaseField from '../support/common/components/BaseField.vue'
import BaseDateInput from '../support/common/components/BaseDateInput.vue'
import BaseBreadcrumb from '../support/common/components/BaseBreadcrumb.vue'
import BaseItemToggle from '../support/common/components/BaseItemToggle.vue'
import CompanySelector from '../support/common/components/CompanySelector.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseInput: typeof BaseInput
    BaseSelect: typeof BaseSelect
    BaseField: typeof BaseField
    BaseDateInput: typeof BaseDateInput
    BaseBreadcrumb: typeof BaseBreadcrumb
    BaseItemToggle: typeof BaseItemToggle
    CompanySelector: typeof CompanySelector
  }
}
