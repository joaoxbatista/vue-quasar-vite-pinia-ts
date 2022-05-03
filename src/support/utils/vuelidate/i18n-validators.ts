import { ValidationRuleWithParams } from '@vuelidate/core'
// wrap each validator.
import { MessageProps } from '@vuelidate/validators'
import {
  required as requiredValidator,
  helpers,
  between,
} from '@vuelidate/validators'
import moment from 'moment'
import { CustomDate } from '../date'
import {
  isValidCPF,
  isValidCNPJ,
  isValidPhoneNumber,
  isValidURL,
  isValidCep,
} from './validators'

export const required = helpers.withMessage(
  'Este campo é obrigatório.',
  (value: unknown) => {
    if (typeof value == 'number' && isNaN(value)) {
      return false
    }
    return requiredValidator.$validator(value, '', '')
  }
)
export const url = helpers.withMessage(
  'Este campo deve ser uma URL válida.',
  isValidURL
)

export const date = (format: string) => {
  return helpers.withMessage(
    'Este campo deve ser uma data válida.',
    (value: CustomDate) => {
      if (!value) return true
      return moment(value, format).isValid()
    }
  )
}

// export const dateGreaterThan = (field: string) => {
//   return helpers.withMessage(
//     'Este campo deve ser uma data maior que a data de ' + field,
//     (value: string, siblings) => {
//       const date = new Date(value)
//       const fieldDate = new Date(siblings[field])
//       return (
//         isNaN(date.getTime()) || isNaN(fieldDate.getTime()) || date < fieldDate
//       )
//     }
//   )
// }

export const cpf = helpers.withMessage('CPF inválido.', (value: string) => {
  if (!value) return false
  return isValidCPF(value)
})

export const cep = helpers.withMessage('CEP inválido.', (value: string) => {
  if (!value) return false
  return isValidCep(value)
})

export const cnpj = helpers.withMessage('CNPJ inválido.', (value: string) => {
  if (!value) return false
  return isValidCNPJ(value)
})

export const email = helpers.withMessage(
  'E-mail inválido.',
  (value: string) => {
    if (!value) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }
)

function isDict(v: unknown): boolean {
  // eslint-disable-line
  return (
    !!v &&
    typeof v === 'object' &&
    v !== null &&
    !(v instanceof Array) &&
    !(v instanceof Date)
  )
}

export const password = helpers.withMessage(
  ({ $response }: MessageProps) => {
    if (isDict($response)) {
      const response = JSON.parse(JSON.stringify($response))
      return response?.message || 'Senha invalida'
    }

    return 'Senha inválida.'
  },
  (value: string) => {
    if (!value) return false
    if (value.length < 8)
      return {
        $valid: false,
        message: 'A senha deve ter no mínimo 8 caracteres.',
      }
    if (!value.match(/[A-Z]/))
      return {
        $valid: false,
        message: 'A senha deve ter uma letra maiúscula.',
      }
    return true
  }
)

export const inBetween = (min: number, max: number) => {
  return helpers.withMessage(
    (): string => `Valor deve ser entre ${min} e ${max}`,
    between(min, max)
  )
}

export const phoneNumber = helpers.withMessage(
  'Número de telefone invalido',
  (value: string) => {
    if (!value) return false
    return isValidPhoneNumber(value)
  }
)

export const notValidateIfIsNull = (
  validation: ValidationRuleWithParams<object, unknown>
) => {
  return helpers.withMessage(validation.$message, (value: unknown) => {
    if (!value) return true
    return validation.$validator(value, 't', 't')
  })
}

export const multiple = (
  validators: ValidationRuleWithParams<object, unknown>[]
) => {
  return helpers.withMessage(
    ({ $response }: MessageProps): string => {
      if (isDict($response)) {
        const response = JSON.parse(JSON.stringify($response))
        return response?.message || 'Valor inválido'
      }
      return 'Valor inválido'
    },
    (value: unknown) => {
      const invalidValidator = validators.find((validator) => {
        return !validator.$validator(value, 't', 't')
      })
      return {
        $valid: !invalidValidator,
        message: invalidValidator?.$message,
      }
    }
  )
}

type Validator = ValidationRuleWithParams<object, unknown>
type Condition = boolean | (() => boolean)

export const createConditionalValidator = ({
  validator,
  condition,
}: {
  validator: Validator
  condition: Condition
}) => {
  return helpers.withMessage(validator.$message, (value: unknown) => {
    let result = condition
    if (typeof condition === 'function') {
      result = condition()
    }
    if (!result) return true
    return validator.$validator(value, 't', 't')
  })
}

export const validateIf = (condition: Condition) => {
  return (validator: Validator | Validator[]) => {
    if (Array.isArray(validator)) {
      return multiple(
        validator.map((v) =>
          createConditionalValidator({ validator: v, condition })
        )
      )
    } else {
      return createConditionalValidator({
        validator,
        condition,
      })
    }
  }
}
