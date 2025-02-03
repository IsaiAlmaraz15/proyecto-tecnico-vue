import type { FormUsuario } from '@/interfaces/FormUsuarioInterface'

export const formatSaveUser = (data: FormUsuario) => {
  return {
    infoUsuario: {
      nombre: data.nombre,
      primerApellido: data.primerApellido,
      segundoApellido: data.segundoApellido,
      curp: data.curp,
      rfc: data.rfc,
    },
    Domicilio: {
      cp: data.codigoPostal,
      calle: data.calle,
      numExt: data.numeroExterior,
      numInt: data.numeroInterior,
      estado: data.estado,
      municipio: data.delegacion,
      colonia: data.colonia,
    },
  }
}
