import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { createElement } from "react"
import App  from "./src/tui/App.tsx"

async function main() {
  const renderer = await createCliRenderer()
  createRoot(renderer).render(createElement(App))
}

main()
