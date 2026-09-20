// LIFE//THREADS - Comprehensive Fictional Digital Life Dataset
// "Your Life, In Receipts"
// Categories:
// 1. Music
// 2. Movies & Entertainment
// 3. Places
// 4. Purchases
// 5. Photos
// 6. Messages
// 7. Searches
// 8. Events
// 9. Personal Notes

export const CATEGORIES = [
  'Music',
  'Movies & Entertainment',
  'Places',
  'Purchases',
  'Photos',
  'Messages',
  'Searches',
  'Events',
  'Personal Notes'
];

export const CATEGORY_CONFIG = {
  'Music': {
    color: '#38bdf8', // Cyan
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.3)',
    icon: 'Headphones',
    tag: 'Audio Stream',
  },
  'Movies & Entertainment': {
    color: '#a855f7', // Purple
    bg: 'rgba(168, 85, 247, 0.12)',
    border: 'rgba(168, 85, 247, 0.3)',
    icon: 'Film',
    tag: 'Screen',
  },
  'Places': {
    color: '#34d399', // Emerald
    bg: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.3)',
    icon: 'MapPin',
    tag: 'Location Ping',
  },
  'Purchases': {
    color: '#fbbf24', // Amber
    bg: 'rgba(251, 191, 36, 0.12)',
    border: 'rgba(251, 191, 36, 0.3)',
    icon: 'CreditCard',
    tag: 'Transaction',
  },
  'Photos': {
    color: '#f43f5e', // Rose
    bg: 'rgba(244, 63, 94, 0.12)',
    border: 'rgba(244, 63, 94, 0.3)',
    icon: 'Camera',
    tag: 'Visual Capture',
  },
  'Messages': {
    color: '#60a5fa', // Blue
    bg: 'rgba(96, 165, 250, 0.12)',
    border: 'rgba(96, 165, 250, 0.3)',
    icon: 'MessageSquare',
    tag: 'Communication',
  },
  'Searches': {
    color: '#818cf8', // Indigo
    bg: 'rgba(129, 140, 248, 0.12)',
    border: 'rgba(129, 140, 248, 0.3)',
    icon: 'Search',
    tag: 'Query Log',
  },
  'Events': {
    color: '#fb923c', // Orange
    bg: 'rgba(251, 146, 60, 0.12)',
    border: 'rgba(251, 146, 60, 0.3)',
    icon: 'Calendar',
    tag: 'Calendar Node',
  },
  'Personal Notes': {
    color: '#e2e8f0', // Slate light
    bg: 'rgba(226, 232, 240, 0.12)',
    border: 'rgba(226, 232, 240, 0.3)',
    icon: 'FileText',
    tag: 'Observation',
  }
};

