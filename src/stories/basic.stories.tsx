import { DebugViewer } from "components/DebugViewer"

export const SchematicResistor = () => {
  return (
    <DebugViewer schematic>
      <resistor footprint="0805" x={0} y={0} resistance="10ohm" />
    </DebugViewer>
  )
}

export const PCBResistor = () => {
  return (
    <DebugViewer pcb>
      <resistor footprint="0805" x={0} y={0} resistance="10ohm" />
    </DebugViewer>
  )
}

export default {
  title: "Basic",
  component: SchematicResistor,
}
