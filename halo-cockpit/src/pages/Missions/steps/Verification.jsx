import { useState } from 'react'
import Panel from '../../../components/ui/Panel'

export default function Verification({ mission, progress }) {
  const existing = progress.verifyState[mission.id] || { explain: false, perform: false, troubleshoot: false, repeat: false, withoutHints: false }
  const [checks, setChecks] = useState(existing)
  const [feedback, setFeedback] = useState('')

  function update(name) {
    setChecks((current) => ({ ...current, [name]: !current[name] }))
  }

  function save() {
    const ok = progress.saveVerify(mission.id, checks)
    setFeedback(ok ? 'feedback-ok' : 'feedback-bad')
  }

  return (
    <section className="mission-frame">
      <Panel title="Verification">
        <div className="section-body">
          <label className="check-row"><input type="checkbox" checked={checks.explain} onChange={() => update('explain')} /> Did it work and can you explain it?</label>
          <label className="check-row"><input type="checkbox" checked={checks.perform} onChange={() => update('perform')} /> Can you perform it?</label>
          <label className="check-row"><input type="checkbox" checked={checks.troubleshoot} onChange={() => update('troubleshoot')} /> Can you troubleshoot it?</label>
          <label className="check-row"><input type="checkbox" checked={checks.repeat} onChange={() => update('repeat')} /> Can you repeat it three times?</label>
          <label className="check-row"><input type="checkbox" checked={checks.withoutHints} onChange={() => update('withoutHints')} /> Can you do it without hints?</label>
          <button className="button" type="button" onClick={save}>Save Verification</button>
          {feedback ? <p className={feedback}>{feedback === 'feedback-ok' ? '✔ Correct' : '❌ Try Again'}</p> : null}
        </div>
      </Panel>
    </section>
  )
}
