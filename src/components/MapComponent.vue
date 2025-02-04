<template>
  <div class="container-fluid mb-5">
    <!-- spiner de carga cuando tableData aun no tiene datos -->
    <div class="row">
      <div v-if="users.length === 0" class="col col-lg-12 d-flex justify-content-center mt-5">
        <p class="fs-5 ms-2">Cargando datos...</p>
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="users.length > 0" class="row">
      <div class="col col-sm-12 col-md-12 col-lg-12">
        <div ref="map" style="width: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { TableResponseInterface } from '@/interfaces/TableResponseInterface'
import { useTableStore } from '@/store/TableStore'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MapComponent',
  props: {
    users: {
      type: Array as () => TableResponseInterface[],
      required: true,
    },
  },
  data() {
    return {
      tableStore: useTableStore(),
      map: null as HTMLElement | null, // Referencia al contenedor del mapa
    }
  },
  mounted() {
    this.initializeMap()
  },
  methods: {
    async initializeMap() {
      try {
        // Cargar la API de Google Maps
        const google = await GoogleMapsApiLoader({
          apiKey: 'AIzaSyCnoe__VmM8vaX3AfbFQHDDXmVtg33WK3U', // API key
        })
        console.log('google:', google)

        // Inicializar el mapa
        const mapInstance = new google.maps.Map(this.$refs.map as HTMLElement, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        })

        console.log('users:', this.users)

        // Agregar marcadores para cada usuario
        this.users.forEach((user) => {
          const lat = parseFloat(user.address.geo.lat)
          const lng = parseFloat(user.address.geo.lng)

          console.log('lat:', lat, 'lng:', lng)

          new google.maps.Marker({
            position: { lat, lng },
            map: mapInstance,
            title: user.name,
          })
        })
      } catch (error) {
        console.error('Error al cargar el mapa:', error)
      }
    },
  },
})
</script>
