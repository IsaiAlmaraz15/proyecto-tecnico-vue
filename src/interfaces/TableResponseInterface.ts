export interface TableResponseInterface {
  id: number
  name: string
  username: string
  email: string
  address: Adress
  phone: string
  website: string
  company: Company
}

export interface Adress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface ColumnasTabla {
  label: string
  name: string
  type: 'text' | 'number' | 'date' | 'actions'
}
