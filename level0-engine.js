(function () {
  const XP_KEY = "nodezero_xp";
  const STATE_KEY = "nodezero_level0_state_v3";
  const XP_LEVEL_SIZE = 200;
  const STEP_XP = 10;
  const ROOM_COMPLETE_XP = 20;

  const STEP_NAMES = ["Watch", "Copy", "Repeat", "Explain", "Break", "Fix", "Repeat Again", "Skill Check", "Unlock"];
  const STEP_FILES = [
    "step1_learn.html",
    "step2_see.html",
    "step3_do.html",
    "step4_test.html",
    "step5_break.html",
    "step6_fix.html",
    "step7_explain.html",
    "step8_repeat.html",
    "step9_apply.html"
  ];

  const ROOM_DATA = [
    {
      id: "0_1",
      title: "Meet Your Computer",
      summary: "Hardware, software, CPU, RAM, and storage.",
      word: { term: "CPU", plain: "the part that follows instructions and does the work", where: "When apps open, move, or freeze", why: "It is the main worker inside the computer." },
      watch: ["Input starts the job", "CPU processes instructions", "RAM holds active data", "Storage keeps things after power off"],
      copy: { prompt: "Type the loop", answer: "input process output", hint: "Start with input." },
      repeats: [
        { prompt: "Which part keeps data while power is on?", choices: ["RAM", "Storage", "Mouse"], answer: 0, hint: "Short-term memory." },
        { prompt: "Which part does the instructions work?", choices: ["CPU", "Monitor", "Cable"], answer: 0, hint: "It is the brain." },
        { prompt: "Which part keeps files after shutdown?", choices: ["RAM", "Storage", "Fan"], answer: 1, hint: "Think long-term." },
        { prompt: "Quick: choose the right order.", choices: ["Input -> Process -> Output", "Output -> Input -> Process", "Process -> Output -> Input"], answer: 0, hint: "Begin with input." },
        { prompt: "Fake ticket: the screen is blank, but the PC power light is on. What do you check first?", choices: ["Replace the CPU", "Check display power and cable", "Delete files"], answer: 1, hint: "Start with the simple path." }
      ],
      explain: { prompt: "Explain it in plain English.", answer: "a machine that takes input, processes it, and shows output", hint: "Use the three parts." },
      breakTicket: { issue: "A user thinks the computer is dead, but the monitor cable is loose.", choices: ["Check display power and cable", "Replace the CPU", "Delete files"], answer: 0 },
      fixTicket: { issue: "The desktop shell crashed and the icons vanished.", choices: ["Restart explorer.exe", "Replace the drive", "Delete the profile"], answer: 0 },
      skill: {
        ticket: "A laptop boots, but the user cannot open files and the machine feels slow.",
        questions: [
          { prompt: "Which part keeps active data?", choices: ["RAM", "Storage", "Keyboard"], answer: 0 },
          { prompt: "Which part should you check for slowness first?", choices: ["The slowest bottleneck", "The wallpaper", "The mouse"], answer: 0 }
        ]
      },
      unlock: "You can now explain the full input -> process -> output loop."
    },
    {
      id: "0_2",
      title: "Files & Folders",
      summary: "Find the bottleneck before the system stalls.",
      word: { term: "Bottleneck", plain: "the slow part that holds everything back", where: "100% CPU, low RAM, full disk", why: "Fix the slowest part first." },
      watch: ["CPU can hit 100%", "RAM can run out", "Storage can fill up", "The slowest part controls the speed"],
      copy: { prompt: "Type the speed order", answer: "cache ram ssd hdd", hint: "Fastest to slowest." },
      repeats: [
        { prompt: "What is the slowest common bottleneck?", choices: ["Full disk", "Bright wallpaper", "Extra keyboard"], answer: 0, hint: "No free space hurts." },
        { prompt: "What do you fix first when RAM is maxed out?", choices: ["Close heavy apps", "Replace the monitor", "Change the mouse"], answer: 0, hint: "Free memory first." },
        { prompt: "Which upgrade usually helps most with multitasking?", choices: ["More RAM", "A bigger mousepad", "New stickers"], answer: 0, hint: "More active memory." },
        { prompt: "Quick: what is the bottleneck?", choices: ["The slowest part", "The newest part", "The prettiest part"], answer: 0, hint: "Slow beats shiny." },
        { prompt: "Fake ticket: the laptop is fine for five minutes, then freezes. What is the likely first clue?", choices: ["Hot CPU or low RAM", "Missing desktop icons", "Wrong wallpaper"], answer: 0, hint: "Watch heat and memory." }
      ],
      explain: { prompt: "Explain bottleneck in plain English.", answer: "the slowest part that holds the whole system back", hint: "Think traffic jam." },
      breakTicket: { issue: "A game lags after a few minutes and memory use climbs.", choices: ["Hot CPU or low RAM", "Bright wallpaper", "New mouse"], answer: 0 },
      fixTicket: { issue: "A laptop runs out of memory during multitasking.", choices: ["Close unused apps", "Reinstall the OS", "Delete the monitor"], answer: 0 },
      skill: {
        ticket: "The user wants faster app switching without buying a new machine.",
        questions: [
          { prompt: "What should you check before replacing parts?", choices: ["The slowest bottleneck", "The desktop background", "The keyboard color"], answer: 0 },
          { prompt: "What is the safe first action when RAM is full?", choices: ["Close unused apps", "Reinstall the OS", "Delete the monitor"], answer: 0 }
        ]
      },
      unlock: "You can spot the slow part before the system stalls."
    },
    {
      id: "0_3",
      title: "Keyboard Shortcuts",
      summary: "Windows, Linux, and macOS control the machine.",
      word: { term: "Operating system", plain: "the boss software that controls hardware and runs apps", where: "Windows, Linux, macOS, Android", why: "Apps cannot talk to hardware without it." },
      watch: ["The OS starts first", "It manages windows and files", "It talks to hardware through drivers", "It keeps apps separated"],
      copy: { prompt: "Type the job of the OS", answer: "control hardware and run apps", hint: "It is the boss." },
      repeats: [
        { prompt: "Which process brings back the desktop shell?", choices: ["explorer.exe", "paint.exe", "notepad.exe"], answer: 0, hint: "It runs the desktop." },
        { prompt: "Which layer talks to hardware for apps?", choices: ["The OS", "The wallpaper", "The browser tab"], answer: 0, hint: "Think manager." },
        { prompt: "What do drivers connect?", choices: ["Hardware and the OS", "Files and folders", "Passwords and printers"], answer: 0, hint: "They bridge devices." },
        { prompt: "Quick: what comes first at boot?", choices: ["Operating system", "Random app", "Task list"], answer: 0, hint: "The boss comes first." },
        { prompt: "Fake ticket: after login, the screen is blank but the mouse moves. What likely crashed?", choices: ["The shell", "The keyboard", "The monitor cable"], answer: 0, hint: "Restart the desktop shell." }
      ],
      explain: { prompt: "Explain the OS in plain English.", answer: "the software boss that runs apps and controls hardware", hint: "Use boss words." },
      breakTicket: { issue: "A user logs in and gets a black screen with a cursor.", choices: ["The shell", "The keyboard", "The monitor cable"], answer: 0 },
      fixTicket: { issue: "The desktop shell crashed after login.", choices: ["Restart explorer.exe", "Replace the motherboard", "Delete the profile"], answer: 0 },
      skill: {
        ticket: "A user says the computer is on, but the desktop never appears.",
        questions: [
          { prompt: "Which file often controls the Windows desktop shell?", choices: ["explorer.exe", "boot.ini", "pagefile.sys"], answer: 0 },
          { prompt: "What should you test first?", choices: ["Restart the shell", "Replace the motherboard", "Delete the profile"], answer: 0 }
        ]
      },
      unlock: "You can tell the OS apart from the apps that run on it."
    },
    {
      id: "0_4",
      title: "Windows Navigation",
      summary: "Find files, paths, extensions, and permissions.",
      word: { term: "Path", plain: "the address of a file or folder", where: "C:\\Users\\Name\\Documents or /home/name", why: "A wrong path means file not found." },
      watch: ["Folders hold files", "Paths point to locations", "Extensions tell file type", "Permissions control access"],
      copy: { prompt: "Type the idea", answer: "folders files paths extensions", hint: "Think address and type." },
      repeats: [
        { prompt: "What does .txt usually mean?", choices: ["Text file", "Video file", "Password"], answer: 0, hint: "Plain text." },
        { prompt: "What usually causes file not found?", choices: ["Wrong path", "Good spelling", "More RAM"], answer: 0, hint: "Check the address." },
        { prompt: "What controls who can open a file?", choices: ["Permissions", "Wallpaper", "Battery"], answer: 0, hint: "Access rules." },
        { prompt: "Quick: what is a path?", choices: ["A file address", "A keyboard key", "A browser tab"], answer: 0, hint: "It is the address." },
        { prompt: "Fake ticket: the folder name is Projects, but the user typed Project. What is the fix?", choices: ["Correct the path", "Reinstall Windows", "Replace the drive"], answer: 0, hint: "Check the spelling first." }
      ],
      explain: { prompt: "Explain file path in plain English.", answer: "the address that tells the computer where a file lives", hint: "Use address words." },
      breakTicket: { issue: "A project cannot be opened because the folder name is misspelled.", choices: ["Check the exact path", "Reinstall Windows", "Replace the drive"], answer: 0 },
      fixTicket: { issue: "A file opens for you but not for the user.", choices: ["Check permissions", "Change wallpaper", "Reboot the fan"], answer: 0 },
      skill: {
        ticket: "The user says a file vanished after it was renamed.",
        questions: [
          { prompt: "What should you check first?", choices: ["The exact path and name", "The monitor brightness", "The printer cable"], answer: 0 },
          { prompt: "What does permissions control?", choices: ["Who can open or change files", "How fast RAM runs", "How loud the fan is"], answer: 0 }
        ]
      },
      unlock: "You can track a file by its address, type, and permissions."
    },
    {
      id: "0_5",
      title: "Install Software",
      summary: "Names, IPs, HTTP, and ports work together.",
      word: { term: "DNS", plain: "the phone book that turns names into IP addresses", where: "When a website name loads before the page opens", why: "Names must resolve before the connection works." },
      watch: ["Name goes to DNS", "IP reaches the server", "HTTP asks for data", "Ports choose the service"],
      copy: { prompt: "Type the flow", answer: "dns ip http port", hint: "From name to request." },
      repeats: [
        { prompt: "What does DNS do?", choices: ["Turns names into IPs", "Makes the screen bright", "Clears the recycle bin"], answer: 0, hint: "It is the phone book." },
        { prompt: "What port does HTTPS usually use?", choices: ["443", "21", "25"], answer: 0, hint: "Secure web traffic." },
        { prompt: "What is HTTP?", choices: ["Web request protocol", "Keyboard shortcut", "Disk format"], answer: 0, hint: "It moves web data." },
        { prompt: "Quick: if a site name fails, what should you try?", choices: ["DNS check", "Change wallpaper", "Delete cookies only"], answer: 0, hint: "Look up the name first." },
        { prompt: "Fake ticket: the site loads by IP but not by name. What is the likely problem?", choices: ["DNS", "RAM", "Mouse"], answer: 0, hint: "Name lookup is broken." }
      ],
      explain: { prompt: "Explain DNS in plain English.", answer: "the phone book that turns a name into an IP address", hint: "Think contact list." },
      breakTicket: { issue: "A server name fails, but the IP works.", choices: ["DNS", "RAM", "Mouse"], answer: 0 },
      fixTicket: { issue: "A browser loads some sites but not the team site.", choices: ["Check DNS", "Replace the mouse", "Clear RAM"], answer: 0 },
      skill: {
        ticket: "The user can reach the internet, but not the company site by name.",
        questions: [
          { prompt: "What do you check first?", choices: ["DNS", "CPU", "Bluetooth"], answer: 0 },
          { prompt: "What usually serves web pages securely?", choices: ["HTTPS on port 443", "SSH on port 22", "FTP on port 53"], answer: 0 }
        ]
      },
      unlock: "You can trace a web request from name to server."
    },
    {
      id: "0_6",
      title: "Command Prompt",
      summary: "Use a shell to move faster and automate work.",
      word: { term: "Shell", plain: "a text window that listens to commands", where: "Terminal, PowerShell, Bash", why: "It lets you work faster with text." },
      watch: ["cd moves folders", "dir or ls shows files", "pwd shows location", "Tab can finish names"],
      copy: { prompt: "Type the three basics", answer: "cd dir pwd", hint: "Move, list, locate." },
      repeats: [
        { prompt: "What command changes folder?", choices: ["cd", "copy", "ping"], answer: 0, hint: "Change directory." },
        { prompt: "What command shows where you are?", choices: ["pwd", "npm", "cls"], answer: 0, hint: "Print working directory." },
        { prompt: "What helps finish long file names?", choices: ["Tab completion", "More RAM", "A bigger mouse"], answer: 0, hint: "Press Tab." },
        { prompt: "Quick: what is the shell?", choices: ["A command window", "A folder", "A virus"], answer: 0, hint: "It listens to text." },
        { prompt: "Fake ticket: the user is in the wrong folder and cannot find the project. What is the fix?", choices: ["Use cd to move", "Reboot the monitor", "Delete the repo"], answer: 0, hint: "Go to the right place." }
      ],
      explain: { prompt: "Explain the shell in plain English.", answer: "a text window where you type commands to control the computer", hint: "Use command words." },
      breakTicket: { issue: "A user says the command did not work because they are in the wrong folder.", choices: ["Use cd to move", "Reboot the monitor", "Delete the repo"], answer: 0 },
      fixTicket: { issue: "The terminal says permission denied.", choices: ["Check access rights", "Change wallpaper", "Reboot the fan"], answer: 0 },
      skill: {
        ticket: "You need to locate a file quickly without clicking around.",
        questions: [
          { prompt: "What command lists files?", choices: ["dir or ls", "copy", "echo off"], answer: 0 },
          { prompt: "What should you use to move to the project folder?", choices: ["cd", "git push", "shutdown"], answer: 0 }
        ]
      },
      unlock: "You can move, inspect, and fix with text instead of clicks."
    },
    {
      id: "0_7",
      title: "Networking Basics",
      summary: "Source code, dependencies, and build steps.",
      word: { term: "Dependency", plain: "another piece of software your project needs", where: "npm install, pip install, package.json", why: "Missing pieces break builds." },
      watch: ["Source code is the instructions", "Dependencies add features", "Compilers or interpreters run it", "Build errors often name the missing piece"],
      copy: { prompt: "Type the build chain", answer: "source dependency build app", hint: "Start with source code." },
      repeats: [
        { prompt: "What does a missing dependency usually cause?", choices: ["A build error", "A brighter screen", "More storage"], answer: 0, hint: "The app cannot start." },
        { prompt: "What installs Python packages?", choices: ["pip", "paint", "ping"], answer: 0, hint: "Python package tool." },
        { prompt: "What file often lists Node dependencies?", choices: ["package.json", "notes.txt", "boot.ini"], answer: 0, hint: "It names packages." },
        { prompt: "Quick: what is source code?", choices: ["Human-written instructions", "A cable type", "A folder icon"], answer: 0, hint: "People write it." },
        { prompt: "Fake ticket: the app fails with a missing module error. What should you do first?", choices: ["Install the dependency", "Replace the keyboard", "Delete the logs"], answer: 0, hint: "Missing module means missing package." }
      ],
      explain: { prompt: "Explain dependencies in plain English.", answer: "the extra software a project needs before it can run", hint: "Think required ingredients." },
      breakTicket: { issue: "A build fails with a missing module error.", choices: ["Install the dependency", "Change the wallpaper", "Reboot the keyboard"], answer: 0 },
      fixTicket: { issue: "The project runs on one machine but not another.", choices: ["Read the missing package name", "Change the monitor", "Rename the folder"], answer: 0 },
      skill: {
        ticket: "A developer says npm install fixed nothing and the error still names a missing package.",
        questions: [
          { prompt: "What should you read in the error first?", choices: ["The missing package name", "The wallpaper color", "The mouse brand"], answer: 0 },
          { prompt: "What usually resolves the missing package?", choices: ["Install the dependency", "Change the monitor", "Rename the folder"], answer: 0 }
        ]
      },
      unlock: "You can spot the missing ingredient in a broken build."
    },
    {
      id: "0_8",
      title: "Troubleshooting",
      summary: "Protect accounts, devices, and people.",
      word: { term: "2FA", plain: "a second check after the password", where: "Authenticator app, code, security key", why: "Passwords alone are not enough." },
      watch: ["Look for phishing", "Use strong passwords", "Enable 2FA", "Lock down stolen tokens fast"],
      copy: { prompt: "Type the defense list", answer: "password 2fa phishing token", hint: "Protect the account." },
      repeats: [
        { prompt: "What is phishing?", choices: ["A fake login trick", "A faster cable", "A backup battery"], answer: 0, hint: "It tries to steal login info." },
        { prompt: "What should you do after a suspicious login?", choices: ["Reset password and revoke tokens", "Wait and see", "Ignore it"], answer: 0, hint: "Contain fast." },
        { prompt: "What does 2FA add?", choices: ["A second proof", "A bigger monitor", "A louder fan"], answer: 0, hint: "Second check." },
        { prompt: "Quick: what should a password never do?", choices: ["Be reused everywhere", "Be unique", "Be long"], answer: 0, hint: "Reused passwords are risky." },
        { prompt: "Fake ticket: a login appears from another country. What is the first action?", choices: ["Change password and revoke sessions", "Wait overnight", "Delete the browser"], answer: 0, hint: "Contain the account." }
      ],
      explain: { prompt: "Explain 2FA in plain English.", answer: "a second check that proves it is really you", hint: "Password plus something else." },
      breakTicket: { issue: "A user clicked a fake sign-in page.", choices: ["Check the URL", "Wait and see", "Delete the browser"], answer: 0 },
      fixTicket: { issue: "The account may be stolen.", choices: ["Revoke access and reset passwords", "Wait and see", "Share the code"], answer: 0 },
      skill: {
        ticket: "A teammate reports a login from a strange country and a reset email they never asked for.",
        questions: [
          { prompt: "What should happen first?", choices: ["Revoke access and reset passwords", "Ignore it", "Share the code"], answer: 0 },
          { prompt: "What habit protects login pages?", choices: ["Check the URL", "Use the same password", "Turn off updates"], answer: 0 }
        ]
      },
      unlock: "You can protect accounts before the damage spreads."
    },
    {
      id: "0_9",
      title: "PowerShell Introduction",
      summary: "Use every skill in one support ticket.",
      word: { term: "Triage", plain: "sort the biggest problem first", where: "A user has several issues at once", why: "Fix the blocker before the bonus problem." },
      watch: ["Collect clues", "Test one fix at a time", "Check the layer that failed", "Keep the user moving"],
      copy: { prompt: "Type the triage loop", answer: "clues test fix verify", hint: "Do not guess." },
      repeats: [
        { prompt: "What should you do first on a messy ticket?", choices: ["Collect clues", "Guess wildly", "Replace everything"], answer: 0, hint: "Start with facts." },
        { prompt: "What is the safest fix style?", choices: ["One change at a time", "Ten changes at once", "No testing"], answer: 0, hint: "Keep control." },
        { prompt: "What does triage mean?", choices: ["Pick the biggest blocker first", "Buy new hardware", "Ignore the ticket"], answer: 0, hint: "Prioritize the blocker." },
        { prompt: "Quick: what should you verify after each fix?", choices: ["It actually worked", "The wallpaper", "The keyboard color"], answer: 0, hint: "Verify before moving on." },
        { prompt: "Fake ticket: DNS fails, the file path is wrong, and the user is panicking. What comes first?", choices: ["Fix the blocker", "Reformat the drive", "Wait for luck"], answer: 0, hint: "Choose the blocker." }
      ],
      explain: { prompt: "Explain triage in plain English.", answer: "choosing the biggest blocker first so the user can move again", hint: "Biggest blocker." },
      breakTicket: { issue: "A user has a bad password, a broken path, and a DNS problem at once.", choices: ["Fix the blocker", "Reformat the drive", "Wait for luck"], answer: 0 },
      fixTicket: { issue: "The team needs a fast way to decide what to fix first.", choices: ["Pick the blocker", "Fix every issue at once", "Close the ticket"], answer: 0 },
      skill: {
        ticket: "A support queue has file, network, and login issues mixed together.",
        questions: [
          { prompt: "What is the correct first move?", choices: ["Pick the blocker", "Fix every issue at once", "Close the ticket"], answer: 0 },
          { prompt: "Why does triage matter?", choices: ["It gets the user moving again", "It makes the screen brighter", "It changes the keyboard layout"], answer: 0 }
        ]
      },
      unlock: "You can diagnose a multi-layer issue without getting lost."
    }
  ];

  const EXTRA_GLOSSARY = [
    { term: "Input", plain: "data the computer receives", where: "Typing, clicking, sensors", why: "It starts the work." },
    { term: "Output", plain: "what the computer shows back", where: "Screen, sound, printer", why: "It tells the user the result." },
    { term: "Permission", plain: "who can open or change something", where: "File sharing, folders, apps", why: "It protects access." },
    { term: "Port", plain: "a door a service listens on", where: "HTTP, SSH, email", why: "It routes traffic correctly." },
    { term: "Token", plain: "a temporary proof for a login or session", where: "APIs, sign-ins, app sessions", why: "It can be revoked when stolen." }
  ];

  const PROJECTS = [
    {
      name: "PC Basics Lab",
      outcome: "Explain CPU, RAM, and storage in plain language.",
      steps: ["Open Task Manager", "Identify CPU, Memory, and Disk panels", "Write one sentence per part"],
      verify: "A friend can read your notes and explain each part back to you.",
      job: "Help desk calls where users report slowness.",
      xp: 40
    },
    {
      name: "File Path Recovery",
      outcome: "Recover a missing file by correcting a wrong path.",
      steps: ["Create nested folders", "Move a test file", "Break the path", "Fix the path and reopen the file"],
      verify: "You can open the file from both File Explorer and full path.",
      job: "Support tickets for missing shared files.",
      xp: 40
    },
    {
      name: "DNS Check Drill",
      outcome: "Prove whether a website issue is DNS or full outage.",
      steps: ["Ping a public IP", "Ping a domain name", "Compare results", "Write root cause"],
      verify: "Your notes correctly identify DNS-only failure vs full failure.",
      job: "Network triage and incident response.",
      xp: 50
    },
    {
      name: "Terminal Navigation Sprint",
      outcome: "Move, list, and locate files using shell commands only.",
      steps: ["Use cd to move folders", "Use dir/ls to list contents", "Use pwd to verify location"],
      verify: "You complete the path challenge without clicking through folders.",
      job: "Daily sysadmin and automation workflows.",
      xp: 35
    },
    {
      name: "Account Security Lockdown",
      outcome: "Contain a suspicious account quickly and safely.",
      steps: ["Identify phishing signs", "Reset password", "Revoke sessions/tokens", "Enable 2FA"],
      verify: "You document the containment timeline and prevention steps.",
      job: "SOC and IT support security escalations.",
      xp: 50
    }
  ];

  function state() {
    try {
      return JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveState(value) {
    localStorage.setItem(STATE_KEY, JSON.stringify(value));
  }

  function roomState(data, roomId) {
    data.rooms ||= {};
    data.rooms[roomId] ||= { steps: {}, repeat: {}, explain: "", copy: "", skill: {}, done: false };
    return data.rooms[roomId];
  }

  function getXp() {
    return Number.parseInt(localStorage.getItem(XP_KEY) || "0", 10) || 0;
  }

  let lastXp = getXp();

  function setXp(value) {
    localStorage.setItem(XP_KEY, String(Math.max(0, value)));
  }

  function addXp(amount) {
    setXp(getXp() + amount);
  }

  function xpPercent(xpValue) {
    return Math.round(((Math.max(0, xpValue) % XP_LEVEL_SIZE) / XP_LEVEL_SIZE) * 100);
  }

  function playXpChime() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const context = new AudioCtx();
    const now = context.currentTime;

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    gain.connect(context.destination);

    const oscA = context.createOscillator();
    oscA.type = "sine";
    oscA.frequency.setValueAtTime(440, now);
    oscA.frequency.exponentialRampToValueAtTime(660, now + 0.25);
    oscA.connect(gain);

    const oscB = context.createOscillator();
    oscB.type = "triangle";
    oscB.frequency.setValueAtTime(550, now + 0.08);
    oscB.frequency.exponentialRampToValueAtTime(880, now + 0.35);
    oscB.connect(gain);

    oscA.start(now);
    oscB.start(now + 0.08);
    oscA.stop(now + 0.35);
    oscB.stop(now + 0.6);
  }

  function triggerXpFeedback(previousXp, currentXp) {
    const before = xpPercent(previousXp);
    const after = xpPercent(currentXp);

    document.querySelectorAll("[data-xp-fill]").forEach((bar) => {
      bar.style.width = `${before}%`;
      bar.classList.remove("xp-boost");
      void bar.offsetWidth;
      bar.style.width = `${after}%`;
      bar.classList.add("xp-boost");
      window.setTimeout(() => bar.classList.remove("xp-boost"), 700);
    });

    const burst = document.querySelector("[data-xp-burst]");
    if (burst) {
      burst.textContent = `+${currentXp - previousXp} XP`;
      burst.classList.remove("show");
      void burst.offsetWidth;
      burst.classList.add("show");
      window.setTimeout(() => burst.classList.remove("show"), 900);
    }

    playXpChime();
  }

  function roomIndex(roomId) {
    return ROOM_DATA.findIndex((room) => room.id === roomId);
  }

  function normalize(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function prefix() {
    return document.body.dataset.rootPrefix || "";
  }

  function page() {
    return document.body.dataset.page || "dashboard";
  }

  function roomId() {
    return document.body.dataset.room || "0_1";
  }

  function stepIndex() {
    return Number.parseInt(document.body.dataset.step || "1", 10) || 1;
  }

  function stepXp(step) {
    return STEP_XP;
  }

  function completeStep(roomStateValue, step) {
    if (!roomStateValue.steps[step]) {
      addXp(stepXp(step));
    }
    roomStateValue.steps[step] = true;
  }

  function completeRoom(roomStateValue) {
    if (!roomStateValue.done) {
      addXp(ROOM_COMPLETE_XP);
    }
    roomStateValue.done = true;
  }

  function cardDoneCount(data) {
    return ROOM_DATA.filter((room) => roomState(data, room.id).done).length;
  }

  function stepDoneCount(data) {
    return ROOM_DATA.reduce((total, room) => total + Object.values(roomState(data, room.id).steps).filter(Boolean).length, 0);
  }

  function nav() {
    const currentPage = page();
    const isStepPage = currentPage === "step";
    const isRoomPage = currentPage === "room";
    const currentRoomId = roomId();
    const currentStep = stepIndex();
    const roomBase = `${prefix()}level0/${folder(currentRoomId)}/`;
    const prevHref = isStepPage
      ? (currentStep === 1 ? `${roomBase}${folder(currentRoomId)}.html` : `${roomBase}${STEP_FILES[currentStep - 2]}`)
      : "#";
    const nextHref = isStepPage
      ? (currentStep === 9 ? `${prefix()}index.html` : `${roomBase}${STEP_FILES[currentStep]}`)
      : "#";
    const backRoomHref = (isStepPage || isRoomPage) ? `${roomBase}${folder(currentRoomId)}.html` : "#";
    const prevDisabled = isStepPage ? "" : " aria-disabled=\"true\" onclick=\"return false;\" style=\"opacity:.5;pointer-events:none\"";
    const nextDisabled = isStepPage ? "" : " aria-disabled=\"true\" onclick=\"return false;\" style=\"opacity:.5;pointer-events:none\"";
    const roomDisabled = (isStepPage || isRoomPage) ? "" : " aria-disabled=\"true\" onclick=\"return false;\" style=\"opacity:.5;pointer-events:none\"";
    return `
      <div class="nav-row">
        <a class="nav-button primary" href="${prefix()}index.html">Dashboard</a>
        <a class="nav-button alt" href="${backRoomHref}"${roomDisabled}>Back to Room</a>
        <a class="nav-button alt" href="${prevHref}"${prevDisabled}>Previous Step</a>
        <a class="nav-button alt" href="${nextHref}"${nextDisabled}>Next Step</a>
        <a class="nav-button primary" href="${prefix()}glossary.html">Glossary</a>
        <a class="nav-button alt" href="${prefix()}projects.html">Projects</a>
        <button class="nav-button warn" data-action="reset">Reset</button>
      </div>
    `;
  }

  function shell(content, data) {
    const xp = getXp();
    const roomsDone = cardDoneCount(data);
    const stepsDone = stepDoneCount(data);
    document.body.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <div class="topbar-inner">
            <div class="brand">
              <h1>NodeZero</h1>
              <p>Level 0 learning system. Short text. Fast loops. Real progress.</p>
            </div>
            ${nav()}
            <div class="nav-row">
              <span class="chip">XP ${xp}</span>
              <span class="chip">Rooms ${roomsDone}/9</span>
              <span class="chip">Steps ${stepsDone}/81</span>
            </div>
            <div class="xp-hud panel">
              <div class="xp-head"><span>XP Core</span><strong>${xp}</strong></div>
              <div class="progress-bar xp-track"><div class="progress-fill" data-xp-fill style="width:${xpPercent(xp)}%"></div></div>
              <div class="xp-burst" data-xp-burst aria-live="polite"></div>
            </div>
          </div>
        </header>
        <main class="page">${content}</main>
        <div class="footer">Dashboard -> Rooms -> Steps -> Next / Previous -> Dashboard</div>
      </div>
    `;
    bind();
  }

  function hero(title, text, stats) {
    return `
      <section class="hero">
        <div class="hero-card">
          <div class="kicker subtle">LEVEL 0 // IT FOUNDATIONS</div>
          <h2>${escapeHtml(title)}</h2>
          <p class="lead">${escapeHtml(text)}</p>
          <div class="chip-row">
            <span class="chip">Translation habit in every lesson</span>
            <span class="chip">Proof of learning: Explain -> Do -> Fix -> Repeat</span>
            <span class="chip">XP only for doing, repeating, fixing, explaining</span>
          </div>
        </div>
        <div class="hero-card">
          <div class="stats-grid">${stats}</div>
        </div>
      </section>
    `;
  }

  function renderDashboard(data) {
    const xp = getXp();
    const roomsDone = cardDoneCount(data);
    const stepsDone = stepDoneCount(data);
    const percent = Math.round((roomsDone / ROOM_DATA.length) * 100);
    return `
      ${hero("Build the habit loop.", "Watch, copy, repeat, explain, break, fix, repeat again, skill check, unlock. Every room keeps the text short and the interaction constant.", `
        <div class="panel stat-box"><strong>${xp}</strong><span>Total XP</span></div>
        <div class="panel stat-box"><strong>${roomsDone}</strong><span>Rooms Complete</span></div>
        <div class="panel stat-box"><strong>${stepsDone}</strong><span>Steps Complete</span></div>
        <div class="panel stat-box"><strong>${percent}%</strong><span>Room Progress</span></div>
      `)}
      <section class="section" id="steps">
        <div class="section-header"><h3 class="section-title">Steps</h3><span class="subtle">The same nine-step loop in every room.</span></div>
        <div class="panel">
          <div class="step-row">${STEP_NAMES.map((name, index) => `<span class="step-pill current">${index + 1}. ${escapeHtml(name)}</span>`).join("")}</div>
          <p class="note" style="margin-top:12px">Progress is tracked with localStorage. Keep going room by room.</p>
          <div style="margin-top:14px" class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
        </div>
      </section>
      <section class="section" id="rooms">
        <div class="section-header"><h3 class="section-title">Rooms</h3><span class="subtle">Nine modules. One habit loop each.</span></div>
        <div class="card-grid" style="display:grid;grid-template-columns:1fr;gap:12px;max-width:860px;margin:0 auto;">
          ${ROOM_DATA.map((room) => roomCard(room, data)).join("")}
        </div>
      </section>
      <section class="section">
        <div class="section-header"><h3 class="section-title">Final Mission</h3><span class="subtle">Use everything together.</span></div>
        <div class="panel"><p>Five short support phases. Fix what matters first. Write the final report to complete Level 0.</p><div style="margin-top:14px"><a class="button" href="${prefix()}level0/final_mission.html">Launch Final Mission</a></div></div>
      </section>
    `;
  }

  function roomCard(room, data) {
    const roomStateValue = roomState(data, room.id);
    const done = roomStateValue.done;
    const steps = STEP_NAMES.map((name, index) => `<span class="step-pill ${roomStateValue.steps[index + 1] ? "done" : ""}">${index + 1}</span>`).join("");
    return `
      <a class="room-card ${done ? "active" : ""}" href="${prefix()}level0/${folder(room.id)}/${folder(room.id)}.html">
        <div class="room-meta"><span class="chip">Room ${room.id.replace("_", ".")}</span><span class="chip">${done ? "done" : "open"}</span></div>
        <h3>${escapeHtml(room.title)}</h3>
        <p>${escapeHtml(room.summary)}</p>
        <div class="room-step-line">${steps}</div>
        <div class="chip-row">${STEP_NAMES.map((name) => `<span class="chip">${escapeHtml(name)}</span>`).join("")}</div>
      </a>
    `;
  }

  function folder(roomIdValue) {
    return `room${roomIdValue.replace("_", "_")}`;
  }

  function renderGlossary() {
    const terms = ROOM_DATA.map((room) => ({
      term: room.word.term,
      plain: room.word.plain,
      where: room.word.where,
      why: room.word.why,
      remember: `Link ${room.word.term} to this short cue: ${room.word.plain}`,
      label: room.title
    })).concat(EXTRA_GLOSSARY.map((entry) => ({
      term: entry.term,
      plain: entry.plain,
      where: entry.where,
      why: entry.why,
      remember: `Say: ${entry.term} -> ${entry.plain}`,
      label: "Extra"
    })));
    return `
      ${hero("Plain English first.", "Each term uses the same translation habit: word, plain English, where you see it, why it matters.", `
        <div class="panel stat-box"><strong>${terms.length}</strong><span>Terms</span></div>
        <div class="panel stat-box"><strong>${ROOM_DATA.length}</strong><span>Room words</span></div>
      `)}
      <section class="section">
        <div class="panel">
          <div class="section-header"><h3 class="section-title">Flashcard Mode</h3><span class="subtle">Front: term. Back: definition, example, why, memory cue.</span></div>
          <div class="choice-row" style="margin-top:12px">
            <button class="button" data-action="flash-prev">Previous</button>
            <button class="button" data-action="flash-flip">Flip Card</button>
            <button class="button" data-action="flash-next">Next</button>
          </div>
          <article class="glossary-card" id="flashcard" data-flash-index="0" data-flash-side="front" style="margin-top:12px"></article>
        </div>
      </section>
      <section class="section">
        <div class="card-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;">
          ${terms.map((entry) => glossaryCard(entry.term, entry, entry.label)).join("")}
        </div>
      </section>
    `;
  }

  function glossaryCard(term, data, label) {
    return `
      <article class="glossary-card">
        <div class="room-meta"><span class="chip">${escapeHtml(label)}</span><span class="chip">${escapeHtml(term)}</span></div>
        <h3>${escapeHtml(term)}</h3>
        <p style="margin-top:8px"><strong>Plain English:</strong> ${escapeHtml(data.plain)}</p>
        <p style="margin-top:8px"><strong>Real-world example:</strong> ${escapeHtml(data.where)}</p>
        <p style="margin-top:8px"><strong>Why it matters:</strong> ${escapeHtml(data.why)}</p>
        <p style="margin-top:8px"><strong>How to remember it:</strong> ${escapeHtml(data.remember || `Say ${term} in one short sentence.`)}</p>
      </article>
    `;
  }

  function renderProjects() {
    return `
      ${hero("Small wins. Real practice.", "These are quick projects that match the room skills so the learning stays active.", `
        <div class="panel stat-box"><strong>${PROJECTS.length}</strong><span>Starter projects</span></div>
        <div class="panel stat-box"><strong>9</strong><span>Modules feeding them</span></div>
      `)}
      <section class="section">
        <div class="card-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;">
          ${PROJECTS.map((project) => `
            <article class="project-card">
              <div class="room-meta"><span class="chip">Project</span><span class="chip">NodeZero</span></div>
              <h3>${escapeHtml(project.name)}</h3>
              <p style="margin-top:8px"><strong>Outcome:</strong> ${escapeHtml(project.outcome)}</p>
              <p style="margin-top:8px"><strong>Steps:</strong></p>
              <ol style="margin-top:4px;padding-left:18px">
                ${project.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ol>
              <p style="margin-top:8px"><strong>Verification:</strong> ${escapeHtml(project.verify)}</p>
              <p style="margin-top:8px"><strong>Job connection:</strong> ${escapeHtml(project.job)}</p>
              <p style="margin-top:8px"><strong>Reward:</strong> +${project.xp} XP</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function roomLanding(room, data) {
    const roomStateValue = roomState(data, room.id);
    const stepDone = Object.values(roomStateValue.steps).filter(Boolean).length;
    return `
      ${hero(`Room ${room.id.replace("_", ".")} — ${room.title}`, room.summary, `
        <div class="panel stat-box"><strong>${stepDone}</strong><span>Steps seen</span></div>
        <div class="panel stat-box"><strong>${roomStateValue.done ? "Done" : "Open"}</strong><span>Room status</span></div>
      `)}
      <section class="section">
        <div class="lesson-grid">
          <article class="panel">
            <div class="kicker">Translation habit</div>
            <h3>${escapeHtml(room.word.term)}</h3>
            <div class="translation-grid" style="margin-top:12px">
              <div class="translation-cell"><strong>Plain English</strong><span>${escapeHtml(room.word.plain)}</span></div>
              <div class="translation-cell"><strong>Where I see it</strong><span>${escapeHtml(room.word.where)}</span></div>
              <div class="translation-cell"><strong>Why it matters</strong><span>${escapeHtml(room.word.why)}</span></div>
              <div class="translation-cell"><strong>Remember</strong><span>Say it in one short sentence.</span></div>
            </div>
          </article>
          <article class="panel">
            <div class="kicker">Start</div>
            <h3>Begin the room</h3>
            <p class="note">Use the nine-step loop. Go step by step. Keep the screen moving.</p>
            <div class="choice-row" style="margin-top:14px">
              <a class="button" href="${folderPrefix(room.id)}step1_learn.html">Start lesson</a>
              <a class="button" href="${prefix()}index.html#rooms">Back to rooms</a>
            </div>
            <div class="room-step-line" style="margin-top:14px">${STEP_NAMES.map((name, index) => `<span class="step-pill ${roomStateValue.steps[index + 1] ? "done" : ""}">${index + 1}. ${escapeHtml(name)}</span>`).join("")}</div>
          </article>
        </div>
      </section>
    `;
  }

  function folderPrefix(roomIdValue) {
    return `${prefix()}level0/${folder(roomIdValue)}/`;
  }

  function renderStep(room, data, stepNumber) {
    const roomStateValue = roomState(data, room.id);
    const prev = stepNumber === 1 ? `${folderPrefix(room.id)}${folder(room.id)}.html` : `${folderPrefix(room.id)}${STEP_FILES[stepNumber - 2]}`;
    const next = stepNumber === 9 ? `${prefix()}index.html` : `${folderPrefix(room.id)}${STEP_FILES[stepNumber]}`;
    const stepTitle = STEP_NAMES[stepNumber - 1];
    const statusId = `status-${room.id}-${stepNumber}`;
    const stepState = roomStateValue.steps;
    const stepDots = STEP_NAMES.map((name, index) => `<span class="step-pill ${stepState[index + 1] ? "done" : ""} ${index + 1 === stepNumber ? "current" : ""}">${index + 1}. ${escapeHtml(name)}</span>`).join("");
    const top = `${hero(`Room ${room.id.replace("_", ".")} // Step ${stepNumber} of 9`, `${stepTitle} — ${room.title}`, `
      <div class="panel stat-box"><strong>${Math.round(((stepNumber - 1) / 9) * 100)}%</strong><span>Room progress</span></div>
      <div class="panel stat-box"><strong>+${stepXp(stepNumber)}</strong><span>XP on success</span></div>
    `)}`;
    const body = stepNumber === 1 ? renderWatch(room, statusId)
      : stepNumber === 2 ? renderCopy(room, statusId)
      : stepNumber === 3 ? renderRepeat(room, data, room.id, statusId, [0, 1, 2])
      : stepNumber === 4 ? renderExplain(room, statusId)
      : stepNumber === 5 ? renderBreak(room, statusId)
      : stepNumber === 6 ? renderFix(room, statusId)
      : stepNumber === 7 ? renderRepeat(room, data, room.id, statusId, [3, 4])
      : stepNumber === 8 ? renderSkill(room, statusId)
      : renderUnlock(room, statusId);
    return `
      ${top}
      <section class="section">
        <div class="lesson-grid">
          <div class="lesson-stack">
            ${body}
          </div>
          <div class="lesson-stack">
            <article class="panel">
              <div class="kicker">Step map</div>
              <div class="step-row" id="lesson-steps">${stepDots}</div>
            </article>
            <article class="panel">
              <div class="kicker">Translation habit</div>
              <h3>${escapeHtml(room.word.term)}</h3>
              <div class="translation-grid" style="margin-top:12px">
                <div class="translation-cell"><strong>Plain English</strong><span>${escapeHtml(room.word.plain)}</span></div>
                <div class="translation-cell"><strong>Where I see it</strong><span>${escapeHtml(room.word.where)}</span></div>
                <div class="translation-cell"><strong>Why it matters</strong><span>${escapeHtml(room.word.why)}</span></div>
                <div class="translation-cell"><strong>Remember</strong><span>Say it in one short sentence.</span></div>
              </div>
            </article>
            <article class="panel">
              <div class="kicker">Move</div>
              <div class="nav-row" style="margin-top:12px">
                <a class="button" href="${prev}">Previous</a>
                <a class="button" href="${next}">Next</a>
                <a class="button" href="${prefix()}index.html">Dashboard</a>
                <a class="button" href="${folderPrefix(room.id)}${folder(room.id)}.html">Back to Room</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderWatch(room, statusId) {
    return `
      <article class="panel">
        <div class="kicker">Watch</div>
        <h3>${escapeHtml(room.title)}</h3>
        <p class="note">Tap a card. No long reading. Keep the signal high.</p>
        <div class="watch-list">${room.watch.map((item, index) => `<button class="watch-item choice" data-action="watch" data-room="${room.id}" data-step="1" data-index="${index}"><strong>${index + 1}. ${escapeHtml(item)}</strong><span class="subtle">Tap to mark it.</span></button>`).join("")}</div>
        <div class="status" id="${statusId}">Tap one card to complete the watch step.</div>
      </article>
    `;
  }

  function renderCopy(room, statusId) {
    return `
      <article class="panel">
        <div class="kicker">Copy</div>
        <h3>Copy the pattern</h3>
        <p class="note">This is the doing step. Type the short phrase.</p>
        <div class="ticket-box" style="margin-top:12px"><strong>Challenge</strong><p>${escapeHtml(room.copy.prompt)}</p></div>
        <div style="margin-top:12px"><input class="input" data-copy-input="${room.id}" placeholder="Type here" /></div>
        <div class="choice-row"><button class="button" data-action="copy" data-room="${room.id}" data-step="2">Check answer</button><button class="button" data-action="hint" data-room="${room.id}" data-step="2">Show hint</button></div>
        <div class="status" id="${statusId}">${escapeHtml(room.copy.hint)}</div>
      </article>
    `;
  }

  function renderRepeat(room, data, roomIdValue, statusId, attemptIndices) {
    const roomStateValue = roomState(data, roomIdValue);
    const selected = roomStateValue.repeat.current ?? attemptIndices[0];
    const attempt = room.repeats[selected];
    return `
      <article class="panel">
        <div class="kicker">Repeat</div>
        <h3>${selected < 3 ? "Attempts 1-3" : "Attempts 4-5"}</h3>
        <p class="note">Attempt 1 guided. Attempt 2 hints. Attempt 3 no hints. Attempt 4 timed. Attempt 5 fake ticket.</p>
        <div class="choice-row">${attemptIndices.map((index) => `<button class="mini-button" data-action="repeat-select" data-room="${room.id}" data-attempt="${index}">Attempt ${index + 1}</button>`).join("")}</div>
        <div class="ticket-box" style="margin-top:12px"><strong>Prompt</strong><p>${escapeHtml(attempt.prompt)}</p><p class="note" style="margin-top:8px">${escapeHtml(attempt.hint)}</p></div>
        ${selected === 3 ? `<div class="timer-box" data-timer-box="${room.id}"><strong>Timed round</strong><p class="note">Answer before the timer hits zero.</p><div class="progress-bar" style="margin-top:10px"><div class="progress-fill" data-timer-fill="${room.id}" style="width:100%"></div></div><div class="status" data-timer-label="${room.id}">20 seconds ready.</div></div>` : ""}
        <div class="choice-row">${attempt.choices.map((choice, index) => `<button class="choice" data-action="repeat" data-room="${room.id}" data-attempt="${selected}" data-choice="${index}">${escapeHtml(choice)}</button>`).join("")}</div>
        <div class="status" id="${statusId}">${selected === 3 ? "Timed round. Fast answer wins." : "Pick the best answer."}</div>
      </article>
    `;
  }

  function renderExplain(room, statusId) {
    return `
      <article class="panel">
        <div class="kicker">Explain</div>
        <h3>Say it in plain English</h3>
        <p class="note">This is the proof step. Keep it short. Use the translation habit.</p>
        <div class="ticket-box" style="margin-top:12px"><strong>Prompt</strong><p>${escapeHtml(room.explain.prompt)}</p></div>
        <textarea class="textarea" data-explain-input="${room.id}" placeholder="Write one short sentence here"></textarea>
        <div class="choice-row"><button class="button" data-action="explain" data-room="${room.id}" data-step="4">Check explanation</button><button class="button" data-action="hint-explain" data-room="${room.id}" data-step="4">Show hint</button></div>
        <div class="status" id="${statusId}">${escapeHtml(room.explain.hint)}</div>
      </article>
    `;
  }

  function renderBreak(room, statusId) {
    return `
      <article class="panel">
        <div class="kicker">Break</div>
        <h3>Fake fault</h3>
        <div class="ticket-box" style="margin-top:12px"><strong>Issue</strong><p>${escapeHtml(room.breakTicket.issue)}</p><p class="note" style="margin-top:8px">Pick the first safe check.</p></div>
        <div class="choice-row">${room.breakTicket.choices.map((choice, index) => `<button class="choice" data-action="break" data-room="${room.id}" data-choice="${index}">${escapeHtml(choice)}</button>`).join("")}</div>
        <div class="status" id="${statusId}">Pick the clue that matters first.</div>
      </article>
    `;
  }

  function renderFix(room, statusId) {
    return `
      <article class="panel">
        <div class="kicker">Fix</div>
        <h3>Smallest safe fix</h3>
        <div class="ticket-box" style="margin-top:12px"><strong>Issue</strong><p>${escapeHtml(room.fixTicket.issue)}</p><p class="note" style="margin-top:8px">Choose the smallest fix first.</p></div>
        <div class="choice-row">${room.fixTicket.choices.map((choice, index) => `<button class="choice" data-action="fix" data-room="${room.id}" data-choice="${index}">${escapeHtml(choice)}</button>`).join("")}</div>
        <div class="status" id="${statusId}">Choose the smallest safe fix.</div>
      </article>
    `;
  }

  function renderSkill(room, statusId) {
    return `
      <article class="panel">
        <div class="kicker">Skill check</div>
        <h3>Answer both questions</h3>
        <div class="ticket-box" style="margin-top:12px"><strong>Ticket</strong><p>${escapeHtml(room.skill.ticket)}</p></div>
        ${room.skill.questions.map((question, index) => `
          <div class="ticket-box" style="margin-top:12px">
            <strong>Question ${index + 1}</strong>
            <p>${escapeHtml(question.prompt)}</p>
            <div class="choice-row">${question.choices.map((choice, choiceIndex) => `<button class="choice" data-action="skill" data-room="${room.id}" data-question="${index}" data-choice="${choiceIndex}">${escapeHtml(choice)}</button>`).join("")}</div>
          </div>
        `).join("")}
        <div class="status" id="${statusId}">Answer every question to unlock the room.</div>
      </article>
    `;
  }

  function renderUnlock(room, statusId) {
    const next = roomIndex(room.id) < ROOM_DATA.length - 1 ? `${folderPrefix(ROOM_DATA[roomIndex(room.id) + 1].id)}step1_learn.html` : `${prefix()}index.html`;
    return `
      <article class="panel">
        <div class="kicker">Unlock</div>
        <h3>${escapeHtml(room.title)} complete</h3>
        <p class="lead" style="margin-top:10px">${escapeHtml(room.unlock)}</p>
        <div class="choice-row" style="margin-top:14px"><a class="button" href="${next}">Next room</a><a class="button" href="${prefix()}index.html">Dashboard</a></div>
        <div class="status good" id="${statusId}">Room complete.</div>
      </article>
    `;
  }

  function renderFinal(data) {
    data.rooms.finalMission ||= { phases: {}, report: "", reportDone: false };
    const finalState = data.rooms.finalMission;
    const phases = [
      { prompt: "Laptop boots to a black screen after login.", choices: ["Restart explorer.exe", "Replace the CPU", "Format the drive"], answer: 0 },
      { prompt: "Project files are missing because the folder name was typed wrong.", choices: ["Fix the path", "Delete the repo", "Ignore it"], answer: 0 },
      { prompt: "A server name fails but the IP works.", choices: ["Check DNS", "Replace the mouse", "Turn off Wi-Fi"], answer: 0 },
      { prompt: "A build fails with a missing module error.", choices: ["Install the dependency", "Change the wallpaper", "Reboot the keyboard"], answer: 0 },
      { prompt: "A login appears from another country.", choices: ["Revoke access and reset passwords", "Wait and see", "Share the code"], answer: 0 }
    ];
    const score = Object.values(finalState.phases || {}).filter(Boolean).length;
    return `
      ${hero("The certification test.", "Five support phases. Fix what matters first. Write the report to complete Level 0.", `
        <div class="panel stat-box"><strong>${score}/5</strong><span>Phases cleared</span></div>
        <div class="panel stat-box"><strong>${getXp()}</strong><span>Total XP</span></div>
      `)}
      <section class="section">
        <div class="panel">
          ${phases.map((phase, index) => `
            <div class="ticket-box" style="margin-top:12px">
              <strong>Phase ${index + 1}</strong>
              <p>${escapeHtml(phase.prompt)}</p>
              <div class="choice-row">${phase.choices.map((choice, choiceIndex) => `<button class="choice" data-action="final-phase" data-phase="${index + 1}" data-choice="${choiceIndex}">${escapeHtml(choice)}</button>`).join("")}</div>
              <div class="status" id="final-${index + 1}">${finalState.phases?.[index + 1] ? "Done." : "Choose the safest next step."}</div>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="section">
        <div class="panel">
          <h3>Final report</h3>
          <p class="note">Write a short summary of the five issues and how you fixed them.</p>
          <textarea class="textarea" data-final-report placeholder="Keep it brief and concrete.">${escapeHtml(finalState.report || "")}</textarea>
          <div class="choice-row" style="margin-top:12px"><button class="button" data-action="submit-report">Submit report</button><a class="button" href="${prefix()}index.html">Back to dashboard</a></div>
          <div class="status" id="final-report-status">${finalState.reportDone ? "Report saved. Badge earned." : "Need a full report to unlock the badge."}</div>
        </div>
      </section>
    `;
  }

  function writeStatus(id, text, good = false) {
    const node = document.getElementById(id);
    if (!node) return;
    node.textContent = text;
    node.className = `status ${good ? "good" : "bad"}`;
  }

  function bind() {
    document.querySelectorAll("[data-action='reset']").forEach((button) => button.addEventListener("click", () => {
      if (!window.confirm("Reset all Level 0 progress?")) return;
      localStorage.clear();
      location.href = `${prefix()}index.html`;
    }));

    const flashTerms = ROOM_DATA.map((room) => ({
      term: room.word.term,
      plain: room.word.plain,
      where: room.word.where,
      why: room.word.why,
      remember: `Link ${room.word.term} to this cue: ${room.word.plain}`
    })).concat(EXTRA_GLOSSARY.map((entry) => ({
      term: entry.term,
      plain: entry.plain,
      where: entry.where,
      why: entry.why,
      remember: `Say ${entry.term} -> ${entry.plain}`
    })));

    function paintFlashcard() {
      const card = document.getElementById("flashcard");
      if (!card || !flashTerms.length) return;
      const index = Number.parseInt(card.dataset.flashIndex || "0", 10) % flashTerms.length;
      const side = card.dataset.flashSide || "front";
      const item = flashTerms[index];
      if (side === "front") {
        card.innerHTML = `<div class="kicker">Card ${index + 1}/${flashTerms.length}</div><h3>${escapeHtml(item.term)}</h3><p class="note">Think of the plain-English meaning, then flip.</p>`;
      } else {
        card.innerHTML = `<div class="kicker">Back</div><h3>${escapeHtml(item.term)}</h3><p style="margin-top:8px"><strong>Plain English:</strong> ${escapeHtml(item.plain)}</p><p style="margin-top:8px"><strong>Example:</strong> ${escapeHtml(item.where)}</p><p style="margin-top:8px"><strong>Why it matters:</strong> ${escapeHtml(item.why)}</p><p style="margin-top:8px"><strong>How to remember:</strong> ${escapeHtml(item.remember)}</p>`;
      }
    }

    document.querySelectorAll("[data-action='flash-flip']").forEach((button) => button.addEventListener("click", () => {
      const card = document.getElementById("flashcard");
      if (!card) return;
      card.dataset.flashSide = card.dataset.flashSide === "front" ? "back" : "front";
      paintFlashcard();
    }));

    document.querySelectorAll("[data-action='flash-next']").forEach((button) => button.addEventListener("click", () => {
      const card = document.getElementById("flashcard");
      if (!card || !flashTerms.length) return;
      const index = Number.parseInt(card.dataset.flashIndex || "0", 10);
      card.dataset.flashIndex = String((index + 1) % flashTerms.length);
      card.dataset.flashSide = "front";
      paintFlashcard();
    }));

    document.querySelectorAll("[data-action='flash-prev']").forEach((button) => button.addEventListener("click", () => {
      const card = document.getElementById("flashcard");
      if (!card || !flashTerms.length) return;
      const index = Number.parseInt(card.dataset.flashIndex || "0", 10);
      card.dataset.flashIndex = String((index - 1 + flashTerms.length) % flashTerms.length);
      card.dataset.flashSide = "front";
      paintFlashcard();
    }));

    paintFlashcard();

    document.querySelectorAll("[data-action='watch']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = roomState(data, button.dataset.room);
      completeStep(room, 1);
      saveState(data);
      writeStatus(`status-${button.dataset.room}-1`, "Watch step complete. XP earned.", true);
      render();
    }));

    document.querySelectorAll("[data-action='copy']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      const roomStateValue = roomState(data, button.dataset.room);
      const input = document.querySelector(`[data-copy-input='${button.dataset.room}']`);
      const value = normalize(input?.value || "");
      roomStateValue.copy = input?.value || "";
      if (value.includes(normalize(room.copy.answer)) || normalize(room.copy.answer).includes(value)) {
        completeStep(roomStateValue, 2);
        saveState(data);
        writeStatus(`status-${button.dataset.room}-2`, "Copy step complete. XP earned.", true);
        render();
      } else {
        writeStatus(`status-${button.dataset.room}-2`, room.copy.hint, false);
      }
    }));

    document.querySelectorAll("[data-action='hint']").forEach((button) => button.addEventListener("click", () => {
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      writeStatus(`status-${button.dataset.room}-2`, room.copy.hint, true);
    }));

    document.querySelectorAll("[data-action='repeat-select']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const roomStateValue = roomState(data, button.dataset.room);
      roomStateValue.repeat.current = Number.parseInt(button.dataset.attempt, 10);
      saveState(data);
      render();
    }));

    document.querySelectorAll("[data-action='repeat']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      const roomStateValue = roomState(data, button.dataset.room);
      const attempt = Number.parseInt(button.dataset.attempt, 10);
      const choice = Number.parseInt(button.dataset.choice, 10);
      const current = room.repeats[attempt];
      if (choice === current.answer) {
        roomStateValue.repeat[attempt] = true;
        if (attempt < 3) completeStep(roomStateValue, 3);
        if (attempt >= 3) completeStep(roomStateValue, 7);
        saveState(data);
        writeStatus(`status-${button.dataset.room}-${attempt}`, "Repeat step complete. XP earned.", true);
        render();
      } else {
        writeStatus(`status-${button.dataset.room}-${attempt}`, current.hint, false);
      }
    }));

    document.querySelectorAll("[data-action='explain']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      const roomStateValue = roomState(data, button.dataset.room);
      const input = document.querySelector(`[data-explain-input='${button.dataset.room}']`);
      const value = normalize(input?.value || "");
      roomStateValue.explain = input?.value || "";
      const answer = normalize(room.explain.answer);
      if (value.length >= 18 && value.split(" ").some((word) => answer.includes(word))) {
        completeStep(roomStateValue, 4);
        saveState(data);
        writeStatus(`status-${button.dataset.room}-4`, "Explain step complete. XP earned.", true);
        render();
      } else {
        writeStatus(`status-${button.dataset.room}-4`, room.explain.hint, false);
      }
    }));

    document.querySelectorAll("[data-action='hint-explain']").forEach((button) => button.addEventListener("click", () => {
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      writeStatus(`status-${button.dataset.room}-4`, room.explain.hint, true);
    }));

    document.querySelectorAll("[data-action='break']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      const roomStateValue = roomState(data, button.dataset.room);
      const choice = Number.parseInt(button.dataset.choice, 10);
      if (choice === room.breakTicket.answer) {
        completeStep(roomStateValue, 5);
        saveState(data);
        writeStatus(`status-${button.dataset.room}-5`, "Break step complete. XP earned.", true);
        render();
      } else {
        writeStatus(`status-${button.dataset.room}-5`, "Wrong clue. Pick the first safe check.", false);
      }
    }));

    document.querySelectorAll("[data-action='fix']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      const roomStateValue = roomState(data, button.dataset.room);
      const choice = Number.parseInt(button.dataset.choice, 10);
      if (choice === room.fixTicket.answer) {
        completeStep(roomStateValue, 6);
        saveState(data);
        writeStatus(`status-${button.dataset.room}-6`, "Fix step complete. XP earned.", true);
        render();
      } else {
        writeStatus(`status-${button.dataset.room}-6`, "Try the smallest fix first.", false);
      }
    }));

    document.querySelectorAll("[data-action='skill']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      const room = ROOM_DATA[roomIndex(button.dataset.room)];
      const roomStateValue = roomState(data, button.dataset.room);
      const question = room.skill.questions[Number.parseInt(button.dataset.question, 10)];
      const choice = Number.parseInt(button.dataset.choice, 10);
      roomStateValue.skill[button.dataset.question] = choice === question.answer;
      if (room.skill.questions.every((item, index) => roomStateValue.skill[index])) {
        completeStep(roomStateValue, 8);
        completeStep(roomStateValue, 9);
        completeRoom(roomStateValue);
        saveState(data);
        writeStatus(`status-${button.dataset.room}-8`, `Skill check complete. Room unlocked. +${ROOM_COMPLETE_XP} room bonus.`, true);
        render();
      } else {
        saveState(data);
        writeStatus(`status-${button.dataset.room}-8`, "Keep going. Answer every question.", true);
      }
    }));

    document.querySelectorAll("[data-action='final-phase']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      data.rooms.finalMission ||= { phases: {}, report: "", reportDone: false };
      data.rooms.finalMission.phases[Number.parseInt(button.dataset.phase, 10)] = Number.parseInt(button.dataset.choice, 10) === 0;
      saveState(data);
      render();
    }));

    document.querySelectorAll("[data-action='submit-report']").forEach((button) => button.addEventListener("click", () => {
      const data = state();
      data.rooms.finalMission ||= { phases: {}, report: "", reportDone: false };
      const textarea = document.querySelector("[data-final-report]");
      const value = (textarea?.value || "").trim();
      if (value.length < 30) {
        writeStatus("final-report-status", "Write a full report before submitting.", false);
        return;
      }
      data.rooms.finalMission.report = value;
      data.rooms.finalMission.reportDone = true;
      localStorage.setItem("level0_complete", "true");
      saveState(data);
      writeStatus("final-report-status", "Report saved. Badge earned.", true);
    }));

    const timerFill = document.querySelector("[data-timer-fill]");
    const timerLabel = document.querySelector("[data-timer-label]");
    if (timerFill && timerLabel) {
      let remaining = 20;
      const interval = window.setInterval(() => {
        remaining -= 1;
        timerFill.style.width = `${Math.max(0, (remaining / 20) * 100)}%`;
        timerLabel.textContent = remaining > 0 ? `${remaining} seconds left.` : "Timer ended. Use the answer that you know.";
        if (remaining <= 0) window.clearInterval(interval);
      }, 1000);
    }
  }

  function render() {
    const previousXp = lastXp;
    const data = state();
    if (page() === "dashboard") {
      shell(renderDashboard(data), data);
    } else if (page() === "glossary") {
      shell(renderGlossary(), data);
    } else if (page() === "projects") {
      shell(renderProjects(), data);
    } else if (page() === "final") {
      shell(renderFinal(data), data);
    } else {
      const room = ROOM_DATA[roomIndex(roomId())];
      if (page() === "room") shell(roomLanding(room, data), data);
      else shell(renderStep(room, data, stepIndex()), data);
    }

    const currentXp = getXp();
    if (currentXp > previousXp) {
      triggerXpFeedback(previousXp, currentXp);
    }
    lastXp = currentXp;
  }

  render();
})();