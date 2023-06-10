import { applyTransform } from "lib/apply-transform"
import { getStandardObj } from "lib/get-standard-obj"
import { useMouseMatrixTransform } from "use-mouse-matrix-transform"
import { Soup } from "lib/types"
import { useEffect, useRef, useState } from "react"
import {
  Matrix,
  identity,
  scale,
  translate,
  compose,
  flipY,
} from "transformation-matrix"
import LayoutObject from "./LayoutObject"
import { MouseIndicator } from "./MouseIndicator"

const defaultTransform = compose(
  identity(),
  // flipY(),
  translate(400, 300),
  scale(40, 40)
)

/**
 * Type order, if earlier renders ABOVE later elements, meaning things at the
 * beginning are stacked on top of things at the end.
 */
const TYPE_ORDER = ["default", "schematic_box", "schematic_line"]
const DEFAULT_TYPE_IND = TYPE_ORDER.indexOf("default")
const getTypeInd = (type: string) => {
  const ind = TYPE_ORDER.indexOf(type)
  if (ind === -1) return DEFAULT_TYPE_IND
  return ind
}

export default ({ soup }: { soup: Soup }) => {
  const [transform, setTransform] = useState<Matrix>(defaultTransform)

  const { ref } = useMouseMatrixTransform({
    transform,
    onSetTransform: setTransform,
  })

  const layout_objects = [...soup.elements]

  // order based on type order
  layout_objects.sort((a, b) => {
    const ai = getTypeInd(a.type)
    const bi = getTypeInd(b.type)
    return ai > bi ? -1 : ai === bi ? 0 : 1
  })

  return (
    <div>
      <div
        ref={ref}
        style={{
          position: "relative",
          backgroundColor: "#222426",
          height: 600,
          overflow: "hidden",
        }}
      >
        {layout_objects
          .map((obj) => getStandardObj(obj))
          .map((obj, i) => {
            if (!obj)
              return null

              // generate key prior to transform
            ;(obj as any).key = `${i}_${JSON.stringify(obj)}`
            return obj
          })
          .filter(Boolean)
          .map((obj) => applyTransform(obj as any, transform))
          .map((obj, i) => (
            <LayoutObject obj={obj} key={(obj as any).key} />
          ))}
        <MouseIndicator containerRef={ref} transform={transform} />
      </div>
      <details style={{ marginTop: 20 }}>
        <summary>Layout JSON</summary>
        <pre>{JSON.stringify(soup.elements, null, 2)}</pre>
      </details>
    </div>
  )
}
