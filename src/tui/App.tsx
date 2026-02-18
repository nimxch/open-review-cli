import { useEffect, useState } from "react"

type ChatMessage = {
  role: "system" | "user" | "assistant"
  text: string
}

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", text: "OpenCode-style mock console" },
    { role: "assistant", text: "Type /help to see available commands." },
  ])
  const [isCalling, setIsCalling] = useState(false)
  const [spinnerIndex, setSpinnerIndex] = useState(0)
  const [statusLine, setStatusLine] = useState("Idle")

  const spinnerFrames = ["-", "\\", "|", "/"]
  const modelName = "mock-gpt-1"

  useEffect(() => {
    if (!isCalling) {
      setSpinnerIndex(0)
      return
    }

    const interval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % spinnerFrames.length)
    }, 120)

    return () => {
      clearInterval(interval)
    }
  }, [isCalling])

  const addMessage = (role: ChatMessage["role"], text: string) => {
    setMessages((prev) => [...prev.slice(-24), { role, text }])
  }

  const formatTranscript = () => {
    return messages
      .map((message) => {
        if (message.role === "user") {
          return `[you] ${message.text}`
        }
        if (message.role === "assistant") {
          return `[assistant] ${message.text}`
        }
        return `[system] ${message.text}`
      })
      .join("\n\n")
  }

  const showHelp = () => {
    addMessage("assistant", "Commands:")
    addMessage("assistant", "/help  - Show this help text")
    addMessage("assistant", "/call  - Run a mock API call")
    addMessage("assistant", "/test  - Quick health check")
    addMessage("assistant", "/clear - Clear transcript")
  }

  const runMockCall = async () => {
    if (isCalling) {
      addMessage("assistant", "A request is already running.")
      return
    }

    setIsCalling(true)
    setStatusLine("Calling mock API")
    addMessage("assistant", "Starting mock API call...")

    const startedAt = Date.now()

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 550)
      })
      addMessage("assistant", "Connecting...")

      await new Promise((resolve) => {
        setTimeout(resolve, 600)
      })
      addMessage("assistant", "Fetching response...")

      const result = await new Promise<{ id: number; status: string; score: number }>(
        (resolve) => {
          setTimeout(() => {
            resolve({
              id: Math.floor(Math.random() * 9000) + 1000,
              status: "ok",
              score: Math.floor(Math.random() * 100),
            })
          }, 1700)
        },
      )

      const durationMs = Date.now() - startedAt
      addMessage(
        "assistant",
        `Mock response received: id=${result.id}, status=${result.status}, score=${result.score}`,
      )
      addMessage("assistant", `Completed in ${durationMs}ms`)
    } finally {
      setIsCalling(false)
      setStatusLine("Idle")
    }
  }

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

    const command = rawValue.trim().toLowerCase()
    setInputValue("")

    if (!command) {
      return
    }

    addMessage("user", command)

    if (command === "/test") {
      addMessage("assistant", "System check passed.")
      return
    }

    if (command === "/help") {
      showHelp()
      return
    }

    if (command === "/call") {
      void runMockCall()
      return
    }

    if (command === "/clear") {
      setMessages([{ role: "assistant", text: "Transcript cleared." }])
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
