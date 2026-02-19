import { Box, createCliRenderer, SelectRenderable, Text } from "@opentui/core";

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


menu.focus()
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
        flexDirection: "row",
        gap: 1,
      },
      menu,
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
      Text({
        content: "Hello, OpenTUI!",
        fg: "#FF0000",
      }),
      Text({
        content: "Hello, World!",
        fg: "#00FF00",
      }),
    ),
  ),
);
