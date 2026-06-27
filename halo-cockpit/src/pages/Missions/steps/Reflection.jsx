import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '../../../components/ui/Panel'

export default function Reflection({ mission, progress }) {
  const navigate = useNavigate()
  const [text, setText] = useState(progress.reflectionState[mission.id] || '')
  const [feedback, setFeedback] = useState('')

  function finishMission() {
    const result = progress.completeMission(mission.id, text)
    if (!result.ok) {
      setFeedback(`❌ Try Again - Repeat added for: ${result.missing.join(', ')}`)
      return
    }

    setFeedback('✔ Correct - Mission complete')
    if (progress.currentMissionId === mission.id) {
      navigate('/missions')
    }
  }

  return (
    <section className="mission-frame">
      <Panel title="Reflection">
        <div className="section-body">
          <p>What did you learn?</p>
          <textarea value={text} onChange={(event) => setText(event.target.value)} />
          <button className="button" type="button" onClick={finishMission}>Finish Mission</button>
          {feedback ? <p className={feedback.startsWith('✔') ? 'feedback-ok' : 'feedback-bad'}>{feedback}</p> : null}
        </div>
      </Panel>
    </section>
  )
}
