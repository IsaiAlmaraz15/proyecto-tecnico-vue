import type { FormUsuario } from '@/interfaces/FormUsuarioInterface'
import type { InputProps } from '@/interfaces/InputPropsInterface'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', {
  state: () => ({
    formValues: {
      nombre: null,
      primerApellido: null,
      segundoApellido: null,
      curp: null,
      rfc: null,
      codigoPostal: null,
      calle: null,
      numeroExterior: null,
      numeroInterior: null,
      estado: null,
      delegacion: null,
      colonia: null,
    } as FormUsuario,
    formErrors: {
      nombre: null,
      primerApellido: null,
      segundoApellido: null,
      curp: null,
      rfc: null,
      codigoPostal: null,
      calle: null,
      numeroExterior: null,
      numeroInterior: null,
      estado: null,
      delegacion: null,
      colonia: null,
    } as FormUsuario,
    validateForm: false,
  }),

  actions: {
    updateFieldValue(name: keyof FormUsuario, value: string) {
      // Actualiza el valor del campo
      this.formValues[name] = value
    },
    updateFieldError(name: keyof FormUsuario, error: string | null) {
      // Actualiza el error del campo o lo limpia si es null
      this.formErrors[name] = error
    },
    // updateFieldError(name: keyof FormUsuario, error: string | null) {
    //   // Actualiza el error del campo o lo limpia si es null
    //   if (error) {
    //     this.formErrors[name] = error
    //   } else {
    //     delete this.formErrors[name]
    //   }
    // },

    validateForm(fieldsConfig: InputProps[]): boolean {
      let isValid = true

      fieldsConfig.forEach(({ label, name, esRequerido }) => {
        const value = (this.formValues[name as keyof FormUsuario] ?? '').toString().trim()

        if (esRequerido && !value) {
          this.updateFieldError(name as keyof FormUsuario, `${label} es requerido`)
          isValid = false
        } else {
          this.updateFieldError(name as keyof FormUsuario, null)
        }
      })

      return isValid
    },

    resetForm() {
      // Restablece valores y errores
      this.formValues = {
        nombre: null,
        primerApellido: null,
        segundoApellido: null,
        curp: null,
        rfc: null,
        codigoPostal: null,
        calle: null,
        numeroExterior: null,
        numeroInterior: null,
        estado: null,
        delegacion: null,
        colonia: null,
      }
      this.formErrors = {
        nombre: null,
        primerApellido: null,
        segundoApellido: null,
        curp: null,
        rfc: null,
        codigoPostal: null,
        calle: null,
        numeroExterior: null,
        numeroInterior: null,
        estado: null,
        delegacion: null,
        colonia: null,
      }
    },
  },
})
