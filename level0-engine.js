(function () {
  "use strict";

  var STORAGE = {
    xp: "nodezero_v1_xp",
    lessons: "nodezero_v1_lessons",
    repetitions: "nodezero_v1_repetitions",
    weakAreas: "nodezero_v1_weak_areas",
    tickets: "nodezero_v1_ticket_pass",
    repeatQueue: "nodezero_v1_repeat_queue",
    streak: "nodezero_v1_streak",
    lastVisit: "nodezero_v1_last_visit",
    stepDone: "nodezero_v1_step_done",
    explainText: "nodezero_v1_explain_text",
    verifyChecks: "nodezero_v1_verify_checks"
  };

  var LESSON_XP = 10;

  var STEP_ORDER = ["learn", "see", "do", "repeat", "breakfix", "explain", "verify"];
  var STEP_TITLES = {
    learn: "Learn",
    see: "See",
    do: "Do",
    repeat: "Repeat",
    breakfix: "Break/Fix",
    explain: "Explain",
    verify: "Verification"
  };

  var LEVELS = [
    { id: "level0", name: "Level 0 - Computer Fundamentals", number: 0 },
    { id: "level1", name: "Level 1 - Windows Fundamentals", number: 1 }
  ];

  var ROOM_ORDER = [
    "room0_1",
    "room0_2",
    "room0_3",
    "room0_4",
    "room0_5",
    "room1_1",
    "room1_2",
    "room1_3",
    "room1_4",
    "room1_5"
  ];

  var ROOMS = {
    room0_1: {
      id: "room0_1",
      level: 0,
      title: "Files & Folders",
      simple: "Files are saved items. Folders hold files. Use clear names so you can find things quickly.",
      why: "People lose files often and need help fast.",
      career: "IT support solves file-location issues daily.",
      seeVideo: "https://www.youtube.com/embed/8OrcQ6nA6j4",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/7/77/Windows_11_File_Explorer.png",
      doTask: "Create Practice > Work and place one text file in Work.",
      repeatTask: "Repeat the same task with fewer hints.",
      breakFix: "Move file to wrong folder, then move it back.",
      explainPrompt: "Explain the difference between a file and a folder.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room0_2: {
      id: "room0_2",
      level: 0,
      title: "Install & Uninstall",
      simple: "Install adds software. Uninstall removes software cleanly.",
      why: "Bad installs and leftovers create support problems.",
      career: "Endpoint support installs approved apps and removes broken ones.",
      seeVideo: "https://www.youtube.com/embed/5JfN4V0vS9Y",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Windows_11_Apps_Settings.png",
      doTask: "Install one trusted app, open it, then uninstall it from Settings.",
      repeatTask: "Repeat install/uninstall with fewer hints.",
      breakFix: "Remove leftover shortcut after uninstall.",
      explainPrompt: "Why should software come from trusted sources?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room0_3: {
      id: "room0_3",
      level: 0,
      title: "Keyboard & Mouse",
      simple: "Shortcuts and mouse actions speed up work and reduce mistakes.",
      why: "Faster navigation lowers support time.",
      career: "Help desk teams rely on fast input control all day.",
      seeVideo: "https://www.youtube.com/embed/1ArVtCQqQRE",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/5/59/Computer_keyboard_and_mouse.jpg",
      doTask: "Copy, paste, and rename one file.",
      repeatTask: "Repeat with another file and no hints.",
      breakFix: "Rename wrongly, then correct it.",
      explainPrompt: "Which shortcut helps beginners most and why?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room0_4: {
      id: "room0_4",
      level: 0,
      title: "File Explorer",
      simple: "File Explorer helps you browse, search, and organize files.",
      why: "Many user problems are file-navigation problems.",
      career: "IT support uses Explorer in almost every ticket.",
      seeVideo: "https://www.youtube.com/embed/dAlyKuVY5gE",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Windows_11_File_Explorer_Command_Bar.png",
      doTask: "Search a file and open its folder location.",
      repeatTask: "Repeat with a different file.",
      breakFix: "Open wrong file version, then locate the latest one.",
      explainPrompt: "How does Explorer search save support time?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room0_5: {
      id: "room0_5",
      level: 0,
      title: "Task Manager",
      simple: "Task Manager shows running apps and system usage.",
      why: "Slow computer tickets are very common.",
      career: "Entry IT roles start performance checks with Task Manager.",
      seeVideo: "https://www.youtube.com/embed/V6jY7x4wL0Y",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/6/61/Windows_11_Task_Manager.png",
      doTask: "Open Task Manager and identify top CPU process.",
      repeatTask: "Repeat and identify top memory process.",
      breakFix: "Close frozen app and verify response.",
      explainPrompt: "What does high CPU usage mean in simple words?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room1_1: {
      id: "room1_1",
      level: 1,
      title: "User Accounts",
      simple: "A user account is a personal sign-in with separate files and settings.",
      why: "Shared accounts cause security and support issues.",
      career: "IT creates and maintains user accounts for each employee.",
      seeVideo: "https://www.youtube.com/embed/WYz9zv2nH9M",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Windows_11_Accounts_Settings.png",
      doTask: "Create one local test account and sign in once.",
      repeatTask: "Repeat account creation with fewer hints.",
      breakFix: "Set wrong account type, then correct it.",
      explainPrompt: "Why should each person have their own account?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room1_2: {
      id: "room1_2",
      level: 1,
      title: "Permissions & Access",
      simple: "Permissions decide who can read or change files.",
      why: "Wrong permissions block work or expose data.",
      career: "Endpoint support resolves access-denied issues often.",
      seeVideo: "https://www.youtube.com/embed/Y5vVfVjX8x8",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Windows_Security_Tab.png",
      doTask: "Set one folder to read-only for a test user.",
      repeatTask: "Repeat on a second folder.",
      breakFix: "Deny access by mistake, then restore proper access.",
      explainPrompt: "What is the difference between Read and Modify?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room1_3: {
      id: "room1_3",
      level: 1,
      title: "Control Panel & Settings",
      simple: "Windows uses both Settings and Control Panel.",
      why: "Some options are only in one of the two.",
      career: "Support teams switch between both tools constantly.",
      seeVideo: "https://www.youtube.com/embed/gquwQ4B1vS0",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_11_Control_Panel.png",
      doTask: "Find uninstall paths in both tools.",
      repeatTask: "Repeat without hints.",
      breakFix: "Change one non-critical setting and restore it.",
      explainPrompt: "When should you check Control Panel first?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room1_4: {
      id: "room1_4",
      level: 1,
      title: "Folder Sharing",
      simple: "Sharing allows other users to access a folder over network.",
      why: "Teams depend on shared folders.",
      career: "IT configures and troubleshoots sharing frequently.",
      seeVideo: "https://www.youtube.com/embed/xQ8QXW9m8mA",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/3/36/Windows_Folder_Sharing.png",
      doTask: "Share one folder with one test user.",
      repeatTask: "Repeat on another folder.",
      breakFix: "Remove share access by mistake and restore it.",
      explainPrompt: "Why avoid sharing with Everyone by default?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    },
    room1_5: {
      id: "room1_5",
      level: 1,
      title: "Personalization",
      simple: "Personalization changes display and comfort settings.",
      why: "Good readability reduces user frustration.",
      career: "IT supports display and accessibility setup for users.",
      seeVideo: "https://www.youtube.com/embed/7xQm5dN1hWk",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Windows_11_Personalization_Settings.png",
      doTask: "Change wallpaper and text size, then verify readability.",
      repeatTask: "Repeat with another personalization setting.",
      breakFix: "Set a bad display setting, then restore it.",
      explainPrompt: "How can personalization improve productivity?",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"]
    }
  };

  var GLOSSARY = [
    { word: "File", plain: "A saved item like a document.", where: "Folders and desktop", why: "Most support tasks involve files.", example: "resume.docx" },
    { word: "Folder", plain: "A container for files.", where: "File Explorer", why: "Keeps work organized.", example: "Documents" },
    { word: "Path", plain: "The address of a file or folder.", where: "Explorer address bar", why: "Wrong path means file not found.", example: "C:/Users/Name/Documents" },
    { word: "Install", plain: "Add software to computer.", where: "App setup", why: "Needed for user tools.", example: "Install browser" },
    { word: "Uninstall", plain: "Remove software safely.", where: "Settings > Apps", why: "Fix app issues.", example: "Uninstall old app" },
    { word: "Process", plain: "A running program.", where: "Task Manager", why: "Can show what slows PC.", example: "Browser process" },
    { word: "User Account", plain: "Personal sign-in profile.", where: "Windows Accounts", why: "Separates users safely.", example: "New employee account" },
    { word: "Permission", plain: "Rules for access.", where: "Folder Security tab", why: "Prevents wrong access.", example: "Read-only" },
    { word: "Share", plain: "Allow network folder access.", where: "Folder Sharing tab", why: "Team collaboration.", example: "Shared reports folder" },
    { word: "Streak", plain: "Days in a row you learned.", where: "Dashboard", why: "Builds consistency.", example: "3-day streak" }
  ];

  var TICKETS = [
    { id: "t1", roomId: "room0_4", title: "Internet not working", steps: ["Check network icon", "Try known site", "Re-test connection"] },
    { id: "t2", roomId: "room1_1", title: "User forgot password", steps: ["Verify user", "Reset password", "Confirm login"] },
    { id: "t3", roomId: "room0_5", title: "Computer slow", steps: ["Open Task Manager", "Find high usage", "Close safe app"] },
    { id: "t4", roomId: "room0_2", title: "Install software", steps: ["Check approved app", "Install", "Verify launch"] },
    { id: "t5", roomId: "room1_3", title: "Printer not working", steps: ["Check printer status", "Set default", "Print test"] },
    { id: "t6", roomId: "room1_4", title: "Cannot open shared folder", steps: ["Check share path", "Check permissions", "Retest"] },
    { id: "t7", roomId: "room0_1", title: "Missing file", steps: ["Confirm expected path", "Search by name", "Restore location"] }
  ];

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

  function getXP() {
    return Number(localStorage.getItem(STORAGE.xp) || "0");
  }

  function setXP(value) {
    localStorage.setItem(STORAGE.xp, String(Math.max(0, Number(value) || 0)));
  }

  function getLessons() {
    return getJson(STORAGE.lessons, {});
  }

  function getRepetitions() {
    return getJson(STORAGE.repetitions, {});
  }

  function getWeakAreas() {
    return getJson(STORAGE.weakAreas, {});
  }

  function getTickets() {
    return getJson(STORAGE.tickets, {});
  }

  function getRepeatQueue() {
    return getJson(STORAGE.repeatQueue, {});
  }

  function getStepDone() {
    return getJson(STORAGE.stepDone, {});
  }

  function getExplainText() {
    return getJson(STORAGE.explainText, {});
  }

  function getVerifyChecks() {
    return getJson(STORAGE.verifyChecks, {});
  }

  function setStepDone(roomId, stepName, value) {
    var all = getStepDone();
    if (!all[roomId]) all[roomId] = {};
    all[roomId][stepName] = Boolean(value);
    setJson(STORAGE.stepDone, all);
  }

  function isStepDone(roomId, stepName) {
    var all = getStepDone();
    return Boolean(all[roomId] && all[roomId][stepName]);
  }

  function isRoomUnlocked(roomId) {
    var idx = ROOM_ORDER.indexOf(roomId);
    if (idx <= 0) return true;
    return Boolean(getLessons()[ROOM_ORDER[idx - 1]]);
  }

  function isStepUnlocked(roomId, stepName) {
    if (stepName === "learn") return true;
    var idx = STEP_ORDER.indexOf(stepName);
    if (idx <= 0) return false;
    return isStepDone(roomId, STEP_ORDER[idx - 1]);
  }

  function currentRoomId() {
    var lessons = getLessons();
    for (var i = 0; i < ROOM_ORDER.length; i += 1) {
      if (!lessons[ROOM_ORDER[i]]) return ROOM_ORDER[i];
    }
    return ROOM_ORDER[ROOM_ORDER.length - 1];
  }

  function currentLevel() {
    var room = ROOMS[currentRoomId()];
    return room ? room.level : 1;
  }

  function progressPercent() {
    return Math.floor((Object.keys(getLessons()).length / ROOM_ORDER.length) * 100);
  }

  function updateStreak() {
    var today = new Date().toISOString().slice(0, 10);
    var last = localStorage.getItem(STORAGE.lastVisit) || "";
    var streak = Number(localStorage.getItem(STORAGE.streak) || "0");

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
    localStorage.setItem(STORAGE.streak, String(streak));
    return streak;
  }

  function getTicketForRoom(roomId) {
    for (var i = 0; i < TICKETS.length; i += 1) {
      if (TICKETS[i].roomId === roomId) return TICKETS[i];
    }
    return null;
  }

  function roomCoreReady(roomId) {
    var reps = Number(getRepetitions()[roomId] || 0);
    var explain = getExplainText();
    var checks = getVerifyChecks();

    var explainOk = Boolean(explain[roomId] && explain[roomId].trim().length >= 20);
    var doOk = isStepDone(roomId, "do");
    var breakFixOk = isStepDone(roomId, "breakfix");
    var verify = checks[roomId] || {};
    var verifyOk = Boolean(verify.worked && verify.again && verify.explain && verify.troubleshoot);

    return {
      explainOk: explainOk,
      doOk: doOk,
      breakFixOk: breakFixOk,
      repeatOk: reps >= 3,
      verifyOk: verifyOk,
      all: explainOk && doOk && breakFixOk && reps >= 3 && verifyOk
    };
  }

  function canOpenTicket(roomId) {
    return roomCoreReady(roomId).all;
  }

  function ticketPassed(roomId) {
    return Boolean(getTickets()[roomId]);
  }

  function completeLesson(roomId) {
    var checks = roomCoreReady(roomId);
    var hasTicket = ticketPassed(roomId);

    if (!checks.explainOk) addWeakArea(roomId, "Explain");
    if (!checks.doOk) addWeakArea(roomId, "Do");
    if (!checks.breakFixOk) addWeakArea(roomId, "Break/Fix");
    if (!checks.repeatOk) addWeakArea(roomId, "Repeat");
    if (!checks.verifyOk) addWeakArea(roomId, "Verification");
    if (!hasTicket) addWeakArea(roomId, "Ticket");

    if (!(checks.all && hasTicket)) {
      queueRepeat(roomId, "Lesson completion rules not met");
      return { ok: false, checks: checks, ticketOk: hasTicket };
    }

    var lessons = getLessons();
    if (!lessons[roomId]) {
      lessons[roomId] = { completedAt: Date.now(), xp: LESSON_XP };
      setJson(STORAGE.lessons, lessons);
      setXP(getXP() + LESSON_XP);
    }

    clearWeakAreas(roomId);
    clearRepeat(roomId);
    return { ok: true, checks: checks, ticketOk: true };
  }

  function addWeakArea(roomId, label) {
    var weak = getWeakAreas();
    if (!weak[roomId]) weak[roomId] = [];
    if (weak[roomId].indexOf(label) < 0) weak[roomId].push(label);
    setJson(STORAGE.weakAreas, weak);
  }

  function clearWeakAreas(roomId) {
    var weak = getWeakAreas();
    delete weak[roomId];
    setJson(STORAGE.weakAreas, weak);
  }

  function queueRepeat(roomId, reason) {
    var queue = getRepeatQueue();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    queue[roomId] = [
      { when: "Tomorrow", date: tomorrow.toISOString().slice(0, 10), reason: reason },
      { when: "Next Week", date: nextWeek.toISOString().slice(0, 10), reason: reason }
    ];
    setJson(STORAGE.repeatQueue, queue);
  }

  function clearRepeat(roomId) {
    var queue = getRepeatQueue();
    delete queue[roomId];
    setJson(STORAGE.repeatQueue, queue);
  }

  function topNav() {
    var streak = updateStreak();
    return ""
      + '<header class="top-hud">'
      + '<div class="hud-brand">NODEZERO | HALO COCKPIT V1</div>'
      + '<div class="hud-stats">'
      + '<span>Current Level: ' + currentLevel() + '</span>'
      + '<span>XP: ' + getXP() + '</span>'
      + '<span>Progress: ' + progressPercent() + '%</span>'
      + '<span>Streak: ' + streak + '</span>'
      + '</div>'
      + '<nav class="global-nav">'
      + '<a href="index.html">Dashboard</a>'
      + '<a href="room.html?id=' + currentRoomId() + '">Lessons</a>'
      + '<a href="glossary.html">Glossary</a>'
      + '<a href="tickets.html">Tickets</a>'
      + '<a href="repeat.html">Repeat Queue</a>'
      + '<button id="resetButton" type="button">Reset</button>'
      + '</nav>'
      + '</header>';
  }

  function renderDashboard() {
    var weak = getWeakAreas();
    var weakRooms = Object.keys(weak);

    var levelBlocks = LEVELS.map(function (level) {
      var cards = ROOM_ORDER.filter(function (id) {
        return ROOMS[id].level === level.number;
      }).map(function (id) {
        var room = ROOMS[id];
        var unlocked = isRoomUnlocked(id);
        var done = Boolean(getLessons()[id]);
        return ''
          + '<article class="mission-card ' + (unlocked ? '' : 'locked') + '">'
          + '<h3>' + room.id + ' - ' + room.title + '</h3>'
          + '<p>' + room.simple + '</p>'
          + '<p class="progress-line">' + (done ? 'Complete (+10 XP)' : (unlocked ? 'Ready' : 'Locked')) + '</p>'
          + (unlocked
            ? '<a class="hud-btn" href="room.html?id=' + id + '">Open Room</a>'
            : '<button class="hud-btn" disabled>Locked</button>')
          + '</article>';
      }).join('');

      return '<section class="content-panel"><h2>' + level.name + '</h2><div class="room-grid">' + cards + '</div></section>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '<h1>NodeZero Dashboard</h1>'
      + '<p>Simple flow: Dashboard -> Rooms -> Step pages -> Tickets -> Repeat queue.</p>'
      + '</section>'
      + '<section class="content-panel">'
      + '<h2>Today</h2>'
      + '<p><strong>Current Lesson:</strong> ' + currentRoomId() + ' - ' + ROOMS[currentRoomId()].title + '</p>'
      + '<p><strong>Daily Task:</strong> Finish one step page and log one repetition.</p>'
      + '<p><strong>Weak Areas:</strong> ' + (weakRooms.length ? weakRooms.join(', ') : 'None right now') + '</p>'
      + '<div class="flow-links">'
      + '<a class="hud-btn" href="room.html?id=' + currentRoomId() + '">Lessons</a>'
      + '<a class="hud-btn" href="glossary.html">Glossary</a>'
      + '<a class="hud-btn" href="tickets.html">Tickets</a>'
      + '<a class="hud-btn" href="repeat.html">Repeat Queue</a>'
      + '</div>'
      + '</section>'
      + levelBlocks
      + '</main>';
  }

  function renderRoomPage(roomId) {
    var room = ROOMS[roomId];
    if (!room) {
      return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Room not found.</p></section></main>';
    }

    if (!isRoomUnlocked(roomId)) {
      return topNav()
        + '<main class="center-shell">'
        + '<section class="hero-panel"><h1>Room Locked</h1><p>Finish previous room first.</p><a class="hud-btn" href="room.html?id=' + currentRoomId() + '">Go to Current Room</a></section>'
        + '</main>';
    }

    var pills = STEP_ORDER.map(function (step) {
      var unlocked = isStepUnlocked(roomId, step);
      var done = isStepDone(roomId, step);
      return '<a class="step-pill ' + (unlocked ? '' : 'locked ') + (done ? 'done' : '') + '" href="step.html?room=' + roomId + '&step=' + step + '">' + STEP_TITLES[step] + (done ? ' [Done]' : '') + '</a>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '<h1>' + room.id + ' - ' + room.title + '</h1>'
      + '<p>Each step opens as a focused full-page view.</p>'
      + '<p><strong>Time target:</strong> under 10 minutes.</p>'
      + '</section>'
      + '<section class="content-panel"><h2>Step Pages</h2><div class="step-pills-wrap">' + pills + '</div></section>'
      + '<section class="flow-links"><a class="hud-btn" href="step.html?room=' + roomId + '&step=learn">Start Lesson</a><a class="hud-btn" href="tickets.html?room=' + roomId + '">Related Ticket</a></section>'
      + '</main>';
  }

  function renderStepPage(roomId, stepName) {
    var room = ROOMS[roomId];
    if (!room) {
      return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Step not found.</p></section></main>';
    }

    if (!isRoomUnlocked(roomId)) {
      return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Room locked.</p></section></main>';
    }

    if (!isStepUnlocked(roomId, stepName)) {
      return topNav() + '<main class="center-shell"><section class="hero-panel"><p>Step locked. Complete previous step first.</p></section></main>';
    }

    var idx = STEP_ORDER.indexOf(stepName);
    var prev = idx > 0 ? STEP_ORDER[idx - 1] : null;
    var next = idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;

    var body = "";
    var actions = "";

    if (stepName === "learn") {
      body = '<h2>Simple Explanation</h2><p>' + room.simple + '</p><h2>Why It Matters</h2><p>' + room.why + '</p><h2>Career Connection</h2><p>' + room.career + '</p><p class="note-line">Keep explanation under 2 minutes.</p>';
      actions = '<button class="hud-btn" id="markStepDone" data-room="' + roomId + '" data-step="learn">Mark Learn Done</button>';
    } else if (stepName === "see") {
      body = '<h2>SEE Step - Visual Demonstration</h2><p>Watch first. No hands-on task in this step.</p><div class="media-wrap"><iframe src="' + room.seeVideo + '" title="SEE video" allowfullscreen loading="lazy"></iframe></div><div class="media-wrap"><img src="' + room.seeImage + '" alt="Visual concept"></div>';
      actions = '<button class="hud-btn" id="markStepDone" data-room="' + roomId + '" data-step="see">Mark See Done</button>';
    } else if (stepName === "do") {
      body = '<h2>DO Step - Hands-On Task</h2><p>' + room.doTask + '</p>';
      actions = '<button class="hud-btn" id="markStepDone" data-room="' + roomId + '" data-step="do">Mark Do Done</button>';
    } else if (stepName === "repeat") {
      var reps = Number(getRepetitions()[roomId] || 0);
      body = '<h2>Repeat Challenge</h2><p>' + room.repeatTask + '</p><p><strong>Repeat count:</strong> <span id="repeatCount">' + reps + '</span>/3</p>';
      actions = '<button class="hud-btn" id="repeatPlus" data-room="' + roomId + '">Log One Repeat</button>';
    } else if (stepName === "breakfix") {
      body = '<h2>Break/Fix Challenge</h2><p>' + room.breakFix + '</p>';
      actions = '<button class="hud-btn" id="markStepDone" data-room="' + roomId + '" data-step="breakfix">Mark Break/Fix Done</button>';
    } else if (stepName === "explain") {
      var explain = getExplainText();
      body = '<h2>Explain Challenge</h2><p>' + room.explainPrompt + '</p><textarea id="explainBox" rows="5" placeholder="Explain in your own words (20+ characters)">' + escapeHtml(explain[roomId] || '') + '</textarea>';
      actions = '<button class="hud-btn" id="saveExplain" data-room="' + roomId + '">Save Explanation</button>';
    } else if (stepName === "verify") {
      var verify = getVerifyChecks()[roomId] || {};
      var core = roomCoreReady(roomId);
      body = ''
        + '<h2>Verification Checklist</h2>'
        + '<label class="check-row"><input type="checkbox" id="v_worked" ' + (verify.worked ? 'checked' : '') + '> ' + room.verify[0] + '</label>'
        + '<label class="check-row"><input type="checkbox" id="v_again" ' + (verify.again ? 'checked' : '') + '> ' + room.verify[1] + '</label>'
        + '<label class="check-row"><input type="checkbox" id="v_explain" ' + (verify.explain ? 'checked' : '') + '> ' + room.verify[2] + '</label>'
        + '<label class="check-row"><input type="checkbox" id="v_troubleshoot" ' + (verify.troubleshoot ? 'checked' : '') + '> ' + room.verify[3] + '</label>'
        + '<p><strong>Readiness:</strong> Explain ' + yn(core.explainOk) + ', Do ' + yn(core.doOk) + ', Troubleshoot ' + yn(core.breakFixOk) + ', Repeat x3 ' + yn(core.repeatOk) + '</p>'
        + '<p><strong>Ticket passed:</strong> ' + yn(ticketPassed(roomId)) + '</p>'
        + '<p><strong>XP Reward:</strong> +10 after all rules pass</p>';
      actions = '<a class="hud-btn" href="tickets.html?room=' + roomId + '">Open Related Ticket</a><button class="hud-btn" id="saveVerify" data-room="' + roomId + '">Save Checklist</button><button class="hud-btn" id="finishLesson" data-room="' + roomId + '">Complete Lesson</button>';
    }

    return topNav()
      + '<main class="center-shell fullscreen-step">'
      + '<section class="hero-panel"><h1>' + room.id + ' - ' + room.title + '</h1><p>Step: ' + STEP_TITLES[stepName] + '</p></section>'
      + '<section class="content-panel step-page">' + body + '</section>'
      + '<section class="flow-links">'
      + (prev ? '<a class="hud-btn" href="step.html?room=' + roomId + '&step=' + prev + '">Previous</a>' : '<a class="hud-btn" href="room.html?id=' + roomId + '">Room Home</a>')
      + (next ? '<a class="hud-btn" href="step.html?room=' + roomId + '&step=' + next + '">Next</a>' : '<a class="hud-btn" href="room.html?id=' + roomId + '">Back to Room</a>')
      + actions
      + '</section>'
      + '</main>';
  }

  function renderGlossary() {
    var cards = GLOSSARY.map(function (term) {
      var search = (term.word + ' ' + term.plain + ' ' + term.where + ' ' + term.why + ' ' + term.example).toLowerCase();
      return ''
        + '<article class="glossary-card" data-search="' + escapeHtml(search) + '">'
        + '<h3>' + term.word + '</h3>'
        + '<p><strong>Word:</strong> ' + term.word + '</p>'
        + '<p><strong>Plain English:</strong> ' + term.plain + '</p>'
        + '<p><strong>Where I see it:</strong> ' + term.where + '</p>'
        + '<p><strong>Why it matters:</strong> ' + term.why + '</p>'
        + '<p><strong>Example:</strong> ' + term.example + '</p>'
        + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Glossary</h1><p>Simple definitions for common terms.</p><input id="glossarySearch" class="search-input" type="search" placeholder="Search term"></section>'
      + '<section id="glossaryGrid" class="glossary-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderTickets(roomFilter) {
    var pass = getTickets();
    var cards = TICKETS.filter(function (ticket) {
      return !roomFilter || ticket.roomId === roomFilter;
    }).map(function (ticket) {
      var open = canOpenTicket(ticket.roomId);
      return ''
        + '<article class="project-card ' + (open ? '' : 'locked') + '">'
        + '<h3>' + ticket.title + '</h3>'
        + '<p><strong>Related Lesson:</strong> ' + ticket.roomId + ' - ' + ROOMS[ticket.roomId].title + '</p>'
        + '<ol>' + ticket.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>'
        + (open
          ? '<button class="hud-btn ticketPassButton" data-room="' + ticket.roomId + '">' + (pass[ticket.roomId] ? 'Ticket Passed' : 'Mark Ticket Passed') + '</button>'
          : '<button class="hud-btn" disabled>Locked until verification readiness</button>')
        + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Fake Ticket System</h1><p>5-10 beginner tickets tied to lesson progression.</p></section>'
      + '<section class="project-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderRepeat() {
    var queue = getRepeatQueue();
    var keys = Object.keys(queue);
    var cards = keys.map(function (roomId) {
      var list = queue[roomId] || [];
      return ''
        + '<article class="project-card">'
        + '<h3>' + roomId + ' - ' + ROOMS[roomId].title + '</h3>'
        + '<ul>' + list.map(function (entry) {
          return '<li>' + entry.when + ' (' + entry.date + ') - ' + entry.reason + '</li>';
        }).join('') + '</ul>'
        + '<a class="hud-btn" href="room.html?id=' + roomId + '">Review Lesson</a>'
        + '</article>';
    }).join('');

    if (!cards) {
      cards = '<article class="project-card"><h3>No repeat items</h3><p>You are on track. Keep daily practice.</p></article>';
    }

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel"><h1>Repeat Queue</h1><p>Spaced repetition: tomorrow and next week.</p></section>'
      + '<section class="project-grid">' + cards + '</section>'
      + '</main>';
  }

  function bindCommon() {
    var reset = document.getElementById('resetButton');
    if (reset) {
      reset.addEventListener('click', function () {
        if (!window.confirm('Reset all NodeZero V1 progress?')) return;
        Object.keys(STORAGE).forEach(function (key) {
          localStorage.removeItem(STORAGE[key]);
        });
        window.location.href = 'index.html';
      });
    }

    var search = document.getElementById('glossarySearch');
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        Array.prototype.forEach.call(document.querySelectorAll('#glossaryGrid .glossary-card'), function (card) {
          var hay = card.getAttribute('data-search') || '';
          card.style.display = hay.indexOf(q) >= 0 ? '' : 'none';
        });
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll('.ticketPassButton'), function (btn) {
      btn.addEventListener('click', function () {
        var roomId = btn.getAttribute('data-room') || '';
        var pass = getTickets();
        pass[roomId] = true;
        setJson(STORAGE.tickets, pass);
        btn.textContent = 'Ticket Passed';
      });
    });
  }

  function bindStepActions() {
    var markStep = document.getElementById('markStepDone');
    if (markStep) {
      markStep.addEventListener('click', function () {
        var roomId = markStep.getAttribute('data-room') || '';
        var step = markStep.getAttribute('data-step') || '';
        setStepDone(roomId, step, true);
        alert('Step saved.');
      });
    }

    var repeatPlus = document.getElementById('repeatPlus');
    if (repeatPlus) {
      repeatPlus.addEventListener('click', function () {
        var roomId = repeatPlus.getAttribute('data-room') || '';
        var reps = getRepetitions();
        reps[roomId] = Number(reps[roomId] || 0) + 1;
        setJson(STORAGE.repetitions, reps);
        setStepDone(roomId, 'repeat', reps[roomId] >= 3);
        var countNode = document.getElementById('repeatCount');
        if (countNode) countNode.textContent = String(reps[roomId]);
      });
    }

    var saveExplain = document.getElementById('saveExplain');
    if (saveExplain) {
      saveExplain.addEventListener('click', function () {
        var roomId = saveExplain.getAttribute('data-room') || '';
        var explain = getExplainText();
        var text = document.getElementById('explainBox');
        explain[roomId] = text ? text.value : '';
        setJson(STORAGE.explainText, explain);
        setStepDone(roomId, 'explain', Boolean(explain[roomId] && explain[roomId].trim().length >= 20));
        alert('Explanation saved.');
      });
    }

    var saveVerify = document.getElementById('saveVerify');
    if (saveVerify) {
      saveVerify.addEventListener('click', function () {
        var roomId = saveVerify.getAttribute('data-room') || '';
        var checks = getVerifyChecks();
        checks[roomId] = {
          worked: Boolean(document.getElementById('v_worked') && document.getElementById('v_worked').checked),
          again: Boolean(document.getElementById('v_again') && document.getElementById('v_again').checked),
          explain: Boolean(document.getElementById('v_explain') && document.getElementById('v_explain').checked),
          troubleshoot: Boolean(document.getElementById('v_troubleshoot') && document.getElementById('v_troubleshoot').checked)
        };
        setJson(STORAGE.verifyChecks, checks);
        setStepDone(roomId, 'verify', checks[roomId].worked && checks[roomId].again && checks[roomId].explain && checks[roomId].troubleshoot);
        alert('Verification checklist saved.');
      });
    }

    var finishLesson = document.getElementById('finishLesson');
    if (finishLesson) {
      finishLesson.addEventListener('click', function () {
        var roomId = finishLesson.getAttribute('data-room') || '';
        var result = completeLesson(roomId);
        if (!result.ok) {
          alert('Lesson not complete yet. Added to Repeat Queue.');
          return;
        }
        alert('Small win: lesson complete. +10 XP');
        var idx = ROOM_ORDER.indexOf(roomId);
        if (idx >= 0 && idx + 1 < ROOM_ORDER.length) {
          window.location.href = 'room.html?id=' + ROOM_ORDER[idx + 1];
        } else {
          window.location.href = 'index.html';
        }
      });
    }
  }

  function yn(value) {
    return value ? 'Yes' : 'No';
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderApp() {
    var app = document.getElementById('app');
    if (!app) return;

    var pageType = document.body.getAttribute('data-page') || 'dashboard';
    var params = new URLSearchParams(window.location.search);

    if (pageType === 'dashboard') {
      app.innerHTML = renderDashboard();
      bindCommon();
      return;
    }

    if (pageType === 'room') {
      app.innerHTML = renderRoomPage(params.get('id') || currentRoomId());
      bindCommon();
      return;
    }

    if (pageType === 'step') {
      app.innerHTML = renderStepPage(params.get('room') || params.get('id') || currentRoomId(), params.get('step') || 'learn');
      bindCommon();
      bindStepActions();
      return;
    }

    if (pageType === 'glossary') {
      app.innerHTML = renderGlossary();
      bindCommon();
      return;
    }

    if (pageType === 'tickets') {
      app.innerHTML = renderTickets(params.get('room') || '');
      bindCommon();
      return;
    }

    if (pageType === 'repeat') {
      app.innerHTML = renderRepeat();
      bindCommon();
      return;
    }

    app.innerHTML = topNav() + '<main class="center-shell"><section class="hero-panel"><h1>Page not found</h1></section></main>';
    bindCommon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
