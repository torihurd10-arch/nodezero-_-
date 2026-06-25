export const LEVELS = [
  {
    id: 0,
    name: 'Level 0 — Computer Fundamentals',
    description: 'Stop being new to computers. Files, folders, apps, and basic control.',
    rooms: [
      { id: 'room0_1', title: 'Room 0.1 — Files & Folders', description: 'Learn how to create, rename, and delete folders.', level: 0, difficulty: 'Beginner', order: 1 },
      { id: 'room0_2', title: 'Room 0.2 — Downloads & Installs', description: 'Practice downloading and installing apps safely.', level: 0, difficulty: 'Beginner', order: 2 },
      { id: 'room0_3', title: 'Room 0.3 — Keyboard & Mouse', description: 'Master basic typing and mouse control.', level: 0, difficulty: 'Beginner', order: 3 },
      { id: 'room0_4', title: 'Room 0.4 — File Explorer', description: 'Navigate folders and files like a pro.', level: 0, difficulty: 'Beginner', order: 4 },
      { id: 'room0_5', title: 'Room 0.5 — Task Manager', description: 'Learn how to open and close programs safely.', level: 0, difficulty: 'Beginner', order: 5 },
    ],
  },
  {
    id: 1,
    name: 'Level 1 — Windows Basics',
    description: 'Users, settings, and basic control of Windows.',
    rooms: [
      { id: 'room1_1', title: 'Room 1.1 — User Accounts', description: 'Learn how to create and manage user accounts in Windows.', level: 1, difficulty: 'Beginner', order: 1 },
      { id: 'room1_2', title: 'Room 1.2 — Permissions & Access', description: 'Understand admin vs standard accounts and folder permissions.', level: 1, difficulty: 'Beginner', order: 2 },
      { id: 'room1_3', title: 'Room 1.3 — Control Panel & Settings', description: 'Explore Control Panel and Windows Settings to customize your system.', level: 1, difficulty: 'Beginner', order: 3 },
      { id: 'room1_4', title: 'Room 1.4 — Folder Sharing', description: 'Share folders between users and learn basic networking permissions.', level: 1, difficulty: 'Beginner', order: 4 },
      { id: 'room1_5', title: 'Room 1.5 — Personalization', description: 'Change desktop background, theme, and display settings.', level: 1, difficulty: 'Beginner', order: 5 },
    ],
  },
]

export const ROOM_DETAILS = {
  room0_1: {
    tasks: [
      'Open File Explorer and locate your Documents folder.',
      "Create a new folder named 'NodeZero_Practice'.",
      "Inside that folder, create a text file named 'mission.txt'.",
      "Write 'Mission Complete' inside and save it.",
    ],
    hints: ['Use right-click → New → Folder to create folders.', 'Double-click to open folders.', 'Right-click → New → Text Document to create files.'],
    resources: ['level0/room0_1/step1_learn.html', 'level0/room0_1/step2_see.html', 'level0/room0_1/step3_do.html'],
  },
  room0_2: {
    tasks: ['Open your browser and search for Notepad++ download.', 'Click the official site and download the installer.', 'Run installer and follow prompts.', 'Open Notepad++ and type Mission Complete.'],
    hints: ['Always download from official websites.', 'Avoid clicking ads or pop-ups.'],
    resources: ['level0/room0_2/step1_learn.html', 'level0/room0_2/step2_see.html', 'level0/room0_2/step3_do.html'],
  },
}

export const TICKETS = [
  {
    id: 'ticket1',
    title: 'New employee: Create account',
    levelHint: 'Level 7 – Active Directory',
    steps: ['Create a new user in Active Directory.', 'Add them to the HR group.', 'Give them access to the shared HR folder.'],
  },
  {
    id: 'ticket2',
    title: 'Internet not working',
    levelHint: 'Level 3 – Networking Fundamentals',
    steps: ['Check if the PC is connected to Wi-Fi or Ethernet.', 'Run ipconfig and check IP address.', 'Ping 8.8.8.8.', 'Ping google.com.', 'Decide if it’s DNS or full internet outage.'],
  },
]

export const GLOSSARY = [
  {
    word: 'DNS',
    plain: 'Internet phonebook.',
    why: 'Without it, websites won’t load even if internet works.',
    where: 'Browser errors, network troubleshooting, IT tickets.',
    miniLab: 'Open Command Prompt and run: nslookup google.com',
  },
  {
    word: 'IP Address',
    plain: 'Address for a device on a network.',
    why: 'Needed to send data to the right device.',
    where: 'Network settings, ipconfig, router pages.',
    miniLab: 'Run ipconfig and find your IPv4 address.',
  },
]

export const LEARNING_MODES = [
  { id: 'learn', title: 'Learn Mode', description: 'Read mission objectives and key concepts before action.' },
  { id: 'see', title: 'See Mode', description: 'Watch worked examples and walkthroughs for each room.' },
  { id: 'practice', title: 'Practice Mode', description: 'Complete tasks and earn XP with repeatable drills.' },
  { id: 'resources', title: 'Resources', description: 'Access room step files, glossary, and support links.' },
]

export const TOOL_MODULES = ['Terminal', 'File Explorer', 'VM Controls', 'GitHub Sync', 'Network Tools']

export const CAREER_MODULES = ['Resume Builder', 'Portfolio Tracker', 'Skills Tracker']
