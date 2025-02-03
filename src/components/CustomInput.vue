<template>
  <div class="form-floating mb-3">
    <input
      v-model="inputValue"
      :type="tipo"
      :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
      :maxlength="limite"
      :name="name"
      :placeholder="label"
      @blur="$emit('blur')"
    />
    <label :for="name">
      {{ label }}
      <span v-if="esRequerido" class="text-danger">*</span>
    </label>
    <!-- Mostrar mensaje de error si existe -->
    <div v-if="errorMessage" class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import type { FormUsuario } from '@/interfaces/FormUsuarioInterface'
import { useFormStore } from '@/store/FormStore'
import { useField } from 'vee-validate'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CustomInput',
  props: {
    label: { type: String, required: true },
    name: { type: String, required: true },
    tipo: { type: String, required: true },
    esRequerido: { type: Boolean, default: false },
    limite: { type: Number, default: Infinity },
  },
  emits: ['blur'],
  data() {
    return {
      inputValue: ref(''),
      errorMessage: ref(''),
    }
  },
  computed: {
    // Determinar las reglas de validación dinámicamente
    selectedValidationRules() {
      const validationRuleMap: Record<string, string> = {
        text: 'text',
        email: 'email',
        numerico: 'numerico',
        alfanumerico: 'alfanumerico',
        rfc: 'rfc',
        curp: 'curp',
      }
      return `${this.esRequerido ? 'required|' : ''}${validationRuleMap[this.tipo] || 'text'}`
    },
  },
  watch: {
    // Observar cambios en el valor del campo
    inputValue(newValue) {
      const store = useFormStore()

      store.updateFieldValue(this.name as keyof FormUsuario, newValue)
    },
    // Observar cambios en el mensaje de error
    errorMessage(newValue) {
      const store = useFormStore()
      store.updateFieldError(this.name as keyof FormUsuario, newValue)
    },
  },
  mounted() {
    // Usar vee-validate para la validación del campo
    const { value, errorMessage } = useField(this.name, this.selectedValidationRules)

    // Asignar el valor a la data
    this.inputValue = value.value as string
    this.errorMessage = errorMessage.value as string

    // Actualizar los datos reactivamente
    watch(value, (newValue) => {
      this.inputValue = newValue as string
    })

    watch(errorMessage, (newValue) => {
      this.errorMessage = newValue as string
    })
  },
})
</script>
