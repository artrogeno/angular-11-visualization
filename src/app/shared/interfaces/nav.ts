export interface INavFlatNode {
  expandable: boolean
  name: string
  level: number
}

export interface INav {
  name: string
  type?: string
  link?: string
  icon?: string
  header?: string
  children?: INav[]
}
