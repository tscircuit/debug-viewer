# @tscircuit/debug-viewer

[Examples](https://debug-viewer.vercel.app)

View a debug version of a schematic or PCB.

## Usage

```tsx
import { DebugViewer } from "@tscircuit/debug-viewer"

export const SchematicDebugView = () => (
  <DebugViewer schematic>
    <resistor footprint="0805" x={0} y={0} resistance="10ohm" />
  </DebugViewer>
)

export const PCBDebugView = () => (
  <DebugViewer pcb>
    <resistor footprint="0805" x={0} y={0} resistance="10ohm" />
  </DebugViewer>
)
```
