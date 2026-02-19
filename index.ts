import { Box, createCliRenderer, SelectRenderable, SelectRenderableEvents, Text, TextAttributes, TextRenderable } from "@opentui/core";

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  targetFps: 30,
});

const menu = new SelectRenderable(renderer, {
  id: "menu",
  width: 30,
  height: 8,
  options: [
    { name: "New File", description: "Create a new file" },
    { name: "Open File", description: "Open an existing file" },
    { name: "Exit", description: "Exit Application" },
  ],
});

const log = new TextRenderable(renderer, {
    id: "log",
    content: "",
    fg: "#FFF",
    attributes: TextAttributes.BOLD | TextAttributes.UNDERLINE,
})

menu.focus()


menu.on(
    SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
        log.content = option.name
renderer.requestRender()
    }
)


renderer.root.add(
  Box(
    {
      borderStyle: "rounded",
      flexDirection: "column",
    },
    Box(
      {
        borderStyle: "rounded",
        padding: 1,
        flexDirection: "column",
        gap: 1,
      },
      Text({
        content: "OpenReview v0.0.1",
        fg: "#FF0000",
      }),
    ),
    Box(
      {
        borderStyle: "rounded",
        padding: 1,
        flexDirection: "row",
        gap: 1,
      },
      log,
      menu,
    ),
  ),
);
