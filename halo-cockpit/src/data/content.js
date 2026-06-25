export const LEVELS = [
  {
    id: 0,
    name: 'Level 0 — Computer Fundamentals',
    description: 'Stop being new to computers. Files, folders, apps, and basic control.',
    rooms: [
      { id: 'room0_1', title: 'Section 1 — What is a Computer?', description: 'Learn what CPU, RAM, Storage, and an Operating System actually are.', level: 0, difficulty: 'Beginner', order: 1 },
      { id: 'room0_2', title: 'Section 2 — Files and Folders', description: 'Create, rename, move, and delete files and folders like an IT pro.', level: 0, difficulty: 'Beginner', order: 2 },
      { id: 'room0_3', title: 'Section 3 — Windows Navigation', description: 'Master the Start Menu, File Explorer, Settings, and Taskbar.', level: 0, difficulty: 'Beginner', order: 3 },
      { id: 'room0_4', title: 'Section 4 — Keyboard and Typing', description: 'Learn home row, keyboard shortcuts, and basic typing confidence.', level: 0, difficulty: 'Beginner', order: 4 },
      { id: 'room0_5', title: 'Section 5 — Installing Software', description: 'Download, install, and uninstall programs safely.', level: 0, difficulty: 'Beginner', order: 5 },
      { id: 'room0_6', title: 'Section 6 — Internet Basics', description: 'Use a browser, tabs, search, and download files.', level: 0, difficulty: 'Beginner', order: 6 },
      { id: 'room0_7', title: 'Section 7 — Basic Terminology', description: 'Learn and own the 7 core IT words every beginner must know.', level: 0, difficulty: 'Beginner', order: 7 },
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
    explanation:
      'A computer is a machine that follows instructions. It has 4 main parts: the CPU (the brain — it does all the thinking), RAM (short-term memory — what it\'s working on right now), Storage (long-term memory — where files are saved permanently), and the Operating System (the manager that runs everything else, like Windows).',
    whyItMatters:
      'When a computer slows down, freezes, or says "disk full", knowing these parts tells you WHY. Every IT job — from Help Desk to Endpoint Engineer — starts with understanding this.',
    careerConnection:
      'Help Desk: "Is your PC low on RAM?" → Field Tech: "You need more storage." → Sysadmin: "Deploy 16GB RAM configs." → Endpoint Engineer: "Automate memory reports via PowerShell."',
    tasks: [
      'Press Ctrl + Shift + Esc to open Task Manager.',
      'Click the "Performance" tab.',
      'Look at CPU, Memory (RAM), and Disk sections.',
      'Open Notepad and write down: How much RAM does your computer have? What is your CPU usage right now?',
      'Save the file as "computer_info.txt".',
    ],
    hints: [
      'Ctrl + Shift + Esc opens Task Manager directly.',
      'Click "More details" at the bottom if you see a simplified view.',
      'The Performance tab shows live stats — watch them change as you open programs.',
    ],
    repeatTasks: [
      'Close Task Manager.',
      'Open it again — this time search "Task Manager" in the Start Menu.',
      'Navigate to the Performance tab.',
      'Find: your total RAM, your current CPU usage percentage, and your disk usage.',
    ],
    explainPrompt:
      'In your own words, explain: What is a CPU? What is RAM? What is Storage? What is an Operating System? Write as if you are explaining to a friend who has never used a computer.',
    verifyChecklist: [
      'I can open Task Manager.',
      'I know what CPU stands for and what it does.',
      'I can explain what RAM is and why it matters.',
      'I can explain what Storage is.',
      'I can explain what an Operating System does.',
    ],
    xpReward: 50,
  },

  room0_2: {
    explanation:
      'A folder is like a drawer in a filing cabinet. A file is the paper inside it. Everything on your computer is stored as files inside folders. IT professionals use organized folder structures to keep everything findable and manageable.',
    whyItMatters:
      'Disorganized files = lost work and wasted time. At an IT job you manage files for users, set up shared folders, and clean up messy systems. This is day-one stuff.',
    careerConnection:
      'Help Desk: "Where did you save that file?" → Sysadmin: "Set up shared folder permissions." → Endpoint Admin: "Deploy folder redirect policies to save files to OneDrive automatically."',
    tasks: [
      'Press Win + E to open File Explorer.',
      'Navigate to your Documents folder.',
      'Right-click empty space → New → Folder. Name it "NodeZero_Practice".',
      'Open the new folder. Right-click → New → Text Document. Name it "mission.txt".',
      'Double-click mission.txt. Type "Mission Complete". Save with Ctrl + S.',
    ],
    hints: [
      'Win + E opens File Explorer instantly.',
      'Right-click on empty space inside a folder to get the New menu.',
      'Ctrl + S saves a file.',
      'F2 on a selected file or folder lets you rename it.',
    ],
    repeatTasks: [
      'Delete the NodeZero_Practice folder by right-clicking → Delete.',
      'Create it again from scratch.',
      'Inside it, create mission.txt again.',
      'Type your name and today\'s date inside it. Save it.',
    ],
    explainPrompt:
      'What is the difference between a file and a folder? Why does staying organized with files and folders matter for IT work? Write in your own words.',
    verifyChecklist: [
      'I can create a folder.',
      'I can rename a folder.',
      'I can create a text file inside a folder.',
      'I can delete a file and a folder.',
      'I can explain the difference between a file and a folder.',
    ],
    xpReward: 50,
  },

  room0_3: {
    explanation:
      'Windows is your operating system — the manager of your computer. The Start Menu opens programs. File Explorer manages your files. Settings controls your system. The Taskbar shows what is open. These are your main tools and you will use them every single day.',
    whyItMatters:
      'IT techs navigate Windows hundreds of times a day. Being fast and confident here makes every other task easier — installing software, troubleshooting, helping users. Speed here = productivity everywhere.',
    careerConnection:
      'Help Desk: Navigate quickly to diagnose problems. → Field Tech: Find settings fast on user machines. → Sysadmin: Control Panel and Settings for system management. → Endpoint Admin: Deploy Windows settings via Group Policy.',
    tasks: [
      'Press the Windows key to open the Start Menu.',
      'Search for "File Explorer" and open it.',
      'Press Win + I to open Settings.',
      'In Settings, click System → Display.',
      'Press Win + E to open a second File Explorer window.',
      'Right-click the Taskbar and click "Taskbar settings".',
    ],
    hints: [
      'Win + I opens Settings directly.',
      'Win + E opens File Explorer directly.',
      'Right-click the desktop or taskbar for quick options.',
      'Alt + F4 closes the current window.',
    ],
    repeatTasks: [
      'Close all open windows.',
      'Open File Explorer using only the Win + E shortcut.',
      'Open Settings and find "About" — this shows your Windows version.',
      'Open Start Menu and find and open Calculator without searching.',
    ],
    explainPrompt:
      'What does the Start Menu do? What is the difference between File Explorer and Settings? What is the Taskbar for? Write in your own words.',
    verifyChecklist: [
      'I can open Start Menu.',
      'I can open File Explorer using Win + E.',
      'I can open Settings using Win + I.',
      'I can find a specific setting without help.',
      'I can open Task Manager.',
    ],
    xpReward: 50,
  },

  room0_4: {
    explanation:
      'The keyboard is your main tool for talking to a computer. Home row is where your fingers rest: left hand on A S D F, right hand on J K L ;. Keyboard shortcuts are key combinations that do things fast — like Ctrl + C to copy. You will use these every single day in IT.',
    whyItMatters:
      'IT techs type constantly — commands, passwords, tickets, emails, scripts. Speed and accuracy prevent mistakes. Every shortcut you learn saves you time every single day for the rest of your career.',
    careerConnection:
      'Help Desk: Type tickets fast. → Sysadmin: Enter commands in Command Prompt. → Endpoint Engineer: Write PowerShell scripts. Every level up requires faster, more accurate typing.',
    tasks: [
      'Open Notepad from the Start Menu.',
      'Type your full name.',
      'Type today\'s date.',
      'Use Ctrl + A to select all text.',
      'Use Ctrl + C to copy it.',
      'Use Ctrl + V to paste it below.',
      'Use Ctrl + Z to undo the paste.',
      'Use Ctrl + S to save the file as "keyboard_practice.txt".',
    ],
    hints: [
      'Ctrl + A = Select All',
      'Ctrl + C = Copy',
      'Ctrl + V = Paste',
      'Ctrl + Z = Undo',
      'Ctrl + S = Save',
      'Home row: left hand rests on ASDF, right hand rests on JKL;',
    ],
    repeatTasks: [
      'Close Notepad without saving.',
      'Reopen it.',
      'Type the 5 shortcuts from this lesson and what each one does.',
      'Save the file as "shortcuts_list.txt".',
    ],
    explainPrompt:
      'What are the home row keys? List 5 keyboard shortcuts you learned today and explain what each one does. Write from memory without looking.',
    verifyChecklist: [
      'I can use Ctrl + C and Ctrl + V.',
      'I can use Ctrl + Z to undo.',
      'I can use Ctrl + S to save.',
      'I can explain what home row is.',
      'I can open Notepad from the Start Menu.',
    ],
    xpReward: 50,
  },

  room0_5: {
    explanation:
      'Installing software means downloading a program from the internet and running its installer to set it up on your computer. Uninstalling removes it completely. Always download from official websites only — never from random links or ads.',
    whyItMatters:
      'IT techs install and uninstall software constantly — for users, for security, for updates. Knowing the safe way protects computers from malware. Knowing the wrong way causes major problems.',
    careerConnection:
      'Help Desk: "Install this software for the user." → Field Tech: Install apps on new computers. → Endpoint Admin: Deploy software to 500 computers at once via Intune. It all starts here.',
    tasks: [
      'Open your browser.',
      'Search for "Notepad++ download".',
      'Click the official site: notepad-plus-plus.org.',
      'Download the installer (.exe file).',
      'Run the installer and follow the steps.',
      'Open Notepad++ from the Start Menu.',
    ],
    hints: [
      'Only download from the official website — not random links.',
      'The official site is notepad-plus-plus.org.',
      'Watch out for ads that look like download buttons — they are traps.',
      'The real download button is usually smaller than the fake ad buttons.',
    ],
    repeatTasks: [
      'Uninstall Notepad++ from Settings → Apps → Installed apps.',
      'Search for it and click Uninstall.',
      'Go back to notepad-plus-plus.org.',
      'Download and reinstall it.',
      'Confirm it opens correctly.',
    ],
    explainPrompt:
      'What is the difference between downloading and installing? Why is it important to use only official websites? What could happen if you downloaded from a random link?',
    verifyChecklist: [
      'I can find and open an official download page.',
      'I can run an installer safely.',
      'I can uninstall a program from Settings.',
      'I can explain the difference between downloading and installing.',
    ],
    xpReward: 50,
  },

  room0_6: {
    explanation:
      'A browser is a program that loads websites. The address bar is where you type URLs (website addresses like google.com). Tabs let you have multiple pages open at once. The internet connects computers worldwide so they can share information.',
    whyItMatters:
      'IT techs troubleshoot internet problems constantly. Knowing how browsers work, what a URL is, and how to search effectively saves real time every day when helping users.',
    careerConnection:
      'Help Desk: "Clear your browser cache." → Sysadmin: Configure browser settings via Group Policy. → Endpoint Admin: Deploy browser extensions and policies via Intune.',
    tasks: [
      'Open your browser (Edge, Chrome, or Firefox).',
      'Press Ctrl + T to open a new tab.',
      'Open 2 more tabs (press Ctrl + T twice more).',
      'In Tab 1: go to google.com.',
      'In Tab 2: go to microsoft.com.',
      'In Tab 3: search for "what is DNS".',
      'Bookmark the search results page with Ctrl + D.',
      'Close one tab with Ctrl + W.',
    ],
    hints: [
      'Ctrl + T opens a new tab.',
      'Ctrl + W closes the current tab.',
      'Ctrl + D bookmarks the current page.',
      'The address bar is the bar at the very top where you type.',
      'You can press Ctrl + L to jump your cursor directly to the address bar.',
    ],
    repeatTasks: [
      'Close all browser tabs.',
      'Reopen the browser.',
      'Open 3 tabs using Ctrl + T.',
      'Navigate to: google.com, bing.com, microsoft.com — one per tab.',
    ],
    explainPrompt:
      'What is a browser? What is a URL? What is the difference between a search engine and a website? Write in your own words.',
    verifyChecklist: [
      'I can open and close tabs using keyboard shortcuts.',
      'I can navigate to a website by typing its URL.',
      'I can bookmark a page.',
      'I can explain what a browser is.',
      'I can explain what a URL is.',
    ],
    xpReward: 50,
  },

  room0_7: {
    explanation:
      'IT has its own language. Not knowing these words makes everything harder to learn. Program = App = Software (same thing). OS = Operating System (Windows is one). File = data stored on disk. Folder = container for files. Browser = program to view websites. Window = a program\'s box on your screen.',
    whyItMatters:
      'You cannot follow IT instructions if you do not know the words. IT professionals use these every single day. Knowing them makes you sound confident and lets you learn faster.',
    careerConnection:
      'Every IT job at every level uses these terms. This is the foundation everything else is built on. Without this, nothing else makes sense.',
    tasks: [
      'Open Notepad.',
      'Write your own definition for each term: Program, Application, Operating System, Folder, File, Internet, Browser, Window.',
      'Do NOT look them up — write what you think they mean first.',
      'Save the file as "my_glossary.txt".',
    ],
    hints: [
      'There is no wrong answer here — just try.',
      'After writing, compare with the Glossary section below.',
      'Program and Application mean the same thing.',
      'Think about where you have seen each word before.',
    ],
    repeatTasks: [
      'Close Notepad.',
      'Open a new Notepad file.',
      'Cover your previous definitions.',
      'Write each definition again completely from memory.',
      'Compare your second version to your first — did you improve?',
    ],
    explainPrompt:
      'Pick any 3 terms from the list. Explain each one as if you are talking to a friend who has never used a computer before. Use simple language.',
    verifyChecklist: [
      'I can define "Program" without notes.',
      'I can define "Operating System" without notes.',
      'I can explain the difference between a file and a folder without notes.',
      'I can define "Browser" without notes.',
      'I know at least 6 of the 8 terms by heart.',
    ],
    xpReward: 75,
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
    plain: 'Internet phonebook — turns website names into IP addresses.',
    why: 'Without it, websites won\'t load even if internet works.',
    where: 'Browser errors, network troubleshooting, IT tickets.',
    miniLab: 'Open Command Prompt and run: nslookup google.com',
  },
  {
    word: 'IP Address',
    plain: 'A unique address for a device on a network.',
    why: 'Needed to send data to the right device.',
    where: 'Network settings, ipconfig output, router pages.',
    miniLab: 'Run ipconfig and find your IPv4 address.',
  },
  {
    word: 'CPU',
    plain: 'The brain of the computer — it processes all instructions.',
    why: 'A slow CPU = a slow computer. Knowing this helps you diagnose lag.',
    where: 'Task Manager → Performance → CPU.',
    miniLab: 'Open Task Manager and check your CPU usage percentage.',
  },
  {
    word: 'RAM',
    plain: 'Short-term memory — what the computer is working on right now.',
    why: 'Not enough RAM = slowdowns and crashes.',
    where: 'Task Manager → Performance → Memory.',
    miniLab: 'Open Task Manager and find how much RAM your PC has.',
  },
  {
    word: 'Operating System',
    plain: 'The manager software that runs everything on your computer (Windows is one).',
    why: 'Every program runs on top of the OS. IT pros manage the OS.',
    where: 'Settings → System → About.',
    miniLab: 'Open Settings → System → About and find your Windows version.',
  },
  {
    word: 'Program',
    plain: 'Software that runs on your computer to do a job. Same as App or Application.',
    why: 'IT techs install, update, and remove programs constantly.',
    where: 'Start Menu, Settings → Apps.',
    miniLab: 'Open Settings → Apps → Installed apps and count how many you have.',
  },
  {
    word: 'Browser',
    plain: 'The program you use to visit websites (Edge, Chrome, Firefox).',
    why: 'Most user work happens in a browser. IT techs troubleshoot browser problems daily.',
    where: 'Taskbar, Desktop shortcut.',
    miniLab: 'Open your browser and go to about:version to see which version you have.',
  },
  {
    word: 'File',
    plain: 'A single piece of data stored on your computer (a document, photo, video).',
    why: 'Everything on a computer is a file. IT pros manage files for users.',
    where: 'File Explorer, Downloads folder.',
    miniLab: 'Open File Explorer and find a file in your Documents folder.',
  },
  {
    word: 'Folder',
    plain: 'A container that holds files (like a drawer in a filing cabinet).',
    why: 'Organization = faster work. IT pros build folder structures for companies.',
    where: 'File Explorer everywhere.',
    miniLab: 'Create a folder called Test on your Desktop and delete it.',
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
