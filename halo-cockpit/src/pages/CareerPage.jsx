import { useMemo, useState } from 'react'
import HaloButton from '../components/ui/HaloButton'
import HaloCard from '../components/ui/HaloCard'
import LearnHowButton from '../components/ui/LearnHowButton'
import { CAREER_MODULES } from '../data/content'

export default function CareerPage() {
  const [form, setForm] = useState({ name: '', role: '' })
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => {
    const issues = {}
    if (!form.name.trim()) issues.name = 'Name is required'
    if (!form.role.trim()) issues.role = 'Target role is required'
    return issues
  }, [form])

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length === 0) {
      setSubmitted(false)
    }
  }

  return (
    <div className="space-y-4">
      <HaloCard title="Career Modules">
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
          {CAREER_MODULES.map((module) => <li key={module}>{module}</li>)}
        </ul>
        <div className="mt-3">
          <LearnHowButton label="Career modules convert completed missions into job-ready artifacts and measurable skills." />
        </div>
      </HaloCard>

      <HaloCard title="Resume Builder Draft">
        <form className="space-y-3" onSubmit={onSubmit} noValidate>
          <div>
            <label className="mb-1 block text-xs text-gray-300" htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full rounded border border-white/20 bg-black/30 px-3 py-2 text-sm"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            {submitted && errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-300" htmlFor="role">Target Role</label>
            <input
              id="role"
              className="w-full rounded border border-white/20 bg-black/30 px-3 py-2 text-sm"
              value={form.role}
              onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
            />
            {submitted && errors.role && <p className="mt-1 text-xs text-rose-300">{errors.role}</p>}
          </div>
          <HaloButton type="submit">Save Draft</HaloButton>
        </form>
      </HaloCard>
    </div>
  )
}
