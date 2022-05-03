export const removeEmptyFields = <T>(obj: T, keys: (keyof T)[]) => {
  for (const key of keys) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}
