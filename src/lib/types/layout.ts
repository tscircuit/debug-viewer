/**
 * Generic layout format
 */
export type Soup = LayoutObject[]

export type LayoutObject = (
  | {
      x: number
      y: number
      width: number
      height: number
    }
  | {
      center: { x: number; y: number }
      size?: { width: number; height: number }
    }
  | {
      position: { x: number; y: number }
      anchor: "left"
      text: string
    }
  | {
      x: number
      y: number
      outer_diameter: number
    }
  | {
      x1: number
      y1: number
      x2: number
      y2: number
    }
) & {
  type: string
  text?: string
  name?: string
  // drawing?: { elements: Array<LayoutObject> }
  source?: { text?: string; name?: string }
}

export type StandardObject = {
  x: number
  y: number
  width: number
  height: number
  bg_color: string
  title: string
  content: Object
  secondary?: boolean
}