export const mockReceipts = [
  // ==========================================
  // THREAD ALPHA: "The Midnight Project / March 18 Evening" (Intense 5-stage connection chain)
  // ==========================================
  {
    id: 'rcpt-001',
    title: 'Track: "Resonance in 432Hz" — Solar Fields',
    category: 'Music',
    date: '2026-03-18',
    time: '20:15',
    location: 'District 4 Studio',
    metadata: { artist: 'Solar Fields', duration: '6:42', platform: 'HighRes Audio', playsCount: 14 },
    notes: 'Listened on repeat with noise cancellation while reviewing blueprint sketches.',
    tags: ['ambient', 'focus', 'architecture', 'night']
  },
  {
    id: 'rcpt-002',
    title: 'Check-in: Archway Experimental Studio',
    category: 'Places',
    date: '2026-03-18',
    time: '20:45',
    location: 'District 4 Studio',
    metadata: { checkInMethod: 'NFC Pass', durationMinutes: 195, zone: 'East Loft' },
    notes: 'Access badge swiped at rear fire exit after hours.',
    tags: ['studio', 'night', 'architecture', 'focus']
  },
  {
    id: 'rcpt-003',
    title: 'Photo: "Drafting Table Under Halogen"',
    category: 'Photos',
    date: '2026-03-18',
    time: '21:10',
    location: 'District 4 Studio',
    metadata: { resolution: '4032x3024', camera: 'Leica Q3', exposure: '1/30s f/1.7', iso: 800 },
    notes: 'Tracing paper overlapping with acrylic scale models. Sharp dramatic shadow cast across east edge.',
    tags: ['design', 'architecture', 'night', 'drafts']
  },
  {
    id: 'rcpt-004',
    title: 'Purchase: Archival Vellum & Double Espresso ($24.80)',
    category: 'Purchases',
    date: '2026-03-18',
    time: '21:30',
    location: 'District 4 Studio',
    metadata: { merchant: 'Artisan Supply & Bodega', paymentMethod: 'Apple Pay', amount: 24.80, currency: 'USD' },
    notes: 'Two rolls of heavy tracing vellum and a double shot to fuel the all-nighter.',
    tags: ['coffee', 'supplies', 'night', 'focus']
  },
  {
    id: 'rcpt-005',
    title: 'Calendar: "Design Critique Submission Deadlines"',
    category: 'Events',
    date: '2026-03-18',
    time: '22:00',
    location: 'District 4 Studio',
    metadata: { organizer: 'Atelier Vernacular', attendees: 6, status: 'Confirmed RSVP' },
    notes: 'Locked final digital render for the urban pavilion project review.',
    tags: ['deadline', 'architecture', 'presentation', 'night']
  },
  {
    id: 'rcpt-006',
    title: 'Message to Elena: "Vellum prints turned out crisp, heading into the zone"',
    category: 'Messages',
    date: '2026-03-18',
    time: '22:25',
    location: 'District 4 Studio',
    metadata: { recipient: 'Elena Rostova', app: 'Signal', encrypted: true },
    notes: 'Elena replied with thumbs up and reminding to rest before morning review.',
    tags: ['collaboration', 'night', 'architecture']
  },
  {
    id: 'rcpt-007',
    title: 'Personal Note: "The tension between light wells and stone monoliths"',
    category: 'Personal Notes',
    date: '2026-03-18',
    time: '23:40',
    location: 'District 4 Studio',
    metadata: { words: 86, sentiment: 'Reflective', device: 'Tablet Pen' },
    notes: 'Architecture isn\'t about solids; it\'s about trapping darkness where eyes need rest.',
    tags: ['philosophy', 'architecture', 'night', 'focus']
  },

  // ==========================================
  // THREAD BETA: "Sunday Morning Ritual / Komorebi Coffee" (Recurring weekly location)
  // ==========================================
  {
    id: 'rcpt-008',
    title: 'Search: "Aeropress inverted brew ratio light roast Ethiopian"',
    category: 'Searches',
    date: '2026-03-08',
    time: '08:30',
    location: 'Home Quarter',
    metadata: { engine: 'DuckDuckGo', clicks: 3, queryLength: 52 },
    notes: 'Dialing in temperature profiles for washed Yirgacheffe beans.',
    tags: ['coffee', 'ritual', 'morning', 'experiments']
  },
  {
    id: 'rcpt-009',
    title: 'Check-in: Komorebi Coffee Roasters',
    category: 'Places',
    date: '2026-03-08',
    time: '09:15',
    location: 'Komorebi Coffee Roasters',
    metadata: { tableNumber: 4, wifiConnected: true, durationMinutes: 110 },
    notes: 'The sunlight hitting the birch tables at 45 degrees. Corner booth reserved.',
    tags: ['coffee', 'ritual', 'sunday', 'peace']
  },
  {
    id: 'rcpt-010',
    title: 'Purchase: Oat Flat White + Cardamom Knot ($9.25)',
    category: 'Purchases',
    date: '2026-03-08',
    time: '09:20',
    location: 'Komorebi Coffee Roasters',
    metadata: { merchant: 'Komorebi Roasters', paymentMethod: 'Contactless', amount: 9.25, currency: 'USD' },
    notes: 'Sunday morning regular receipt. Barista recognized the order without asking.',
    tags: ['coffee', 'ritual', 'sunday', 'food']
  },
  {
    id: 'rcpt-011',
    title: 'Track: "A Model of the Universe" — Jóhann Jóhannsson',
    category: 'Music',
    date: '2026-03-08',
    time: '09:35',
    location: 'Komorebi Coffee Roasters',
    metadata: { album: 'The Theory of Everything', duration: '2:52', playsCount: 31 },
    notes: 'Warm string crescendo blending with quiet cafe hum.',
    tags: ['classical', 'ambient', 'coffee', 'sunday']
  },
  {
    id: 'rcpt-012',
    title: 'Photo: "Cardamom Knot & Shadow Lines"',
    category: 'Photos',
    date: '2026-03-08',
    time: '09:50',
    location: 'Komorebi Coffee Roasters',
    metadata: { aperture: 'f/2.0', focalLength: '28mm', lens: 'Prime 28', iso: 200 },
    notes: 'Natural light spilling over ceramic saucer. Textured stoneware glaze.',
    tags: ['photography', 'coffee', 'sunday', 'geometry']
  },
  {
    id: 'rcpt-013',
    title: 'Personal Note: "Why weekly stillness resets the nervous system"',
    category: 'Personal Notes',
    date: '2026-03-08',
    time: '10:30',
    location: 'Komorebi Coffee Roasters',
    metadata: { words: 142, mood: 'Serene' },
    notes: 'In a world that demands continuous broadcast, two silent hours with coffee is revolt.',
    tags: ['journal', 'ritual', 'mindfulness', 'sunday']
  },

  // Recurrence 2: Next Sunday March 15
  {
    id: 'rcpt-014',
    title: 'Check-in: Komorebi Coffee Roasters',
    category: 'Places',
    date: '2026-03-15',
    time: '09:10',
    location: 'Komorebi Coffee Roasters',
    metadata: { tableNumber: 4, wifiConnected: true, durationMinutes: 95 },
    notes: 'Returned to the same corner booth by the ficus tree.',
    tags: ['coffee', 'ritual', 'sunday', 'peace']
  },
  {
    id: 'rcpt-015',
    title: 'Purchase: Oat Flat White + Cinnamon Swirl ($9.50)',
    category: 'Purchases',
    date: '2026-03-15',
    time: '09:18',
    location: 'Komorebi Coffee Roasters',
    metadata: { merchant: 'Komorebi Roasters', paymentMethod: 'Contactless', amount: 9.50, currency: 'USD' },
    notes: 'Weekly recurring charge matched timestamp within 2 minutes of prior week.',
    tags: ['coffee', 'ritual', 'sunday', 'food']
  },
  {
    id: 'rcpt-016',
    title: 'Search: "Modular wooden joinery techniques Japanese architecture"',
    category: 'Searches',
    date: '2026-03-15',
    time: '09:40',
    location: 'Komorebi Coffee Roasters',
    metadata: { engine: 'Google Scholar', bookmarksCreated: 2 },
    notes: 'Studying Kanawa-tsugi scarf joints while sitting on the cafe oak bench.',
    tags: ['architecture', 'woodwork', 'research', 'coffee']
  },
  {
    id: 'rcpt-017',
    title: 'Photo: "Steam Rising Against Concrete Wall"',
    category: 'Photos',
    date: '2026-03-15',
    time: '10:05',
    location: 'Komorebi Coffee Roasters',
    metadata: { shutter: '1/250s', exposure: '+0.3EV', tone: 'Monochrome' },
    notes: 'Backlit vapor clouds curling against board-formed raw concrete.',
    tags: ['photography', 'monochrome', 'coffee', 'sunday']
  },

  // Recurrence 3: Next Sunday March 22
  {
    id: 'rcpt-018',
    title: 'Check-in: Komorebi Coffee Roasters',
    category: 'Places',
    date: '2026-03-22',
    time: '09:25',
    location: 'Komorebi Coffee Roasters',
    metadata: { tableNumber: 2, durationMinutes: 120 },
    notes: 'Corner booth was taken, sat at window counter overlooking garden.',
    tags: ['coffee', 'ritual', 'sunday', 'peace']
  },
  {
    id: 'rcpt-019',
    title: 'Purchase: Pour-Over Gesha Reserve ($14.00)',
    category: 'Purchases',
    date: '2026-03-22',
    time: '09:30',
    location: 'Komorebi Coffee Roasters',
    metadata: { merchant: 'Komorebi Roasters', beansOrigin: 'Panama', amount: 14.00, currency: 'USD' },
    notes: 'Treated to the special guest roast. Jasmine and bergamot floral notes.',
    tags: ['coffee', 'ritual', 'treat', 'sunday']
  },
  {
    id: 'rcpt-020',
    title: 'Message to Marcus: "At Komorebi if you want to swap notes on the exhibition"',
    category: 'Messages',
    date: '2026-03-22',
    time: '10:15',
    location: 'Komorebi Coffee Roasters',
    metadata: { app: 'iMessage', threadLength: 8 },
    notes: 'Marcus biked over 20 minutes later with catalog prints.',
    tags: ['collaboration', 'coffee', 'sunday', 'friends']
  },

  // ==========================================
  // THREAD GAMMA: "Cinema & Late Night Wanderings" (Metro Cinema & Neon Basin)
  // ==========================================
  {
    id: 'rcpt-021',
    title: 'Purchase: 35mm Screening Ticket: "Stalker" ($16.50)',
    category: 'Purchases',
    date: '2026-03-27',
    time: '18:45',
    location: 'The Metro Revival Cinema',
    metadata: { screen: 'Auditorium A', seat: 'Row G, Seat 14', format: '35mm Restored' },
    notes: 'Friday night retrospective series at the vintage independent theatre.',
    tags: ['cinema', 'film', 'friday', 'art']
  },
  {
    id: 'rcpt-022',
    title: 'Check-in: The Metro Revival Cinema',
    category: 'Places',
    date: '2026-03-27',
    time: '19:00',
    location: 'The Metro Revival Cinema',
    metadata: { durationMinutes: 175, venueType: 'Historic Cinema' },
    notes: 'Arrived early to browse the archival poster exhibition in the mezzanine.',
    tags: ['cinema', 'places', 'friday', 'history']
  },
  {
    id: 'rcpt-023',
    title: 'Movie: "Stalker" (1979) — Andrei Tarkovsky',
    category: 'Movies & Entertainment',
    date: '2026-03-27',
    time: '19:15',
    location: 'The Metro Revival Cinema',
    metadata: { director: 'Andrei Tarkovsky', runtime: '162 min', rating: 5, log: 'Letterboxd' },
    notes: 'The sepia industrial canal tracking shots. Silence functioning as narrative gravity.',
    tags: ['cinema', 'tarkovsky', 'art', 'film', 'friday']
  },
  {
    id: 'rcpt-024',
    title: 'Check-in: Neon Basin Canal Walkway',
    category: 'Places',
    date: '2026-03-27',
    time: '22:15',
    location: 'Neon Basin Canal',
    metadata: { stepsWalked: 4200, temperature: '11C', weather: 'Light Mist' },
    notes: 'Night walk along the wet basalt promenade after the film ended.',
    tags: ['walk', 'night', 'waterfront', 'reflection']
  },
  {
    id: 'rcpt-025',
    title: 'Photo: "Sodium Light Reflections on Dark Water"',
    category: 'Photos',
    date: '2026-03-27',
    time: '22:35',
    location: 'Neon Basin Canal',
    metadata: { camera: 'Leica Q3', iso: 1600, shutter: '1/15s handheld', fStop: 'f/1.7' },
    notes: 'Golden amber lantern glow stretching across the ripples in the basin.',
    tags: ['photography', 'night', 'water', 'cinema']
  },
  {
    id: 'rcpt-026',
    title: 'Track: "Subterraneans" — David Bowie & Brian Eno',
    category: 'Music',
    date: '2026-03-27',
    time: '22:45',
    location: 'Neon Basin Canal',
    metadata: { album: 'Low', year: 1977, duration: '5:39' },
    notes: 'Haunting saxophone echoing through the empty canal tunnels on headphones.',
    tags: ['music', 'night', 'solitude', 'ambient']
  },
  {
    id: 'rcpt-027',
    title: 'Personal Note: "The Zone as a metaphor for unfinished thoughts"',
    category: 'Personal Notes',
    date: '2026-03-27',
    time: '23:20',
    location: 'Home Quarter',
    metadata: { wordCount: 110, mood: 'Contemplative' },
    notes: 'Like the Room in Stalker, our desires change the moment we cross the threshold into execution.',
    tags: ['notes', 'cinema', 'philosophy', 'night']
  },

  // ==========================================
  // THREAD DELTA: "The Sourdough & Kitchen Science Era" (Activity Shift: April 2026)
  // ==========================================
  {
    id: 'rcpt-028',
    title: 'Search: "Hydration percentages sourdough rye flour crumb structure"',
    category: 'Searches',
    date: '2026-04-02',
    time: '14:20',
    location: 'Home Quarter',
    metadata: { searchEngine: 'Brave Search', tabCount: 6 },
    notes: 'Sudden deep dive into lactobacillus fermentation cycles.',
    tags: ['sourdough', 'fermentation', 'cooking', 'science']
  },
  {
    id: 'rcpt-029',
    title: 'Search: "Banneton proofing basket oval cane 10 inch"',
    category: 'Searches',
    date: '2026-04-02',
    time: '15:10',
    location: 'Home Quarter',
    metadata: { queryDepth: 'High', productIntent: true },
    notes: 'Comparing natural rattan vs wood pulp proofing bowls.',
    tags: ['sourdough', 'baking', 'supplies']
  },
  {
    id: 'rcpt-030',
    title: 'Purchase: Cast Iron Dutch Oven & Proofing Cane ($74.50)',
    category: 'Purchases',
    date: '2026-04-02',
    time: '16:05',
    location: 'Home Quarter',
    metadata: { merchant: 'Heritage Culinary Ware', trackingNumber: 'HC-98214-X', amount: 74.50 },
    notes: 'Heavy 5-quart enamel Dutch oven ordered for steam retention during oven spring.',
    tags: ['sourdough', 'kitchen', 'purchase', 'cooking']
  },
  {
    id: 'rcpt-031',
    title: 'Event: "Sourdough Starter First Feed: Leaven 01"',
    category: 'Events',
    date: '2026-04-04',
    time: '08:00',
    location: 'Home Quarter',
    metadata: { recurrence: 'Every 12 hours', calendar: 'Home Experiments' },
    notes: '1:1:1 ratio with whole stoneground rye and filtered mountain spring water.',
    tags: ['sourdough', 'ritual', 'routine', 'morning']
  },
  {
    id: 'rcpt-032',
    title: 'Track: "Music for Airports: 1/1" — Brian Eno',
    category: 'Music',
    date: '2026-04-04',
    time: '08:15',
    location: 'Home Quarter',
    metadata: { duration: '17:21', system: 'Hi-Fi Kitchen Speaker' },
    notes: 'Playing gentle piano intervals while folding dough every 30 minutes.',
    tags: ['ambient', 'morning', 'sourdough', 'kitchen']
  },
  {
    id: 'rcpt-033',
    title: 'Photo: "First Loaf: Ear Blistering & Oven Spring"',
    category: 'Photos',
    date: '2026-04-05',
    time: '11:45',
    location: 'Home Quarter',
    metadata: { macro: true, aperture: 'f/2.8', crop: '1:1 Square' },
    notes: 'Dark caramelized crust with micro-blistering along the razor-scored seam.',
    tags: ['sourdough', 'photography', 'food', 'craft']
  },
  {
    id: 'rcpt-034',
    title: 'Message to Mom: "First sourdough loaf didn\'t turn into a brick! Check the crust!"',
    category: 'Messages',
    date: '2026-04-05',
    time: '12:05',
    location: 'Home Quarter',
    metadata: { mediaAttached: 'IMG_4819.HEIC', delivered: true },
    notes: 'Mom responded with proud exclamation points and requested a slice.',
    tags: ['family', 'sourdough', 'sharing', 'celebration']
  },
  {
    id: 'rcpt-035',
    title: 'Personal Note: "The patience of fermentation"',
    category: 'Personal Notes',
    date: '2026-04-05',
    time: '13:30',
    location: 'Home Quarter',
    metadata: { category: 'Reflections', lengthChars: 380 },
    notes: 'Software runs on milliseconds. Bread runs on ambient temperature and hours. I needed this counterbalance.',
    tags: ['mindfulness', 'sourdough', 'craft', 'time']
  },

  // ==========================================
  // THREAD EPSILON: "The Architecture Residency / Coastal Trip" (Intense Spatiotemporal Cluster: April 17-19)
  // ==========================================
  {
    id: 'rcpt-036',
    title: 'Search: "Brutalist structures coastal cliffside Oregon Pacific Northwest"',
    category: 'Searches',
    date: '2026-04-14',
    time: '19:10',
    location: 'Home Quarter',
    metadata: { imagesViewed: 14, tabCount: 5 },
    notes: 'Mapping architectural sites exposed to heavy ocean salt spray and gale winds.',
    tags: ['travel', 'architecture', 'coastal', 'planning']
  },
  {
    id: 'rcpt-037',
    title: 'Purchase: Pacific Coastal Train Pass ($58.00)',
    category: 'Purchases',
    date: '2026-04-15',
    time: '11:20',
    location: 'Home Quarter',
    metadata: { carrier: 'Cascadia Rail', seat: 'Observation Car 3', departureDate: '2026-04-17' },
    notes: 'Roundtrip observation ticket through pine headlands and ocean bluffs.',
    tags: ['travel', 'transit', 'coastal', 'ticket']
  },
  {
    id: 'rcpt-038',
    title: 'Check-in: Cascadia Rail Central Depot',
    category: 'Places',
    date: '2026-04-17',
    time: '06:40',
    location: 'Cascadia Central Station',
    metadata: { platform: 4, departureScheduled: '07:05' },
    notes: 'Early morning platform chill. Luggage: backpack and tripod case.',
    tags: ['travel', 'transit', 'morning', 'departure']
  },
  {
    id: 'rcpt-039',
    title: 'Purchase: Chemex Drip & Cardamom Braid ($8.75)',
    category: 'Purchases',
    date: '2026-04-17',
    time: '06:52',
    location: 'Cascadia Central Station',
    metadata: { merchant: 'Station Wayfarer Cafe', amount: 8.75 },
    notes: 'Warm travel breakfast before boarding the coastal line.',
    tags: ['coffee', 'travel', 'morning']
  },
  {
    id: 'rcpt-040',
    title: 'Track: "Avril 14th" — Aphex Twin',
    category: 'Music',
    date: '2026-04-17',
    time: '07:35',
    location: 'Cascadia Coastal Line',
    metadata: { album: 'Drukqs', duration: '2:05', repeats: 5 },
    notes: 'Piano notes syncing with raindrops streaking diagonally across train window.',
    tags: ['music', 'travel', 'piano', 'transit']
  },
  {
    id: 'rcpt-041',
    title: 'Check-in: Cape Perpetua Marine Lookout',
    category: 'Places',
    date: '2026-04-17',
    time: '13:15',
    location: 'Cape Perpetua Lookout',
    metadata: { elevationMeters: 240, windSpeedKmh: 48 },
    notes: 'Reached the raw basalt cliff edge. Vast gray swell churning below.',
    tags: ['travel', 'nature', 'ocean', 'places']
  },
  {
    id: 'rcpt-042',
    title: 'Photo: "Sea Spray Striking Basalt Chasm"',
    category: 'Photos',
    date: '2026-04-17',
    time: '13:40',
    location: 'Cape Perpetua Lookout',
    metadata: { shutter: '1/2000s', aperture: 'f/4.0', lens: '50mm', waterResistantSeal: true },
    notes: 'Frozen droplets suspended in midair as tide surges through Thor\'s Well.',
    tags: ['photography', 'ocean', 'nature', 'landscape']
  },
  {
    id: 'rcpt-043',
    title: 'Check-in: Halcyon Timber Cliff Cabin',
    category: 'Places',
    date: '2026-04-17',
    time: '17:30',
    location: 'Halcyon Cliff Cabin',
    metadata: { cabinId: 'North-Breeze-04', fireplaceLit: true },
    notes: 'Cedar shake cabin nestled among stunted coastal spruce trees.',
    tags: ['travel', 'cabin', 'retreat', 'peace']
  },
  {
    id: 'rcpt-044',
    title: 'Purchase: Wood Bundle, Local Smoked Salmon & Cider ($34.20)',
    category: 'Purchases',
    date: '2026-04-17',
    time: '18:10',
    location: 'Halcyon Cliff Cabin',
    metadata: { merchant: 'Cape General Outpost', paymentMethod: 'Card', amount: 34.20 },
    notes: 'Local provisions for a silent weekend by the woodstove.',
    tags: ['food', 'cabin', 'supplies', 'retreat']
  },
  {
    id: 'rcpt-045',
    title: 'Personal Note: "Where the continent ends and perspective begins"',
    category: 'Personal Notes',
    date: '2026-04-17',
    time: '21:30',
    location: 'Halcyon Cliff Cabin',
    metadata: { words: 210, fireplaceAudioTracked: true },
    notes: 'No cell reception, only the hum of wind in chimney flue. When you eliminate noise, what remains is unmistakable.',
    tags: ['journal', 'solitude', 'retreat', 'coastal']
  },
  {
    id: 'rcpt-046',
    title: 'Photo: "Woodstove Embers at 1 AM"',
    category: 'Photos',
    date: '2026-04-18',
    time: '01:15',
    location: 'Halcyon Cliff Cabin',
    metadata: { longExposure: '2.5s', iso: 400, tripod: true },
    notes: 'Deep ruby and gold veins pulse inside the cast iron stove door.',
    tags: ['photography', 'night', 'cabin', 'fire']
  },
  {
    id: 'rcpt-047',
    title: 'Track: "An Ending (Ascent)" — Brian Eno',
    category: 'Music',
    date: '2026-04-18',
    time: '07:00',
    location: 'Halcyon Cliff Cabin',
    metadata: { album: 'Apollo: Atmospheres', duration: '4:26' },
    notes: 'Morning fog burning off the spruce boughs as light filters through sea mist.',
    tags: ['ambient', 'morning', 'nature', 'retreat']
  },

  // ==========================================
  // THREAD ZETA: "The Creative Coding & Generative Art Sprint" (Late April)
  // ==========================================
  {
    id: 'rcpt-048',
    title: 'Search: "GLSL fragment shader raymarching signed distance fields glass refraction"',
    category: 'Searches',
    date: '2026-04-24',
    time: '16:45',
    location: 'District 4 Studio',
    metadata: { tabsOpened: 9, bookmarksSaved: 4 },
    notes: 'Researching real-time caustics and internal reflections in WebGL shaders.',
    tags: ['coding', 'shaders', 'generative', 'math']
  },
  {
    id: 'rcpt-049',
    title: 'Search: "Inigo Quilez 3D distance functions smooth minimum blending"',
    category: 'Searches',
    date: '2026-04-24',
    time: '17:20',
    location: 'District 4 Studio',
    metadata: { domain: 'iquilezles.org', durationMinutes: 45 },
    notes: 'Deconstructing polynomial smin functions for organic procedural geometry.',
    tags: ['math', 'coding', 'shaders', 'research']
  },
  {
    id: 'rcpt-050',
    title: 'Purchase: Mechanical Keycap Set — "Terminal Slate" ($85.00)',
    category: 'Purchases',
    date: '2026-04-24',
    time: '18:15',
    location: 'District 4 Studio',
    metadata: { merchant: 'Drop Custom Keyboards', material: 'PBT Double-shot', amount: 85.00 },
    notes: 'Dark charcoal keycaps with subtle cyan sublegends for late-night coding ergonomics.',
    tags: ['hardware', 'coding', 'workspace', 'design']
  },
  {
    id: 'rcpt-051',
    title: 'Track: "Everything in Its Right Place" — Radiohead',
    category: 'Music',
    date: '2026-04-24',
    time: '19:00',
    location: 'District 4 Studio',
    metadata: { album: 'Kid A', duration: '4:11', playsCount: 42 },
    notes: 'Rhodes electric piano chords looping while tuning shader coordinate spaces.',
    tags: ['music', 'coding', 'focus', 'electronic']
  },
  {
    id: 'rcpt-052',
    title: 'Message to Sam: "Raymarching caustics finally locked at 60fps on mobile"',
    category: 'Messages',
    date: '2026-04-24',
    time: '21:40',
    location: 'District 4 Studio',
    metadata: { platform: 'Discord', channel: '#creative-code' },
    notes: 'Sent a screen capture of light bending through virtual quartz lattice.',
    tags: ['coding', 'collaboration', 'shaders']
  },
  {
    id: 'rcpt-053',
    title: 'Personal Note: "Math as an invisible brush"',
    category: 'Personal Notes',
    date: '2026-04-24',
    time: '23:15',
    location: 'District 4 Studio',
    metadata: { words: 95, tagList: ['art', 'code'] },
    notes: 'When a shader is right, it feels less like programming and more like sculpting translucent light.',
    tags: ['philosophy', 'coding', 'art', 'night']
  },

  // ==========================================
  // ADDITIONAL DIVERSE RECEIPTS (Completing 90+ items across 9 categories)
  // ==========================================

  // Music Receipts
  {
    id: 'rcpt-054',
    title: 'Track: "Cornfield Chase" — Hans Zimmer',
    category: 'Music',
    date: '2026-03-03',
    time: '18:10',
    location: 'Home Quarter',
    metadata: { album: 'Interstellar OST', duration: '2:07' },
    notes: 'Pipe organ building momentum during focus sprint.',
    tags: ['soundtrack', 'focus', 'evening']
  },
  {
    id: 'rcpt-055',
    title: 'Track: "Alberto Balsalm" — Aphex Twin',
    category: 'Music',
    date: '2026-03-11',
    time: '15:20',
    location: 'Archway Experimental Studio',
    metadata: { duration: '5:11', bpm: 95 },
    notes: 'Percussive metallic textures while laser-cutting acrylic panels.',
    tags: ['electronic', 'studio', 'craft']
  },
  {
    id: 'rcpt-056',
    title: 'Track: "On the Nature of Daylight" — Max Richter',
    category: 'Music',
    date: '2026-03-20',
    time: '07:15',
    location: 'Home Quarter',
    metadata: { album: 'The Blue Notebooks', duration: '6:11' },
    notes: 'Gentle cello ostinato in the early morning dawn.',
    tags: ['classical', 'strings', 'morning']
  },
  {
    id: 'rcpt-057',
    title: 'Track: "Selected Ambient Works Vol II #3" — Aphex Twin',
    category: 'Music',
    date: '2026-04-09',
    time: '23:45',
    location: 'Home Quarter',
    metadata: { album: 'SAW II', duration: '7:44' },
    notes: 'Midnight contemplation with zero blue-light screens.',
    tags: ['ambient', 'night', 'sleep']
  },
  {
    id: 'rcpt-058',
    title: 'Track: "Opening" — Philip Glass',
    category: 'Music',
    date: '2026-04-16',
    time: '11:00',
    location: 'District 4 Studio',
    metadata: { duration: '6:24', style: 'Minimalism' },
    notes: 'Arpeggios creating hypnotic work cadence.',
    tags: ['classical', 'piano', 'flow']
  },
  {
    id: 'rcpt-059',
    title: 'Track: "Immunity" — Jon Hopkins',
    category: 'Music',
    date: '2026-04-28',
    time: '20:30',
    location: 'Neon Basin Canal',
    metadata: { album: 'Immunity', duration: '9:56' },
    notes: 'Walking the waterfront as rain taps against waterproof parka.',
    tags: ['electronic', 'night', 'walk']
  },

  // Movies & Entertainment
  {
    id: 'rcpt-060',
    title: 'Movie: "Blade Runner 2049" — Denis Villeneuve',
    category: 'Movies & Entertainment',
    date: '2026-03-06',
    time: '20:00',
    location: 'The Metro Revival Cinema',
    metadata: { format: 'IMAX 70mm', runtime: '164 min', rating: 5 },
    notes: 'Roger Deakins cinematography: brutalist orange dust storms and glass monoliths.',
    tags: ['cinema', 'scifi', 'architecture', 'friday']
  },
  {
    id: 'rcpt-061',
    title: 'Documentary: "Jiro Dreams of Sushi" — David Gelb',
    category: 'Movies & Entertainment',
    date: '2026-03-21',
    time: '21:15',
    location: 'Home Quarter',
    metadata: { platform: 'Criterion Channel', category: 'Mastery' },
    notes: 'Re-watching for the study of daily repetitive discipline.',
    tags: ['documentary', 'craft', 'discipline']
  },
  {
    id: 'rcpt-062',
    title: 'Movie: "Past Lives" — Celine Song',
    category: 'Movies & Entertainment',
    date: '2026-04-10',
    time: '19:40',
    location: 'The Metro Revival Cinema',
    metadata: { format: '35mm', venue: 'The Metro Revival Cinema', rating: 5 },
    notes: 'The concept of In-Yun: invisible threads binding lives across lifetimes.',
    tags: ['cinema', 'in-yun', 'connections', 'destiny']
  },
  {
    id: 'rcpt-063',
    title: 'Show: "Severance" S2E04 — "Woe\'s Hollow"',
    category: 'Movies & Entertainment',
    date: '2026-04-22',
    time: '21:00',
    location: 'Home Quarter',
    metadata: { service: 'Apple TV+', episodeRating: 9.6 },
    notes: 'Symmetrical office hallway framing and retro-futuristic CRT terminals.',
    tags: ['tv', 'architecture', 'design']
  },

  // Places
  {
    id: 'rcpt-064',
    title: 'Check-in: The City Botanical Conservatory',
    category: 'Places',
    date: '2026-03-12',
    time: '14:30',
    location: 'Botanical Glasshouse',
    metadata: { humidity: '82%', glassStructureEra: '1894 Victorian' },
    notes: 'Humid fern garden beneath iron arches. Giant Victoria amazonica lily pads.',
    tags: ['nature', 'glasshouse', 'green', 'peace']
  },
  {
    id: 'rcpt-065',
    title: 'Check-in: Bayside Bookshop & Tea Cellar',
    category: 'Places',
    date: '2026-03-19',
    time: '16:15',
    location: 'Bayside Bookshop',
    metadata: { floor: 'Basement Antiquarian', booksAcquired: 2 },
    notes: 'Smell of aged paper, leather bindings, and lapsang souchong tea.',
    tags: ['books', 'reading', 'quiet', 'afternoon']
  },
  {
    id: 'rcpt-066',
    title: 'Check-in: High Point Overlook Bridge',
    category: 'Places',
    date: '2026-04-01',
    time: '18:50',
    location: 'High Point Bridge',
    metadata: { altitude: '140m', view: 'Suspension Span' },
    notes: 'Watching cargo freighters glide under the steel cantilever at sunset.',
    tags: ['sunset', 'bridge', 'skyline', 'transit']
  },
  {
    id: 'rcpt-067',
    title: 'Check-in: Archway Experimental Studio',
    category: 'Places',
    date: '2026-04-11',
    time: '10:00',
    location: 'District 4 Studio',
    metadata: { hoursLogged: 7, workstation: 'CAD Bay 3' },
    notes: 'Weekend modeling session preparing modular wall tessellations.',
    tags: ['studio', 'design', 'work']
  },
  {
    id: 'rcpt-068',
    title: 'Check-in: Neon Basin Canal Walkway',
    category: 'Places',
    date: '2026-04-25',
    time: '22:00',
    location: 'Neon Basin Canal',
    metadata: { weather: 'Drizzle', wind: 'Gentle' },
    notes: 'Nighttime walk following the blue canal markers after coding session.',
    tags: ['walk', 'night', 'canal']
  },

  // Purchases
  {
    id: 'rcpt-069',
    title: 'Purchase: Midori MD Notebook A5 Grid ($18.00)',
    category: 'Purchases',
    date: '2026-03-05',
    time: '12:40',
    location: 'Kinokuniya Stationary',
    metadata: { paperWeight: '80gsm', binding: 'Thread-stitched', currency: 'USD' },
    notes: 'Fountain-pen friendly bleeds. Chosen for structural architectural sketches.',
    tags: ['stationary', 'paper', 'drawing']
  },
  {
    id: 'rcpt-070',
    title: 'Purchase: Sailor 1911 Fountain Pen Medium-Fine ($165.00)',
    category: 'Purchases',
    date: '2026-03-05',
    time: '13:00',
    location: 'Kinokuniya Stationary',
    metadata: { nib: '14k Gold', ink: 'Carbon Black Pigment', amount: 165.00 },
    notes: 'Investment pen for hand-lettered documentation and drawing revisions.',
    tags: ['tools', 'writing', 'investment']
  },
  {
    id: 'rcpt-071',
    title: 'Purchase: Two Antique Monograph Prints on Concrete ($45.00)',
    category: 'Purchases',
    date: '2026-03-19',
    time: '16:50',
    location: 'Bayside Bookshop',
    metadata: { subject: 'Italian Rationalist Architecture 1935', amount: 45.00 },
    notes: 'Framed plates showing Terragni\'s Casa del Fascio marble detailing.',
    tags: ['books', 'art', 'history', 'architecture']
  },
  {
    id: 'rcpt-072',
    title: 'Purchase: Organic Stoneground Rye & Heritage Bread Flour ($22.40)',
    category: 'Purchases',
    date: '2026-04-03',
    time: '11:15',
    location: 'Whole Mill Grain Co.',
    metadata: { weightKg: 10, stoneType: 'Granite Millstone', amount: 22.40 },
    notes: 'Freshly milled batch with high germ retention for the sourdough starter.',
    tags: ['sourdough', 'food', 'cooking']
  },
  {
    id: 'rcpt-073',
    title: 'Purchase: Domain Registration: lifethreads.space ($38.00)',
    category: 'Purchases',
    date: '2026-04-26',
    time: '17:15',
    location: 'Home Quarter',
    metadata: { registrar: 'Namecheap', renewalYears: 2, amount: 38.00 },
    notes: 'Secured domain for the generative timeline exhibition showcase.',
    tags: ['web', 'project', 'domain']
  },

  // Photos
  {
    id: 'rcpt-074',
    title: 'Photo: "Fountain Pen Nib Micro-Engraving"',
    category: 'Photos',
    date: '2026-03-05',
    time: '14:20',
    location: 'Home Quarter',
    metadata: { lens: '90mm Macro', magnification: '1:1', light: 'Window Side-Light' },
    notes: 'Anchor logo stamped into the 14k gold tines surrounded by ink capillary sheen.',
    tags: ['photography', 'macro', 'craft', 'details']
  },
  {
    id: 'rcpt-075',
    title: 'Photo: "Glasshouse Vaulting & Cycad Palms"',
    category: 'Photos',
    date: '2026-03-12',
    time: '15:10',
    location: 'Botanical Glasshouse',
    metadata: { camera: 'Leica Q3', focal: '28mm', aperture: 'f/5.6' },
    notes: 'Iron ribs curving overhead like the ribcage of an ancient leviathan.',
    tags: ['photography', 'architecture', 'nature', 'geometry']
  },
  {
    id: 'rcpt-076',
    title: 'Photo: "Sunlight Filtering Through Fermentation Bubbles"',
    category: 'Photos',
    date: '2026-04-04',
    time: '14:30',
    location: 'Home Quarter',
    metadata: { shutter: '1/800s', aperture: 'f/2.0' },
    notes: 'Glass jar of active sourdough starter doubling in volume, lit from behind.',
    tags: ['photography', 'sourdough', 'light']
  },
  {
    id: 'rcpt-077',
    title: 'Photo: "Fog Shrouded Coastal Headland"',
    category: 'Photos',
    date: '2026-04-18',
    time: '08:45',
    location: 'Cape Perpetua Lookout',
    metadata: { shutter: '1/500s', focal: '50mm', exposure: '-0.3EV' },
    notes: 'Layers of coastal conifers receding into silver-white sea mist.',
    tags: ['photography', 'landscape', 'travel', 'mist']
  },
  {
    id: 'rcpt-078',
    title: 'Photo: "CRT Vector Oscilloscope Patterns"',
    category: 'Photos',
    date: '2026-04-25',
    time: '00:15',
    location: 'District 4 Studio',
    metadata: { longExposure: '1.0s', iso: 100, camera: 'Tripod Lock' },
    notes: 'Lissajous curves tracing mathematical harmonics in glowing green phosphor.',
    tags: ['photography', 'generative', 'phosphor', 'math']
  },

  // Messages
  {
    id: 'rcpt-079',
    title: 'Message from Elena: "Have you seen the light well in the new pavilion plan?"',
    category: 'Messages',
    date: '2026-03-17',
    time: '16:00',
    location: 'Archway Experimental Studio',
    metadata: { platform: 'Signal', attachmentsCount: 1 },
    notes: 'Elena shared a revised CAD section showing morning solar angles.',
    tags: ['collaboration', 'architecture', 'design']
  },
  {
    id: 'rcpt-080',
    title: 'Message to Marcus: "Sending you the 35mm film stills from Friday night"',
    category: 'Messages',
    date: '2026-03-28',
    time: '11:30',
    location: 'Home Quarter',
    metadata: { platform: 'iMessage', imagesSent: 4 },
    notes: 'Scanned negatives from the Stalker screening night at The Metro.',
    tags: ['cinema', 'friends', 'photography']
  },
  {
    id: 'rcpt-081',
    title: 'Message from Maya: "The coastal cabin reservation is locked for April 17!"',
    category: 'Messages',
    date: '2026-04-12',
    time: '13:20',
    location: 'Home Quarter',
    metadata: { platform: 'Signal', linkAttached: true },
    notes: 'Keycode and trail directions for the Halcyon Cliff Cabin sent.',
    tags: ['travel', 'retreat', 'planning']
  },
  {
    id: 'rcpt-082',
    title: 'Message to Design Guild: "Draft submission ready for the biennial showcase"',
    category: 'Messages',
    date: '2026-04-29',
    time: '18:00',
    location: 'District 4 Studio',
    metadata: { channel: '#exhibitions', reactionsCount: 12 },
    notes: 'Shared the interactive Life//Threads concept link to the jury channel.',
    tags: ['design', 'project', 'announcement']
  },

  // Searches
  {
    id: 'rcpt-083',
    title: 'Search: "Tarkovsky sculpting in time cinematic rhythm essay"',
    category: 'Searches',
    date: '2026-03-26',
    time: '23:10',
    location: 'Home Quarter',
    metadata: { academicSearch: true, pdfsSaved: 2 },
    notes: 'Reading Tarkovsky\'s reflections on the pressure of time within the shot.',
    tags: ['cinema', 'philosophy', 'research']
  },
  {
    id: 'rcpt-084',
    title: 'Search: "Peter Zumthor thermal baths Vals quartz slate masonry"',
    category: 'Searches',
    date: '2026-03-16',
    time: '14:15',
    location: 'District 4 Studio',
    metadata: { searchType: 'Images & Drawings', queryLength: 58 },
    notes: 'Studying how 60,000 slabs of Valser quartzite create thermal sanctuary.',
    tags: ['architecture', 'stone', 'research']
  },
  {
    id: 'rcpt-085',
    title: 'Search: "Low tide table Cape Perpetua Thor\'s Well April 17"',
    category: 'Searches',
    date: '2026-04-14',
    time: '20:30',
    location: 'Home Quarter',
    metadata: { source: 'NOAA Tide Forecast', bookmark: true },
    notes: 'Checking optimal tide timing: 1 hour before high tide for wave surges.',
    tags: ['travel', 'ocean', 'tides']
  },
  {
    id: 'rcpt-086',
    title: 'Search: "Three.js vs WebGPU canvas memory footprint 60fps graph layout"',
    category: 'Searches',
    date: '2026-04-23',
    time: '15:40',
    location: 'District 4 Studio',
    metadata: { tabsCount: 7, engine: 'DuckDuckGo' },
    notes: 'Analyzing lightweight SVG vs Canvas performance for relationship graphs.',
    tags: ['coding', 'performance', 'frontend']
  },

  // Events
  {
    id: 'rcpt-087',
    title: 'Event: "Vernacular Architecture Spring Symposium"',
    category: 'Events',
    date: '2026-03-14',
    time: '10:00',
    location: 'Civic Auditorium East',
    metadata: { badgeId: 'SPEAKER-204', keynoteSpeaker: 'Kengo Kuma' },
    notes: 'Full-day panels on cedar joinery and low-carbon earth construction.',
    tags: ['architecture', 'conference', 'learning']
  },
  {
    id: 'rcpt-088',
    title: 'Event: "Sunday Morning Stillness Hour"',
    category: 'Events',
    date: '2026-03-29',
    time: '09:00',
    location: 'Komorebi Coffee Roasters',
    metadata: { recurringWeekly: true, calendar: 'Personal Wellness' },
    notes: 'Unbroken calendar block reserved for offline reading and coffee.',
    tags: ['ritual', 'coffee', 'sunday', 'peace']
  },
  {
    id: 'rcpt-089',
    title: 'Event: "Pacific Coastal Train Departure"',
    category: 'Events',
    date: '2026-04-17',
    time: '07:05',
    location: 'Cascadia Central Station',
    metadata: { trainNumber: 'Cascadia-108', coach: 3 },
    notes: 'Departure confirmed on track 4 toward coastal headlands.',
    tags: ['travel', 'transit', 'departure']
  },
  {
    id: 'rcpt-090',
    title: 'Event: "6-Hour Frontend Hackathon: Life in Receipts"',
    category: 'Events',
    date: '2026-04-30',
    time: '09:00',
    location: 'District 4 Studio',
    metadata: { hackathon: 'Frontend Arena', submissionDeadline: '15:00' },
    notes: 'Transforming raw fictional receipts into a museum-grade digital story.',
    tags: ['hackathon', 'coding', 'project', 'deadline']
  },

  // Personal Notes
  {
    id: 'rcpt-091',
    title: 'Personal Note: "The architecture of memory"',
    category: 'Personal Notes',
    date: '2026-03-01',
    time: '22:15',
    location: 'Home Quarter',
    metadata: { words: 165, sentiment: 'Poetic' },
    notes: 'We think our lives are a sequence of hours, but memory is spatial. We remember rooms, light angles, and songs that accompanied revelation.',
    tags: ['philosophy', 'memory', 'reflection']
  },
  {
    id: 'rcpt-092',
    title: 'Personal Note: "Tactile resistance in a frictionless world"',
    category: 'Personal Notes',
    date: '2026-03-10',
    time: '21:00',
    location: 'Home Quarter',
    metadata: { words: 120, device: 'Fountain Pen on Midori Paper' },
    notes: 'Why do I love baking sourdough, loading film cameras, and drafting by hand? Because friction is proof that something is real.',
    tags: ['philosophy', 'craft', 'sourdough', 'photography']
  },
  {
    id: 'rcpt-093',
    title: 'Personal Note: "The lesson of the coastal tide"',
    category: 'Personal Notes',
    date: '2026-04-19',
    time: '16:00',
    location: 'Halcyon Cliff Cabin',
    metadata: { words: 180, mood: 'Centered' },
    notes: 'The ocean does not rush its wave. Each surge recedes completely before gathering force for the next. Do not fear the quiet pauses between sprints.',
    tags: ['journal', 'mindfulness', 'nature', 'travel']
  },
  {
    id: 'rcpt-094',
    title: 'Personal Note: "Connections are the true receipts of living"',
    category: 'Personal Notes',
    date: '2026-04-29',
    time: '23:30',
    location: 'District 4 Studio',
    metadata: { words: 145, mood: 'Clarified' },
    notes: 'A receipt for a coffee is trivial. But a receipt for coffee on the same morning as a research query, an archival sketch, and an ambient track—that is a signature of who we were.',
    tags: ['manifesto', 'connections', 'life', 'story']
  }
];
