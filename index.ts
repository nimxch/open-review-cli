import { BoxRenderable, createCliRenderer } from "@opentui/core"

const renderer = await createCliRenderer()

const container = new BoxRenderable(renderer, {
  id: "container",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 10,
})

const leftPanel = new BoxRenderable(renderer, {
  id: "left",
  flexGrow: 1,
  height: 10,
  backgroundColor: "#444",
})

const rightPanel = new BoxRenderable(renderer, {
  id: "right",
  width: 20,
  height: 10,
  backgroundColor: "#666",
})

container.add(leftPanel)
container.add(rightPanel)
renderer.root.add(container)