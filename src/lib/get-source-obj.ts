import { Soup } from "./types"

export const getSourceObj = (obj: any, soup: Soup) => {
  if (obj.type === "schematic_port") {
    return soup.find(
      (s: any) =>
        s.type === "source_port" && s.source_port_id === obj.source_port_id,
    )
  }

  return null
}
