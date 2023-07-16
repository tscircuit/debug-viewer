import { DebugViewer } from "components/DebugViewer"

export const Basic = () => {
  return (
    <DebugViewer schematic>
      <resistor footprint="0805" x={0} y={0} />
    </DebugViewer>
  )
}

export default {
  title: "Basic",
  component: Basic,
}
