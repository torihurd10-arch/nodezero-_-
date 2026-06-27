(function () {
  const XP_KEY = "nodezero_xp";
  const PROGRESS_KEY = "nodezero_progress";
  const STEP_PROGRESS_KEY = "nodezero_step_progress";
  const ANSWERS_KEY = "nodezero_answers";
  const PROJECTS_KEY = "nodezero_project_progress";
  const STEP_XP = 10;
  const ROOM_XP = 20;

  const STEP_FLOW = [
    "Learn",
    "See",
    "Do",
    "Test",
    "Break",
    "Fix",
    "Explain",
    "Repeat",
    "Apply to a Job"
  ];

  const levels = [
    { id: "level0", name: "Level 0 - Computer Fundamentals", number: 0 },
    { id: "level1", name: "Level 1 - Windows Basics", number: 1 }
  ];

  const roomsMap = {
    room0_1: { id: "room0_1", level: 0, levelId: "level0", title: "Files & Folders", summary: "Build confidence with files, paths, and safe organization." },
    room0_2: { id: "room0_2", level: 0, levelId: "level0", title: "Install & Uninstall", summary: "Install software safely and remove it cleanly." },
    room0_3: { id: "room0_3", level: 0, levelId: "level0", title: "Keyboard & Mouse", summary: "Speed up work with core navigation and shortcuts." },
    room0_4: { id: "room0_4", level: 0, levelId: "level0", title: "File Explorer", summary: "Navigate, search, and troubleshoot file locations." },
    room0_5: { id: "room0_5", level: 0, levelId: "level0", title: "Task Manager", summary: "Inspect processes and diagnose performance issues." },

    room1_1: { id: "room1_1", level: 1, levelId: "level1", title: "User Accounts", summary: "Create and manage local user accounts." },
    room1_2: { id: "room1_2", level: 1, levelId: "level1", title: "Permissions & Access", summary: "Understand access rights and practical permission checks." },
    room1_3: { id: "room1_3", level: 1, levelId: "level1", title: "Control Panel & Settings", summary: "Use both interfaces to configure Windows." },
    room1_4: { id: "room1_4", level: 1, levelId: "level1", title: "Folder Sharing", summary: "Share folders securely and verify access." },
    room1_5: { id: "room1_5", level: 1, levelId: "level1", title: "Personalization", summary: "Apply user-safe customization and profile settings." }
  };

  const rooms = Object.keys(roomsMap).map(function (id) {
    return roomsMap[id];
  });

  const roomOrder = rooms.map(function (r) {
    return r.id;
  });

  const glossaryTerms = [
    { word: "Path", plain: "The exact address of a file or folder.", why: "Wrong paths cause file-not-found tickets.", where: "File Explorer, CMD, PowerShell", job: "Locate missing team documents quickly.", lab: "Create nested folders, move a file, and reopen it by full path." },
    { word: "Extension", plain: "The file type suffix like .txt or .exe.", why: "Prevents opening the wrong file type.", where: "File Explorer details view", job: "Identify risky email attachments.", lab: "Enable extension view and classify 10 files." },
    { word: "Process", plain: "A running program instance.", why: "Helps diagnose slow or stuck apps.", where: "Task Manager", job: "Spot high CPU offenders in user reports.", lab: "Open three apps and identify each process." },
    { word: "Service", plain: "A background component supporting features.", why: "Many failures are service-related.", where: "Task Manager / Services", job: "Restart failed print spooler service.", lab: "Find one stopped service and document impact." },
    { word: "Permission", plain: "Rules that decide who can access data.", why: "Access errors are common tickets.", where: "Folder properties -> Security", job: "Grant least-privilege access to team folders.", lab: "Create a folder and test read/write with another account." },
    { word: "DNS", plain: "Converts names to IP addresses.", why: "Name-resolution issues can block websites.", where: "Browser, ping, nslookup", job: "Differentiate DNS outage vs internet outage.", lab: "Test domain and direct IP connectivity." },
    { word: "User Account", plain: "Identity profile used to sign in.", why: "Separates user data and permissions.", where: "Windows Accounts settings", job: "Onboard a new employee account.", lab: "Create local test user and switch profiles." },
    { word: "Control Panel", plain: "Classic Windows settings interface.", why: "Some settings still live here.", where: "Control Panel app", job: "Adjust app defaults and device settings.", lab: "Find Programs and Features and uninstall a test app." },
    { word: "Share", plain: "Grant network access to a folder.", why: "Enables team collaboration.", where: "Folder properties -> Sharing", job: "Set up shared team folder safely.", lab: "Share a folder and verify from another account." },
    { word: "XP", plain: "Experience points for completed training tasks.", why: "Tracks progress and unlocks missions.", where: "Dashboard top bar", job: "Motivates step-by-step skill completion.", lab: "Complete one step and confirm XP increases." }
  ];

  const projects = [
    {
      id: "project_1",
      title: "Build a Clean Practice Workspace",
      xp: 40,
      steps: ["Create a training folder tree.", "Add sample docs with clear names.", "Archive old files into dated folders."],
      verify: ["Folder structure is clear and consistent.", "Naming is readable and searchable."],
      job: "Real support teams rely on clear file hygiene."
    },
    {
      id: "project_2",
      title: "App Install/Remove Safety Drill",
      xp: 50,
      steps: ["Install one safe utility app.", "Capture where it appears in apps list.", "Uninstall and verify all shortcuts removed."],
      verify: ["No broken shortcuts remain.", "Storage impact is documented."],
      job: "Common endpoint support workflow."
    },
    {
      id: "project_3",
      title: "Task Manager Triage Report",
      xp: 60,
      steps: ["Capture CPU/memory usage at idle.", "Open heavy app and capture again.", "Write short diagnosis and action plan."],
      verify: ["Report has before/after metrics.", "Action recommendation is clear."],
      job: "Useful in first-line performance incidents."
    },
    {
      id: "project_4",
      title: "Shared Folder Access Test",
      xp: 60,
      steps: ["Create a shared folder.", "Grant one test user read access.", "Verify denied write for unauthorized user."],
      verify: ["Permission behavior matches policy.", "Audit notes are saved."],
      job: "Daily IT operations and onboarding tasks."
    },
    {
      id: "project_5",
      title: "Beginner Troubleshooting Runbook",
      xp: 70,
      steps: ["Pick one repeated ticket type.", "Write repeatable response checklist.", "Run simulation and refine steps."],
      verify: ["Checklist is clear for another teammate.", "Contains verification and rollback steps."],
      job: "Demonstrates operational maturity for junior roles."
    }
  ];

  const tickets = [
    { id: "t0_1", level: 0, minXp: 0, title: "Recover Missing File", steps: ["Confirm expected file path.", "Check recent rename/move history.", "Restore access and notify user."] },
    { id: "t0_2", level: 0, minXp: 0, title: "Uninstall Broken App", steps: ["Collect error details.", "Uninstall from Apps or Control Panel.", "Verify no startup residue remains."] },
    { id: "t1_1", level: 1, minXp: 200, title: "Create New User Account", steps: ["Create local user.", "Assign proper role.", "Validate sign-in and profile creation."] },
    { id: "t1_2", level: 1, minXp: 200, title: "Fix Folder Permission Denied", steps: ["Check ACL entries.", "Grant least-privilege access.", "Retest with impacted user."] },
    { id: "t3_1", level: 3, minXp: 600, title: "Complex Multi-user Share Incident", steps: ["Map share and NTFS permissions.", "Resolve conflicting inheritance.", "Document final security model."] }
  ];

  function getJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_err) {
      return fallback;
    }
  }

  function setJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getProgress() {
    return getJson(PROGRESS_KEY, {});
  }

  function getStepProgress() {
    return getJson(STEP_PROGRESS_KEY, {});
  }

  function getAnswers() {
    return getJson(ANSWERS_KEY, {});
  }

  function getProjectProgress() {
    return getJson(PROJECTS_KEY, {});
  }

  function getXP() {
    return Number(localStorage.getItem(XP_KEY) || "0");
  }

  function setXP(xp) {
    localStorage.setItem(XP_KEY, String(Math.max(0, xp)));
  }

  function levelRooms(levelId) {
    return rooms.filter(function (r) {
      return r.levelId === levelId;
    });
  }

  function previousRoomId(roomId) {
    const idx = roomOrder.indexOf(roomId);
    return idx > 0 ? roomOrder[idx - 1] : null;
  }

  function stepKey(roomId, step) {
    return roomId + "_step" + step;
  }

  function roomCompleted(roomId) {
    return Boolean(getProgress()[roomId]);
  }

  function countCompletedRoomsInLevel(levelNumber) {
    const progress = getProgress();
    return roomOrder.filter(function (id) {
      const room = roomsMap[id];
      return room.level === levelNumber && progress[id];
    }).length;
  }

  function ensureLevelGateMarkers(levelNumber) {
    const progress = getProgress();
    const completed = countCompletedRoomsInLevel(levelNumber);
    const nextLevel = levelNumber + 1;

    for (let i = 1; i <= completed; i += 1) {
      progress["room" + nextLevel + "_gate_" + i] = true;
    }

    setJson(PROGRESS_KEY, progress);
  }

  function areAllStepsDone(roomId) {
    const steps = getStepProgress();
    for (let i = 1; i <= 9; i += 1) {
      if (!steps[stepKey(roomId, i)]) return false;
    }
    return true;
  }

  function markStepComplete(roomId, step) {
    const steps = getStepProgress();
    const key = stepKey(roomId, step);
    let gained = 0;

    if (!steps[key]) {
      steps[key] = true;
      gained += STEP_XP;
    }

    setJson(STEP_PROGRESS_KEY, steps);

    if (areAllStepsDone(roomId)) {
      const progress = getProgress();
      if (!progress[roomId]) {
        progress[roomId] = true;
        gained += ROOM_XP;
        setJson(PROGRESS_KEY, progress);
        ensureLevelGateMarkers(roomsMap[roomId].level);
      }
    }

    if (gained > 0) {
      setXP(getXP() + gained);
    }

    return gained;
  }

  function isStepUnlocked(roomId, step) {
    if (step === 1) return true;
    const steps = getStepProgress();
    return Boolean(steps[stepKey(roomId, step - 1)]);
  }

  function isRoomUnlockedInOrder(roomId) {
    const prev = previousRoomId(roomId);
    if (!prev) return true;
    const prevRoom = roomsMap[prev];
    const room = roomsMap[roomId];

    if (prevRoom.level !== room.level) {
      const priorLevelRooms = rooms.filter(function (r) {
        return r.level < room.level;
      });
      return priorLevelRooms.every(function (r) {
        return roomCompleted(r.id);
      });
    }

    return roomCompleted(prev);
  }

  function getUnlockedRooms() {
    const progress = JSON.parse(localStorage.getItem("nodezero_progress") || "{}");
    const unlocked = [];

    rooms.forEach(room => {
      const levelComplete = Object.keys(progress)
        .filter(id => id.startsWith(`room${room.level}_`))
        .length;

      if (room.level === 0 || levelComplete >= 5 || progress[room.id]) {
        unlocked.push(room);
      }
    });

    return unlocked;
  }

  let roomId = "";

  function nextRoom() {
    const progress = JSON.parse(localStorage.getItem("nodezero_progress") || "{}");
    const roomIds = Object.keys(roomsMap);
    const currentIndex = roomIds.indexOf(roomId);
    const nextIndex = currentIndex + 1;

    if (nextIndex < roomIds.length) {
      const nextId = roomIds[nextIndex];
      if (progress[roomId]) {
        window.location.href = `room.html?id=${nextId}`;
      } else {
        alert("Complete this mission first to unlock the next room.");
      }
    } else {
      alert("You've completed all rooms! Returning to dashboard.");
      window.location.href = "index.html";
    }
  }

  function dashboardProgress() {
    const total = roomOrder.length * 9;
    const done = Object.keys(getStepProgress()).length;
    return Math.floor((done / total) * 100);
  }

  function topNav() {
    const xp = getXP();
    const pct = xp % 100;
    return ""
      + '<header class="top-hud">'
      + '<div class="hud-brand">NODEZERO | HALO COCKPIT</div>'
      + '<div class="hud-stats">'
      + '  <span>XP ' + xp + '</span>'
      + '  <span>Level ' + Math.floor(xp / 100) + '</span>'
      + '  <span>Progress ' + dashboardProgress() + '%</span>'
      + '</div>'
      + '<div class="hud-bar-wrap"><div class="hud-bar" style="width:' + pct + '%"></div></div>'
      + '<nav class="global-nav">'
      + '  <a href="index.html">Back to Dashboard</a>'
      + '  <a href="room.html?id=' + (roomId || roomOrder[0]) + '">Back to Room</a>'
      + '  <a href="glossary.html">Glossary</a>'
      + '  <a href="projects.html">Projects</a>'
      + '  <a href="tickets.html">Tickets</a>'
      + '  <button id="resetButton" type="button">Reset</button>'
      + '</nav>'
      + '</header>';
  }

  function levelPanel(level) {
    const unlocked = getUnlockedRooms().map(function (r) {
      return r.id;
    });

    const cards = levelRooms(level.id).map(function (room) {
      const doneCount = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (n) {
        return getStepProgress()[stepKey(room.id, n)];
      }).length;
      const done = roomCompleted(room.id);
      const open = unlocked.includes(room.id) && isRoomUnlockedInOrder(room.id);

      return ""
        + '<article class="mission-card ' + (open ? "" : "locked") + '">'
        + '<h3>' + room.id + ' - ' + room.title + (done ? ' [Complete]' : '') + '</h3>'
        + '<p>' + room.summary + '</p>'
        + '<p class="progress-line">Progress: ' + doneCount + '/9 ' + (done ? '<span class="check">check</span>' : '') + '</p>'
        + (open
          ? '<a class="hud-btn" href="room.html?id=' + room.id + '">Start Room</a>'
          : '<button class="hud-btn" disabled>Locked</button>')
        + '</article>';
    }).join('');

    return '<section class="level-panel"><h2>' + level.name + '</h2><div class="room-grid">' + cards + '</div></section>';
  }

  function renderDashboard() {
    const levelBlocks = levels.map(levelPanel).join('');
    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Level Dashboard</h1><p>Levels contain rooms. Rooms contain steps. Steps follow Learn -> See -> Do -> Test -> Break -> Fix -> Explain -> Repeat -> Apply.</p></section>'
      + levelBlocks
      + '</main>';
  }

  function roomContent(room) {
    const stepButtons = STEP_FLOW.map(function (name, idx) {
      const step = idx + 1;
      const unlocked = isStepUnlocked(room.id, step);
      const done = Boolean(getStepProgress()[stepKey(room.id, step)]);
      return '<a class="step-pill ' + (done ? 'done ' : '') + (unlocked ? '' : 'locked') + '" ' + (unlocked ? 'href="step.html?room=' + room.id + '&step=' + step + '"' : 'href="#"') + '>Step ' + step + ' - ' + name + (done ? ' [check]' : '') + '</a>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>' + room.id + ' - ' + room.title + '</h1><p>' + room.summary + '</p><p>Complete all 9 steps to earn +20 room XP.</p></section>'
      + '<section class="content-panel"><h2>Step Flow</h2><div class="step-pills-wrap">' + stepButtons + '</div></section>'
      + '<section class="flow-links">'
      + '<a class="hud-btn" href="index.html">Back to Dashboard</a>'
      + '<a class="hud-btn" href="glossary.html">Glossary</a>'
      + '<a class="hud-btn" href="projects.html">Projects</a>'
      + '<a class="hud-btn" href="tickets.html">Tickets</a>'
      + '<button class="hud-btn" id="nextRoomButton" type="button">Next Room</button>'
      + '</section>'
      + '</main>';
  }

  function buildStepData(room, step) {
    const stepName = STEP_FLOW[step - 1];
    const base = room.title;

    const common = {
      simple: base + ': clear beginner explanation focused on one concept at a time.',
      visual: 'Visual model: Ticket -> Clue -> Layer -> Action -> Verify.',
      handsOn: 'Hands-on: perform one safe check and record before/after evidence.',
      breakFix: 'Break/Fix: intentionally create a small reversible issue, then repair it.',
      explainPrompt: 'Explain this step in your own words as if teaching a new teammate.',
      repeat: 'Repeat mode: rerun the same process with a small variation.',
      jobTicket: 'Job ticket simulation tied to ' + base + '.',
      interview: ['What is your first safe check?', 'How do you verify your fix?', 'How do you document handoff notes?'],
      quiz: [
        { q: 'What should happen first?', options: ['Gather one clue', 'Reinstall immediately', 'Skip verification'], a: 0 },
        { q: 'Why verify after changes?', options: ['Prove result', 'Take longer', 'Avoid evidence'], a: 0 }
      ]
    };

    return {
      title: 'Step ' + step + ' - ' + stepName,
      simple: common.simple,
      visual: common.visual,
      handsOn: common.handsOn,
      quiz: common.quiz,
      breakFix: common.breakFix,
      explainPrompt: common.explainPrompt,
      repeat: common.repeat,
      jobTicket: common.jobTicket,
      interview: common.interview
    };
  }

  function stepSection(label, value) {
    return '<h2>' + label + '</h2><p>' + value + '</p>';
  }

  function renderStep(room, step) {
    const data = buildStepData(room, step);
    const unlocked = isStepUnlocked(room.id, step);

    if (!unlocked) {
      return topNav()
        + '<main class="center-shell"><section class="hero-panel"><h1>' + room.id + ' - ' + room.title + '</h1><p>This step is locked. Complete the previous step first.</p><a class="hud-btn" href="room.html?id=' + room.id + '">Back to Room</a></section></main>';
    }

    const answers = getAnswers();
    const answerKey = stepKey(room.id, step) + '_answer';

    const quiz = data.quiz.map(function (item, i) {
      const opts = item.options.map(function (o, oi) {
        return '<label class="quiz-option"><input type="radio" name="q_' + i + '" value="' + oi + '"> ' + o + '</label>';
      }).join('');
      return '<div class="quiz-block"><p>' + item.q + '</p>' + opts + '</div>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>' + room.id + ' - ' + room.title + '</h1><p>' + data.title + '</p></section>'
      + '<section class="content-panel">'
      + stepSection('Simple explanation', data.simple)
      + stepSection('Visual example', data.visual)
      + stepSection('Hands-on task', data.handsOn)
      + (step === 4 ? ('<h2>Quiz</h2><form id="quizForm">' + quiz + '<button class="hud-btn" type="submit">Check Quiz</button></form><p id="quizResult" class="result-line"></p>') : '')
      + ((step === 5 || step === 6) ? stepSection(step === 5 ? 'Break task' : 'Fix task', data.breakFix) : '')
      + (step === 7 ? stepSection('Explain prompt', data.explainPrompt) : '')
      + (step === 8 ? stepSection('Repeat mode', data.repeat) : '')
      + (step === 9 ? (stepSection('Job ticket', data.jobTicket) + '<h2>Interview questions</h2><ul>' + data.interview.map(function (q) {
        return '<li>' + q + '</li>';
      }).join('') + '</ul>') : '')
      + '<h2>Answer box</h2><textarea id="answerBox" placeholder="Write your notes here...">' + (answers[answerKey] || '') + '</textarea>'
      + '</section>'
      + '<section class="flow-links">'
      + '<a class="hud-btn" href="index.html">Back to Dashboard</a>'
      + '<a class="hud-btn" href="room.html?id=' + room.id + '">Back to Room</a>'
      + '<a class="hud-btn" href="' + (step > 1 ? ('step.html?room=' + room.id + '&step=' + (step - 1)) : ('room.html?id=' + room.id)) + '">Previous Step</a>'
      + '<a class="hud-btn" href="' + (step < 9 ? ('step.html?room=' + room.id + '&step=' + (step + 1)) : ('room.html?id=' + room.id)) + '">Next Step</a>'
      + '<a class="hud-btn" href="glossary.html">Glossary</a>'
      + '<a class="hud-btn" href="projects.html">Projects</a>'
      + '<a class="hud-btn" href="tickets.html">Tickets</a>'
      + '<button class="hud-btn" id="completeStepButton" data-room="' + room.id + '" data-step="' + step + '">Mark Complete (+10 XP)</button>'
      + '</section>'
      + '</main>';
  }

  function renderGlossary() {
    const cards = glossaryTerms.map(function (t) {
      return '<article class="glossary-card" data-term="' + t.word.toLowerCase() + ' ' + t.plain.toLowerCase() + ' ' + t.job.toLowerCase() + '">' + '<h3>' + t.word + '</h3>' + '<p><strong>Word:</strong> ' + t.word + '</p>' + '<p><strong>Plain English:</strong> ' + t.plain + '</p>' + '<p><strong>Why it matters:</strong> ' + t.why + '</p>' + '<p><strong>Where you see it:</strong> ' + t.where + '</p>' + '<p><strong>Real job example:</strong> ' + t.job + '</p>' + '<p><strong>Mini lab:</strong> ' + t.lab + '</p>' + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Glossary</h1><p>Search terms quickly without overwhelm.</p><input id="glossarySearch" class="search-input" type="search" placeholder="Search word, meaning, or job example"></section>'
      + '<section id="glossaryGrid" class="glossary-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderProjects() {
    const progress = getProjectProgress();

    const cards = projects.map(function (p) {
      const done = Boolean(progress[p.id]);
      return '<article class="project-card">'
        + '<h3>' + p.title + (done ? ' [Complete]' : '') + '</h3>'
        + '<p><strong>Step-by-step:</strong></p><ol>' + p.steps.map(function (s) {
          return '<li>' + s + '</li>';
        }).join('') + '</ol>'
        + '<p><strong>Verification steps:</strong></p><ul>' + p.verify.map(function (s) {
          return '<li>' + s + '</li>';
        }).join('') + '</ul>'
        + '<p><strong>Job connection:</strong> ' + p.job + '</p>'
        + '<p><strong>XP reward:</strong> +' + p.xp + '</p>'
        + (done
          ? '<button class="hud-btn" disabled>Reward Claimed</button>'
          : '<button class="hud-btn projectCompleteButton" data-project="' + p.id + '">Claim Project XP</button>')
        + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell"><section class="hero-panel"><h1>Projects</h1><p>Beginner projects with verification and job connection.</p></section><section class="project-grid">' + cards + '</section></main>';
  }

  function renderTickets() {
    const xp = getXP();
    const unlocked = tickets.filter(function (t) {
      return xp >= t.minXp;
    });

    const cards = unlocked.map(function (t) {
      return '<article class="project-card"><h3>' + t.title + '</h3><p><strong>Unlock:</strong> ' + t.minXp + ' XP</p><ol>' + t.steps.map(function (s) {
        return '<li>' + s + '</li>';
      }).join('') + '</ol></article>';
    }).join('');

    return topNav()
      + '<main class="center-shell"><section class="hero-panel"><h1>Tickets</h1><p>Tickets unlock by XP: Level 0 at 0 XP, Level 1 at 200 XP, Level 3 at 600 XP.</p></section><section class="project-grid">' + cards + '</section></main>';
  }

  function bindGlobalHandlers() {
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.addEventListener('click', function () {
        const okay = window.confirm('Reset all progress, XP, answers, and checkmarks?');
        if (!okay) return;
        localStorage.clear();
        window.location.href = 'index.html';
      });
    }

    const nextRoomButton = document.getElementById('nextRoomButton');
    if (nextRoomButton) {
      nextRoomButton.addEventListener('click', function () {
        nextRoom();
      });
    }

    const completeStepButton = document.getElementById('completeStepButton');
    if (completeStepButton) {
      completeStepButton.addEventListener('click', function () {
        const rid = completeStepButton.getAttribute('data-room');
        const step = Number(completeStepButton.getAttribute('data-step'));
        const gained = markStepComplete(rid, step);
        alert('Progress saved. +' + gained + ' XP');
        window.location.reload();
      });
    }

    const answerBox = document.getElementById('answerBox');
    if (answerBox) {
      const params = new URLSearchParams(window.location.search);
      const rid = params.get('room') || '';
      const step = Number(params.get('step') || '0');
      const key = stepKey(rid, step) + '_answer';

      answerBox.addEventListener('input', function () {
        const answers = getAnswers();
        answers[key] = answerBox.value;
        setJson(ANSWERS_KEY, answers);
      });
    }

    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
      quizForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const resultNode = document.getElementById('quizResult');
        const blocks = quizForm.querySelectorAll('.quiz-block');
        let score = 0;

        blocks.forEach(function (_blk, idx) {
          const pick = quizForm.querySelector('input[name="q_' + idx + '"]:checked');
          if (pick && Number(pick.value) === 0) score += 1;
        });

        if (resultNode) {
          resultNode.textContent = 'Quiz score: ' + score + '/' + blocks.length + '.';
        }
      });
    }

    Array.from(document.querySelectorAll('.projectCompleteButton')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        const projectId = btn.getAttribute('data-project');
        const progress = getProjectProgress();
        if (progress[projectId]) return;
        progress[projectId] = true;
        setJson(PROJECTS_KEY, progress);

        const project = projects.find(function (p) {
          return p.id === projectId;
        });
        if (project) {
          setXP(getXP() + project.xp);
        }
        window.location.reload();
      });
    });

    const glossarySearch = document.getElementById('glossarySearch');
    if (glossarySearch) {
      glossarySearch.addEventListener('input', function () {
        const query = glossarySearch.value.trim().toLowerCase();
        Array.from(document.querySelectorAll('#glossaryGrid .glossary-card')).forEach(function (card) {
          const hay = card.getAttribute('data-term') || '';
          card.style.display = hay.includes(query) ? '' : 'none';
        });
      });
    }
  }

  function renderApp() {
    const mount = document.getElementById('app');
    if (!mount) return;

    const pageType = document.body.dataset.page || 'dashboard';
    const params = new URLSearchParams(window.location.search);

    let html = '';

    if (pageType === 'dashboard') {
      roomId = roomOrder[0];
      html = renderDashboard();
    } else if (pageType === 'room') {
      roomId = params.get('id') || roomOrder[0];
      const room = roomsMap[roomId];
      html = room ? roomContent(room) : (topNav() + '<main class="center-shell"><section class="hero-panel"><p>Room not found.</p></section></main>');
    } else if (pageType === 'step') {
      roomId = params.get('room') || roomOrder[0];
      const step = Number(params.get('step') || '1');
      const room = roomsMap[roomId];
      html = room ? renderStep(room, step) : (topNav() + '<main class="center-shell"><section class="hero-panel"><p>Step not found.</p></section></main>');
    } else if (pageType === 'glossary') {
      roomId = roomOrder[0];
      html = renderGlossary();
    } else if (pageType === 'projects') {
      roomId = roomOrder[0];
      html = renderProjects();
    } else if (pageType === 'tickets') {
      roomId = roomOrder[0];
      html = renderTickets();
    } else {
      roomId = roomOrder[0];
      html = topNav() + '<main class="center-shell"><section class="hero-panel"><p>Unknown page type.</p></section></main>';
    }

    mount.innerHTML = html;
    bindGlobalHandlers();
  }

  window.nextRoom = nextRoom;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
