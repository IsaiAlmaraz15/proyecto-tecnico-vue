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
            :model="formValues[name as keyof FormUsuario]"
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
          <button :disabled="hasErrors" type="submit" class="btn btn-success mb-3">Guardar</button>
        </div>
      </div>

      <!-- Tabla -->
      <div class="row" v-if="verTabla">
        <div class="col col-lg-12">
          <TablaUsuarios />
        </div>
      </div>

      <!-- Mapa -->
      <div v-if="users.length > 0" class="row">
        <div class="col col-sm-12 col-md-12 col-lg-12 mt-3 mr-5">
          <h1 class="display-6">Mapa de usuarios</h1>
        </div>
        <div class="col col-lg-12">
          <MapComponent :users="users" />
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import MapComponent from '@/components/MapComponent.vue'
import TablaUsuarios from '@/components/TablaUsuarios.vue'
import type { FormUsuario } from '@/interfaces/FormUsuarioInterface'
import type { InputProps } from '@/interfaces/InputPropsInterface'
import { axiosInstancePOST } from '@/services/axios'
import { useFormStore } from '@/store/FormStore'
import { useTableStore } from '@/store/TableStore'
import { formatSaveUser } from '@/utils/form-data-format'
import SweetAlert from 'sweetalert2'

export default {
  components: { CustomInput, TablaUsuarios, MapComponent },
  data() {
    return {
      formStore: useFormStore(),
      tableStore: useTableStore(),
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
      verTabla: false,
    }
  },
  computed: {
    formValues() {
      return this.formStore.formValues
    },
    formErrors() {
      return this.formStore.formErrors
    },
    isFormValid() {
      return this.formStore.validateForm(this.fieldsConfig)
    },
    hasErrors() {
      return Object.values(this.formStore.formErrors).some((value) => value !== null)
    },

    // obtener usuarios de la tabla
    users() {
      return this.tableStore.tableData
    },
  },

  methods: {
    validateField(fieldName: keyof FormUsuario) {
      const fieldConfig = this.fieldsConfig.find((field) => field.name === fieldName)

      if (fieldConfig) {
        this.formStore.validateForm([fieldConfig] as InputProps[])
      }
    },

    async handleSubmit() {
      try {
        if (this.isFormValid) {
          const params = formatSaveUser(this.formValues)
          console.log('params', params)

          const response = await axiosInstancePOST.post('/post', params)

          console.log('response', response)
          SweetAlert.fire({
            title: 'Exito!',
            text: 'Se ha guardado.',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              this.formStore.resetForm()
              // vaciar campos custom input
              this.fieldsConfig.forEach((field) => {
                this.formStore.updateFieldValue(field.name as keyof FormUsuario, '')
              })
            }
          })
        }
      } catch (error) {
        SweetAlert.fire({
          title: 'Error!',
          text: 'Ocurrio un error.',
          icon: 'error',
        })
        console.error(error)
      }
    },
  },

  watch: {
    hasErrors(newValue) {
      console.log('hasErrors cambiado a:', newValue)
      if (!newValue) {
        SweetAlert.fire({
          title: 'Exito!',
          text: 'Todos los datos son correctos.',
          icon: 'success',
        })
      }
    },
  },
  mounted() {
    this.verTabla = true
    this.fieldsConfig.forEach((field) => {
      this.validateField(field.name as keyof FormUsuario)
    })
  },
}
</script>
