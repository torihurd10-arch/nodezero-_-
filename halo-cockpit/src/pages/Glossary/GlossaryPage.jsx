import { useMemo, useState } from 'react'
import Footer from '../../components/HUD/Footer'
import Header from '../../components/HUD/Header'
import Panel from '../../components/ui/Panel'
import { useMission } from '../../context/MissionContext'
import { useProgress } from '../../context/ProgressContext'
import GlossaryTerm from './GlossaryTerm'

export default function GlossaryPage() {
  const { glossary, getMissionById } = useMission()
  const progress = useProgress()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const currentMission = getMissionById(progress.currentMissionId)

  const terms = useMemo(() => {
    return glossary.filter((term) => {
      const hay = `${term.word} ${term.plain} ${term.where} ${term.why} ${term.example}`.toLowerCase()
      return hay.includes(query.toLowerCase())
    })
  }, [glossary, query])

  return (
    <div className="app-shell">
      <Header
        title="Glossary"
        xp={progress.xp}
        confidence={progress.confidence}
        mission={currentMission?.title || 'No mission'}
        calls={Math.max(progress.repeatQueue.length, 3)}
        streak={progress.streak}
        promotionProgress={progress.promotionProgress}
        rank={progress.rank}
        onReset={progress.resetAll}
      />
      <main className="layout-stack">
        <Panel title="Search IT Terms">
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Word, plain English, where, why, example" />
          <div className="term-popup">
            {selected ? (
              <>
                <strong>{selected.word}</strong><br />
                Plain English: {selected.plain}<br />
                Where I see it: {selected.where}<br />
                Why it matters: {selected.why}<br />
                Example: {selected.example}
              </>
            ) : (
              'Tap a term to open a quick popup.'
            )}
          </div>
        </Panel>
        <section className="glossary-grid">
          {terms.map((term, index) => (
            <GlossaryTerm key={`${term.word}-${index}`} term={term} onSelect={setSelected} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
