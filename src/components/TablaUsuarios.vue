<template>
  <div class="col col-lg-12 mt-5 mr-5">
    <div class="col col-lg-12 mt-3 mr-5">
      <h1 class="display-6">Tabla de usuarios</h1>
    </div>
    <div class="col col-lg-12 mt-3 mr-5">
      <!-- Tabla que muestra el contenido de Data -->
      <table class="table table-striped table-hover table-responsive table-sm">
        <thead>
          <tr>
            <th v-for="col in columnas" :key="col.name">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id">
            <th>{{ item.id }}</th>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.website }}</td>
            <td>
              <div class="d-flex gap-2">
                <button
                  type="button"
                  class="btn p-1 border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  @click="editUser(item)"
                >
                  <i class="bi bi-pencil-fill text-success fs-5"></i>
                </button>
                <button type="button" class="btn p-1 border-0" @click="deleteUser(item.id)">
                  <i class="bi bi-trash-fill text-danger fs-5"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-for="({ label, name, tipo }, i) in editarUsuario" :key="i">
              <label>{{ label }}</label>
              <input
                v-model="editingUser[name as keyof TableResponseInterface]"
                :type="tipo"
                class="form-control mb-2"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button id="cerrar" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="saveUserChanges">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { TableResponseInterface } from '@/interfaces/TableResponseInterface'
import { useTableStore } from '@/store/TableStore'
import SweetAlert from 'sweetalert2'

export default {
  data() {
    return {
      tableStore: useTableStore(),
      columnas: [
        { label: 'ID', name: 'id' },
        { label: 'Name', name: 'username' },
        { label: 'Email', name: 'email' },
        { label: 'Website', name: 'website' },
        { label: 'Action', name: 'acciones' },
      ],
      editarUsuario: [
        { name: 'username', tipo: 'text', label: 'Name' },
        { name: 'email', tipo: 'email', label: 'Email' },
        { name: 'website', tipo: 'text', label: 'Website' },
      ],
      editingUser: {} as Partial<TableResponseInterface>,
    }
  },
  computed: {
    tableData() {
      return this.tableStore.tableData
    },
  },
  methods: {
    getDataTable() {
      this.tableStore.fetchTableData()
    },
    editUser(user: TableResponseInterface) {
      // Clonar datos del usuario seleccionado para evitar cambios directos
      this.editingUser = { ...user }
    },
    saveUserChanges() {
      this.tableStore.updateTableUser(this.editingUser as TableResponseInterface)

      // mostrar sweetalert de confirmación
      const Toast = SweetAlert.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = SweetAlert.stopTimer
          toast.onmouseleave = SweetAlert.resumeTimer
          document.getElementById('cerrar')?.click()
        },
      })
      Toast.fire({
        icon: 'success',
        title: 'Usuario actualizado correctamente',
      })
    },
    deleteUser(id: number) {
      this.tableStore.deleteTableUser(id)
    },
  },
  mounted() {
    this.getDataTable()
  },
}
</script>
