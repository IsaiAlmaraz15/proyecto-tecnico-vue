import { defineRule } from 'vee-validate'

// Validación obligatoria
defineRule('required', (value: string) => {
  if (!value) return 'Este campo es obligatorio'
  return true
})

// Regla para texto
defineRule('text', (value: string) => {
  if (value && !/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]*$/.test(value)) {
    return 'Solo texto permitido'
  }
  return true
})

// Regla para email
defineRule('email', (value: string) => {
  if (value && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
    return 'Correo electrónico inválido'
  }
  return true
})

// Regla para números
defineRule('numerico', (value: string) => {
  if (value && !/^[0-9]*$/.test(value)) {
    return 'Solo números permitidos'
  }
  return true
})

// Regla para alfanumérico
defineRule('alfanumerico', (value: string) => {
  if (value && !/^[A-Za-z0-9]*$/.test(value)) {
    return 'Solo caracteres alfanuméricos permitidos'
  }
  return true
})

// Regla para RFC
defineRule('rfc', (value: string) => {
  if (
    value &&
    !/^[A-Z&Ñ]{4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/.test(value)
  ) {
    return 'RFC inválido'
  }
  return true
})

// Regla para CURP
defineRule('curp', (value: string) => {
  if (
    value &&
    !/^[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MHX]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]$/.test(
      value,
    )
  ) {
    return 'CURP inválido'
  }
  return true
})
