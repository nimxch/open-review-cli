import { createCliRenderer, Text } from "@opentui/core";

const renderer = await createCliRenderer({
    exitOnCtrlC: true
})


renderer.root.add(
    Text(
        {
            content: "Hello World!",
            fg: "#FF0000"
        }
    )
)