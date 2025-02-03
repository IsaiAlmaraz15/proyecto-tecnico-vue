<template>
  <div class="form-floating mb-3">
    <input
      v-model="inputValue"
      :type="tipo"
      :class="`form-control ${errorMessage ? 'is-invalid' : ''}`"
      :maxlength="limite"
      :name="name"
      :placeholder="label"
      @blur="handleBlur"
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
import { useField } from 'vee-validate'
import { defineComponent } from 'vue'

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
    // Mapa de reglas base para cada tipo de input
    const validationRuleMap: Record<string, string> = {
      text: 'text',
      email: 'email',
      numerico: 'numerico',
      alfanumerico: 'alfanumerico',
      rfc: 'rfc',
      curp: 'curp',
    }

    // Construimos las reglas dinámicamente:
    // Si el campo es requerido se le antepone la regla "required" separada por |.
    const rules = `${props.esRequerido ? 'required|' : ''}${validationRuleMap[props.tipo] || 'text'}`

    // Usamos useField para manejar el estado del campo y su validación.
    // Se retorna un objeto reactivo con "value", "errorMessage" y "handleBlur".
    const { value: inputValue, errorMessage, handleBlur } = useField(props.name, rules)

    return {
      inputValue, // Valor del campo
      errorMessage, // Mensaje de error reactivo
      handleBlur, // Función que se ejecuta al perder el foco
    }
  },
})
</script>
