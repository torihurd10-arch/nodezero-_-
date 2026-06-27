import { useState } from 'react'
import Panel from '../../../components/ui/Panel'

export default function Explain({ mission, progress }) {
  const existing = progress.explainState[mission.id] || { q1: '', q2: '', q3: '' }
  const [answers, setAnswers] = useState(existing)
  const [feedback, setFeedback] = useState('')

  function save() {
    const ok = progress.saveExplain(mission.id, answers)
    setFeedback(ok ? 'feedback-ok' : 'feedback-bad')
  }

  return (
    <section className="mission-frame">
      <Panel title="Explain Challenge">
        <div className="section-body">
          <label className="check-row">What happened?<textarea value={answers.q1} onChange={(event) => setAnswers((current) => ({ ...current, q1: event.target.value }))} /></label>
          <label className="check-row">Why?<textarea value={answers.q2} onChange={(event) => setAnswers((current) => ({ ...current, q2: event.target.value }))} /></label>
          <label className="check-row">How would you use it?<textarea value={answers.q3} onChange={(event) => setAnswers((current) => ({ ...current, q3: event.target.value }))} /></label>
          <button className="button" type="button" onClick={save}>Save Explain</button>
          {feedback ? <p className={feedback}>{feedback === 'feedback-ok' ? '✔ Correct' : '❌ Try Again'}</p> : null}
        </div>
      </Panel>
    </section>
  )
}
