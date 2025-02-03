export interface infoUsuario {
  nombre: string | null
  primerApellido: string | null
  segundoApellido: string | null
  curp: string | null
  rfc: string | null
}

export interface Domicilio {
  codigoPostal: string | null
  calle: string | null
  numeroExterior: string | null
  numeroInterior: string | null
  estado: string | null
  delegacion: string | null
  colonia: string | null
}

export interface FormUsuario extends infoUsuario, Domicilio {}
