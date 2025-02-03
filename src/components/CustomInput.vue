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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomInput',
  data() {
    return {
      formStore: useFormStore(),
    }
  },
  props: {
    label: { type: String, required: true },
    name: { type: String, required: true },
    tipo: { type: String, required: true },
    esRequerido: { type: Boolean, default: false },
    limite: { type: Number, default: Infinity },
  },
  emits: ['blur'],
  setup(props) {
    // Mapa de reglas base para cada tipo de input
    const validationRuleMap: Record<string, string> = {
      text: 'text',
      email: 'email',
      numerico: 'numerico',
      alfanumerico: 'alfanumerico',
      rfc: 'rfc',
      curp: 'curp',
    }

    // Si el campo es requerido se le antepone la regla "required" separada por |.
    const rules = `${props.esRequerido ? 'required|' : ''}${validationRuleMap[props.tipo] || 'text'}`

    // useField para manejar el estado del campo y su validación.
    const { value: inputValue, errorMessage } = useField(props.name, rules)

    return {
      inputValue,
      errorMessage,
    }
  },
  watch: {
    // Emitimos el evento blur cuando el campo pierde el foco
    inputValue(newValue) {
      this.formStore.updateFieldValue(this.name as keyof FormUsuario, newValue)
    },
  },
})
</script>
