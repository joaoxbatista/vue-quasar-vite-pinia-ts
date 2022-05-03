import { isRef, unref } from 'vue'
import { ErrorObject, Validation, ValidationArgs } from '@vuelidate/core'
export const vErrorsToString = (errors: ErrorObject[]) => {
  if (!errors.length) return ''
  const errorMessages = errors.map((error) => error.$message)
  if (isRef(errorMessages[0])) {
    return errorMessages[0].value
  } else {
    return errorMessages[0]
  }
}

export const vErrorsByKey = (
  v$: Validation<ValidationArgs, unknown>,
  key: string
) => {
  const error = unref(v$?.[key])
  if (!error?.$errors.length) {
    return {
      variant: '',
      message: '',
      error: false,
    }
  }
  return {
    variant: 'danger',
    message: vErrorsToString(error.$errors),
    error: true,
  }
}
