import type { Project, ProjectCategory } from '../types'

export const projectFilters: Array<'All' | ProjectCategory> = [
  'All',
  'UI/UX & Systems',
  'Smart Mobility',
  'Productivity',
]

const GITHUB = 'https://github.com/Daniel-Sundar'

/**
 * Project content. Technology, links and feature lists are taken from each
 * project's own repository. Entries marked `concept: true` have no public
 * build, so they carry no technology tags and no links.
 */
export const projects: Project[] = [
  {
    id: 'scanin',
    index: '01',
    title: 'ScanIn',
    tagline: 'Barcode Scanner Solutions',
    description:
      'Fast, reliable barcode attendance for exam halls, with a mobile scanning UI and real-time validation states.',
    category: 'UI/UX & Systems',
    status: 'In development',
    concept: false,
    featured: true,
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'html5-qrcode'],
    links: [{ label: 'View repository', href: `${GITHUB}/Scan-In`, kind: 'repo' }],
    caseStudy: {
      overview:
        'ScanIn replaces the paper attendance sheet in an exam hall. An invigilator scans each student ID barcode with a phone, and every scan is checked against that hall’s roster straight away.',
      problem:
        'Marking attendance by hand for a full hall is slow, and a paper sheet cannot tell you that a student has already been marked or is not on the list for this hall.',
      solution:
        'A browser-based scanner that answers each scan with one clear state, backed by a roster in Supabase. Scans are stored on the device first, so check-in keeps moving when the connection drops.',
      features: [
        'Camera barcode scanning in the mobile browser',
        'Four scan results: checked in, already checked in, not on roster, saved offline',
        'Offline queue that syncs when the network returns',
        'Admin tools for bulk student import, hall allocations and teacher accounts',
        'Teacher roster view and an activity log for admins',
        'Supabase Auth with row-level security on the data',
      ],
      designDecisions: [
        'Each scan result has its own colour and message, so it can be read at a glance without stopping the queue.',
        'Save first, send second: the scan is queued locally before the request is made, so a weak hall connection never blocks check-in.',
        'Access rules live in the database as row-level security, not only in the interface.',
      ],
    },
  },
  {
    id: 'clearscript',
    index: '02',
    title: 'ClearScript',
    tagline: 'Text Proofreading Solutions',
    description:
      'Turns photos of messy handwriting, starting with doctors’ prescriptions, into clean, checked text. Several AI models read each page, and the words they disagree on are flagged instead of guessed.',
    category: 'Productivity',
    status: 'Live demo · Built at HackNEX 2026',
    concept: false,
    featured: false,
    tech: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS v4', 'Python FastAPI', 'Supabase'],
    links: [
      { label: 'Open live app', href: 'https://clearscript-hacknex.onrender.com', kind: 'live' },
      { label: 'View repository', href: `${GITHUB}/ClearScript`, kind: 'repo' },
    ],
    caseStudy: {
      overview:
        'ClearScript is a reading aid for handwriting that is hard to read. It shows the text it is sure of, and it is open about the words it is not sure of.',
      problem:
        'Phone OCR is built for print and struggles with handwriting. A single AI model reads handwriting better, but it answers with the same confidence when it is wrong, and on a prescription a confident mistake can hurt someone.',
      solution:
        'Three to five vision models read the page in parallel. Their readings are aligned word by word and voted on. Where they agree the text stands; where they disagree the word is flagged for a person to confirm.',
      features: [
        'Word-by-word voting across several independent vision models',
        'Flags that show what each model read',
        'Look-alike drug names and unusual doses flagged on prescriptions',
        'Auto mode for clean text, Review mode to step through uncertain words',
        'Export to TXT, Markdown or JSON with uncertain words still marked',
        'Interface in English and 12 Indian languages',
      ],
      designDecisions: [
        'Uncertainty is shown, never hidden: a flagged word stays marked all the way into the export.',
        'Review mode puts drug names and numbers first, because those are the mistakes that matter most.',
        'The person only confirms flagged words, which keeps the checking work small.',
      ],
    },
  },
  {
    id: 'proofpilot',
    index: '03',
    title: 'ProofPilot',
    tagline: 'Automated Data Checker',
    description:
      'Ask a plain-English question about messy business spreadsheets and get the number plus a standalone Python script that recomputes it. When the data cannot support an answer, it refuses and says why.',
    category: 'UI/UX & Systems',
    status: 'Hackathon build · HackNEX 2026',
    concept: false,
    featured: false,
    tech: ['Python', 'pandas', 'NumPy', 'Streamlit', 'Gemini', 'Ollama'],
    links: [{ label: 'View repository', href: `${GITHUB}/ProofPilot`, kind: 'repo' }],
    caseStudy: {
      overview:
        'ProofPilot is a data analyst that hands over its working. Every answer ships with a proof script anyone can run to get the same number. Built by a team of four at HackNEX 2026.',
      problem:
        'Real company data is messy: the same order entered twice, mixed currencies, dates that could be read two ways, tables that disagree. A normal chatbot adds it all up and returns a confident, wrong number.',
      solution:
        'Deterministic checks scan the files for traps before any AI runs. The AI then writes only a small JSON plan; audited proof code does the arithmetic, is re-run in a fresh process, and must produce the same result.',
      features: [
        'Trap Radar for duplicate rows, blank values, mixed currencies, ambiguous dates, missing exchange rates and conflicting tables',
        'A standalone Python proof script for every answer',
        'Clear refusals that name the rows at fault and what is needed to fix them',
        'Runs with a cloud model, an offline model, or a rule parser with no AI at all',
        'Accepts CSV, Excel, PDF and Word files',
      ],
      designDecisions: [
        'The AI never types a number. The answer text is copied from the proof’s own output.',
        'A refusal is treated as a real answer, with a reason and a next step.',
        'Checks that need no AI run first, so problems in the data are visible before any question is asked.',
      ],
    },
  },
  {
    id: 'laneguard',
    index: '04',
    title: 'LaneGuard',
    tagline: 'Smart Driver Assistance System',
    description:
      'Road-awareness and driver safety HUD concept with peripheral alerts and telemetry.',
    category: 'Smart Mobility',
    status: 'Concept',
    concept: true,
    featured: false,
    tech: [],
    links: [],
    caseStudy: {
      overview:
        'LaneGuard is a head-up display concept for driver safety. The idea is to keep the road in view and bring warnings to the edge of vision.',
      problem:
        'How can a driver receive lane and hazard warnings without looking away from the road?',
      solution:
        'A head-up layout with lane guidance in the centre, alerts placed at the side the hazard is on, and telemetry in one quiet strip.',
      features: [
        'Road-awareness HUD with lane guidance',
        'Peripheral alerts on the left and right edges',
        'A compact telemetry readout',
      ],
      designDecisions: [
        'Alerts sit at the edge they refer to, so direction is understood before any text is read.',
        'Telemetry uses one size and weight so it never outranks a warning.',
        'The accent colour is reserved for alerts only.',
      ],
    },
  },
  {
    id: 'parkfinder',
    index: '05',
    title: 'ParkFinder',
    tagline: 'Smart Urban Parking Solution',
    description:
      'Parking discovery for Coimbatore: search locations, compare free slots and prices on a map, and get directions. A front-end student project that runs on simulated data.',
    category: 'Smart Mobility',
    status: 'Live demo · Simulated data',
    concept: false,
    featured: false,
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Leaflet', 'OpenStreetMap'],
    links: [
      {
        label: 'Open live demo',
        href: 'https://daniel-sundar.github.io/Smart-City-Parking-Finder/',
        kind: 'live',
      },
      { label: 'View repository', href: `${GITHUB}/Smart-City-Parking-Finder`, kind: 'repo' },
    ],
    caseStudy: {
      overview:
        'ParkFinder is a Web Technology micro-project built by a team of four. It shows example parking locations in Coimbatore on an interactive map. The parking records and their availability are simulated for demonstration.',
      problem:
        'Finding a parking spot in a busy city usually means driving around to look. The project explores what a single place to compare availability, price and distance could look like.',
      solution:
        'A searchable list paired with a map. Each marker shows free slots and an availability state, and the selected location opens with details and directions.',
      features: [
        'Search by name, area or road',
        'Filters for availability, vehicle type and maximum price',
        'Map markers coloured as available, filling fast or full',
        'Sort by nearest, cheapest or most available',
        '“Near me” and saved favourites',
        'Directions that open in Google Maps',
      ],
      designDecisions: [
        'The number on each marker is the count of free slots, so the map can be read without opening anything.',
        'The page states plainly that the data is simulated.',
        'Built with plain HTML, CSS and JavaScript, with no framework.',
      ],
    },
  },
  {
    id: 'routesync',
    index: '06',
    title: 'RouteSync',
    tagline: 'College Navigation Solution',
    description: 'Campus navigation and schedule-synced wayfinding system.',
    category: 'Smart Mobility',
    status: 'Concept',
    concept: true,
    featured: false,
    tech: [],
    links: [],
    caseStudy: {
      overview:
        'RouteSync is a campus wayfinding concept that connects a student’s timetable to the map, so the next route is ready before they ask for it.',
      problem:
        'How can a student who is new to campus get to the right room on time without checking a timetable and a map separately?',
      solution:
        'One screen that pairs the next class from the schedule with a walking route to it.',
      features: ['Campus navigation', 'Wayfinding synced to the class schedule'],
      designDecisions: [
        'The next class and its route share one card, because they answer the same question.',
        'The route is drawn in the accent colour and everything else on the map stays quiet.',
      ],
    },
  },
  {
    id: 'reset',
    index: '07',
    title: 'Reset',
    tagline: 'A Life-Changing Factor',
    description:
      'Habit-resetting digital experience focused on streaks, psychological momentum, and daily focus. A 66-day habit app styled as an RPG.',
    category: 'Productivity',
    status: 'In development',
    concept: false,
    featured: true,
    tech: ['Flutter', 'Dart', 'Supabase', 'Riverpod'],
    links: [],
    caseStudy: {
      overview:
        'Reset turns a 66-day habit programme into a game. You take a short quiz, get a plan that grows in three phases, and complete daily quests to earn XP, level up and keep your streak alive.',
      problem:
        'New habits are easy to start and easy to drop. A checklist records what you did, but it gives little reason to come back tomorrow.',
      solution:
        'Borrow the feedback loop of an RPG. Daily habits become quests, progress becomes XP and levels, and the streak becomes something worth protecting.',
      features: [
        'A quiz that builds a 66-day plan in three phases: Foundation, Build and Master',
        'Daily quests and rotating challenges that award XP',
        'Levels, with each one costing more XP than the last',
        'A streak that holds when at least 70% of the day’s quests are done',
        'Hard Mode, where every quest is required',
        'XP and streaks calculated on the server in the user’s own time zone',
      ],
      designDecisions: [
        'Every game element maps to real habit data. The shield bar, for example, is the quests done today against the number needed to keep the streak.',
        'Gold is reserved for rewards, so it always means something was earned.',
        'The interface was redesigned from a light, plain first version into the current game-styled one. Both are shown below.',
      ],
    },
  },
]
