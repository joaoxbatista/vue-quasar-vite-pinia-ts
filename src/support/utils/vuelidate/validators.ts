export const isValidURL = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[\s.-]*/gim, '')
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) {
    return false
  }
  let soma = 0
  let resto
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if (resto == 10 || resto == 11) resto = 0
  if (resto != parseInt(cpf.substring(9, 10))) return false
  soma = 0
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if (resto == 10 || resto == 11) resto = 0
  if (resto != parseInt(cpf.substring(10, 11))) return false
  return true
}

export function isValidCNPJ(
  value: string | number | Array<number | string>
): boolean {
  if (!value) return false

  // Aceita receber o valor como string, número ou array com todos os dígitos

  // Filtro inicial para entradas do tipo string
  if (typeof value === 'string' || value instanceof String) {
    // Limita ao máximo de 18 caracteres, para CNPJ formatado
    if (value.length > 18) return false
    // convertendo para string
    value = value.toString()

    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(value)
    // Teste Regex para verificar se é uma string formatada válida
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

    // Se o formato é válido, usa um truque para seguir o fluxo da validação
    if (digitsOnly || validFormat) true
    // Se não, retorna inválido
    else return false
  }

  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g)
  const numbers = Array.isArray(match) ? match.map(Number) : []

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  // Cálculo validador
  const calc = (x: number) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12)

  // Valida 1o. dígito verificador
  const digit0 = calc(12)
  if (digit0 !== digits[0]) return false

  // Valida 2o. dígito verificador
  const digit1 = calc(13)
  return digit1 === digits[1]
}

export function isValidPhoneNumber(phone: string): boolean {
  const regex = new RegExp(
    '^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'
  )
  return regex.test(phone)
}

export function isValidCep(cep: string): boolean {
  const objER = /^[0-9]{2}\.?[0-9]{3}-?[0-9]{3}$/

  const strCEP = cep.replace(/^\s+|\s+$/g, '')
  if (strCEP.length > 0) {
    if (objER.test(strCEP)) return true
    else return false
  } else return false
}
