(function () {
  const STORAGE_KEYS = {
    xp: "nodezero_v1_xp",
    lessons: "nodezero_v1_lessons",
    reps: "nodezero_v1_repetitions",
    weak: "nodezero_v1_weak_areas",
    explain: "nodezero_v1_explain",
    troubleshoot: "nodezero_v1_troubleshoot",
    checklist: "nodezero_v1_checklist",
    tickets: "nodezero_v1_ticket_pass",
    repeatQueue: "nodezero_v1_repeat_queue",
    streak: "nodezero_v1_streak",
    lastVisit: "nodezero_v1_last_visit"
  };

  const ROOM_ORDER = [
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

  const LEVELS = [
    { id: "level0", name: "Level 0 - Computer Fundamentals", number: 0 },
    { id: "level1", name: "Level 1 - Windows Fundamentals", number: 1 }
  ];

  const ROOMS = {
    room0_1: {
      id: "room0_1",
      level: 0,
      title: "Files & Folders",
      simple: "Files are like papers. Folders are like labeled drawers. Good folder names help you find things fast.",
      why: "People lose files all the time. IT must help them find files quickly.",
      career: "Help desk teams fix missing-file problems daily.",
      seeVideo: "https://www.youtube.com/embed/8OrcQ6nA6j4",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/7/77/Windows_11_File_Explorer.png",
      doTask: "Create a folder named Practice. Inside it, create two folders: Work and Personal. Move one text file into Work.",
      repeatTask: "Do it again, but this time create the folders without reading the steps.",
      breakFix: "Move the file into the wrong folder on purpose. Then fix it by moving it back.",
      explainPrompt: "In your own words, what is the difference between a file and a folder?",
      glossary: ["File", "Folder", "Path"]
    },
    room0_2: {
      id: "room0_2",
      level: 0,
      title: "Install & Uninstall",
      simple: "Installing adds software. Uninstalling removes software. Always install from trusted sources.",
      why: "Bad installs cause slow PCs and support tickets.",
      career: "Endpoint admins install and remove apps for users.",
      seeVideo: "https://www.youtube.com/embed/5JfN4V0vS9Y",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Windows_11_Apps_Settings.png",
      doTask: "Install one small trusted app. Open it once. Then uninstall it from Settings > Apps.",
      repeatTask: "Install and uninstall again with fewer hints.",
      breakFix: "Leave a desktop shortcut after uninstall and remove it manually.",
      explainPrompt: "Why should you only install trusted software?",
      glossary: ["Install", "Uninstall", "Trusted Source"]
    },
    room0_3: {
      id: "room0_3",
      level: 0,
      title: "Keyboard & Mouse",
      simple: "Keyboard shortcuts save time. Mouse actions help you select, drag, and open items quickly.",
      why: "Fast navigation means faster ticket resolution.",
      career: "IT jobs reward speed and accuracy with basic computer controls.",
      seeVideo: "https://www.youtube.com/embed/1ArVtCQqQRE",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/5/59/Computer_keyboard_and_mouse.jpg",
      doTask: "Use Ctrl+C and Ctrl+V to copy and paste a file. Right-click to rename it.",
      repeatTask: "Repeat copy, paste, and rename without looking at the instructions.",
      breakFix: "Accidentally rename with wrong name, then fix it.",
      explainPrompt: "What shortcut would you teach first to a new computer user?",
      glossary: ["Shortcut", "Right-click", "Rename"]
    },
    room0_4: {
      id: "room0_4",
      level: 0,
      title: "File Explorer",
      simple: "File Explorer is where you browse files, folders, and drives.",
      why: "Most user issues involve finding, moving, or organizing files.",
      career: "Support roles use File Explorer all day.",
      seeVideo: "https://www.youtube.com/embed/dAlyKuVY5gE",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Windows_11_File_Explorer_Command_Bar.png",
      doTask: "Open File Explorer. Pin Documents to Quick Access. Search for a file by name.",
      repeatTask: "Do the same tasks with no hints.",
      breakFix: "Remove a Quick Access pin by mistake, then add it back.",
      explainPrompt: "How does search in File Explorer help in IT work?",
      glossary: ["Quick Access", "Search", "Drive"]
    },
    room0_5: {
      id: "room0_5",
      level: 0,
      title: "Task Manager",
      simple: "Task Manager shows what is running and what is slowing your computer.",
      why: "Slow computer is one of the most common support issues.",
      career: "Entry-level IT uses Task Manager to find high CPU or memory apps.",
      seeVideo: "https://www.youtube.com/embed/V6jY7x4wL0Y",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/6/61/Windows_11_Task_Manager.png",
      doTask: "Open Task Manager. Sort by CPU usage. Identify the top process.",
      repeatTask: "Repeat and identify top memory process too.",
      breakFix: "End a non-critical app by mistake and reopen it.",
      explainPrompt: "What does CPU percentage mean in simple words?",
      glossary: ["Process", "CPU", "Memory"]
    },
    room1_1: {
      id: "room1_1",
      level: 1,
      title: "User Accounts",
      simple: "A user account is a personal login with its own files and settings.",
      why: "Shared accounts create security and tracking problems.",
      career: "IT creates and manages accounts for every employee.",
      seeVideo: "https://www.youtube.com/embed/WYz9zv2nH9M",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Windows_11_Accounts_Settings.png",
      doTask: "Create one local test account and sign in once.",
      repeatTask: "Create another test account without step hints.",
      breakFix: "Set a wrong account type, then fix it.",
      explainPrompt: "Why should each person have their own account?",
      glossary: ["User Account", "Local Account", "Administrator"]
    },
    room1_2: {
      id: "room1_2",
      level: 1,
      title: "Permissions & Access",
      simple: "Permissions decide who can view or change files.",
      why: "Wrong permissions can expose private data.",
      career: "Access control is a daily endpoint support task.",
      seeVideo: "https://www.youtube.com/embed/Y5vVfVjX8x8",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Windows_Security_Tab.png",
      doTask: "Create a folder and set one user to Read only.",
      repeatTask: "Repeat with a second folder.",
      breakFix: "Deny access by mistake and correct it.",
      explainPrompt: "What is the difference between Read and Modify permissions?",
      glossary: ["Permission", "Read", "Modify"]
    },
    room1_3: {
      id: "room1_3",
      level: 1,
      title: "Control Panel & Settings",
      simple: "Windows has two places for settings: Settings app and Control Panel.",
      why: "Some options are still only in Control Panel.",
      career: "IT needs both tools to solve user issues.",
      seeVideo: "https://www.youtube.com/embed/gquwQ4B1vS0",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_11_Control_Panel.png",
      doTask: "Open both Settings and Control Panel. Find where to uninstall a program in each.",
      repeatTask: "Repeat navigation without hints.",
      breakFix: "Change one setting by mistake, then restore it.",
      explainPrompt: "When would you check Control Panel instead of Settings?",
      glossary: ["Settings", "Control Panel", "Programs"]
    },
    room1_4: {
      id: "room1_4",
      level: 1,
      title: "Folder Sharing",
      simple: "Sharing lets others open a folder over the network.",
      why: "Teams need shared folders, but they must be secure.",
      career: "IT sets up shared folders for departments.",
      seeVideo: "https://www.youtube.com/embed/xQ8QXW9m8mA",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/3/36/Windows_Folder_Sharing.png",
      doTask: "Create a folder, enable sharing, and choose one allowed user.",
      repeatTask: "Share a second folder with fewer hints.",
      breakFix: "Remove share permission by mistake and add it back.",
      explainPrompt: "Why should you not share folders with Everyone by default?",
      glossary: ["Share", "Network", "Access"]
    },
    room1_5: {
      id: "room1_5",
      level: 1,
      title: "Personalization",
      simple: "Personalization changes how Windows looks for comfort and clarity.",
      why: "Good display settings improve usability and reduce mistakes.",
      career: "IT helps users with display, theme, and accessibility settings.",
      seeVideo: "https://www.youtube.com/embed/7xQm5dN1hWk",
      seeImage: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Windows_11_Personalization_Settings.png",
      doTask: "Change wallpaper and text size, then verify it helps readability.",
      repeatTask: "Repeat with another personalization setting.",
      breakFix: "Set text too large by mistake, then restore readable size.",
      explainPrompt: "How can personalization help someone work better?",
      glossary: ["Theme", "Display", "Accessibility"]
    }
  };

  const GLOSSARY = [
    {
      word: "File",
      plain: "A single piece of saved information.",
      where: "In folders on your computer.",
      why: "Most support work starts with finding the right file.",
      example: "resume.docx is a file."
    },
    {
      word: "Folder",
      plain: "A container that holds files.",
      where: "In File Explorer.",
      why: "Organization prevents lost work.",
      example: "Documents is a folder."
    },
    {
      word: "Path",
      plain: "The address of a file or folder.",
      where: "Address bar in File Explorer.",
      why: "Wrong path means file not found.",
      example: "C:\\Users\\Name\\Documents"
    },
    {
      word: "Install",
      plain: "Add software to a computer.",
      where: "Downloaded setup files or app stores.",
      why: "Users need apps to do work.",
      example: "Install Zoom for meetings."
    },
    {
      word: "Uninstall",
      plain: "Remove software from a computer.",
      where: "Settings > Apps or Control Panel.",
      why: "Fixes app issues and saves space.",
      example: "Uninstall old software version."
    },
    {
      word: "Process",
      plain: "A program currently running.",
      where: "Task Manager.",
      why: "High process usage can slow the PC.",
      example: "Browser using high CPU."
    },
    {
      word: "User Account",
      plain: "A person’s sign-in identity.",
      where: "Windows Accounts settings.",
      why: "Keeps each user separate and secure.",
      example: "A new employee account."
    },
    {
      word: "Permission",
      plain: "Rules for who can do what.",
      where: "Folder properties > Security.",
      why: "Stops unwanted access.",
      example: "Read-only access to shared docs."
    },
    {
      word: "Share",
      plain: "Let another user access a folder.",
      where: "Folder properties > Sharing.",
      why: "Teams need common files.",
      example: "Shared team reports folder."
    },
    {
      word: "Streak",
      plain: "How many days in a row you learned.",
      where: "Dashboard.",
      why: "Consistency builds confidence.",
      example: "3-day learning streak."
    }
  ];

  const TICKETS = [
    {
      id: "ticket_1",
      title: "Internet not working",
      room: "room0_4",
      steps: ["Check network icon", "Try another website", "Restart adapter and test again"]
    },
    {
      id: "ticket_2",
      title: "User forgot password",
      room: "room1_1",
      steps: ["Verify user identity", "Reset password", "Confirm successful sign-in"]
    },
    {
      id: "ticket_3",
      title: "Computer slow",
      room: "room0_5",
      steps: ["Open Task Manager", "Identify high usage app", "Close non-critical app and retest"]
    },
    {
      id: "ticket_4",
      title: "Install software",
      room: "room0_2",
      steps: ["Confirm approved app", "Install safely", "Verify app opens"]
    },
    {
      id: "ticket_5",
      title: "Printer not working",
      room: "room1_3",
      steps: ["Check printer status", "Set correct default printer", "Print test page"]
    },
    {
      id: "ticket_6",
      title: "Cannot open shared folder",
      room: "room1_4",
      steps: ["Check share path", "Check permissions", "Retest with user"]
    },
    {
      id: "ticket_7",
      title: "Desktop too hard to read",
      room: "room1_5",
      steps: ["Open personalization", "Adjust text scale", "Confirm readability"]
    }
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

  function getXP() {
    return Number(localStorage.getItem(STORAGE_KEYS.xp) || "0");
  }

  function setXP(xp) {
    localStorage.setItem(STORAGE_KEYS.xp, String(Math.max(0, xp)));
  }

  function getLessons() {
    return getJson(STORAGE_KEYS.lessons, {});
  }

  function getReps() {
    return getJson(STORAGE_KEYS.reps, {});
  }

  function getWeak() {
    return getJson(STORAGE_KEYS.weak, {});
  }

  function getExplain() {
    return getJson(STORAGE_KEYS.explain, {});
  }

  function getTroubleshoot() {
    return getJson(STORAGE_KEYS.troubleshoot, {});
  }

  function getChecklist() {
    return getJson(STORAGE_KEYS.checklist, {});
  }

  function getTicketPass() {
    return getJson(STORAGE_KEYS.tickets, {});
  }

  function getRepeatQueue() {
    return getJson(STORAGE_KEYS.repeatQueue, {});
  }

  function getStreak() {
    return Number(localStorage.getItem(STORAGE_KEYS.streak) || "0");
  }

  function setStreak(value) {
    localStorage.setItem(STORAGE_KEYS.streak, String(Math.max(0, value)));
  }

  function markVisitAndGetStreak() {
    const today = new Date();
    const todayLabel = today.toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit) || "";

    if (lastVisit === todayLabel) {
      return getStreak();
    }

    if (!lastVisit) {
      setStreak(1);
      localStorage.setItem(STORAGE_KEYS.lastVisit, todayLabel);
      return 1;
    }

    const lastDate = new Date(lastVisit + "T00:00:00Z");
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      setStreak(getStreak() + 1);
    } else {
      setStreak(1);
    }

    localStorage.setItem(STORAGE_KEYS.lastVisit, todayLabel);
    return getStreak();
  }

  function roomById(roomId) {
    return ROOMS[roomId] || null;
  }

  function isRoomUnlocked(roomId) {
    const idx = ROOM_ORDER.indexOf(roomId);
    if (idx <= 0) {
      return true;
    }

    const lessons = getLessons();
    const previous = ROOM_ORDER[idx - 1];
    return Boolean(lessons[previous]);
  }

  function roomCompleted(roomId) {
    return Boolean(getLessons()[roomId]);
  }

  function currentRoom() {
    for (let i = 0; i < ROOM_ORDER.length; i += 1) {
      if (!roomCompleted(ROOM_ORDER[i])) {
        return ROOM_ORDER[i];
      }
    }
    return ROOM_ORDER[ROOM_ORDER.length - 1];
  }

  function currentLevel() {
    const room = roomById(currentRoom());
    return room ? room.level : 1;
  }

  function progressPercent() {
    const completed = Object.keys(getLessons()).length;
    return Math.floor((completed / ROOM_ORDER.length) * 100);
  }

  function addToRepeatQueue(roomId, reason) {
    const queue = getRepeatQueue();
    const now = Date.now();

    queue[roomId] = [
      { label: "Tomorrow", dueAt: now + 24 * 60 * 60 * 1000, reason: reason },
      { label: "Next Week", dueAt: now + 7 * 24 * 60 * 60 * 1000, reason: reason }
    ];

    setJson(STORAGE_KEYS.repeatQueue, queue);
  }

  function markLessonComplete(roomId) {
    const explain = getExplain();
    const troubleshoot = getTroubleshoot();
    const reps = getReps();
    const ticketPass = getTicketPass();

    const checks = getChecklist();
    const explainOk = Boolean(explain[roomId]);
    const doWithoutHelpOk = Boolean(checks[roomId] && checks[roomId].doWithoutHelp);
    const troubleshootOk = Boolean(troubleshoot[roomId]);
    const repeatOk = Number(reps[roomId] || 0) >= 3;
    const ticketOk = Boolean(ticketPass[roomId]);

    if (!(explainOk && doWithoutHelpOk && troubleshootOk && repeatOk && ticketOk)) {
      addToRepeatQueue(roomId, "Lesson requirements not met");
      return { ok: false, reason: "Complete all verification checks before finishing lesson." };
    }

    const lessons = getLessons();
    if (!lessons[roomId]) {
      lessons[roomId] = {
        completeAt: Date.now(),
        xp: 10
      };
      setJson(STORAGE_KEYS.lessons, lessons);
      setXP(getXP() + 10);
    }

    return { ok: true };
  }

  function canAttemptTicket(roomId) {
    const explain = getExplain();
    const troubleshoot = getTroubleshoot();
    const reps = getReps();
    const checklist = getChecklist();
    const checks = checklist[roomId] || {};

    return Boolean(
      explain[roomId]
      && troubleshoot[roomId]
      && Number(reps[roomId] || 0) >= 3
      && checks.worked
      && checks.doWithoutHelp
      && checks.explain
      && checks.troubleshoot
    );
  }

  function topNav() {
    const streak = markVisitAndGetStreak();
    return ""
      + '<header class="top-hud">'
      + '<div class="hud-brand">NODEZERO | HALO COCKPIT V1</div>'
      + '<div class="hud-stats">'
      + '  <span>Current Level: ' + currentLevel() + '</span>'
      + '  <span>XP: ' + getXP() + '</span>'
      + '  <span>Progress: ' + progressPercent() + '%</span>'
      + '  <span>Streak: ' + streak + '</span>'
      + '</div>'
      + '<nav class="global-nav">'
      + '  <a href="index.html">Dashboard</a>'
      + '  <a href="room.html?id=' + currentRoom() + '">Lessons</a>'
      + '  <a href="glossary.html">Glossary</a>'
      + '  <a href="tickets.html">Tickets</a>'
      + '  <a href="repeat.html">Repeat Queue</a>'
      + '  <button id="resetButton" type="button">Reset</button>'
      + '</nav>'
      + '</header>';
  }

  function levelCard(level) {
    const rows = ROOM_ORDER.filter(function (roomId) {
      return ROOMS[roomId].level === level.number;
    }).map(function (roomId) {
      const room = ROOMS[roomId];
      const unlocked = isRoomUnlocked(roomId);
      const done = roomCompleted(roomId);

      return ''
        + '<article class="mission-card ' + (unlocked ? '' : 'locked') + '">'
        + '<h3>' + room.id + ' - ' + room.title + '</h3>'
        + '<p>' + room.simple + '</p>'
        + '<p class="progress-line">' + (done ? 'Complete (+10 XP)' : (unlocked ? 'Ready' : 'Locked')) + '</p>'
        + (unlocked ? '<a class="hud-btn" href="room.html?id=' + room.id + '">Open Lesson</a>' : '<button class="hud-btn" disabled>Locked</button>')
        + '</article>';
    }).join('');

    return '<section class="content-panel"><h2>' + level.name + '</h2><div class="room-grid">' + rows + '</div></section>';
  }

  function renderDashboard() {
    const weak = getWeak();
    const weakKeys = Object.keys(weak).filter(function (key) {
      return weak[key] > 0;
    });
    const dailyTask = 'Run one lesson and one ticket for your current room.';

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '  <h1>NodeZero Dashboard</h1>'
      + '  <p>Small steps. Repeat often. Build confidence.</p>'
      + '</section>'
      + '<section class="content-panel">'
      + '  <h2>Today</h2>'
      + '  <p><strong>Current Lesson:</strong> ' + currentRoom() + ' - ' + ROOMS[currentRoom()].title + '</p>'
      + '  <p><strong>Daily Task:</strong> ' + dailyTask + '</p>'
      + '  <p><strong>Weak Areas:</strong> ' + (weakKeys.length ? weakKeys.join(', ') : 'None right now') + '</p>'
      + '</section>'
      + LEVELS.map(levelCard).join('')
      + '</main>';
  }

  function lessonStepBlocks(room) {
    return ''
      + '<section class="content-panel">'
      + '  <h2>1. Simple Explanation</h2>'
      + '  <p>' + room.simple + '</p>'
      + '  <h2>2. Why It Matters</h2>'
      + '  <p>' + room.why + '</p>'
      + '  <h2>3. Career Connection</h2>'
      + '  <p>' + room.career + '</p>'
      + '  <h2>4. SEE Step</h2>'
      + '  <p>Watch first. No hands-on yet.</p>'
      + '  <div class="media-wrap"><iframe src="' + room.seeVideo + '" title="SEE demo" allowfullscreen loading="lazy"></iframe></div>'
      + '  <div class="media-wrap"><img src="' + room.seeImage + '" alt="Lesson visual"></div>'
      + '  <h2>5. DO Step</h2>'
      + '  <p>' + room.doTask + '</p>'
      + '  <h2>6. Repeat Challenge</h2>'
      + '  <p>' + room.repeatTask + '</p>'
      + '  <h2>7. Break/Fix Challenge</h2>'
      + '  <p>' + room.breakFix + '</p>'
      + '  <h2>8. Explain Challenge</h2>'
      + '  <p>' + room.explainPrompt + '</p>'
      + '  <textarea id="explainBox" placeholder="Explain in your own words (short and simple)"></textarea>'
      + '  <h2>9. Verification Checklist</h2>'
      + '  <label class="check-row"><input type="checkbox" id="checkWorked"> Did it work?</label>'
      + '  <label class="check-row"><input type="checkbox" id="checkAgain"> Can you do it again?</label>'
      + '  <label class="check-row"><input type="checkbox" id="checkExplain"> Can you explain it?</label>'
      + '  <label class="check-row"><input type="checkbox" id="checkTroubleshoot"> Can you troubleshoot it?</label>'
      + '  <p class="note-line">Lesson time target: under 10 minutes.</p>'
      + '</section>';
  }

  function renderRoom(roomId) {
    const room = roomById(roomId) || roomById(ROOM_ORDER[0]);
    if (!isRoomUnlocked(room.id)) {
      return topNav()
        + '<main class="center-shell">'
        + '<section class="hero-panel">'
        + '<h1>Lesson Locked</h1>'
        + '<p>Finish the previous lesson first.</p>'
        + '<a class="hud-btn" href="room.html?id=' + currentRoom() + '">Go to Current Lesson</a>'
        + '</section>'
        + '</main>';
    }
    const reps = getReps();
    const repCount = Number(reps[room.id] || 0);

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '<h1>' + room.id + ' - ' + room.title + '</h1>'
      + '<p>TryHackMe-style lesson flow with one small win at the end.</p>'
      + '<p><strong>XP Reward:</strong> +10 per lesson</p>'
      + '<p><strong>Repeat Count:</strong> ' + repCount + '/3</p>'
      + '</section>'
      + lessonStepBlocks(room)
      + '<section class="flow-links">'
      + '<button class="hud-btn" id="repeatButton" data-room="' + room.id + '">Mark Repeat (+1)</button>'
      + '<button class="hud-btn" id="troubleshootButton" data-room="' + room.id + '">Mark Troubleshoot Pass</button>'
      + '<a class="hud-btn" href="tickets.html?room=' + room.id + '">Open Related Ticket</a>'
      + '<button class="hud-btn" id="completeLessonButton" data-room="' + room.id + '">Complete Lesson</button>'
      + '</section>'
      + '</main>';
  }

  function renderGlossary() {
    const cards = GLOSSARY.map(function (term) {
      const hay = (term.word + ' ' + term.plain + ' ' + term.where + ' ' + term.why + ' ' + term.example).toLowerCase();
      return ''
        + '<article class="glossary-card" data-hay="' + hay.replace(/"/g, '&quot;') + '">'
        + '<h3>' + term.word + '</h3>'
        + '<p><strong>Plain English:</strong> ' + term.plain + '</p>'
        + '<p><strong>Where I see it:</strong> ' + term.where + '</p>'
        + '<p><strong>Why it matters:</strong> ' + term.why + '</p>'
        + '<p><strong>Example:</strong> ' + term.example + '</p>'
        + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '<h1>Glossary</h1>'
      + '<p>Simple words. Simple meanings.</p>'
      + '<input id="glossarySearch" class="search-input" type="search" placeholder="Search a term">'
      + '</section>'
      + '<section id="glossaryGrid" class="glossary-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderTickets(roomFilter) {
    const lessons = getLessons();
    const pass = getTicketPass();

    const cards = TICKETS.filter(function (ticket) {
      if (roomFilter && ticket.room !== roomFilter) {
        return false;
      }
      return true;
    }).map(function (ticket) {
      const unlocked = canAttemptTicket(ticket.room);
      const lessonDone = Boolean(lessons[ticket.room]);
      return ''
        + '<article class="project-card ' + (unlocked ? '' : 'locked') + '">'
        + '<h3>' + ticket.title + '</h3>'
        + '<p><strong>Unlock Lesson:</strong> ' + ticket.room + ' - ' + ROOMS[ticket.room].title + '</p>'
        + '<p><strong>Lesson Completed:</strong> ' + (lessonDone ? 'Yes' : 'No') + '</p>'
        + '<ol>' + ticket.steps.map(function (step) { return '<li>' + step + '</li>'; }).join('') + '</ol>'
        + (unlocked
          ? '<button class="hud-btn ticketPassButton" data-ticket="' + ticket.id + '" data-room="' + ticket.room + '">' + (pass[ticket.room] ? 'Ticket Passed' : 'Mark Ticket Passed') + '</button>'
          : '<button class="hud-btn" disabled>Locked</button>')
        + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '<h1>Fake Tickets</h1>'
      + '<p>Tickets unlock only after related lesson completion.</p>'
      + '</section>'
      + '<section class="project-grid">' + cards + '</section>'
      + '</main>';
  }

  function renderRepeatQueue() {
    const queue = getRepeatQueue();
    const now = Date.now();
    const rows = Object.keys(queue).map(function (roomId) {
      const entries = queue[roomId] || [];
      const line = entries.map(function (item) {
        const due = new Date(item.dueAt).toLocaleDateString();
        const status = item.dueAt <= now ? 'Due now' : 'Upcoming';
        return '<li>' + item.label + ' - ' + due + ' (' + status + ')</li>';
      }).join('');

      return ''
        + '<article class="project-card">'
        + '<h3>' + roomId + ' - ' + ROOMS[roomId].title + '</h3>'
        + '<p><strong>Reason:</strong> ' + (entries[0] ? entries[0].reason : 'Review') + '</p>'
        + '<ul>' + line + '</ul>'
        + '<a class="hud-btn" href="room.html?id=' + roomId + '">Review Lesson</a>'
        + '</article>';
    }).join('');

    return topNav()
      + '<main class="center-shell">'
      + '<section class="hero-panel">'
      + '<h1>Repeat Queue</h1>'
      + '<p>Spaced repetition: tomorrow and next week.</p>'
      + '</section>'
      + '<section class="project-grid">' + (rows || '<article class="project-card"><h3>No repeats queued</h3><p>You are on track. Keep practicing one lesson daily.</p></article>') + '</section>'
      + '</main>';
  }

  function bindCommonEvents() {
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.addEventListener('click', function () {
        const ok = window.confirm('Reset all NodeZero V1 progress?');
        if (!ok) {
          return;
        }
        Object.keys(STORAGE_KEYS).forEach(function (keyName) {
          localStorage.removeItem(STORAGE_KEYS[keyName]);
        });
        window.location.href = 'index.html';
      });
    }

    const glossarySearch = document.getElementById('glossarySearch');
    if (glossarySearch) {
      glossarySearch.addEventListener('input', function () {
        const q = glossarySearch.value.trim().toLowerCase();
        Array.from(document.querySelectorAll('#glossaryGrid .glossary-card')).forEach(function (card) {
          const hay = card.getAttribute('data-hay') || '';
          card.style.display = hay.indexOf(q) >= 0 ? '' : 'none';
        });
      });
    }

    Array.from(document.querySelectorAll('.ticketPassButton')).forEach(function (button) {
      button.addEventListener('click', function () {
        const roomId = button.getAttribute('data-room');
        const pass = getTicketPass();
        pass[roomId] = true;
        setJson(STORAGE_KEYS.tickets, pass);
        button.textContent = 'Ticket Passed';
      });
    });
  }

  function bindRoomEvents(roomId) {
    const explainBox = document.getElementById('explainBox');
    if (explainBox) {
      explainBox.addEventListener('input', function () {
        const explain = getExplain();
        explain[roomId] = explainBox.value.trim().length >= 20;
        setJson(STORAGE_KEYS.explain, explain);
      });
    }

    const repeatButton = document.getElementById('repeatButton');
    if (repeatButton) {
      repeatButton.addEventListener('click', function () {
        const reps = getReps();
        reps[roomId] = Number(reps[roomId] || 0) + 1;
        setJson(STORAGE_KEYS.reps, reps);
        window.location.reload();
      });
    }

    const troubleshootButton = document.getElementById('troubleshootButton');
    if (troubleshootButton) {
      troubleshootButton.addEventListener('click', function () {
        const troubleshoot = getTroubleshoot();
        troubleshoot[roomId] = true;
        setJson(STORAGE_KEYS.troubleshoot, troubleshoot);
      });
    }

    const completeLessonButton = document.getElementById('completeLessonButton');
    if (completeLessonButton) {
      completeLessonButton.addEventListener('click', function () {
        const checklist = getChecklist();
        checklist[roomId] = {
          worked: Boolean(document.getElementById('checkWorked') && document.getElementById('checkWorked').checked),
          doWithoutHelp: Boolean(document.getElementById('checkAgain') && document.getElementById('checkAgain').checked),
          explain: Boolean(document.getElementById('checkExplain') && document.getElementById('checkExplain').checked),
          troubleshoot: Boolean(document.getElementById('checkTroubleshoot') && document.getElementById('checkTroubleshoot').checked)
        };
        setJson(STORAGE_KEYS.checklist, checklist);

        if (!checklist[roomId].worked || !checklist[roomId].doWithoutHelp || !checklist[roomId].explain || !checklist[roomId].troubleshoot) {
          const weak = getWeak();
          weak[roomId] = Number(weak[roomId] || 0) + 1;
          setJson(STORAGE_KEYS.weak, weak);
          addToRepeatQueue(roomId, 'Checklist incomplete');
          window.alert('Not complete yet. Added to Repeat Queue.');
          return;
        }

        const result = markLessonComplete(roomId);
        if (!result.ok) {
          const weak = getWeak();
          weak[roomId] = Number(weak[roomId] || 0) + 1;
          setJson(STORAGE_KEYS.weak, weak);
          window.alert(result.reason + ' Added to Repeat Queue.');
          return;
        }

        window.alert('Small win: lesson complete. +10 XP');
        const nextIdx = ROOM_ORDER.indexOf(roomId) + 1;
        if (nextIdx < ROOM_ORDER.length) {
          window.location.href = 'room.html?id=' + ROOM_ORDER[nextIdx];
        } else {
          window.location.href = 'index.html';
        }
      });
    }
  }

  function renderApp() {
    const app = document.getElementById('app');
    if (!app) {
      return;
    }

    const page = document.body.dataset.page || 'dashboard';
    const params = new URLSearchParams(window.location.search);

    if (page === 'dashboard') {
      app.innerHTML = renderDashboard();
      bindCommonEvents();
      return;
    }

    if (page === 'room' || page === 'step') {
      const roomId = params.get('id') || params.get('room') || currentRoom();
      app.innerHTML = renderRoom(roomId);
      bindCommonEvents();
      bindRoomEvents(roomId);
      return;
    }

    if (page === 'glossary') {
      app.innerHTML = renderGlossary();
      bindCommonEvents();
      return;
    }

    if (page === 'tickets') {
      const roomFilter = params.get('room') || '';
      app.innerHTML = renderTickets(roomFilter);
      bindCommonEvents();
      return;
    }

    if (page === 'repeat') {
      app.innerHTML = renderRepeatQueue();
      bindCommonEvents();
      return;
    }

    app.innerHTML = topNav() + '<main class="center-shell"><section class="hero-panel"><h1>Page not found</h1></section></main>';
    bindCommonEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
(function () {
  "use strict";

  var STORAGE = {
    xp: "nodezero_v1_xp",
    lessonState: "nodezero_v1_lesson_state",
    ticketState: "nodezero_v1_ticket_state",
    repeatQueue: "nodezero_v1_repeat_queue",
    weakAreas: "nodezero_v1_weak_areas",
    streak: "nodezero_v1_streak",
    lastLesson: "nodezero_v1_last_lesson"
  };

  var LESSON_XP = 10;

  var LEVELS = [
    { id: "level0", title: "Level 0 - Computer Fundamentals" },
    { id: "level1", title: "Level 1 - Windows Fundamentals" }
  ];

  var LESSONS = [
    {
      id: "room0_1",
      levelId: "level0",
      title: "Files & Folders",
      simple: "Files are like papers. Folders are like labeled drawers. Keep things in the right drawer so you can find them fast.",
      why: "Lost files waste time and cause stress for users.",
      career: "IT support uses file organization every day when helping users recover documents.",
      seeVideo: "https://www.youtube.com/embed/4mM5Q9x8uM8",
      diagramTitle: "File Path Flow",
      diagram: ["This PC", "Documents", "Work", "report.docx"],
      doTask: "Create a folder named Practice. Inside it, create Week1. Save one text file in Week1.",
      repeatTask: "Create the same folder path again without reading the hint.",
      breakFix: "Move the file to the wrong folder, then move it back to the correct folder.",
      explainPrompt: "Explain what a file path is to someone who has never used a computer.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_1"
    },
    {
      id: "room0_2",
      levelId: "level0",
      title: "Install & Uninstall",
      simple: "Install means adding an app. Uninstall means removing it cleanly so leftovers do not break the PC.",
      why: "Bad installs and leftover apps are common beginner support issues.",
      career: "Endpoint technicians install approved tools and remove broken software safely.",
      seeVideo: "https://www.youtube.com/embed/1M4L2Qv8W8M",
      diagramTitle: "Safe App Lifecycle",
      diagram: ["Download", "Install", "Verify", "Uninstall if needed"],
      doTask: "Install one safe app from a trusted source, then confirm it appears in installed apps.",
      repeatTask: "Repeat with another safe app and no hints.",
      breakFix: "Start an uninstall and stop midway. Then run uninstall again correctly.",
      explainPrompt: "Explain why uninstalling from Settings is safer than deleting random files.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_2"
    },
    {
      id: "room0_3",
      levelId: "level0",
      title: "Keyboard & Mouse",
      simple: "Keyboard and mouse shortcuts help you move faster with less effort.",
      why: "Fast navigation reduces mistakes and saves support time.",
      career: "Helpdesk teams use shortcuts all day during calls and remote sessions.",
      seeVideo: "https://www.youtube.com/embed/89dwXvP7A8Q",
      diagramTitle: "Input to Action",
      diagram: ["Shortcut", "Action", "Result", "Verification"],
      doTask: "Use copy, paste, undo, and alt-tab three times each.",
      repeatTask: "Repeat the same shortcuts in a new folder.",
      breakFix: "Accidentally close a window. Reopen it and restore your work.",
      explainPrompt: "Explain how shortcuts help you stay calm when many things are open.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_3"
    },
    {
      id: "room0_4",
      levelId: "level0",
      title: "File Explorer",
      simple: "File Explorer is your map for finding, moving, and checking files.",
      why: "Many user tickets are just file location confusion.",
      career: "IT support often guides users through File Explorer step by step.",
      seeVideo: "https://www.youtube.com/embed/UjL6M4f2c8U",
      diagramTitle: "Explorer Navigation",
      diagram: ["Search", "Open Folder", "Preview", "Confirm Path"],
      doTask: "Find a file with search, then open its folder location.",
      repeatTask: "Find a different file by name without hints.",
      breakFix: "Open the wrong file version, then find the latest correct one.",
      explainPrompt: "Explain the difference between searching and browsing folders manually.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_4"
    },
    {
      id: "room0_5",
      levelId: "level0",
      title: "Task Manager",
      simple: "Task Manager shows what is running and what is slowing your computer.",
      why: "Slow computer is one of the most common beginner tickets.",
      career: "Junior IT roles use Task Manager for first-pass performance checks.",
      seeVideo: "https://www.youtube.com/embed/f8H9lAqQ3sM",
      diagramTitle: "Performance Check Loop",
      diagram: ["Open Task Manager", "Sort by usage", "Find problem", "Take action"],
      doTask: "Open Task Manager, sort by CPU, and note the top process.",
      repeatTask: "Repeat while another app is running and compare the top process.",
      breakFix: "Force close a frozen app and verify the computer responds again.",
      explainPrompt: "Explain how you decide whether ending a task is safe.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_5"
    },
    {
      id: "room1_1",
      levelId: "level1",
      title: "User Accounts",
      simple: "A user account is a personal sign-in identity with its own files and settings.",
      why: "Shared accounts cause security and troubleshooting problems.",
      career: "IT teams create and manage user accounts for onboarding and support.",
      seeVideo: "https://www.youtube.com/embed/G8U8o4w2W7k",
      diagramTitle: "Account Setup",
      diagram: ["Create user", "Set type", "First sign-in", "Verify profile"],
      doTask: "Create one local test account and sign in once.",
      repeatTask: "Create another test account without hints.",
      breakFix: "Set the wrong account type, then correct it.",
      explainPrompt: "Explain why each person should use a separate account.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_6"
    },
    {
      id: "room1_2",
      levelId: "level1",
      title: "Permissions & Access",
      simple: "Permissions decide who can read, change, or delete files.",
      why: "Wrong permissions block work or expose private data.",
      career: "Endpoint admins fix access issues and enforce least privilege.",
      seeVideo: "https://www.youtube.com/embed/2d8YfQJ3K9I",
      diagramTitle: "Permission Decision",
      diagram: ["User", "Permission rule", "Allow or deny", "Result"],
      doTask: "Create a folder and give one test user read-only access.",
      repeatTask: "Repeat with a new folder and verify read-only again.",
      breakFix: "User cannot open folder. Check permission tab and fix the missing entry.",
      explainPrompt: "Explain the difference between read-only and full control.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_7"
    },
    {
      id: "room1_3",
      levelId: "level1",
      title: "Control Panel & Settings",
      simple: "Windows has two settings areas. You need both because some options still live in Control Panel.",
      why: "Support tickets often require the exact setting location.",
      career: "IT support switches between Settings and Control Panel constantly.",
      seeVideo: "https://www.youtube.com/embed/nJ84q8v6H7U",
      diagramTitle: "Settings Path",
      diagram: ["User request", "Find tool", "Apply change", "Verify change"],
      doTask: "Open both Settings and Control Panel. Find default apps in each path.",
      repeatTask: "Repeat for sound settings without hints.",
      breakFix: "Change one non-critical setting by mistake, then restore it.",
      explainPrompt: "Explain when you would choose Control Panel instead of Settings.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_8"
    },
    {
      id: "room1_4",
      levelId: "level1",
      title: "Folder Sharing",
      simple: "Sharing lets other users open a folder over a network.",
      why: "Teams depend on shared folders for daily work.",
      career: "IT roles set up and troubleshoot shared folder access.",
      seeVideo: "https://www.youtube.com/embed/v5x8X6m3Y3M",
      diagramTitle: "Share Setup",
      diagram: ["Choose folder", "Share settings", "Permission check", "User test"],
      doTask: "Share one folder for a test user and confirm they can open it.",
      repeatTask: "Share another folder with different read/write rules.",
      breakFix: "User gets access denied. Fix sharing or security permissions.",
      explainPrompt: "Explain why share permissions and security permissions both matter.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_9"
    },
    {
      id: "room1_5",
      levelId: "level1",
      title: "Personalization",
      simple: "Personalization controls how Windows looks and feels for each user.",
      why: "Users often report issues that are really profile or display settings.",
      career: "IT support helps users restore default display and profile settings.",
      seeVideo: "https://www.youtube.com/embed/0YfW9Q3x2r4",
      diagramTitle: "Profile Customization",
      diagram: ["Choose profile", "Apply setting", "Check effect", "Roll back if needed"],
      doTask: "Change wallpaper and taskbar setting, then verify they apply correctly.",
      repeatTask: "Repeat with another personalization setting.",
      breakFix: "Apply a confusing setting, then restore a clean default view.",
      explainPrompt: "Explain how personalization affects user comfort and productivity.",
      verify: ["Did it work?", "Can you do it again?", "Can you explain it?", "Can you troubleshoot it?"],
      ticketId: "ticket_10"
    }
  ];

  var TICKETS = [
    {
      id: "ticket_1",
      roomId: "room0_1",
      title: "Ticket: Missing File",
      issue: "User says a file disappeared from Documents.",
      options: ["Check file path and recent moves", "Reinstall Windows"],
      correct: 0
    },
    {
      id: "ticket_2",
      roomId: "room0_2",
      title: "Ticket: Install Software",
      issue: "User needs an approved app installed.",
      options: ["Install from trusted source and verify", "Download random copy from web"],
      correct: 0
    },
    {
      id: "ticket_3",
      roomId: "room0_3",
      title: "Ticket: Keyboard Not Helping",
      issue: "User works slowly and keeps mis-clicking.",
      options: ["Teach core shortcuts and practice", "Ignore and move on"],
      correct: 0
    },
    {
      id: "ticket_4",
      roomId: "room0_4",
      title: "Ticket: Wrong File Version",
      issue: "User opened an old file by mistake.",
      options: ["Use Explorer path and modified date", "Delete all old files"],
      correct: 0
    },
    {
      id: "ticket_5",
      roomId: "room0_5",
      title: "Ticket: Computer Slow",
      issue: "Computer is very slow after launching apps.",
      options: ["Check Task Manager usage first", "Restart forever without checking"],
      correct: 0
    },
    {
      id: "ticket_6",
      roomId: "room1_1",
      title: "Ticket: User Forgot Password",
      issue: "New user cannot sign in to their account.",
      options: ["Reset the correct account safely", "Share another user password"],
      correct: 0
    },
    {
      id: "ticket_7",
      roomId: "room1_2",
      title: "Ticket: Access Denied",
      issue: "User cannot open a team folder.",
      options: ["Review permissions and grant least privilege", "Give everyone full control"],
      correct: 0
    },
    {
      id: "ticket_8",
      roomId: "room1_3",
      title: "Ticket: Cannot Find Setting",
      issue: "User cannot find app removal setting.",
      options: ["Check Settings and Control Panel", "Tell them it cannot be changed"],
      correct: 0
    },
    {
      id: "ticket_9",
      roomId: "room1_4",
      title: "Ticket: Printer Not Working",
      issue: "User cannot print to shared printer folder path.",
      options: ["Check share access path and permissions", "Disable network adapter"],
      correct: 0
    },
    {
      id: "ticket_10",
      roomId: "room1_5",
      title: "Ticket: Confusing Desktop Setup",
      issue: "User profile settings are making work difficult.",
      options: ["Reset key personalization settings", "Delete user profile immediately"],
      correct: 0
    }
  ];

  var GLOSSARY = [
    {
      word: "File",
      plain: "A saved item like a document, picture, or app.",
      where: "File Explorer, Desktop, Downloads",
      why: "Most support tasks involve finding or fixing files.",
      example: "I opened budget.xlsx from Documents."
    },
    {
      word: "Folder",
      plain: "A container that holds files.",
      where: "File Explorer",
      why: "Folders keep work organized and easy to find.",
      example: "I moved reports into the 2026 folder."
    },
    {
      word: "Path",
      plain: "The full address of a file or folder.",
      where: "Explorer address bar, command tools",
      why: "Wrong path means wrong file.",
      example: "C:/Users/Name/Documents/Work"
    },
    {
      word: "Install",
      plain: "Add software to your computer.",
      where: "Settings, app installers",
      why: "Safe install prevents malware and errors.",
      example: "Installed approved PDF reader."
    },
    {
      word: "Uninstall",
      plain: "Remove software from your computer.",
      where: "Settings, Control Panel",
      why: "Clean removal helps performance.",
      example: "Uninstalled unused toolbar app."
    },
    {
      word: "Process",
      plain: "A program currently running.",
      where: "Task Manager",
      why: "High usage process can slow a PC.",
      example: "Browser process used 70% CPU."
    },
    {
      word: "User Account",
      plain: "A personal sign-in profile.",
      where: "Windows sign-in and account settings",
      why: "Each user needs their own safe access.",
      example: "Created account for new teammate."
    },
    {
      word: "Permission",
      plain: "Rule for who can read or change files.",
      where: "Folder Properties -> Security",
      why: "Wrong permissions block users.",
      example: "Granted read-only to intern account."
    },
    {
      word: "Share",
      plain: "Allow others to access a folder over network.",
      where: "Folder Properties -> Sharing",
      why: "Teams depend on shared resources.",
      example: "Shared Finance folder with accounting team."
    },
    {
      word: "Streak",
      plain: "How many days in a row you trained.",
      where: "Dashboard",
      why: "Small daily wins build confidence.",
      example: "You kept a 4-day learning streak."
    }
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

  function setXP(nextXp) {
    localStorage.setItem(STORAGE.xp, String(Math.max(0, Number(nextXp) || 0)));
  }

  function getLessonState() {
    return getJson(STORAGE.lessonState, {});
  }

  function getTicketState() {
    return getJson(STORAGE.ticketState, {});
  }

  function getRepeatQueue() {
    return getJson(STORAGE.repeatQueue, []);
  }

  function getWeakAreas() {
    return getJson(STORAGE.weakAreas, {});
  }

  function getTodayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function addDays(iso, days) {
    var date = new Date(iso + "T00:00:00");
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function updateStreak() {
    var today = getTodayIso();
    var streak = getJson(STORAGE.streak, { lastDate: "", count: 0 });

    if (!streak.lastDate) {
      streak.lastDate = today;
      streak.count = 1;
    } else if (streak.lastDate === today) {
      return streak.count;
    } else {
      var expected = addDays(streak.lastDate, 1);
      if (expected === today) {
        streak.count += 1;
      } else {
        streak.count = 1;
      }
      streak.lastDate = today;
    }

    setJson(STORAGE.streak, streak);
    return streak.count;
  }

  function currentStreak() {
    var streak = getJson(STORAGE.streak, { lastDate: "", count: 0 });
    if (streak.lastDate === getTodayIso()) return streak.count;
    return streak.count;
  }

  function lessonsByLevel(levelId) {
    return LESSONS.filter(function (lesson) {
      return lesson.levelId === levelId;
    });
  }

  function lessonById(id) {
    return LESSONS.find(function (lesson) {
      return lesson.id === id;
    }) || null;
  }

  function ticketByRoom(roomId) {
    return TICKETS.find(function (ticket) {
      return ticket.roomId === roomId;
    }) || null;
  }

  function lessonIndex(roomId) {
    return LESSONS.findIndex(function (lesson) {
      return lesson.id === roomId;
    });
  }

  function isLessonUnlocked(roomId) {
    var index = lessonIndex(roomId);
    if (index < 0) return false;
    if (index === 0) return true;

    var state = getLessonState();
    var prevRoomId = LESSONS[index - 1].id;
    return Boolean(state[prevRoomId] && state[prevRoomId].completed);
  }

  function getLessonProgress(roomId) {
    var all = getLessonState();
    if (all[roomId]) return all[roomId];

    return {
      doDone: false,
      breakFixDone: false,
      explainText: "",
      verify: {
        worked: false,
        again: false,
        explain: false,
        troubleshoot: false
      },
      repeatCount: 0,
      ticketPassed: false,
      completed: false,
      lastAttempt: ""
    };
  }

  function saveLessonProgress(roomId, nextState) {
    var all = getLessonState();
    all[roomId] = nextState;
    setJson(STORAGE.lessonState, all);
    localStorage.setItem(STORAGE.lastLesson, roomId);
  }

  function completedLessonsCount() {
    var state = getLessonState();
    return LESSONS.filter(function (lesson) {
      return state[lesson.id] && state[lesson.id].completed;
    }).length;
  }

  function currentLevelLabel() {
    var state = getLessonState();
    var nextLesson = LESSONS.find(function (lesson) {
      return !(state[lesson.id] && state[lesson.id].completed);
    });
    if (!nextLesson) return "Level 1 - Windows Fundamentals";
    return nextLesson.levelId === "level0" ? "Level 0 - Computer Fundamentals" : "Level 1 - Windows Fundamentals";
  }

  function currentLessonLabel() {
    var state = getLessonState();
    var nextLesson = LESSONS.find(function (lesson) {
      return !(state[lesson.id] && state[lesson.id].completed) && isLessonUnlocked(lesson.id);
    });
    return nextLesson ? nextLesson.title : "All V1 lessons complete";
  }

  function addWeakArea(roomId, reason) {
    var weak = getWeakAreas();
    if (!weak[roomId]) weak[roomId] = [];
    if (!weak[roomId].includes(reason)) {
      weak[roomId].push(reason);
    }
    setJson(STORAGE.weakAreas, weak);
  }

  function removeWeakAreas(roomId) {
    var weak = getWeakAreas();
    delete weak[roomId];
    setJson(STORAGE.weakAreas, weak);
  }

  function scheduleRepeat(roomId) {
    var today = getTodayIso();
    var queue = getRepeatQueue();
    var tomorrow = addDays(today, 1);
    var nextWeek = addDays(today, 7);

    var hasTomorrow = queue.some(function (item) {
      return item.roomId === roomId && item.dueDate === tomorrow;
    });
    var hasNextWeek = queue.some(function (item) {
      return item.roomId === roomId && item.dueDate === nextWeek;
    });

    if (!hasTomorrow) {
      queue.push({ roomId: roomId, dueDate: tomorrow, reason: "Needs repetition" });
    }

    if (!hasNextWeek) {
      queue.push({ roomId: roomId, dueDate: nextWeek, reason: "Weekly reinforcement" });
    }

    setJson(STORAGE.repeatQueue, queue);
  }

  function clearRepeatForLesson(roomId) {
    var queue = getRepeatQueue().filter(function (item) {
      return item.roomId !== roomId;
    });
    setJson(STORAGE.repeatQueue, queue);
  }

  function ticketUnlocked(roomId) {
    var lesson = getLessonProgress(roomId);
    return lesson.doDone && lesson.breakFixDone && lesson.repeatCount >= 3 && lesson.explainText.trim().length >= 20;
  }

  function markTicketPassed(roomId) {
    var ticketState = getTicketState();
    ticketState[roomId] = { passed: true, passedAt: getTodayIso() };
    setJson(STORAGE.ticketState, ticketState);

    var lesson = getLessonProgress(roomId);
    lesson.ticketPassed = true;
    saveLessonProgress(roomId, lesson);
  }

  function syncTicketToLesson(roomId) {
    var ticketState = getTicketState();
    if (ticketState[roomId] && ticketState[roomId].passed) {
      var lesson = getLessonProgress(roomId);
      if (!lesson.ticketPassed) {
        lesson.ticketPassed = true;
        saveLessonProgress(roomId, lesson);
      }
    }
  }

  function evaluateLessonCompletion(roomId) {
    var lesson = getLessonProgress(roomId);
    var missing = [];

    if (!lesson.doDone) {
      missing.push("Hands-on task is not marked complete");
      addWeakArea(roomId, "Hands-on task");
    }

    if (!lesson.breakFixDone) {
      missing.push("Break/Fix challenge is not marked complete");
      addWeakArea(roomId, "Break/Fix");
    }

    if (lesson.explainText.trim().length < 20) {
      missing.push("Explain challenge needs at least one clear sentence");
      addWeakArea(roomId, "Explain challenge");
    }

    if (lesson.repeatCount < 3) {
      missing.push("Repeat challenge must be done 3 times");
      addWeakArea(roomId, "Repetition");
    }

    if (!lesson.verify.worked || !lesson.verify.again || !lesson.verify.explain || !lesson.verify.troubleshoot) {
      missing.push("Verification checklist is incomplete");
      addWeakArea(roomId, "Verification checklist");
    }

    if (!lesson.ticketPassed) {
      missing.push("Related fake ticket is not passed yet");
      addWeakArea(roomId, "Ticket handling");
    }

    lesson.lastAttempt = getTodayIso();

    if (missing.length === 0) {
      if (!lesson.completed) {
        lesson.completed = true;
        setXP(getXP() + LESSON_XP);
      }
      saveLessonProgress(roomId, lesson);
      clearRepeatForLesson(roomId);
      removeWeakAreas(roomId);
      return { ok: true, missing: [] };
    }

    lesson.completed = false;
    saveLessonProgress(roomId, lesson);
    scheduleRepeat(roomId);
    return { ok: false, missing: missing };
  }

  function dailyTaskText() {
    var queue = getRepeatQueue();
    var today = getTodayIso();
    var due = queue.find(function (item) {
      return item.dueDate <= today;
    });

    if (due) {
      var lesson = lessonById(due.roomId);
      return "Repeat due: " + (lesson ? lesson.title : due.roomId);
    }

    return "Complete one lesson and finish one small verification check";
  }

  function topNav() {
    return ""
      + '<header class="top-hud">'
      + '<div class="hud-title">NodeZero V1 | Halo Cockpit</div>'
      + '<div class="hud-stats">'
      + '<span>XP: ' + getXP() + '</span>'
      + '<span>Completed: ' + completedLessonsCount() + '/' + LESSONS.length + '</span>'
      + '<span>Streak: ' + currentStreak() + '</span>'
      + '</div>'
      + '<nav class="nav-row">'
      + '<a class="nav-btn" href="index.html">Dashboard</a>'
      + '<a class="nav-btn" href="room.html">Lessons</a>'
      + '<a class="nav-btn" href="glossary.html">Glossary</a>'
      + '<a class="nav-btn" href="tickets.html">Tickets</a>'
      + '<a class="nav-btn" href="repeat.html">Repeat Queue</a>'
      + '<button class="nav-btn danger" id="resetProgressButton" type="button">Reset Progress</button>'
      + '</nav>'
      + '</header>';
  }

  function progressPercent() {
    return Math.floor((completedLessonsCount() / LESSONS.length) * 100);
  }

  function renderDashboard() {
    var nextLesson = currentLessonLabel();

    return topNav()
      + '<main class="shell">'
      + '<section class="panel">'
      + '<h1>Dashboard</h1>'
      + '<p class="tiny">Simple daily flow: read, watch, do, repeat, fix, explain, verify, solve ticket.</p>'
      + '<div class="stat-list">'
      + '<p><strong>Current level:</strong> ' + currentLevelLabel() + '</p>'
      + '<p><strong>XP:</strong> ' + getXP() + '</p>'
      + '<p><strong>Current lesson:</strong> ' + nextLesson + '</p>'
      + '<p><strong>Daily task:</strong> ' + dailyTaskText() + '</p>'
      + '<p><strong>Streak:</strong> ' + currentStreak() + '</p>'
      + '</div>'
      + '<div class="progress-wrap"><div class="progress-fill" style="width:' + progressPercent() + '%"></div></div>'
      + '<p class="tiny">Progress: ' + progressPercent() + '%</p>'
      + '<div class="action-row">'
      + '<a class="nav-btn" href="room.html">Lessons</a>'
      + '<a class="nav-btn" href="glossary.html">Glossary</a>'
      + '<a class="nav-btn" href="tickets.html">Tickets</a>'
      + '<a class="nav-btn" href="repeat.html">Repeat Queue</a>'
      + '</div>'
      + '</section>'
      + '</main>';
  }

  function renderLessonsPage(selectedId) {
    var body = LEVELS.map(function (level) {
      var cards = lessonsByLevel(level.id).map(function (lesson) {
        var unlocked = isLessonUnlocked(lesson.id);
        var state = getLessonProgress(lesson.id);
        var label = state.completed ? "Complete" : "In Progress";

        return ''
          + '<article class="card ' + (unlocked ? '' : 'locked') + '">'
          + '<h3>' + lesson.id + ' - ' + lesson.title + '</h3>'
          + '<p>' + lesson.simple + '</p>'
          + '<p class="tiny">Status: ' + label + '</p>'
          + (unlocked
            ? '<a class="nav-btn" href="step.html?room=' + lesson.id + '">Open Lesson</a>'
            : '<button class="nav-btn" disabled>Locked</button>')
          + '</article>';
      }).join("");

      return '<section class="panel"><h2>' + level.title + '</h2><div class="grid">' + cards + '</div></section>';
    }).join("");

    var selected = selectedId ? lessonById(selectedId) : null;
    var selectedText = selected ? selected.title : "Choose a lesson card below";

    return topNav()
      + '<main class="shell">'
      + '<section class="panel"><h1>Lesson System</h1><p class="tiny">TryHackMe-style sequence: one room, one clear win.</p><p><strong>Focus:</strong> ' + selectedText + '</p></section>'
      + body
      + '</main>';
  }

  function renderDiagram(items) {
    var blocks = items.map(function (item) {
      return '<span class="diagram-node">' + item + '</span>';
    }).join('<span class="diagram-arrow">></span>');
    return '<div class="diagram-row">' + blocks + '</div>';
  }

  function renderLessonPage(roomId) {
    var lesson = lessonById(roomId);

    if (!lesson) {
      return topNav() + '<main class="shell"><section class="panel"><p>Lesson not found.</p></section></main>';
    }

    if (!isLessonUnlocked(roomId)) {
      return topNav() + '<main class="shell"><section class="panel"><p>This lesson is locked. Complete the previous room first.</p><a class="nav-btn" href="room.html">Back to Lessons</a></section></main>';
    }

    syncTicketToLesson(roomId);

    var state = getLessonProgress(roomId);
    var ticket = ticketByRoom(roomId);
    var verify = state.verify;

    return topNav()
      + '<main class="shell">'
      + '<section class="panel">'
      + '<h1>' + lesson.id + ' - ' + lesson.title + '</h1>'
      + '<p class="tiny">Target lesson time: under 10 minutes. Explanation time: under 2 minutes.</p>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>1. Simple Explanation</h2><p>' + lesson.simple + '</p>'
      + '<h2>2. Why It Matters</h2><p>' + lesson.why + '</p>'
      + '<h2>3. Career Connection</h2><p>' + lesson.career + '</p>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>4. SEE Step - Visual Demonstration</h2>'
      + '<p class="tiny">Watch first. No hands-on task in this section.</p>'
      + '<div class="video-wrap"><iframe src="' + lesson.seeVideo + '" title="' + lesson.title + ' lesson demo" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'
      + '<p><strong>Diagram:</strong> ' + lesson.diagramTitle + '</p>'
      + renderDiagram(lesson.diagram)
      + '</section>'

      + '<section class="panel">'
      + '<h2>5. DO Step - Hands-On Task</h2>'
      + '<p>' + lesson.doTask + '</p>'
      + '<label><input id="doDone" type="checkbox" ' + (state.doDone ? 'checked' : '') + '> I completed the hands-on task</label>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>6. Repeat Challenge</h2>'
      + '<p>' + lesson.repeatTask + '</p>'
      + '<p><strong>Repetitions:</strong> <span id="repeatCount">' + state.repeatCount + '</span>/3</p>'
      + '<button class="nav-btn" id="repeatButton" type="button">Log one repetition</button>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>7. Break/Fix Challenge</h2>'
      + '<p>' + lesson.breakFix + '</p>'
      + '<label><input id="breakFixDone" type="checkbox" ' + (state.breakFixDone ? 'checked' : '') + '> I completed the break/fix challenge</label>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>8. Explain Challenge</h2>'
      + '<p>' + lesson.explainPrompt + '</p>'
      + '<textarea id="explainText" rows="4" placeholder="Write your explanation in your own words">' + escapeHtml(state.explainText) + '</textarea>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>9. Verification Checklist</h2>'
      + '<label><input id="verifyWorked" type="checkbox" ' + (verify.worked ? 'checked' : '') + '> ' + lesson.verify[0] + '</label>'
      + '<label><input id="verifyAgain" type="checkbox" ' + (verify.again ? 'checked' : '') + '> ' + lesson.verify[1] + '</label>'
      + '<label><input id="verifyExplain" type="checkbox" ' + (verify.explain ? 'checked' : '') + '> ' + lesson.verify[2] + '</label>'
      + '<label><input id="verifyTroubleshoot" type="checkbox" ' + (verify.troubleshoot ? 'checked' : '') + '> ' + lesson.verify[3] + '</label>'
      + '</section>'

      + '<section class="panel">'
      + '<h2>10. XP Reward</h2>'
      + '<p>Reward: +10 XP after full verification and passing the related ticket.</p>'
      + '<p class="tiny">Related ticket: ' + (ticket ? ticket.title : "None") + '</p>'
      + '<div class="action-row">'
      + '<button class="nav-btn" id="saveLessonButton" data-room="' + roomId + '" type="button">Save Lesson Progress</button>'
      + '<button class="nav-btn" id="completeLessonButton" data-room="' + roomId + '" type="button">Check Completion Rules</button>'
      + '<a class="nav-btn" href="tickets.html?room=' + roomId + '">Open Related Ticket</a>'
      + '</div>'
      + '<div id="lessonResult" class="tiny"></div>'
      + '</section>'

      + '</main>';
  }

  function renderGlossaryPage() {
    var cards = GLOSSARY.map(function (term) {
      var searchData = [term.word, term.plain, term.where, term.why, term.example].join(" ").toLowerCase();
      return ''
        + '<article class="card glossary-card" data-search="' + escapeHtml(searchData) + '">'
        + '<h3>' + term.word + '</h3>'
        + '<p><strong>Word:</strong> ' + term.word + '</p>'
        + '<p><strong>Plain English:</strong> ' + term.plain + '</p>'
        + '<p><strong>Where I see it:</strong> ' + term.where + '</p>'
        + '<p><strong>Why it matters:</strong> ' + term.why + '</p>'
        + '<p><strong>Example:</strong> ' + term.example + '</p>'
        + '</article>';
    }).join("");

    return topNav()
      + '<main class="shell">'
      + '<section class="panel">'
      + '<h1>Glossary System</h1>'
      + '<input id="glossarySearch" class="search" type="search" placeholder="Search a word or meaning">'
      + '</section>'
      + '<section class="grid" id="glossaryGrid">' + cards + '</section>'
      + '</main>';
  }

  function renderTicketsPage(highlightRoomId) {
    var lessonState = getLessonState();
    var ticketState = getTicketState();

    var cards = TICKETS.map(function (ticket) {
      var unlocked = ticketUnlocked(ticket.roomId);
      var passed = Boolean(ticketState[ticket.roomId] && ticketState[ticket.roomId].passed);
      var lessonComplete = Boolean(lessonState[ticket.roomId] && lessonState[ticket.roomId].completed);

      var status;
      if (passed) {
        status = "Passed";
      } else if (unlocked) {
        status = "Unlocked";
      } else {
        status = "Locked";
      }

      var highlighted = highlightRoomId === ticket.roomId ? " highlight" : "";

      return ''
        + '<article class="card' + highlighted + '">'
        + '<h3>' + ticket.title + '</h3>'
        + '<p><strong>Issue:</strong> ' + ticket.issue + '</p>'
        + '<p><strong>Status:</strong> ' + status + '</p>'
        + '<p class="tiny">Unlock rule: finish do, repeat x3, break/fix, and explain in related lesson.</p>'
        + (passed
          ? '<p class="tiny">Ticket passed and linked to lesson completion.</p>'
          : (unlocked
            ? '<form class="ticket-form" data-room="' + ticket.roomId + '">'
              + '<label><input type="radio" name="pick_' + ticket.id + '" value="0"> ' + ticket.options[0] + '</label>'
              + '<label><input type="radio" name="pick_' + ticket.id + '" value="1"> ' + ticket.options[1] + '</label>'
              + '<label><input type="checkbox" name="verified"> I verified the fix with the user</label>'
              + '<button class="nav-btn" type="submit">Submit Ticket</button>'
              + '</form>'
            : '<button class="nav-btn" disabled>Locked by lesson progress</button>'))
        + '<p class="tiny">Related lesson complete: ' + (lessonComplete ? 'Yes' : 'No') + '</p>'
        + '</article>';
    }).join("");

    return topNav()
      + '<main class="shell">'
      + '<section class="panel"><h1>Fake Ticket System</h1><p class="tiny">Beginner tickets unlock after related lesson practice is complete.</p></section>'
      + '<section class="grid">' + cards + '</section>'
      + '</main>';
  }

  function renderRepeatPage() {
    var queue = getRepeatQueue().slice().sort(function (a, b) {
      return a.dueDate.localeCompare(b.dueDate);
    });
    var weak = getWeakAreas();

    var items = queue.map(function (item) {
      var lesson = lessonById(item.roomId);
      var weakList = weak[item.roomId] || [];
      return ''
        + '<article class="card">'
        + '<h3>' + (lesson ? lesson.title : item.roomId) + '</h3>'
        + '<p><strong>Due:</strong> ' + item.dueDate + '</p>'
        + '<p><strong>Reason:</strong> ' + item.reason + '</p>'
        + '<p><strong>Weak areas:</strong> ' + (weakList.length ? weakList.join(', ') : 'None') + '</p>'
        + '<a class="nav-btn" href="step.html?room=' + item.roomId + '">Open Lesson</a>'
        + '</article>';
    }).join("");

    if (!items) {
      items = '<article class="panel"><p>No repeat items right now. Keep daily practice going.</p></article>';
    }

    return topNav()
      + '<main class="shell">'
      + '<section class="panel"><h1>Repeat System</h1><p class="tiny">Failed lessons are scheduled for tomorrow and next week.</p></section>'
      + '<section class="grid">' + items + '</section>'
      + '</main>';
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function bindGlobalActions() {
    var reset = document.getElementById("resetProgressButton");
    if (reset) {
      reset.addEventListener("click", function () {
        if (!window.confirm("Reset all NodeZero V1 progress?")) return;
        Object.keys(STORAGE).forEach(function (key) {
          localStorage.removeItem(STORAGE[key]);
        });
        window.location.href = "index.html";
      });
    }
  }

  function bindDashboard() {
    bindGlobalActions();
  }

  function bindLessonPage(roomId) {
    bindGlobalActions();

    var state = getLessonProgress(roomId);

    var doDone = document.getElementById("doDone");
    var breakFixDone = document.getElementById("breakFixDone");
    var explainText = document.getElementById("explainText");
    var verifyWorked = document.getElementById("verifyWorked");
    var verifyAgain = document.getElementById("verifyAgain");
    var verifyExplain = document.getElementById("verifyExplain");
    var verifyTroubleshoot = document.getElementById("verifyTroubleshoot");

    var repeatButton = document.getElementById("repeatButton");
    var repeatCountNode = document.getElementById("repeatCount");
    if (repeatButton && repeatCountNode) {
      repeatButton.addEventListener("click", function () {
        state.repeatCount += 1;
        saveLessonProgress(roomId, state);
        repeatCountNode.textContent = String(state.repeatCount);
      });
    }

    var saveButton = document.getElementById("saveLessonButton");
    if (saveButton) {
      saveButton.addEventListener("click", function () {
        state.doDone = Boolean(doDone && doDone.checked);
        state.breakFixDone = Boolean(breakFixDone && breakFixDone.checked);
        state.explainText = explainText ? explainText.value : "";
        state.verify.worked = Boolean(verifyWorked && verifyWorked.checked);
        state.verify.again = Boolean(verifyAgain && verifyAgain.checked);
        state.verify.explain = Boolean(verifyExplain && verifyExplain.checked);
        state.verify.troubleshoot = Boolean(verifyTroubleshoot && verifyTroubleshoot.checked);
        state.lastAttempt = getTodayIso();

        saveLessonProgress(roomId, state);
        var resultNode = document.getElementById("lessonResult");
        if (resultNode) {
          resultNode.textContent = "Lesson progress saved.";
        }
      });
    }

    var completeButton = document.getElementById("completeLessonButton");
    if (completeButton) {
      completeButton.addEventListener("click", function () {
        state.doDone = Boolean(doDone && doDone.checked);
        state.breakFixDone = Boolean(breakFixDone && breakFixDone.checked);
        state.explainText = explainText ? explainText.value : "";
        state.verify.worked = Boolean(verifyWorked && verifyWorked.checked);
        state.verify.again = Boolean(verifyAgain && verifyAgain.checked);
        state.verify.explain = Boolean(verifyExplain && verifyExplain.checked);
        state.verify.troubleshoot = Boolean(verifyTroubleshoot && verifyTroubleshoot.checked);

        saveLessonProgress(roomId, state);

        var result = evaluateLessonCompletion(roomId);
        var resultNode = document.getElementById("lessonResult");

        if (!resultNode) return;

        if (result.ok) {
          resultNode.textContent = "Lesson complete. +10 XP awarded.";
        } else {
          resultNode.innerHTML = "Lesson not complete yet:<br>" + result.missing.join("<br>");
        }
      });
    }
  }

  function bindGlossaryPage() {
    bindGlobalActions();

    var input = document.getElementById("glossarySearch");
    if (!input) return;

    input.addEventListener("input", function () {
      var query = input.value.trim().toLowerCase();
      var cards = document.querySelectorAll(".glossary-card");
      cards.forEach(function (card) {
        var text = card.getAttribute("data-search") || "";
        card.style.display = text.indexOf(query) >= 0 ? "" : "none";
      });
    });
  }

  function bindTicketsPage() {
    bindGlobalActions();

    var forms = document.querySelectorAll(".ticket-form");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var roomId = form.getAttribute("data-room") || "";
        var ticket = ticketByRoom(roomId);
        if (!ticket) return;

        var checked = form.querySelector('input[type="radio"]:checked');
        var verified = form.querySelector('input[name="verified"]');

        if (!checked || !verified || !verified.checked) {
          alert("Pick an answer and confirm verification.");
          return;
        }

        var pass = Number(checked.value) === ticket.correct;

        if (pass) {
          markTicketPassed(roomId);
          alert("Ticket passed. Return to lesson and run completion check.");
          window.location.reload();
        } else {
          addWeakArea(roomId, "Ticket handling");
          scheduleRepeat(roomId);
          alert("Not passed yet. Added to repeat queue.");
        }
      });
    });
  }

  function bindRepeatPage() {
    bindGlobalActions();
  }

  function bindLessonsPage() {
    bindGlobalActions();
  }

  function renderApp() {
    updateStreak();

    var app = document.getElementById("app");
    if (!app) return;

    var page = document.body.getAttribute("data-page") || "dashboard";
    var params = new URLSearchParams(window.location.search);

    if (page === "dashboard") {
      app.innerHTML = renderDashboard();
      bindDashboard();
      return;
    }

    if (page === "room") {
      app.innerHTML = renderLessonsPage(params.get("id") || "");
      bindLessonsPage();
      return;
    }

    if (page === "step") {
      var roomId = params.get("room") || LESSONS[0].id;
      app.innerHTML = renderLessonPage(roomId);
      bindLessonPage(roomId);
      return;
    }

    if (page === "glossary") {
      app.innerHTML = renderGlossaryPage();
      bindGlossaryPage();
      return;
    }

    if (page === "tickets") {
      app.innerHTML = renderTicketsPage(params.get("room") || "");
      bindTicketsPage();
      return;
    }

    if (page === "repeat") {
      app.innerHTML = renderRepeatPage();
      bindRepeatPage();
      return;
    }

    app.innerHTML = topNav() + '<main class="shell"><section class="panel"><p>Unknown page.</p></section></main>';
    bindGlobalActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderApp);
  } else {
    renderApp();
  }
})();
