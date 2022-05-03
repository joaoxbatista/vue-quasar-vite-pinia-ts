export interface Column {
  name: string
  label: string
  field: string
  align: 'left' | 'right' | 'center'
  sortable: boolean,
  headerStyle?: string
}
