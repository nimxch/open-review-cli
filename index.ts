import {
  ASCIIFontRenderable,
  Box,
  createCliRenderer,
  InputRenderable,
  InputRenderableEvents,
  RGBA,
  SelectRenderable,
  SelectRenderableEvents,
  TabSelectRenderable,
  Text,
  TextAttributes,
  TextRenderable,
} from "@opentui/core";

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  targetFps: 30,
});

const title = new ASCIIFontRenderable(renderer, {
  id: "title",
  text: "OpenReview",
  font: "tiny",
  color: RGBA.fromInts(255, 255, 255, 255),
});

const menu = new TabSelectRenderable(renderer, {
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
});

const input = new InputRenderable(renderer, {
  id: "input",
  width: "auto",
  placeholder: "Type something...",
});

menu.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
  log.content = option.name;
  renderer.requestRender();
});

input.focus();

input.on(InputRenderableEvents.ENTER, (value) => {
  log.content = value;
  renderer.requestRender();
});
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
      title,
      Text({
        content: "v0.0.1",
        fg: "#FFF",
      }),
    ),
    Box(
      {
        borderStyle: "rounded",
        padding: 1,
        flexDirection: "column",
        gap: 1,
        bottom: 0,
      },
      log,
      input,
    ),
  ),
);
