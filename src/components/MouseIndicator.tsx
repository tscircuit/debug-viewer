import useMouse from "@react-hook/mouse-position"
import { Matrix, applyToPoint, inverse } from "transformation-matrix"

export const MouseIndicator = ({
  containerRef,
  transform,
}: {
  containerRef: any
  transform: Matrix
}) => {
  const mouse = useMouse(containerRef)

  if (!mouse.x || !mouse.y) return null

  const tmouse = applyToPoint(
    inverse(transform),
    mouse as any
  ) as PointObjectNotation

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "rgba(255,255,255,0.5)",
        fontSize: 11,
        fontFamily: "sans-serif",
      }}
    >
      (mx: {tmouse.x.toFixed(2)}, my: {tmouse.y.toFixed(2)})
    </div>
  )
}
