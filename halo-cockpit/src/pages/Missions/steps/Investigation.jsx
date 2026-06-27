import { useState } from 'react'
import Panel from '../../../components/ui/Panel'

export default function Investigation({ mission, progress }) {
  const [picked, setPicked] = useState('')
  const [feedback, setFeedback] = useState('')

  function checkAnswer() {
    if (Number(picked) === Number(mission.interactiveDemo.correctIndex)) {
      progress.markSectionDone(mission.id, 'investigation')
      setFeedback('feedback-ok')
      return
    }
    setFeedback('feedback-bad')
  }

  return (
    <section className="mission-frame">
      <Panel title="Investigate">
        <div className="section-body">
          <div className="desktop-sim">
            <div className="desktop-header">
              <strong>Fake Desktop Simulator</strong>
              <span>{mission.npc} ticket</span>
            </div>
            <p>{mission.interactiveDemo.prompt}</p>
            <div className="highlight-box">
              {mission.interactiveDemo.options.map((option, index) => (
                <label key={option} className="check-row">
                  <input type="radio" name="investigation" value={index} checked={picked === String(index)} onChange={(event) => setPicked(event.target.value)} /> {option}
                </label>
              ))}
            </div>
          </div>
          <div className="button-row">
            <button className="button" type="button" onClick={checkAnswer}>Check</button>
            <button className="button" type="button" onClick={() => setFeedback('feedback-hint')}>Need a Hint?</button>
          </div>
          {feedback ? <p className={feedback}>{feedback === 'feedback-ok' ? '✔ Correct' : feedback === 'feedback-hint' ? `💡 ${mission.interactiveDemo.hint}` : '❌ Try Again'}</p> : null}
        </div>
      </Panel>
    </section>
  )
}
