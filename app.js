// NodeZero Application JavaScript

const terminalLines = [
  "Initializing NodeZero...",
  "Loading mission data...",
  "Welcome, Operator.",
  "Your training begins now."
];

const rooms = [
  { id: "room0_1", title: "Room 0.1 — Files & Folders", description: "Stop being new to files, folders, and basic navigation.", difficulty: "Beginner", phase: 0, order: 1 },
  { id: "room0_2", title: "Room 0.2 — User Accounts", description: "Understand local users and admin vs standard.", difficulty: "Beginner", phase: 0, order: 2 },
  { id: "room0_3", title: "Room 0.3 — Networking Basics", description: "Learn IP, ping, and DNS at a basic level.", difficulty: "Beginner", phase: 0, order: 3 }
];

const STORAGE_KEY_PROGRESS = "nodezero_progress";
const STORAGE_KEY_XP = "nodezero_xp";
const STORAGE_KEY_STREAK = "nodezero_streak";

function getProgress() {
  const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
  return raw ? JSON.parse(raw) : {};
}

function setProgress(progress) {
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
}

function getXP() {
  return parseInt(localStorage.getItem(STORAGE_KEY_XP) || "0", 10);
}

function setXP(xp) {
  localStorage.setItem(STORAGE_KEY_XP, String(xp));
}

function getStreak() {
  return parseInt(localStorage.getItem(STORAGE_KEY_STREAK) || "0", 10);
}

function setStreak(streak) {
  localStorage.setItem(STORAGE_KEY_STREAK, String(streak));
}

let terminalCursorTimer = null;
let cursorVisible = true;

function typeTerminalLines() {
  const el = document.getElementById("terminalText");
  let lineIndex = 0;
  let charIndex = 0;
  let output = "";

  function updateDisplay() {
    el.textContent = output + (cursorVisible ? "|" : " ");
  }

  function startCursor() {
    clearInterval(terminalCursorTimer);
    cursorVisible = true;
    terminalCursorTimer = setInterval(() => {
      cursorVisible = !cursorVisible;
      updateDisplay();
    }, 500);
  }

  function stopCursor() {
    clearInterval(terminalCursorTimer);
    terminalCursorTimer = null;
    cursorVisible = false;
    updateDisplay();
  }

  function type() {
    if (lineIndex >= terminalLines.length) {
      stopCursor();
      return;
    }

    const line = terminalLines[lineIndex];
    if (charIndex < line.length) {
      output += line[charIndex];
      charIndex++;
      updateDisplay();
      setTimeout(type, 40);
    } else {
      output += "\n";
      lineIndex++;
      charIndex = 0;
      updateDisplay();
      setTimeout(type, 300);
    }
  }

  el.textContent = "";
  startCursor();
  type();
}

function updateDashboard() {
  const xp = getXP();
  const streak = getStreak();
  const level = Math.floor(xp / 100);

  document.getElementById("levelText").textContent = `Level ${level}`;
  document.getElementById("xpText").textContent = `${xp} XP`;
  document.getElementById("streakText").textContent = `Streak: ${streak} days`;
  document.getElementById("xpBar").style.width = `${xp % 100}%`;

  const progress = getProgress();
  const phaseRooms = rooms.filter(r => r.phase === 0);
  const completedCount = phaseRooms.filter(r => progress[r.id]).length;
  const phasePercent = phaseRooms.length ? Math.round((completedCount / phaseRooms.length) * 100) : 0;

  document.getElementById("phaseBar").style.width = `${phasePercent}%`;
  document.getElementById("phaseProgressText").textContent = `${phasePercent}% complete`;

  const nextRoom = phaseRooms.find(r => !progress[r.id]) || phaseRooms[phaseRooms.length - 1] || { title: "Phase complete", description: "You have completed all available rooms." };
  document.getElementById("nextRoomTitle").textContent = nextRoom.title;
  document.getElementById("nextRoomDesc").textContent = nextRoom.description;
}

function completeRoom(roomId) {
  const progress = getProgress();
  if (progress[roomId]) return;

  progress[roomId] = true;
  setProgress(progress);
  setXP(getXP() + 50);
  setStreak(getStreak() + 1);
  updateDashboard();
  renderRooms();
}

function resetProgress() {
  setProgress({});
  setXP(0);
  setStreak(0);
  updateDashboard();
  renderRooms();
  const beginMissionBtn = document.getElementById("beginMissionBtn");
  if (beginMissionBtn) {
    beginMissionBtn.textContent = "Begin Mission";
    beginMissionBtn.disabled = false;
  }
  document.getElementById("terminalText").textContent = "";
}

function renderRooms() {
  const grid = document.getElementById("roomsGrid");
  grid.innerHTML = "";
  const progress = getProgress();

  rooms.sort((a, b) => a.order - b.order).forEach(room => {
    const completed = Boolean(progress[room.id]);
    const card = document.createElement("div");
    card.className = "bg-white/5 border border-white/10 rounded-xl p-4";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-sm font-semibold text-neonGreen">${room.title}</h3>
          <p class="mt-2 text-xs text-gray-400">${room.description}</p>
        </div>
        <span class="text-[11px] uppercase tracking-[0.25em] text-gray-500">${room.difficulty}</span>
      </div>
    `;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.roomId = room.id;
    button.className = completed
      ? "mt-4 w-full inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-gray-400 hover:bg-white/10 transition"
      : "mt-4 w-full inline-flex items-center justify-center rounded-full bg-neonGreen text-black hover:bg-neonGreen/80 px-3 py-2 text-xs font-semibold transition";
    button.textContent = completed ? "Review room" : "Open room";
    button.setAttribute("onclick", `window.location.href='room.html?id=${room.id}'`);

    card.appendChild(button);
    grid.appendChild(card);
  });
}

function showSection(sectionId) {
  document.getElementById("roomsSection").classList.toggle("hidden", sectionId !== "rooms");
}

function setupEventListeners() {
  const beginMissionBtn = document.getElementById("beginMissionBtn");
  if (beginMissionBtn) {
    beginMissionBtn.addEventListener("click", () => {
      beginMissionBtn.textContent = "Mission Started";
      beginMissionBtn.disabled = true;
      document.getElementById("terminalText").textContent = "";
      typeTerminalLines();
    });
  }

  document.getElementById("goToRoomsBtn")?.addEventListener("click", () => {
    document.getElementById("roomsSection").classList.remove("hidden");
  });

  document.getElementById("backToDashboardBtn")?.addEventListener("click", () => {
    document.getElementById("roomsSection").classList.add("hidden");
  });

  document.getElementById("resetProgressBtn")?.addEventListener("click", resetProgress);
}

function init() {
  updateDashboard();
  renderRooms();
  setupEventListeners();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

console.log('NodeZero v1.0.0');
