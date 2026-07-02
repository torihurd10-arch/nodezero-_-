import { useState } from "react"
import { useHUD } from "../../context/HUDContext"

export default function PracticeMode() {
  const { completeModule, missionProgress } = useHUD()
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")

  const check = () => {
    if (answer === "ram") {
      setFeedback("Correct: RAM is the fastest place for active working data.")
    } else {
      setFeedback("Try again: choose the component used for active short-term data.")
    }
  }

  return (
    <div className="halo-card">
      <h2 className="halo-title halo-glow text-lg">Practice Mode</h2>
      <p className="text-sm text-gray-300 mt-2">
        Scenario: App load is slow after opening many tabs. Which component is most likely saturated first?
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {[
          ["cpu", "CPU"],
          ["ram", "RAM"],
          ["storage", "Storage"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setAnswer(value)}
            className={`px-3 py-2 rounded-lg border text-sm transition ${
              answer === value
                ? "border-haloBlue bg-haloBlue/20 text-haloBlueSoft"
                : "border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={check}
        className="mt-3 px-3 py-2 rounded-lg border border-white/20 text-gray-200 hover:bg-white/5 transition"
      >
        Check Answer
      </button>

      {feedback && <p className="mt-3 text-sm text-gray-300">{feedback}</p>}

      <button
        onClick={() => completeModule("practice")}
        className="mt-4 px-3 py-2 rounded-lg border border-haloBlue/30 text-haloBlue hover:bg-haloBlue/10 transition"
      >
        {missionProgress.practice ? "Practice Complete" : "Mark Practice Complete (+25 XP)"}
      </button>
    </div>
  )
}
