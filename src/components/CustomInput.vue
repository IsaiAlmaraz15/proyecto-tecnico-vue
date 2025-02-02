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
import { computed, defineComponent, watch } from 'vue'

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
  setup(props) {
    const store = useFormStore()

    // Determinar las reglas de validación dinámicamente
    const selectedValidationRules = computed(() => {
      const validationRuleMap: Record<string, string> = {
        text: 'text',
        email: 'email',
        numerico: 'numerico',
        alfanumerico: 'alfanumerico',
        rfc: 'rfc',
        curp: 'curp',
      }
      return `${props.esRequerido ? 'required|' : ''}${validationRuleMap[props.tipo] || 'text'}`
    })

    // Usar vee-validate para la validación del campo
    const { value: inputValue, errorMessage } = useField(props.name, selectedValidationRules)

    // Observar cambios en el valor del campo
    watch(inputValue, (newValue) => {
      store.updateFieldValue(props.name as keyof FormUsuario, newValue as string)
    })

    // Observar cambios en el mensaje de error
    watch(errorMessage, (newValue) => {
      store.updateFieldError(props.name as keyof FormUsuario, newValue as string)
    })

    return {
      inputValue,
      errorMessage,
    }
  },
})
</script>

<
