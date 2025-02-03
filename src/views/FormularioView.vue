<!-- <template>
  <form @submit.prevent="handleSubmit">
    <div class="container mt-5">
      <div class="row">
        <div
          v-for="({ label, name, tipo, esRequerido, limite }, i) in fieldsConfig"
          :key="i"
          class="col col-sm-12 col-md-6 col-lg-6"
        >
          <CustomInput
            v-model="formValues[name as keyof FormUsuario]"
            :label="label"
            :name="name"
            :tipo="tipo"
            :esRequerido="esRequerido"
            :limite="limite"
            :error="formErrors[name as keyof FormUsuario]"
            @blur="validateField(name as keyof FormUsuario)"
          />
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-6">
          <button :disabled="!isFormValid" type="submit" class="btn btn-success mb-3">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import type { FormUsuario } from '@/interfaces/FormUsuarioInterface'
import type { InputProps } from '@/interfaces/InputPropsInterface'
import { useFormStore } from '@/store/FormStore'
import SweetAlert from 'sweetalert2'
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: { CustomInput },
  setup() {
    const store = useFormStore()

    // Configuración de los campos del formulario
    const fieldsConfig = ref<InputProps[]>([
      { name: 'nombre', tipo: 'text', label: 'Nombre(s)', esRequerido: true },
      { name: 'primerApellido', tipo: 'text', label: 'Primer Apellido', esRequerido: true },
      { name: 'segundoApellido', tipo: 'text', label: 'Segundo Apellido', esRequerido: false },
      { name: 'curp', tipo: 'curp', label: 'CURP', esRequerido: true },
      { name: 'rfc', tipo: 'rfc', label: 'RFC', esRequerido: true },
      {
        name: 'codigoPostal',
        tipo: 'numerico',
        label: 'Código Postal',
        esRequerido: true,
        limite: 5,
      },
      { name: 'calle', tipo: 'text', label: 'Calle', esRequerido: true },
      {
        name: 'numeroExterior',
        tipo: 'numerico',
        label: 'Número Exterior',
        esRequerido: true,
        limite: 5,
      },
      {
        name: 'numeroInterior',
        tipo: 'alfanumerico',
        label: 'Número Interior',
        esRequerido: false,
        limite: 10,
      },
      { name: 'estado', tipo: 'text', label: 'Estado', esRequerido: true },
      { name: 'delegacion', tipo: 'text', label: 'Delegación/Municipio', esRequerido: true },
      { name: 'colonia', tipo: 'text', label: 'Colonia', esRequerido: true },
    ])

    // Computed para valores y errores del formulario
    const formValues = computed(() => store.formValues)
    const formErrors = computed(() => store.formErrors)

    // Validación del formulario
    const isFormValid = computed(() => store.validateForm(fieldsConfig.value))

    // Función para validar un campo específico
    const validateField = (fieldName: keyof FormUsuario) => {
      const fieldConfig = fieldsConfig.value.find((field) => field.name === fieldName)
      if (fieldConfig) {
        store.validateForm([fieldConfig])
      }
    }

    // Función para manejar el envío del formulario
    const handleSubmit = () => {
      if (isFormValid.value) {
        SweetAlert.fire({
          title: 'Éxito!',
          text: 'Todos los datos son correctos.',
          icon: 'success',
        })
      } else {
        SweetAlert.fire({
          title: 'Aviso',
          text: 'Hay errores en el formulario.',
          icon: 'error',
        })
      }
    }
    watch(isFormValid, (newValue) => {
      if (newValue) {
        SweetAlert.fire({
          title: 'Exito!',
          text: 'Todos los datos son correctos.',
          icon: 'success',
        })
      }
    })

    return {
      fieldsConfig,
      formValues,
      formErrors,
      isFormValid,
      handleSubmit,
      validateField,
    }
  },
})
</script> -->

<template>
  <form @submit.prevent="handleSubmit">
    <div class="container mt-5">
      <div class="row">
        <div
          v-for="({ label, name, tipo, esRequerido, limite }, i) in fieldsConfig"
          :key="i"
          class="col col-sm-12 col-md-6 col-lg-6"
        >
          <CustomInput
            v-model="formValues[name as keyof FormUsuario]"
            :label="label"
            :name="name"
            :tipo="tipo"
            :esRequerido="esRequerido"
            :limite="limite"
            :error="formErrors[name as keyof FormUsuario]"
            @blur="validateField(name as keyof FormUsuario)"
          />
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-6">
          <button :disabled="!isFormValid" type="submit" class="btn btn-success mb-3">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import type { FormUsuario } from '@/interfaces/FormUsuarioInterface'
import type { InputProps } from '@/interfaces/InputPropsInterface'
import { useFormStore } from '@/store/FormStore'
import SweetAlert from 'sweetalert2'

export default {
  components: { CustomInput },
  data() {
    return {
      store: useFormStore(),
      fieldsConfig: [
        { name: 'nombre', tipo: 'text', label: 'Nombre(s)', esRequerido: true },
        { name: 'primerApellido', tipo: 'text', label: 'Primer Apellido', esRequerido: true },
        { name: 'segundoApellido', tipo: 'text', label: 'Segundo Apellido', esRequerido: false },
        { name: 'curp', tipo: 'curp', label: 'CURP', esRequerido: true },
        { name: 'rfc', tipo: 'rfc', label: 'RFC', esRequerido: true },
        {
          name: 'codigoPostal',
          tipo: 'numerico',
          label: 'Código Postal',
          esRequerido: true,
          limite: 5,
        },
        { name: 'calle', tipo: 'text', label: 'Calle', esRequerido: true },
        {
          name: 'numeroExterior',
          tipo: 'numerico',
          label: 'Número Exterior',
          esRequerido: true,
          limite: 5,
        },
        {
          name: 'numeroInterior',
          tipo: 'alfanumerico',
          label: 'Número Interior',
          esRequerido: false,
          limite: 10,
        },
        { name: 'estado', tipo: 'text', label: 'Estado', esRequerido: true },
        { name: 'delegacion', tipo: 'text', label: 'Delegación/Municipio', esRequerido: true },
        { name: 'colonia', tipo: 'text', label: 'Colonia', esRequerido: true },
      ] as InputProps[],
    }
  },
  computed: {
    formValues() {
      return this.store.formValues
    },
    formErrors() {
      return this.store.formErrors
    },
    isFormValid() {
      return this.store.validateForm(this.fieldsConfig)
    },
  },

  methods: {
    validateField(fieldName: keyof FormUsuario) {
      const fieldConfig = this.fieldsConfig.find((field) => field.name === fieldName)
      if (fieldConfig) {
        this.store.validateForm([fieldConfig])
      }
    },

    handleSubmit() {
      if (this.isFormValid) {
        SweetAlert.fire({
          title: 'Exito!',
          text: 'Todos los datos son correctos.',
          icon: 'success',
        })
      } else {
        SweetAlert.fire({
          title: 'Aviso',
          text: 'Hay errores en el formulario.',
          icon: 'error',
        })
      }
    },
  },

  watch: {
    isFormValid(newValue: boolean) {
      if (newValue) {
        SweetAlert.fire({
          title: 'Exito!',
          text: 'Todos los datos son correctos.',
          icon: 'success',
        })
      }
    },
  },
}
</script>
