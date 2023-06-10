import { StandardObject } from "./types"
import { Matrix, applyToPoint } from "transformation-matrix"

export const applyTransform = (
  o: StandardObject,
  transform: Matrix
): StandardObject => {
  const { x, y, width, height } = o

  return {
    ...o,
    ...applyToPoint(transform, { x, y }),
    width: o.width * transform.a,
    height: o.height * transform.a,
  }
}
