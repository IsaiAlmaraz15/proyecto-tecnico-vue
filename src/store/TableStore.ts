import type { TableResponseInterface } from '@/interfaces/TableResponseInterface'
import { axiosInstanceGET } from '@/services/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    tableData: [] as TableResponseInterface[],
    errortableData: ref<string | null>(null),
    userEdit: {} as TableResponseInterface,
  }),
  getters: {
    getTableData(): TableResponseInterface[] {
      return this.tableData
    },
  },
  actions: {
    // Obtener datos de la tabla
    async fetchTableData() {
      try {
        const response = await axiosInstanceGET.get<TableResponseInterface[]>('/')

        this.tableData = response.data
        this.errortableData = null
      } catch (error) {
        console.error('Error fetching table data:', error)
        this.errortableData = 'Error al cargar los datos de la tabla'
      }
    },
    // actualizar objeto de la tabla
    updateTableUser(updatedData: TableResponseInterface) {
      const index = this.tableData.findIndex((data) => data.id === updatedData.id)
      this.tableData[index] = updatedData
    },
    // eliminar objeto de la tabla
    deleteTableUser(id: number) {
      this.tableData = this.tableData.filter((data) => data.id !== id)
    },
    // Obtener usuario por ID
    getUserById(id: number): TableResponseInterface | null {
      return this.tableData.find((user) => user.id === id) || null
    },
    // Establecer usuario a editar
    setUserEdit(user: TableResponseInterface) {
      this.userEdit = { ...user }
    },
  },
})
