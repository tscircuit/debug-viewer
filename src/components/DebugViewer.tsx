import { useEffect, useState } from "react"
import { type AnyElement, createProjectBuilder } from "@tscircuit/builder"
import { createRoot } from "@tscircuit/react-fiber"
import DebugLayout from "./DebugLayout"

export const DebugViewer = ({
  children,
  soup: initialSoup,
  pcb = false,
  schematic = false,
  style,
}: {
  pcb?: boolean
  schematic?: boolean

  children?: any

  soup?: any

  style?: any
}) => {
  initialSoup = initialSoup ?? []

  const [soup, setSoup] = useState<any>(initialSoup ?? [])
  const [error, setError] = useState<string | null>(null)

  const allowed_prefixes = [
    schematic ? "schematic_" : null,
    pcb ? "pcb_" : null,
    "source_",
  ].filter(Boolean) as string[]

  useEffect(() => {
    if (!children) return
    if (initialSoup.length > 0) return
    const projectBuilder = createProjectBuilder()
    createRoot()
      .render(children, projectBuilder as any)
      .then(async (soup) => {
        setError(null)
        setSoup(soup)
      })
      .catch((e) => {
        console.error("ERROR RENDERING CIRCUIT")
        setError(e.toString())
        throw e
      })
  }, [children, schematic, pcb])

  if (!schematic && !pcb) {
    return (
      <div style={{ color: "red" }}>must specify schematic or pcb mode</div>
    )
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        error rendering circuit: {error.toString()}
      </div>
    )
  }

  if (soup.length === 0) return "loading..."

  return (
    <DebugLayout
      soup={soup.filter((elm: AnyElement) =>
        allowed_prefixes.some((ap) => elm.type.startsWith(ap)),
      )}
    />
  )
}
