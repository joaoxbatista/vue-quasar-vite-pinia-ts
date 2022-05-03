export interface Point {
  x: number
  y: number
}

export interface Polygon {
  points: Point[]
  pointColor?: string
  lineWidth?: number
  lineColor?: string
  pointSize?: number
}
