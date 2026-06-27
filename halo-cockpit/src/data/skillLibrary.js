const skill = (id, skillName, difficulty, prerequisites, objectives, terms, jobUse, mistakes, related, handsOn, breakFix, ticketIdea, automation, review, games) => ({
  id,
  skillName,
  difficulty,
  prerequisites,
  learningObjectives: objectives,
  vocabulary: terms.map((term) => term.word),
  plainEnglishDefinitions: terms,
  realJobUses: [jobUse],
  commonMistakes: mistakes,
  relatedSkills: related,
  examples: [`Real support example: ${ticketIdea}`],
  analogies: ['Learn the manual path first, then make it repeatable.'],
  handsOnTasks: [handsOn],
  breakFixTasks: [breakFix],
  ticketIdeas: [ticketIdea],
  automationOpportunities: [automation],
  reviewQuestions: review,
  miniGameIdeas: ['Spot the mistake', 'Timed ticket', 'Scenario quiz'],
  supportedGameTypes: games,
})

const level0Terms = {
  files: [{ word: 'Path', plain: 'Address of a file' }, { word: 'Folder', plain: 'Container for files' }],
  install: [{ word: 'Install', plain: 'Add software' }, { word: 'Uninstall', plain: 'Remove software' }],
  input: [{ word: 'Shortcut', plain: 'Fast key combination' }, { word: 'Pointer', plain: 'Mouse arrow' }],
  explorer: [{ word: 'Filter', plain: 'Narrow search results' }, { word: 'Downloads', plain: 'Default download folder' }],
  task: [{ word: 'Process', plain: 'Running program' }, { word: 'CPU', plain: 'Main processor usage' }],
}

const level1Terms = {
  accounts: [{ word: 'Account', plain: 'Personal sign-in' }, { word: 'Reset', plain: 'Set again' }],
  access: [{ word: 'Permission', plain: 'Access rule' }, { word: 'Least Privilege', plain: 'Only needed access' }],
  settings: [{ word: 'Control Panel', plain: 'Classic Windows settings' }, { word: 'Default App', plain: 'Opens file automatically' }],
  share: [{ word: 'Share', plain: 'Allow folder access' }, { word: 'Access', plain: 'Ability to open/edit' }],
  personalize: [{ word: 'Accessibility', plain: 'Make easier to use' }, { word: 'Theme', plain: 'Visual style' }],
}

