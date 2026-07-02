import { useHUD } from "../../context/HUDContext"

const achievementMap = [
  { id: "first_run", label: "First Run", condition: (state) => state.xp >= 10 },
  { id: "learn_locked", label: "Learning Locked", condition: (state) => state.missionProgress.learn },
  { id: "see_locked", label: "See Locked", condition: (state) => state.missionProgress.see },
  { id: "practice_locked", label: "Practice Locked", condition: (state) => state.missionProgress.practice },
  { id: "overdrive", label: "Overdrive", condition: (state) => state.xp >= 100 },
]

export default function Achievements() {
  const hud = useHUD()
  const unlocked = achievementMap.filter((achievement) => achievement.condition(hud))

  return (
    <div className="halo-card">
      <h3 className="halo-title halo-glow text-base">Achievements</h3>
      <div className="mt-3 space-y-2">
        {achievementMap.map((achievement) => {
          const isUnlocked = unlocked.some((item) => item.id === achievement.id)

          return (
            <div
              key={achievement.id}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                isUnlocked
                  ? "border-haloBlue bg-haloBlue/15 text-haloBlueSoft achievement-pop"
                  : "border-white/10 bg-white/5 text-gray-500"
              }`}
            >
              {isUnlocked ? "✓" : "○"} {achievement.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
