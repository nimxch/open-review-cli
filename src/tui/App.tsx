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
      flexDirection="column"
      backgroundColor="#0b1020"
    >
      <box
        width="100%"
        borderStyle="single"
        borderColor="#25324f"
        backgroundColor="#11172a"
        paddingX={1}
        paddingY={0}
        justifyContent="space-between"
      >
        <text fg="#76e3ff">opencode mock</text>
        <text fg="#7dd3fc">model: {modelName}</text>
      </box>

      <box width="100%" flexGrow={1} paddingX={1} paddingY={1}>
        <box
          width="100%"
          height="100%"
          borderStyle="single"
          borderColor="#25324f"
          backgroundColor="#090f1d"
          paddingX={1}
          paddingY={1}
        >
          <text fg="#dbe6ff" wrapMode="word">
            {formatTranscript()}
          </text>
        </box>
      </box>

      <box
        width="100%"
        borderStyle="single"
        borderColor="#25324f"
        paddingX={1}
        paddingY={0}
        backgroundColor="#11172a"
      >
        <input
          focused
          width="100%"
          value={inputValue}
          placeholder="Type a slash command (/help)"
          onInput={setInputValue}
          onSubmit={handleSubmit}
        />
      </box>

      <box
        width="100%"
        paddingX={1}
        paddingY={0}
        justifyContent="space-between"
        backgroundColor="#090f1d"
      >
        <text fg={isCalling ? "#facc15" : "#4ade80"}>
          {isCalling
            ? `${spinnerFrames[spinnerIndex]} processing /call`
            : `${spinnerFrames[spinnerIndex]} ${statusLine}`}
        </text>
        <text fg="#93a5c4">/help /call /test /clear</text>
      </box>
    </box>
  )
}

export default App