export const skillLibrary = [
  skill('room0_1', 'Recover files with File Explorer', 'Beginner', [], ['Search for a file', 'Read file paths'], level0Terms.files, 'Recover user documents', ['Searching random folders first'], ['File Explorer basics'], 'Find missing homework file', 'Move file wrong then restore it', 'Grandma cannot find homework', 'Manual search first, then script repetitive cleanup later', ['What is a path?', 'Why search first?'], ['Mission Ticket', 'File Explorer Simulation', 'Scenario Quiz']),
  skill('room0_2', 'Install and uninstall software safely', 'Beginner', ['Recover files with File Explorer'], ['Install from trusted sources', 'Uninstall cleanly'], level0Terms.install, 'Deploy approved software', ['Downloading random installers'], ['Control Panel & Settings'], 'Install approved browser', 'Clean broken shortcut after uninstall', 'Mike cannot install app', 'Manual install first, then silent install later', ['Why trust official sources?', 'How do you verify an install?'], ['Mission Ticket', 'Windows Simulation', 'Break/Fix']),
  skill('room0_3', 'Navigate with keyboard and mouse', 'Beginner', [], ['Use shortcuts', 'Recover input issues'], level0Terms.input, 'Guide users during remote support', ['Ignoring keyboard fallback'], ['File Explorer basics'], 'Use keyboard to open settings', 'Misconfigure pointer speed then fix it', 'Mouse stopped working', 'Manual navigation before automation tools', ['Which shortcut helps most?', 'How do you recover without mouse?'], ['Mission Ticket', 'Desktop Simulation', 'Speed Run']),
  skill('room0_4', 'Find files with Explorer search and filters', 'Beginner', ['Navigate with keyboard and mouse'], ['Use search and filters', 'Restore correct folder location'], level0Terms.explorer, 'Recover lost files quickly', ['Skipping sort and filters'], ['Recover files with File Explorer'], 'Find Grandma photos by date', 'Move wrong photo and restore it', 'Grandma cannot find pictures', 'Manual file triage before bulk file automation', ['Why sort by date?', 'What does Downloads usually hold?'], ['Mission Ticket', 'File Explorer Simulation', 'Matching']),
  skill('room0_5', 'Diagnose slow computers with Task Manager', 'Beginner', ['Install and uninstall software safely'], ['Check CPU and memory', 'Identify heavy processes'], level0Terms.task, 'First-pass performance triage', ['Guessing before measuring'], ['Install and uninstall software safely'], 'Find top CPU process', 'End wrong safe process then recover', 'Computer is slow', 'Manual diagnosis before automated monitoring', ['Why sort by CPU?', 'What is a process?'], ['Mission Ticket', 'Desktop Simulation', 'Timed Ticket']),
  skill('room1_1', 'Reset local passwords safely', 'Beginner', ['Diagnose slow computers with Task Manager'], ['Verify identity', 'Reset account'], level1Terms.accounts, 'Restore user access securely', ['Resetting without identity check'], ['Permissions and access'], 'Reset Sarah password', 'Set wrong temp password then correct it', 'Sarah forgot password', 'Manual account work before scripted user management', ['Why verify identity?', 'How do you test sign-in?'], ['Mission Ticket', 'Windows Simulation', 'Boss Challenge']),
  skill('room1_2', 'Repair folder access with least privilege', 'Beginner', ['Reset local passwords safely'], ['Check permissions', 'Grant minimal access'], level1Terms.access, 'Fix access denied issues', ['Giving Everyone full control'], ['Folder sharing'], 'Grant read-only access safely', 'Accidentally deny, then restore access', 'Nobody can open folder', 'Manual permission logic before GPO or automation', ['What is least privilege?', 'When is read-only enough?'], ['Mission Ticket', 'Windows Simulation', 'Break/Fix']),
  skill('room1_3', 'Find settings in both Settings and Control Panel', 'Beginner', ['Repair folder access with least privilege'], ['Choose correct Windows settings tool', 'Locate app defaults'], level1Terms.settings, 'Navigate legacy and modern settings', ['Assuming everything is in Settings'], ['Install and uninstall software safely'], 'Find uninstall setting in both tools', 'Change wrong setting then restore it', 'Find the setting for Mike', 'Manual navigation before scripted policy changes', ['When should you check Control Panel?', 'What is a default app?'], ['Mission Ticket', 'Windows Simulation', 'Choose the Correct Tool']),
  skill('room1_4', 'Share folders safely', 'Beginner', ['Find settings in both Settings and Control Panel'], ['Create share', 'Test access'], level1Terms.share, 'Configure shared resources', ['Sharing to Everyone by default'], ['Repair folder access with least privilege'], 'Share folder to one test user', 'Break sharing then restore it', 'Share family photos', 'Manual sharing before central file automation', ['Why test with another account?', 'What is shared access?'], ['Mission Ticket', 'Windows Simulation', 'Scenario Quiz']),
  skill('room1_5', 'Tune personalization for usability', 'Beginner', ['Share folders safely'], ['Improve readability', 'Use accessibility settings'], level1Terms.personalize, 'Help users work comfortably', ['Changing style without checking readability'], ['Find settings in both Settings and Control Panel'], 'Increase text size and theme clarity', 'Set awkward display then restore it', 'Make the computer yours', 'Manual accessibility tuning before automated profile rollout', ['Why use accessibility settings?', 'How does readability affect work?'], ['Mission Ticket', 'Desktop Simulation', 'Daily Review Ticket']),
]
