# Cockpit Module Map

- HUD Core: Sidebar, Mission Control, AI Assistant, Quick Actions, Focus Mode.
- Learning System: Learn, See, Practice, Resources, and room source file mapping.
- Tools System: Terminal, File Explorer, VM Controls, GitHub Sync, Network Tools.
- Career System: Resume Builder, Portfolio Tracker, Skills Tracker.
- Stats System: skill rings, XP tracker, heatmap, level summaries.

Data flow:
- `src/data/content.js` holds canonical room/level source data copied from legacy NodeZero pages.
- `src/context/AppState.jsx` persists progress, XP, streak, and settings to localStorage.
- Route pages consume shared HUD UI primitives in `src/components/ui`.
