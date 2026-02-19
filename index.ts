import { Box, createCliRenderer, Text } from "@opentui/core"

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  targetFps: 30
})

renderer.root.add(
    Box(
        {
            borderStyle: "rounded",
            flexDirection: "column"
        },
        Box(
            {
                borderStyle: "rounded",
                padding: 1,
                flexDirection: "row",
                gap: 1
            },
            Text({
              content: "OpenReview v0.0.1",
              fg: "#FF0000",
            })
        ),
        Box(
            {
                borderStyle: "rounded",
                padding: 1,
                flexDirection: "row",
                gap: 1
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
    )
)