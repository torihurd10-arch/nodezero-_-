(function () {
  const XP_KEY = "nodezero_xp";
  const STATE_KEY = "nodezero_level0_state_v4";
  const STEP_XP = 10;
  const ROOM_XP = 20;

  const STEP_FLOW = [
    { id: 1, slug: "learn", label: "Learn" },
    { id: 2, slug: "see", label: "See" },
    { id: 3, slug: "do", label: "Do" },
    { id: 4, slug: "test", label: "Test" },
    { id: 5, slug: "break", label: "Break" },
    { id: 6, slug: "fix", label: "Fix" },
    { id: 7, slug: "explain", label: "Explain" },
    { id: 8, slug: "repeat", label: "Repeat" },
    { id: 9, slug: "apply", label: "Apply to a Job" }
  ];

  const ROOM_META = [
    { id: "0_1", title: "Room 0.1 - What Is a Computer?", summary: "Meet the four core parts of a computer and how work flows through them.", ticket: "User says the laptop is slow and asks what to check first." },
    { id: "0_2", title: "Room 0.2 - What Is Windows Doing?", summary: "Understand the operating system as the manager of apps, files, and hardware.", ticket: "User signs in to a blank desktop and needs triage." },
    { id: "0_3", title: "Room 0.3 - What Is PowerShell?", summary: "Learn why shell commands speed up support work and make tasks repeatable.", ticket: "Team needs quick system info from many PCs." },
    { id: "0_4", title: "Room 0.4 - What Is Intune / MDM?", summary: "See how cloud device management sets policy, apps, and compliance.", ticket: "Remote laptop is missing policy and company settings." },
    { id: "0_5", title: "Room 0.5 - Files & Folders", summary: "Use paths, file types, and permissions to keep work organized.", ticket: "Shared file is missing and path is unclear." },
    { id: "0_6", title: "Room 0.6 - Networking Basics", summary: "Connect DNS, IP, ports, and protocols into one mental model.", ticket: "Site works by IP but fails by name." },
    { id: "0_7", title: "Room 0.7 - Command Prompt Basics", summary: "Navigate folders and run core commands with confidence.", ticket: "Script fails because terminal is in the wrong folder." },
    { id: "0_8", title: "Room 0.8 - PowerShell Basics", summary: "Use objects, cmdlets, and pipelines to automate support checks.", ticket: "Need one command to list stopped services." },
    { id: "0_9", title: "Room 0.9 - Beginner Automation Mindset", summary: "Turn repeatable support tasks into safe, testable automation habits.", ticket: "Daily ticket steps are repeated and error-prone." }
  ];

  const LABELS = {
    learn: "Core idea in simple words.",
    see: "Visual model and real-world view.",
    do: "Hands-on task with exact actions.",
    test: "Quick quiz to verify understanding.",
    break: "Intentionally reproduce a common failure.",
    fix: "Repair using a reliable checklist.",
    explain: "State the idea in your own words.",
    repeat: "Short repetition mode to lock memory.",
    apply: "Connect skill to jobs, tickets, and interviews."
  };

  const GLOSSARY = [
    ["CPU", "Processor executing instructions", "Apps and system tasks use CPU", "High CPU slows systems", "Think: computer brain"],
    ["RAM", "Short-term active memory", "Many tabs consume RAM", "Low RAM causes lag", "Think: desk workspace"],
    ["Operating System", "Software manager for hardware/apps", "Windows handles sessions/services", "Separates app vs OS issues", "Think: control tower"],
    ["PowerShell", "Command shell and scripting language", "Get-Service and Get-Process", "Speeds repeated tasks", "Think: system remote"],
    ["Intune", "Cloud endpoint management", "Deploy policy to company devices", "Core modern endpoint skill", "Think: fleet control"],
    ["Path", "Address to a file or folder", "C:/Users/Name/Documents/file.txt", "Wrong paths break tasks", "Think: street address"],
    ["DNS", "Name to IP translation", "example.com -> IP", "Common root cause of web failures", "Think: internet phonebook"],
    ["IP Address", "Numeric network identity", "Used in ping/troubleshooting", "Foundational networking concept", "Think: network house number"],
    ["Command Prompt", "Windows text command shell", "cd/dir/ipconfig", "Fast diagnostics", "Think: direct text control"],
    ["Cmdlet", "Verb-Noun PowerShell command", "Get-Help, Get-Item", "Consistent syntax helps speed", "Think: command blocks"],
    ["Automation", "Repeatable scripted workflow", "Daily checks as script", "Reduces human error", "Think: build once run often"],
    ["Runbook", "Documented support process", "Incident response checklist", "Consistency across team", "Think: playbook"]
  ].map(function (i) {
    return { term: i[0], definition: i[1], example: i[2], matters: i[3], memory: i[4] };
  });

  const PROJECTS = [
    { id: "p1", title: "System Snapshot Checklist", summary: "Collect CPU, RAM, disk, and OS evidence in one report.", steps: ["Capture CPU/Memory/Disk", "Record OS version", "Write 5-line health summary"], verify: "Another person can spot likely bottleneck.", job: "Help desk first-line triage", xp: 40 },
    { id: "p2", title: "Path Recovery Drill", summary: "Break and fix a file path issue.", steps: ["Create nested folders", "Break path intentionally", "Recover and verify access"], verify: "File opens by exact path and shortcut.", job: "Shared drive support", xp: 45 },
    { id: "p3", title: "DNS vs Network Triage", summary: "Differentiate DNS failure from full outage.", steps: ["Test IP connectivity", "Test domain connectivity", "Write root-cause note"], verify: "Diagnosis clearly identifies DNS or broader outage.", job: "NOC/help desk workflow", xp: 50 },
    { id: "p4", title: "PowerShell Service Audit", summary: "List stopped services and export findings.", steps: ["Run Get-Service", "Filter stopped", "Export findings"], verify: "Report includes service, status, and action.", job: "Endpoint maintenance", xp: 50 },
    { id: "p5", title: "Mini Automation Playbook", summary: "Design a safe repeatable automation flow.", steps: ["Pick repeated ticket", "Define input-action-output", "Test and document rollback"], verify: "Teammate can repeat flow safely.", job: "Junior operations growth path", xp: 60 }
  ];

  function buildRoomContent(meta) {
    return {
      roomId: meta.id,
      title: meta.title,
      summary: meta.summary,
      ticket: meta.ticket,
      steps: STEP_FLOW.map(function (f) {
        const base = meta.title.replace(/^Room\s\d\.\d\s-\s/, "");
        const common = {
          step: f.id,
          slug: f.slug,
          title: meta.title + " - Step " + f.id + ": " + f.label,
          explanation: [
            base + " in simple terms: " + meta.summary,
            "Use one clue at a time, then test one safe change.",
            "Always verify and document outcome before moving on."
          ],
          visual: [
            "Ticket -> clue -> layer -> test -> verify",
            "Before -> action -> after",
            "Small checks beat big guesses"
          ]
        };

        if (f.slug === "test") {
          common.quiz = [
            {
              question: base + ": what is the first support move?",
              options: ["Gather one clear clue", "Reinstall everything", "Skip to final fix"],
              answer: 0
            },
            {
              question: "Why verify after each change?",
              options: ["To prove cause and effect", "To make notes longer", "To avoid learning"],
              answer: 0
            }
          ];
        } else if (f.slug === "explain") {
          common.prompt = "Explain " + base + " in 4 plain lines to a new teammate.";
        } else if (f.slug === "apply") {
          common.jobTicket = "Ticket simulation: " + meta.ticket;
          common.interview = [
            "How would you triage this issue safely?",
            "How do you prove the fix is stable?",
            "How would you document handoff notes?"
          ];
          common.realWorld = [
            "Used in first-line support triage.",
            "Used in remote support communication.",
            "Used to build repeatable team workflows."
          ];
        } else {
          common.task = [
            "Perform one check tied to this room topic.",
            "Capture evidence in notes.",
            "Write: Before, Action, After."
          ];
        }

        if (f.slug === "break") {
          common.task = [
            "Create a safe reversible break (path typo, service stop, wrong setting).",
            "Record exact error text.",
            "Do not skip rollback planning."
          ];
        }

        if (f.slug === "fix") {
          common.task = [
            "Undo the break from Step 5.",
            "Verify baseline behavior is restored.",
            "Write one-line root cause and prevention."
          ];
        }

        if (f.slug === "repeat") {
          common.task = [
            "Repeat Steps 3-6 with one variation.",
            "Complete in less time than first run.",
            "Record the new completion time."
          ];
        }

        return common;
      })
    };
  }

  const ROOMS = ROOM_META.map(buildRoomContent);

  function getState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
      return {
        completedSteps: parsed.completedSteps || {},
        completedRooms: parsed.completedRooms || {},
        answers: parsed.answers || {},
        projectDone: parsed.projectDone || {}
      };
    } catch (_err) {
      return { completedSteps: {}, completedRooms: {}, answers: {}, projectDone: {} };
    }
  }

  function setState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  function getXP() {
    return parseInt(localStorage.getItem(XP_KEY) || "0", 10);
  }

  function setXP(xp) {
    localStorage.setItem(XP_KEY, String(Math.max(0, xp)));
  }

  function roomById(roomId) {
    return ROOMS.find(function (r) { return r.roomId === roomId; });
  }

  function roomKey(roomId) {
    return "room_" + roomId;
  }

  function stepKey(roomId, step) {
    return "room_" + roomId + "_step_" + step;
  }

  function roomIndex(roomId) {
    return ROOMS.findIndex(function (r) { return r.roomId === roomId; });
  }

  function roomUnlocked(roomId, state) {
    const idx = roomIndex(roomId);
    if (idx <= 0) return true;
    return Boolean(state.completedRooms[roomKey(ROOMS[idx - 1].roomId)]);
  }

  function stepUnlocked(roomId, step, state) {
    if (!roomUnlocked(roomId, state)) return false;
    if (step <= 1) return true;
    return Boolean(state.completedSteps[stepKey(roomId, step - 1)]);
  }

  function completedStepCount(roomId, state) {
    return STEP_FLOW.filter(function (f) { return state.completedSteps[stepKey(roomId, f.id)]; }).length;
  }

  function dashboardPercent(state) {
    const total = ROOMS.length * STEP_FLOW.length;
    return Math.floor((Object.keys(state.completedSteps).length / total) * 100);
  }

  function grantStepCompletion(roomId, step) {
    const state = getState();
    let gained = 0;
    const key = stepKey(roomId, step);

    if (!state.completedSteps[key]) {
      state.completedSteps[key] = true;
      gained += STEP_XP;
    }

    const roomDone = completedStepCount(roomId, state) === STEP_FLOW.length;
    const rk = roomKey(roomId);
    if (roomDone && !state.completedRooms[rk]) {
      state.completedRooms[rk] = true;
      gained += ROOM_XP;
    }

    setState(state);
    if (gained > 0) setXP(getXP() + gained);
    return { gained: gained, roomDone: roomDone };
  }

  function markProjectComplete(projectId) {
    const state = getState();
    if (state.projectDone[projectId]) return false;
    const p = PROJECTS.find(function (x) { return x.id === projectId; });
    state.projectDone[projectId] = true;
    setState(state);
    if (p) setXP(getXP() + p.xp);
    return true;
  }

  function roomHref(prefix, roomId) {
    return prefix + "level0/room" + roomId + "/room" + roomId + ".html";
  }

  function stepHref(prefix, roomId, step) {
    const meta = STEP_FLOW.find(function (f) { return f.id === step; });
    return prefix + "level0/room" + roomId + "/step" + step + "_" + meta.slug + ".html";
  }

  function topBar(prefix) {
    const state = getState();
    const xp = getXP();
    const level = Math.floor(xp / 100);
    const width = xp % 100;

    return ""
      + '<header class="top-hud">'
      + '  <div class="hud-brand">NODEZERO | LEVEL 0 COCKPIT</div>'
      + '  <div class="hud-stats"><span>Level ' + level + '</span><span>' + xp + ' XP</span><span>' + dashboardPercent(state) + '% Complete</span></div>'
      + '  <div class="hud-bar-wrap"><div class="hud-bar" style="width:' + width + '%"></div></div>'
      + '  <nav class="global-nav">'
      + '    <a href="' + prefix + 'index.html">Back to Dashboard</a>'
      + '    <a href="' + prefix + 'glossary.html">Glossary</a>'
      + '    <a href="' + prefix + 'projects.html">Projects</a>'
      + '    <button id="resetProgressButton" type="button">Reset</button>'
      + '  </nav>'
      + '</header>';
  }

  function renderDashboard(prefix) {
    const state = getState();
    const cards = ROOMS.map(function (room, idx) {
      const unlocked = roomUnlocked(room.roomId, state);
      const done = Boolean(state.completedRooms[roomKey(room.roomId)]);
      const progress = completedStepCount(room.roomId, state);
      return ""
        + '<article class="mission-card ' + (unlocked ? "" : "locked") + '">'
        + '  <h3>' + room.title + '</h3>'
        + '  <p>' + room.summary + '</p>'
        + '  <p class="progress-line">Progress: ' + progress + '/9 ' + (done ? '<span class="check">check</span>' : '') + '</p>'
        + '  <p class="progress-line">Room XP: 110 total</p>'
        + (unlocked
          ? '  <a class="hud-btn" href="' + roomHref(prefix, room.roomId) + '">Enter Mission</a>'
          : '  <button class="hud-btn" disabled>Locked - complete Room ' + idx + '.x first</button>')
        + '</article>';
    }).join("");

    return topBar(prefix)
      + '<main class="center-shell">'
      + '  <section class="hero-panel"><h1>Level 0 Dashboard</h1><p>TryHackMe-style flow: Dashboard -> Rooms -> Pages -> Steps.</p><p>Complete steps in order to unlock next room.</p></section>'
      + '  <section class="room-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderRoom(prefix, roomId) {
    const state = getState();
    const room = roomById(roomId);
    if (!room) return topBar(prefix) + '<main class="center-shell"><section class="hero-panel"><p>Room not found.</p></section></main>';
    if (!roomUnlocked(roomId, state)) {
      return topBar(prefix) + '<main class="center-shell"><section class="hero-panel"><h1>' + room.title + '</h1><p>This room is locked until previous room is complete.</p><a class="hud-btn" href="' + prefix + 'index.html">Back to Dashboard</a></section></main>';
    }

    const stepCards = STEP_FLOW.map(function (f) {
      const unlocked = stepUnlocked(roomId, f.id, state);
      const done = state.completedSteps[stepKey(roomId, f.id)];
      return ""
        + '<article class="step-card ' + (unlocked ? "" : "locked") + '">'
        + '<h3>Step ' + f.id + ': ' + f.label + '</h3>'
        + '<p>' + LABELS[f.slug] + '</p>'
        + '<p>' + (done ? 'Completed check' : 'Not completed') + '</p>'
        + (unlocked
          ? '<a class="hud-btn" href="' + stepHref(prefix, roomId, f.id) + '">Open Step</a>'
          : '<button class="hud-btn" disabled>Locked</button>')
        + '</article>';
    }).join("");

    return topBar(prefix)
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>' + room.title + '</h1><p>' + room.summary + '</p><p>Scenario: ' + room.ticket + '</p><div class="flow-links"><a class="hud-btn" href="' + prefix + 'index.html">Back to Dashboard</a><a class="hud-btn" href="' + prefix + 'glossary.html">Glossary</a><a class="hud-btn" href="' + prefix + 'projects.html">Projects</a></div></section>'
      + '<section class="step-grid">' + stepCards + '</section>'
      + '</main>';
  }

  function renderStep(prefix, roomId, step) {
    const state = getState();
    const room = roomById(roomId);
    if (!room) return topBar(prefix) + '<main class="center-shell"><section class="hero-panel"><p>Step not found.</p></section></main>';
    if (!roomUnlocked(roomId, state)) return topBar(prefix) + '<main class="center-shell"><section class="hero-panel"><p>Room is locked.</p></section></main>';
    if (!stepUnlocked(roomId, step, state)) return topBar(prefix) + '<main class="center-shell"><section class="hero-panel"><p>This step unlocks after previous step.</p><a class="hud-btn" href="' + roomHref(prefix, roomId) + '">Back to Room</a></section></main>';

    const data = room.steps.find(function (s) { return s.step === step; });
    const prevHref = step > 1 ? stepHref(prefix, roomId, step - 1) : roomHref(prefix, roomId);
    const nextHref = step < 9 ? stepHref(prefix, roomId, step + 1) : roomHref(prefix, roomId);

    const makeList = function (arr) {
      return '<ul>' + arr.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    };

    const quizHtml = data.quiz
      ? '<h2>Quiz</h2><form id="quizForm">'
        + data.quiz.map(function (q, i) {
          return '<div class="quiz-block"><p>' + q.question + '</p>'
            + q.options.map(function (o, oi) {
              return '<label class="quiz-option"><input type="radio" name="q_' + i + '" value="' + oi + '"> ' + o + '</label>';
            }).join('')
            + '</div>';
        }).join('')
        + '<button class="hud-btn" type="submit">Submit Quiz</button></form><p id="quizResult" class="result-line"></p>'
      : '';

    const applyHtml = data.jobTicket
      ? '<h2>Job Ticket</h2><p>' + data.jobTicket + '</p><h2>Interview Questions</h2>' + makeList(data.interview || []) + '<h2>Real-World Examples</h2>' + makeList(data.realWorld || [])
      : '';

    const taskHtml = data.task ? '<h2>Hands-on Task</h2>' + makeList(data.task) : '';
    const explainHtml = data.prompt ? '<h2>Explain in Your Own Words</h2><p>' + data.prompt + '</p><textarea id="explainInput" rows="5" placeholder="Type your explanation here"></textarea>' : '';

    return topBar(prefix)
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>' + data.title + '</h1><p>' + LABELS[data.slug] + '</p></section>'
      + '<section class="content-panel"><h2>Simple Explanation</h2>' + makeList(data.explanation) + '<h2>Visual Example</h2>' + makeList(data.visual) + taskHtml + quizHtml + explainHtml + applyHtml + '</section>'
      + '<section class="flow-links">'
      + '<a class="hud-btn" href="' + prefix + 'index.html">Back to Dashboard</a>'
      + '<a class="hud-btn" href="' + roomHref(prefix, roomId) + '">Back to Room</a>'
      + '<a class="hud-btn" href="' + prevHref + '">Previous Step</a>'
      + '<a class="hud-btn" href="' + nextHref + '">Next Step</a>'
      + '<a class="hud-btn" href="' + prefix + 'glossary.html">Glossary</a>'
      + '<a class="hud-btn" href="' + prefix + 'projects.html">Projects</a>'
      + '<button class="hud-btn" id="completeStepButton" data-room="' + roomId + '" data-step="' + step + '">Mark Step Complete (+10 XP)</button>'
      + '</section>'
      + '</main>';
  }

  function renderGlossary(prefix) {
    const cards = GLOSSARY.map(function (g, i) {
      return '<article class="glossary-card" data-card="' + i + '"><h3>' + g.term + '</h3><p><strong>Definition:</strong> ' + g.definition + '</p><p><strong>Real-world example:</strong> ' + g.example + '</p><p><strong>Why it matters:</strong> ' + g.matters + '</p><p><strong>How to remember it:</strong> ' + g.memory + '</p></article>';
    }).join('');

    return topBar(prefix)
      + '<main class="center-shell"><section class="hero-panel"><h1>Level 0 Glossary</h1><p>Simple definitions, examples, and memory hooks.</p><button id="flashModeButton" class="hud-btn" type="button">Toggle Flashcard Mode</button></section><section class="glossary-grid">' + cards + '</section></main>';
  }

  function renderProjects(prefix) {
    const state = getState();
    const cards = PROJECTS.map(function (p) {
      const done = Boolean(state.projectDone[p.id]);
      return '<article class="project-card"><h3>' + p.title + '</h3><p>' + p.summary + '</p><h4>Step-by-step</h4><ul>' + p.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul><p><strong>Verification:</strong> ' + p.verify + '</p><p><strong>Job connection:</strong> ' + p.job + '</p><p><strong>Reward:</strong> +' + p.xp + ' XP ' + (done ? 'check' : '') + '</p><button class="hud-btn project-complete" data-project="' + p.id + '"' + (done ? ' disabled' : '') + '>' + (done ? 'Completed' : ('Mark Complete (+' + p.xp + ' XP)')) + '</button></article>';
    }).join('');

    return topBar(prefix)
      + '<main class="center-shell"><section class="hero-panel"><h1>Level 0 Projects</h1><p>Hands-on project missions with verification and job relevance.</p></section><section class="project-grid">' + cards + '</section></main>';
  }

  function bindReset(prefix) {
    const btn = document.getElementById("resetProgressButton");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const ok = window.confirm("Reset all Level 0 progress? This clears XP, completed steps, completed rooms, saved answers, and checkmarks.");
      if (!ok) return;
      localStorage.clear();
      window.location.href = prefix + "index.html";
    });
  }

  function bindStepControls(roomId, step) {
    const complete = document.getElementById("completeStepButton");
    if (complete) {
      complete.addEventListener("click", function () {
        const out = grantStepCompletion(roomId, step);
        window.alert("Progress saved. +" + out.gained + " XP earned." + (out.roomDone ? " Room bonus included." : ""));
        window.location.reload();
      });
    }

    const quizForm = document.getElementById("quizForm");
    if (quizForm) {
      quizForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const room = roomById(roomId);
        const data = room.steps.find(function (s) { return s.step === step; });
        const quiz = data.quiz || [];
        let score = 0;
        quiz.forEach(function (q, i) {
          const picked = quizForm.querySelector('input[name="q_' + i + '"]:checked');
          if (picked && parseInt(picked.value, 10) === q.answer) score += 1;
        });
        const node = document.getElementById("quizResult");
        if (node) node.textContent = "Quiz score: " + score + "/" + quiz.length + ".";
      });
    }

    const explain = document.getElementById("explainInput");
    if (explain) {
      const state = getState();
      const key = stepKey(roomId, step) + "_explain";
      explain.value = state.answers[key] || "";
      explain.addEventListener("input", function () {
        const next = getState();
        next.answers[key] = explain.value;
        setState(next);
      });
    }
  }

  function bindGlossaryFlash() {
    const btn = document.getElementById("flashModeButton");
    if (!btn) return;
    btn.addEventListener("click", function () {
      document.body.classList.toggle("flash-mode");
    });
  }

  function bindProjectControls() {
    Array.from(document.querySelectorAll(".project-complete")).forEach(function (b) {
      b.addEventListener("click", function () {
        if (markProjectComplete(b.dataset.project)) {
          window.alert("Project completed and XP awarded.");
          window.location.reload();
        }
      });
    });
  }

  function render() {
    const app = document.getElementById("app");
    if (!app) return;

    const page = document.body.dataset.page || "dashboard";
    const roomId = document.body.dataset.room || "";
    const step = parseInt(document.body.dataset.step || "0", 10);
    const prefix = document.body.dataset.rootPrefix || "./";

    let html = "";
    if (page === "dashboard") html = renderDashboard(prefix);
    else if (page === "room") html = renderRoom(prefix, roomId);
    else if (page === "step") html = renderStep(prefix, roomId, step);
    else if (page === "glossary") html = renderGlossary(prefix);
    else if (page === "projects") html = renderProjects(prefix);
    else html = topBar(prefix) + '<main class="center-shell"><section class="hero-panel"><p>Unknown page.</p></section></main>';

    app.innerHTML = html;

    bindReset(prefix);
    if (page === "step") bindStepControls(roomId, step);
    if (page === "glossary") bindGlossaryFlash();
    if (page === "projects") bindProjectControls();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
