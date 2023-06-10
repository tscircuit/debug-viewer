import { StandardObject } from "lib/types"
import { useState } from "react"
import colorAlpha from "color-alpha"

export default ({
  obj,
  onClick,
}: {
  obj: StandardObject
  onClick?: Function
}) => {
  const [hovering, setHovering] = useState(false)
  const style: any = {
    position: "absolute",
    backgroundColor: colorAlpha(obj.bg_color, 0.1),
    opacity: hovering ? 0.5 : 1,
    color: "#fff",
    fontFamily: "sans-serif",
    fontSize: 12,
    textAlign: "center",
    border: `2px solid ${obj.bg_color}`,
    cursor: onClick ? "pointer" : "default",
  }

  style.left = obj.x - obj.width / 2
  style.top = obj.y - obj.height / 2
  style.height = obj.height
  style.width = obj.width

  return (
    <>
      <div
        onClick={onClick as any}
        style={style}
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
      >
        <div>{obj.title}</div>
      </div>
      <div
        style={{
          left: 0,
          top: 0,
          position: "absolute",
          display: hovering ? "block" : "none",
          pointerEvents: "none",
          color: "#ddd",
          fontSize: 11,
        }}
      >
        <pre>{JSON.stringify(obj.content, null, 2)}</pre>
      </div>
    </>
  )
}
