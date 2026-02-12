import { useState } from "react"

const App = () => {
  const [status, setStatus] = useState("Type /test and press Enter")

  const handleSubmit = (payload: unknown) => {
    const rawValue =
      typeof payload === "string"
        ? payload
        : typeof payload === "object" &&
            payload !== null &&
            "value" in payload &&
            typeof (payload as { value?: unknown }).value === "string"
          ? ((payload as { value: string }).value ?? "")
          : ""

    const command = rawValue.trim()

    if (command === "/test") {
      setStatus("Test command worked")
      return
    }
    if( command == "/help"){
        setStatus("Triggered Help Command")
        return
    }

    addMessage("assistant", `Unknown command: ${command}. Try /help`)
  }

  return (
    <box
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={1}
    >
      <text>{status}</text>
      <input focused width={32} placeholder="Type /test" onSubmit={handleSubmit} />
    </box>
  )
}

export default App
