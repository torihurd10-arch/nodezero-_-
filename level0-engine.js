(function () {
  "use strict";

  var STORAGE = {
    xp: "nodezero_v1_xp",
    confidence: "nodezero_v1_confidence",
    missionsCompleted: "nodezero_v1_missions_completed",
    repetitions: "nodezero_v1_repetitions",
    weakAreas: "nodezero_v1_weak_areas",
    ticketPass: "nodezero_v1_ticket_pass",
    callsQueue: "nodezero_v1_calls_queue",
    streak: "nodezero_v1_streak",
    lastVisit: "nodezero_v1_last_visit",
    sectionState: "nodezero_v1_section_state",
    explainState: "nodezero_v1_explain_state",
    verifyState: "nodezero_v1_verify_state",
    reflectionState: "nodezero_v1_reflection_state"
  };

  var SECTION_ORDER = [
    "ticket",
    "clue",
    "tooltip",
    "investigation",
    "action",
    "repeat",
    "breakfix",
    "explain",
    "verification",
    "ticketcompletion",
    "rewards",
    "reflection"
  ];

  var SECTION_LABEL = {
    ticket: "Ticket",
    clue: "Clue",
    tooltip: "Tool Tip",
    investigation: "Investigation",
    action: "Action",
    repeat: "Repeat Challenge",
    breakfix: "Break/Fix Challenge",
    explain: "Explain Challenge",
    verification: "Verification",
    ticketcompletion: "Ticket Completion",
    rewards: "Rewards",
    reflection: "Reflection"
  };

  var TITLES = [
    "New Computer User",
    "IT Explorer",
    "IT Intern",
    "Junior Technician",
    "Help Desk Technician",
    "Desktop Support",
    "Endpoint Specialist",
    "Endpoint Administrator",
    "Endpoint Engineer"
  ];

  var fallbackCalls = [
    "Sarah forgot password again",
    "Install Chrome",
    "Find Downloads folder",
    "Computer won't shut down"
  ];

  var missions = [];

  function getJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_err) {
      return fallback;
    }
  }

  function setJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getNumber(key) {
    return Number(localStorage.getItem(key) || "0");
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(Math.max(0, Number(value) || 0)));
  }

  function findMission(id) {
    for (var i = 0; i < missions.length; i += 1) {
      if (missions[i].id === id) return missions[i];
    }
    return null;
  }

  function missionIds() {
    return missions.map(function (m) { return m.id; });
  }

  function isMissionUnlocked(id) {
    var order = missionIds();
    var idx = order.indexOf(id);
    if (idx <= 0) return true;
    var completed = getJson(STORAGE.missionsCompleted, {});
    return Boolean(completed[order[idx - 1]]);
  }

  function currentMissionId() {
    var completed = getJson(STORAGE.missionsCompleted, {});
    var order = missionIds();
    for (var i = 0; i < order.length; i += 1) {
      if (!completed[order[i]]) return order[i];
    }
    return order.length ? order[order.length - 1] : "";
  }

  function progressPercent() {
    if (!missions.length) return 0;
    var done = Object.keys(getJson(STORAGE.missionsCompleted, {})).length;
    return Math.floor((done / missions.length) * 100);
  }

  function currentTitle() {
    var done = Object.keys(getJson(STORAGE.missionsCompleted, {})).length;
    var idx = Math.min(done, TITLES.length - 1);
    return TITLES[idx];
  }

  function sectionState() {
    return getJson(STORAGE.sectionState, {});
  }

  function markSectionDone(missionId, section) {
    var state = sectionState();
    if (!state[missionId]) state[missionId] = {};
    state[missionId][section] = true;
    setJson(STORAGE.sectionState, state);
  }

  function isSectionDone(missionId, section) {
    var state = sectionState();
    return Boolean(state[missionId] && state[missionId][section]);
  }

  function isSectionUnlocked(missionId, section) {
    if (section === SECTION_ORDER[0]) return true;
    var idx = SECTION_ORDER.indexOf(section);
    if (idx < 1) return false;
    return isSectionDone(missionId, SECTION_ORDER[idx - 1]);
  }

  function updateStreak() {
    var today = new Date().toISOString().slice(0, 10);
    var last = localStorage.getItem(STORAGE.lastVisit) || "";
    var streak = getNumber(STORAGE.streak);

    if (last === today) return streak;

    if (!last) {
      streak = 1;
    } else {
      var prev = new Date(last + "T00:00:00");
      var now = new Date(today + "T00:00:00");
      var diff = Math.floor((now - prev) / (1000 * 60 * 60 * 24));
      streak = diff === 1 ? streak + 1 : 1;
    }

    localStorage.setItem(STORAGE.lastVisit, today);
    setNumber(STORAGE.streak, streak);
    return streak;
  }

  function queueMissionCall(missionId, reason) {
    var queue = getJson(STORAGE.callsQueue, {});
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var day3 = new Date();
    day3.setDate(day3.getDate() + 3);
    var day7 = new Date();
    day7.setDate(day7.getDate() + 7);

    queue[missionId] = [
      { when: "Tomorrow", date: tomorrow.toISOString().slice(0, 10), reason: reason },
      { when: "Three Days", date: day3.toISOString().slice(0, 10), reason: reason },
      { when: "Seven Days", date: day7.toISOString().slice(0, 10), reason: reason }
    ];

    setJson(STORAGE.callsQueue, queue);
  }

  function clearMissionCall(missionId) {
    var queue = getJson(STORAGE.callsQueue, {});
    delete queue[missionId];
    setJson(STORAGE.callsQueue, queue);
  }

  function setWeakArea(missionId, area) {
    var weak = getJson(STORAGE.weakAreas, {});
    if (!weak[missionId]) weak[missionId] = [];
    if (weak[missionId].indexOf(area) < 0) weak[missionId].push(area);
    setJson(STORAGE.weakAreas, weak);
  }

  function clearWeakAreas(missionId) {
    var weak = getJson(STORAGE.weakAreas, {});
    delete weak[missionId];
    setJson(STORAGE.weakAreas, weak);
  }

  function canOpenTicket(missionId) {
    var reps = getJson(STORAGE.repetitions, {});
    var explain = getJson(STORAGE.explainState, {});
    var verify = getJson(STORAGE.verifyState, {});

    var repOk = Number(reps[missionId] || 0) >= 3;
    var explainEntry = explain[missionId] || { q1: "", q2: "", q3: "" };
    var explainOk = (explainEntry.q1 + explainEntry.q2 + explainEntry.q3).trim().length >= 30;
    var verifyEntry = verify[missionId] || {};
    var verifyOk = Boolean(verifyEntry.explain && verifyEntry.perform && verifyEntry.troubleshoot && verifyEntry.repeat);

    return isSectionDone(missionId, "do") && isSectionDone(missionId, "breakfix") && repOk && explainOk && verifyOk;
  }

  function completionCheck(missionId) {
    var missing = [];
    var reps = getJson(STORAGE.repetitions, {});
    var explain = getJson(STORAGE.explainState, {});
    var verify = getJson(STORAGE.verifyState, {});
    var tickets = getJson(STORAGE.ticketPass, {});

    if (!isSectionDone(missionId, "do")) missing.push("do");
    if (!isSectionDone(missionId, "breakfix")) missing.push("breakfix");
    if (Number(reps[missionId] || 0) < 3) missing.push("repeat");

    var explainEntry = explain[missionId] || { q1: "", q2: "", q3: "" };
    if ((explainEntry.q1 + explainEntry.q2 + explainEntry.q3).trim().length < 30) missing.push("explain");

    var verifyEntry = verify[missionId] || {};
    if (!(verifyEntry.explain && verifyEntry.perform && verifyEntry.troubleshoot && verifyEntry.repeat)) missing.push("verification");

    if (!tickets[missionId]) missing.push("ticket");

    return { ok: missing.length === 0, missing: missing };
  }

  function feedback(type, extra) {
    if (type === "ok") return "✔ Correct" + (extra ? " - " + extra : "");
    if (type === "hint") return "💡 Need a Hint?" + (extra ? " " + extra : "");
    return "❌ Try Again" + (extra ? " - " + extra : "");
  }

  function topNav() {
    var streak = updateStreak();
    return ""
      + '<header class="top-hud">'
      + '<div class="hud-brand">NODEZERO | HALO COCKPIT V1</div>'
      + '<div class="hud-stats">'
      + '<span>Current Title: ' + esc(currentTitle()) + '</span>'
      + '<span>XP: ' + getNumber(STORAGE.xp) + '</span>'
      + '<span>Progress: ' + progressPercent() + '%</span>'
      + '<span>Current Mission: ' + esc((findMission(currentMissionId()) || {}).title || "None") + '</span>'
      + '<span>Daily Calls: ' + Math.max(Object.keys(getJson(STORAGE.callsQueue, {})).length, fallbackCalls.length) + '</span>'
      + '<span>Streak: ' + streak + '</span>'
      + '<span>Confidence: ' + getNumber(STORAGE.confidence) + '</span>'
      + '</div>'
      + '<nav class="global-nav">'
      + '<a href="room.html?id=' + currentMissionId() + '">Continue Mission</a>'
      + '<a href="glossary.html">Glossary</a>'
      + '<a href="repeat.html">Today\'s Calls</a>'
      + '<a href="tickets.html">Tickets</a>'
      + '<a href="index.html">Dashboard</a>'
      + '<button type="button" id="resetButton">Reset</button>'
      + '</nav>'
      + '</header>';
  }

  function renderDashboard() {
    var current = findMission(currentMissionId());
    var queue = getJson(STORAGE.callsQueue, {});

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Dashboard</h1><p>TryHackMe + Duolingo + fake IT job loop.</p></section>'
      + '<section class="content-panel">'
      + '<h2>Main Screen</h2>'
      + '<p><strong>Current Mission:</strong> ' + esc(current ? current.title : "None") + '</p>'
      + '<p><strong>Current Title:</strong> ' + esc(currentTitle()) + '</p>'
      + '<p><strong>XP:</strong> ' + getNumber(STORAGE.xp) + '</p>'
      + '<p><strong>Confidence:</strong> ' + getNumber(STORAGE.confidence) + '</p>'
      + '<p><strong>Repeat Queue:</strong> ' + Object.keys(queue).length + '</p>'
      + '<div class="progress-wrap"><div class="progress-fill" style="width:' + progressPercent() + '%"></div></div>'
      + '<div class="flow-links">'
      + '<a class="hud-btn" href="room.html?id=' + currentMissionId() + '">Continue Mission</a>'
      + '<a class="hud-btn" href="glossary.html">Glossary</a>'
      + '<a class="hud-btn" href="repeat.html">Today\'s Calls</a>'
      + '<a class="hud-btn" href="tickets.html">Tickets</a>'
      + '</div>'
      + '</section>'
      + '</main>';
  }

  function renderMissionList(selectedId) {
    var sections = [0, 1].map(function (level) {
      var cards = missions.filter(function (m) {
        return m.level === level;
      }).map(function (m) {
        var open = isMissionUnlocked(m.id);
        var done = Boolean(getJson(STORAGE.missionsCompleted, {})[m.id]);

        return ''
          + '<article class="mission-card ' + (open ? '' : 'locked') + '">'
          + '<h3>' + esc(m.title) + '</h3>'
          + '<p><strong>NPC:</strong> ' + esc(m.npc) + '</p>'
          + '<p><strong>Ticket:</strong> ' + esc(m.ticket) + '</p>'
          + '<p class="progress-line">' + (done ? 'Mission Complete' : (open ? 'Ready' : 'Locked')) + '</p>'
          + (open
            ? '<a class="hud-btn" href="step.html?mission=' + m.id + '&section=ticket">Enter Mission</a>'
            : '<button class="hud-btn" disabled>Locked</button>')
          + '</article>';
      }).join('');

      return '<section class="content-panel"><h2>' + esc(level === 0 ? 'Level 0 - Computer Fundamentals' : 'Level 1 - Windows Fundamentals') + '</h2><div class="room-grid">' + cards + '</div></section>';
    }).join('');

    var selected = findMission(selectedId) || findMission(currentMissionId());

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Mission System</h1><p>Current Mission: ' + esc(selected ? selected.title : 'None') + '</p></section>'
      + sections
      + '</main>';
  }

  function termPanel(mission) {
    var chips = mission.translationTerms.map(function (t, idx) {
      return '<button class="term-chip" type="button" data-mission="' + mission.id + '" data-term="' + idx + '">' + esc(t.word) + '</button>';
    }).join('');

    return '<div class="term-wrap"><p><strong>Translation Habit:</strong> Tap a term.</p><div class="chip-row">' + chips + '</div><div id="termPopup" class="term-popup"></div></div>';
  }

  function renderMissionSection(missionId, section) {
    var mission = findMission(missionId);
    if (!mission) return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Mission not found.</p></section></main>';
    if (!isMissionUnlocked(missionId)) return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Mission locked.</p></section></main>';
    if (!isSectionUnlocked(missionId, section)) return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Section locked. Complete previous section first.</p></section></main>';

    var idx = SECTION_ORDER.indexOf(section);
    var prev = idx > 0 ? SECTION_ORDER[idx - 1] : null;
    var next = idx < SECTION_ORDER.length - 1 ? SECTION_ORDER[idx + 1] : null;

    var body = '';
    var actions = '';

    if (section === 'ticket') {
      body = '<h2>Ticket</h2><p>' + esc(mission.ticket) + '</p><p><strong>Reward:</strong> +10 XP | <strong>Time:</strong> ' + mission.estimatedMinutes + ' min | <strong>Difficulty:</strong> ' + esc(mission.difficulty) + '</p>';
      actions = '<button class="hud-btn" id="openTicketBtn" data-mission="' + mission.id + '">Open Ticket (+10 XP)</button>';
    } else if (section === 'clue') {
      body = '<h2>Clue</h2><p>' + esc(mission.clue) + '</p>';
      actions = '<button class="hud-btn" id="markBtn" data-mission="' + mission.id + '" data-section="clue">Mark Clue Done</button>';
    } else if (section === 'tooltip') {
      body = '<h2>Tool Tip</h2><p>' + esc(mission.tooltip) + '</p><p>' + esc(mission.whyItMatters) + '</p><p><strong>Career Connection:</strong> ' + esc(mission.careerConnection) + '</p>';
      actions = '<button class="hud-btn" id="markBtn" data-mission="' + mission.id + '" data-section="tooltip">Mark Tool Tip Done</button>';
    } else if (section === 'investigation') {
      var options = mission.interactiveDemo.options.map(function (opt, i) {
        return '<label class="check-row"><input type="radio" name="investigatePick" value="' + i + '"> ' + esc(opt) + '</label>';
      }).join('');
      body = '<h2>Investigation</h2><p>' + esc(mission.interactiveDemo.prompt) + '</p><div class="fake-window"><p class="window-title">Fake Windows Screen</p>' + options + '</div>';
      actions = '<button class="hud-btn" id="investigateCheck" data-mission="' + mission.id + '">Check</button><button class="hud-btn" id="investigateHint" data-mission="' + mission.id + '">Need Hint</button>';
    } else if (section === 'action') {
      body = '<h2>Action</h2><p>' + esc(mission.actionTask) + '</p><p><strong>Expected result:</strong> Problem solved and verified.</p><div class="media-wrap"><img src="' + esc(mission.imageUrl) + '" alt="Expected result"></div>';
      actions = '<button class="hud-btn" id="markBtn" data-mission="' + mission.id + '" data-section="action">Mark Action Done</button>';
    } else if (section === 'repeat') {
      var reps = Number(getJson(STORAGE.repetitions, {})[mission.id] || 0);
      body = '<h2>Repeat Challenge</h2><p>' + esc(mission.repeatTask) + '</p><p><strong>Repeat Count:</strong> <span id="repeatCount">' + reps + '</span>/3</p>';
      actions = '<button class="hud-btn" id="repeatBtn" data-mission="' + mission.id + '">Log Repeat</button>';
    } else if (section === 'breakfix') {
      body = '<h2>Break/Fix Challenge</h2><p>' + esc(mission.breakFixTask) + '</p>';
      actions = '<button class="hud-btn" id="markBtn" data-mission="' + mission.id + '" data-section="breakfix">Mark Break/Fix Done</button>';
    } else if (section === 'explain') {
      var explain = getJson(STORAGE.explainState, {})[mission.id] || { q1: '', q2: '', q3: '' };
      body = ''
        + '<h2>Explain Challenge</h2>'
        + '<label class="check-row">What happened?<textarea id="exp1">' + esc(explain.q1) + '</textarea></label>'
        + '<label class="check-row">Why?<textarea id="exp2">' + esc(explain.q2) + '</textarea></label>'
        + '<label class="check-row">How would you use it?<textarea id="exp3">' + esc(explain.q3) + '</textarea></label>';
      actions = '<button class="hud-btn" id="saveExplain" data-mission="' + mission.id + '">Save Explain</button>';
    } else if (section === 'verification') {
      var v = getJson(STORAGE.verifyState, {})[mission.id] || { explain: false, perform: false, troubleshoot: false, repeat: false };
      body = ''
        + '<h2>Verification</h2>'
        + '<label class="check-row"><input type="checkbox" id="vExplain" ' + (v.explain ? 'checked' : '') + '> Can explain</label>'
        + '<label class="check-row"><input type="checkbox" id="vPerform" ' + (v.perform ? 'checked' : '') + '> Can perform</label>'
        + '<label class="check-row"><input type="checkbox" id="vTroubleshoot" ' + (v.troubleshoot ? 'checked' : '') + '> Can troubleshoot</label>'
        + '<label class="check-row"><input type="checkbox" id="vRepeat" ' + (v.repeat ? 'checked' : '') + '> Can repeat three times</label>';
      actions = '<button class="hud-btn" id="saveVerify" data-mission="' + mission.id + '">Save Verification</button>';
    } else if (section === 'ticketcompletion') {
      body = '<h2>Ticket Completion</h2><p>' + esc(mission.ticketCompletion) + '</p><p>Customer happy, issue solved.</p>';
      actions = '<button class="hud-btn" id="resolveTicket" data-mission="' + mission.id + '">Mark Ticket Resolved</button>';
    } else if (section === 'rewards') {
      body = '<h2>Rewards</h2><p>+10 XP</p><p>+1 Confidence</p><p>New Tool Unlocked</p><p>Mission Complete</p><p>Progress Bar Update</p>';
      actions = '<button class="hud-btn" id="claimRewards" data-mission="' + mission.id + '">Claim Rewards</button>';
    } else if (section === 'reflection') {
      var reflection = getJson(STORAGE.reflectionState, {})[mission.id] || '';
      body = '<h2>Reflection</h2><p>What did you learn?</p><textarea id="reflectionBox">' + esc(reflection) + '</textarea>';
      actions = '<button class="hud-btn" id="saveReflection" data-mission="' + mission.id + '">Save Reflection</button>';
    }

    return topNav()
      + '<main class="center-shell fullscreen-step">'
      + '<section class="hero-panel"><h1>' + esc(mission.title) + '</h1><p>Section: ' + SECTION_LABEL[section] + '</p></section>'
      + '<section class="content-panel step-page">' + body + termPanel(mission) + '<p id="feedbackLine" class="feedback-line"></p></section>'
      + '<section class="flow-links">'
      + (prev ? '<a class="hud-btn" href="step.html?mission=' + mission.id + '&section=' + prev + '">Back</a>' : '<a class="hud-btn" href="room.html?id=' + mission.id + '">Mission Home</a>')
      + (next ? '<a class="hud-btn" href="step.html?mission=' + mission.id + '&section=' + next + '">Next</a>' : '<a class="hud-btn" href="room.html?id=' + mission.id + '">Finish</a>')
      + actions
      + '</section>'
      + '</main>';
  }

  function renderGlossary() {
    var terms = [];
    missions.forEach(function (m) {
      m.translationTerms.forEach(function (t) {
        terms.push(t);
      });
    });

    var cards = terms.map(function (t) {
      var search = (t.word + ' ' + t.plainEnglish + ' ' + t.whereISeeIt + ' ' + t.whyItMatters + ' ' + t.example).toLowerCase();
      return '<article class="glossary-card" data-search="' + esc(search) + '"><h3>' + esc(t.word) + '</h3><p><strong>Word:</strong> ' + esc(t.word) + '</p><p><strong>Plain English:</strong> ' + esc(t.plainEnglish) + '</p><p><strong>Where I see it:</strong> ' + esc(t.whereISeeIt) + '</p><p><strong>Why it matters:</strong> ' + esc(t.whyItMatters) + '</p><p><strong>Example:</strong> ' + esc(t.example) + '</p></article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Glossary System</h1><input id="glossarySearch" class="search-input" type="search" placeholder="Search term"></section>'
      + '<section id="glossaryGrid" class="glossary-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderTickets() {
    var pass = getJson(STORAGE.ticketPass, {});

    var cards = missions.map(function (m) {
      var open = canOpenTicket(m.id);
      return '<article class="project-card ' + (open ? '' : 'locked') + '"><h3>' + esc(m.title) + '</h3><p><strong>NPC:</strong> ' + esc(m.npc) + '</p><p>' + esc(m.ticket) + '</p>' + (open ? '<button class="hud-btn passTicketBtn" data-mission="' + m.id + '">' + (pass[m.id] ? 'Resolved' : 'Mark Resolved') + '</button>' : '<button class="hud-btn" disabled>Locked</button>') + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Fake Ticket System</h1><p>Recurring characters: Sarah, Mike, Grandma, Boss.</p></section>'
      + '<section class="project-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderCalls() {
    var queue = getJson(STORAGE.callsQueue, {});
    var ids = Object.keys(queue);

    var cards = ids.map(function (missionId) {
      var mission = findMission(missionId);
      var rows = queue[missionId] || [];
      return '<article class="project-card"><h3>' + esc(mission ? mission.title : missionId) + '</h3><ul>' + rows.map(function (r) { return '<li>' + r.when + ' (' + r.date + ') - ' + esc(r.reason) + '</li>'; }).join('') + '</ul><a class="hud-btn" href="step.html?mission=' + missionId + '&section=ticket">Handle Call</a></article>';
    }).join('');

    if (!cards) {
      cards = '<article class="project-card"><h3>Today\'s Calls</h3><ul>' + fallbackCalls.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></article>';
    }

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Today\'s Calls</h1><p>Spaced repetition: tomorrow, three days, seven days.</p></section>'
      + '<section class="project-grid">' + cards + '</section>'
      + '</main>';
  }

  function bindCommon() {
    var reset = document.getElementById('resetButton');
    if (reset) {
      reset.addEventListener('click', function () {
        if (!window.confirm('Reset all NodeZero V1 progress?')) return;
        Object.keys(STORAGE).forEach(function (k) { localStorage.removeItem(STORAGE[k]); });
        window.location.href = 'index.html';
      });
    }

    var glossarySearch = document.getElementById('glossarySearch');
    if (glossarySearch) {
      glossarySearch.addEventListener('input', function () {
        var q = glossarySearch.value.trim().toLowerCase();
        Array.prototype.forEach.call(document.querySelectorAll('#glossaryGrid .glossary-card'), function (card) {
          var hay = card.getAttribute('data-search') || '';
          card.style.display = hay.indexOf(q) >= 0 ? '' : 'none';
        });
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll('.term-chip'), function (chip) {
      chip.addEventListener('click', function () {
        var mission = findMission(chip.getAttribute('data-mission') || '');
        var idx = Number(chip.getAttribute('data-term') || '0');
        var popup = document.getElementById('termPopup');
        if (!mission || !popup || !mission.translationTerms[idx]) return;
        var t = mission.translationTerms[idx];
        popup.innerHTML = '<strong>' + esc(t.word) + '</strong><br>' + esc(t.plainEnglish) + '<br><em>Where:</em> ' + esc(t.whereISeeIt) + '<br><em>Why:</em> ' + esc(t.whyItMatters) + '<br><em>Example:</em> ' + esc(t.example);
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('.passTicketBtn'), function (btn) {
      btn.addEventListener('click', function () {
        var missionId = btn.getAttribute('data-mission') || '';
        var pass = getJson(STORAGE.ticketPass, {});
        pass[missionId] = true;
        setJson(STORAGE.ticketPass, pass);
        btn.textContent = 'Resolved';
      });
    });
  }

  function bindSectionActions() {
    var line = document.getElementById('feedbackLine');

    var openTicketBtn = document.getElementById('openTicketBtn');
    if (openTicketBtn) {
      openTicketBtn.addEventListener('click', function () {
        var missionId = openTicketBtn.getAttribute('data-mission') || '';
        if (!isSectionDone(missionId, 'ticket')) {
          setNumber(STORAGE.xp, getNumber(STORAGE.xp) + 10);
        }
        markSectionDone(missionId, 'ticket');
        if (line) line.textContent = feedback('ok');
      });
    }

    var markBtn = document.getElementById('markBtn');
    if (markBtn) {
      markBtn.addEventListener('click', function () {
        var missionId = markBtn.getAttribute('data-mission') || '';
        var section = markBtn.getAttribute('data-section') || '';
        markSectionDone(missionId, section);
        if (line) line.textContent = feedback('ok');
      });
    }

    var investigateCheck = document.getElementById('investigateCheck');
    if (investigateCheck) {
      investigateCheck.addEventListener('click', function () {
        var mission = findMission(investigateCheck.getAttribute('data-mission') || '');
        var pick = document.querySelector('input[name="investigatePick"]:checked');
        if (!mission || !pick) {
          if (line) line.textContent = feedback('bad');
          return;
        }

        if (Number(pick.value) === Number(mission.interactiveDemo.correctIndex)) {
          markSectionDone(mission.id, 'investigation');
          if (line) line.textContent = feedback('ok');
        } else {
          if (line) line.textContent = feedback('bad');
        }
      });
    }

    var investigateHint = document.getElementById('investigateHint');
    if (investigateHint) {
      investigateHint.addEventListener('click', function () {
        var mission = findMission(investigateHint.getAttribute('data-mission') || '');
        if (line) line.textContent = feedback('hint', mission ? mission.interactiveDemo.hint : '');
      });
    }

    var repeatBtn = document.getElementById('repeatBtn');
    if (repeatBtn) {
      repeatBtn.addEventListener('click', function () {
        var missionId = repeatBtn.getAttribute('data-mission') || '';
        var reps = getJson(STORAGE.repetitions, {});
        reps[missionId] = Number(reps[missionId] || 0) + 1;
        setJson(STORAGE.repetitions, reps);
        if (reps[missionId] >= 3) {
          markSectionDone(missionId, 'repeat');
          if (line) line.textContent = feedback('ok');
        } else {
          if (line) line.textContent = feedback('hint', 'Repeat until 3x');
        }
        var count = document.getElementById('repeatCount');
        if (count) count.textContent = String(reps[missionId]);
      });
    }

    var saveExplain = document.getElementById('saveExplain');
    if (saveExplain) {
      saveExplain.addEventListener('click', function () {
        var missionId = saveExplain.getAttribute('data-mission') || '';
        var data = getJson(STORAGE.explainState, {});
        data[missionId] = {
          q1: (document.getElementById('exp1') || {}).value || '',
          q2: (document.getElementById('exp2') || {}).value || '',
          q3: (document.getElementById('exp3') || {}).value || ''
        };
        setJson(STORAGE.explainState, data);

        if ((data[missionId].q1 + data[missionId].q2 + data[missionId].q3).trim().length >= 30) {
          markSectionDone(missionId, 'explain');
          if (line) line.textContent = feedback('ok');
        } else {
          if (line) line.textContent = feedback('bad', 'Write a fuller explanation');
        }
      });
    }

    var saveVerify = document.getElementById('saveVerify');
    if (saveVerify) {
      saveVerify.addEventListener('click', function () {
        var missionId = saveVerify.getAttribute('data-mission') || '';
        var verify = getJson(STORAGE.verifyState, {});
        verify[missionId] = {
          explain: Boolean(document.getElementById('vExplain') && document.getElementById('vExplain').checked),
          perform: Boolean(document.getElementById('vPerform') && document.getElementById('vPerform').checked),
          troubleshoot: Boolean(document.getElementById('vTroubleshoot') && document.getElementById('vTroubleshoot').checked),
          repeat: Boolean(document.getElementById('vRepeat') && document.getElementById('vRepeat').checked)
        };
        setJson(STORAGE.verifyState, verify);
        if (verify[missionId].explain && verify[missionId].perform && verify[missionId].troubleshoot && verify[missionId].repeat) {
          markSectionDone(missionId, 'verification');
          if (line) line.textContent = feedback('ok');
        } else {
          if (line) line.textContent = feedback('bad');
        }
      });
    }

    var resolveTicket = document.getElementById('resolveTicket');
    if (resolveTicket) {
      resolveTicket.addEventListener('click', function () {
        var missionId = resolveTicket.getAttribute('data-mission') || '';
        var pass = getJson(STORAGE.ticketPass, {});
        pass[missionId] = true;
        setJson(STORAGE.ticketPass, pass);
        markSectionDone(missionId, 'ticketcompletion');
        if (line) line.textContent = feedback('ok');
      });
    }

    var claimRewards = document.getElementById('claimRewards');
    if (claimRewards) {
      claimRewards.addEventListener('click', function () {
        var missionId = claimRewards.getAttribute('data-mission') || '';
        if (!isSectionDone(missionId, 'rewards')) {
          setNumber(STORAGE.xp, getNumber(STORAGE.xp) + 10);
          setNumber(STORAGE.confidence, getNumber(STORAGE.confidence) + 1);
        }
        markSectionDone(missionId, 'rewards');
        if (line) line.textContent = feedback('ok');
      });
    }

    var saveReflection = document.getElementById('saveReflection');
    if (saveReflection) {
      saveReflection.addEventListener('click', function () {
        var missionId = saveReflection.getAttribute('data-mission') || '';
        var reflections = getJson(STORAGE.reflectionState, {});
        reflections[missionId] = (document.getElementById('reflectionBox') || {}).value || '';
        setJson(STORAGE.reflectionState, reflections);

        if (reflections[missionId].trim().length < 10) {
          if (line) line.textContent = feedback('bad', 'Write a short reflection');
          return;
        }

        markSectionDone(missionId, 'reflection');

        var result = completionCheck(missionId);
        if (!result.ok) {
          queueMissionCall(missionId, 'Mission needs reinforcement');
          result.missing.forEach(function (m) { setWeakArea(missionId, m); });
          if (line) line.textContent = feedback('bad', 'Added to Today\'s Calls');
          return;
        }

        var completed = getJson(STORAGE.missionsCompleted, {});
        completed[missionId] = true;
        setJson(STORAGE.missionsCompleted, completed);
        clearMissionCall(missionId);
        clearWeakAreas(missionId);
        if (line) line.textContent = feedback('ok', 'Mission complete');
      });
    }
  }

  function esc(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function loadMissions() {
    return fetch('missions-v1.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load mission data');
        return response.json();
      })
      .then(function (json) {
        missions = json.missions || [];
      })
      .catch(function () {
        missions = [];
      });
  }

  function renderApp() {
    var app = document.getElementById('app');
    if (!app) return;

    var page = document.body.getAttribute('data-page') || 'dashboard';
    var params = new URLSearchParams(window.location.search);

    if (page === 'dashboard') {
      app.innerHTML = renderDashboard();
      bindCommon();
      return;
    }

    if (page === 'room') {
      app.innerHTML = renderMissionList(params.get('id') || currentMissionId());
      bindCommon();
      return;
    }

    if (page === 'step') {
      app.innerHTML = renderMissionSection(params.get('mission') || params.get('id') || currentMissionId(), params.get('section') || 'ticket');
      bindCommon();
      bindSectionActions();
      return;
    }

    if (page === 'glossary') {
      app.innerHTML = renderGlossary();
      bindCommon();
      return;
    }

    if (page === 'tickets') {
      app.innerHTML = renderTickets();
      bindCommon();
      return;
    }

    if (page === 'repeat') {
      app.innerHTML = renderCalls();
      bindCommon();
      return;
    }

    app.innerHTML = topNav() + '<main class="center-shell"><section class="hero-panel"><h1>Page not found</h1></section></main>';
    bindCommon();
  }

  function boot() {
    loadMissions().then(renderApp);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
