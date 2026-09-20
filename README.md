# LIFE//THREADS
> **Your Life, In Receipts**  
> *Transforming isolated digital footprints into interconnected insights, behavioral patterns, and generative stories.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-life--threads18.vercel.app-00F0FF?style=flat-square&logo=vercel)](https://life-threads18.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Life--threads18-ffffff?style=flat-square&logo=github)](https://github.com/saisparsh18/Life-threads18)
[![Built for Hackathon](https://img.shields.io/badge/WebRush-Attempt_%232-FFB800?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Frontend-React_18_%7C_Vite_8_%7C_Framer_Motion-61DAFB?style=flat-square)](#)

---

## 1. Problem Statement

Every day, our digital lives leave behind hundreds of fragmented receipts: streaming music plays, mobility trips, debit card transactions, candid camera snapshots, cinema admissions, messaging timestamps, search engine queries, and fleeting personal notes. 

Traditional timeline or life-logging applications present these data points as simple, chronological feeds where every record exists in a vacuum. By doing so, they miss the invisible threads that tie our lives together:
- **Spatial convergence:** Listening to an ambient album right after stepping out of a late-night indie film screening.
- **Ritual detection:** An unwavering Sunday morning coffee run that anchors the entire week.
- **Behavioral shifts:** A sudden transition from urban coworking spaces to coastal rail travel, sourdough fermentation experiments, and creative coding shaders.

**LIFE//THREADS** bridges this gap by transforming raw, siloed records into meaningful stories:  
$$\text{Raw Data} \longrightarrow \text{Insights} \longrightarrow \text{Connections} \longrightarrow \text{Story}$$

---

## 2. Project Overview

**LIFE//THREADS** is a frontend-only digital life storytelling platform built for the **WebRush Hackathon** under the prompt *"Your Life, In Receipts"*. 

Rather than relying on black-box external AI services or opaque server-side pipelines, LIFE//THREADS implements a deterministic, client-side relational engine. It ingests multi-domain life receipts across 9 distinct categories, calculates explainable spatial, temporal, and semantic connections, detects recurring behavioral patterns, algorithmically groups moments into thematic narrative chapters, and presents them through an interactive, documentary-style Story Mode.

---

## 3. Key Features

### 🔍 1. Receipts Exploration
- Complete repository view of all digital receipts across 9 core life domains:
  - **Music**, **Movies & Entertainment**, **Places**, **Purchases**, **Photos**, **Messages**, **Searches**, **Events**, and **Personal Notes**.
- High-density specimen cards featuring category chips, timestamps, physical/virtual locations, contextual metadata, and real-time connection counters.

### ⚡ 2. Search & Multi-Faceted Filtering
- Real-time full-text search across titles, descriptions, locations, artists, people, keywords, and technical metadata.
- Interactive category filter badges with live item count distribution.
- Date range filtering (Start Date to End Date) with active filter pill indicators and one-click filter reset.

### 🕸️ 3. Connection Discovery & Relational Graph
- Interactive SVG-based network visualization mapping nodes (moments) and edges (correlations).
- Cluster filtering to isolate specific relational dynamics: **Spatial**, **Temporal**, **Cross-Domain**, and **Late Evening**.
- Slide-over inspection drawer detailing exact relational links and direct "Follow Thread" routing into Story Mode.

### 🏷️ 4. Explainable Connection Signals
- Transparent correlation badges that objectively explain *why* two moments connect:
  - `"Same day"`, `"Within 45 minutes"`, `"Same location"`, `"Shared theme"`, `"Cross-domain confluence"`.
- Zero fabricated AI hallucinations; every connection is backed by explainable, verifiable metadata.

### 🧠 5. Pattern Detection & Flagship Insights
- Detection of behavioral rituals, spatial anchors, activity spikes, and category mix shifts.
- Dedicated *"Hidden in Plain Sight"* intelligence cards surfacing:
  - **Recurring Patterns** (e.g., weekly coffee roasting rituals).
  - **Strong Connections** (e.g., cross-category convergence between cinema and late-night ambient audio).
  - **Activity Shifts** (e.g., migration from urban workspaces to coastal transit).

### 📖 6. Algorithmic Narrative Chapters
- Dynamic synthesis of 6 thematic chapters based on activity density and category shifts (rather than arbitrary calendar months):
  1. *The Night Everything Connected*
  2. *The Quiet Hours & Sunday Rituals*
  3. *Friday Rituals & Historic Cinema*
  4. *Creative Season: The Fermentation Shift*
  5. *New Places & Pacific Tides*
  6. *Generative Coding & Shaders*
- Each chapter provides narrative leads, dominant category distributions, connection metrics, and key behavioral insights.

### 🎬 7. Interactive Story Mode (Documentary Reader)
- Step-by-step progressive reveal of connected moments with editorial journal typography.
- Displays the physical receipt specimen card alongside algorithmic explanations and signal badges.
- Full keyboard control (`ArrowLeft` / `ArrowRight`), progress step indicator (`03 / 06`), and completion summary analytics.

### 📱 8. Responsive & Adaptive Design
- Handcrafted responsive layout tested across **1440px**, **1280px**, **1024px**, **768px**, **390px**, and **375px** viewports.
- Touch-friendly horizontal scrolling controls for mobile story navigation and category filters.
- Collapsible navigation drawer with zero horizontal viewport overflow (`overflow-x: clip`).

---

## 4. How the Connection Engine Works

The relational engine (`src/engine/connections.js`) evaluates pairs of receipts using multi-signal scoring criteria:

1. **Temporal Proximity:**
   - Evaluates timestamps to find moments occurring on the identical calendar date.
   - Flags tight chronological windows: moments occurring within 45 minutes or within a 2-hour window.
2. **Spatial Convergence:**
   - Compares physical venue names, neighborhood anchors, or coordinates to establish location continuity.
3. **Cross-Domain Confluence:**
   - Detects interactions bridging disparate life areas (e.g. listening to a specific music track immediately following a cinema ticket purchase or while checked into a specific cafe).
4. **Semantic & Entity Linking:**
   - Intersects shared keywords, artist names, collaborators, and metadata tags across records.

The engine generates an adjacency graph of weighted edges and node degrees, dynamically identifying central "anchor moments" that bridge multiple threads of life activity.

---

## 5. How Patterns Are Detected

The pattern detection engine (`src/engine/insights.js`) analyzes dataset distributions across several algorithmic dimensions:

- **Recurring Spatial Anchors:** Scans for regular weekly occurrences at the same venue within narrow time intervals (e.g., Sunday morning visits to Komorebi Coffee Roasters between 09:10 and 09:30).
- **Nocturnal Convergence:** Detects spikes in deep work searches and ambient audio listening during late evening and night hours (22:00 – 03:00).
- **Domain Shifts:** Calculates category mix percentages over sliding time windows to detect lifestyle shifts (e.g., sourdough baking and culinary supply purchases displacing urban transit).
- **Burst Detection:** Identifies dense clusters of diverse receipts generated within tight chronological sequences.

---

## 6. How Chapters and Stories Are Generated

Rather than relying on calendar months, the chapter generator (`src/engine/chapters.js`):
1. Clusters records by temporal density, geographic focus, and dominant category transitions.
2. Evaluates the strongest interconnected clusters and tags them with narrative titles.
3. Computes objective data summaries (e.g., `"Observed intense convergence of Music, Places, and Purchases peaking during late evening hours"`).
4. Formulates a sequential progression of moments within each chapter, which `StoryPlayer.jsx` renders as an interactive narrative arc complete with specimen cards and relational explanations.

---

## 7. Technology Stack

- **Core Framework:** React 18
- **Build Tool:** Vite 8 (ultra-fast HMR and production bundling)
- **Styling:** Custom Vanilla CSS Design System
  - Curated dark obsidian aesthetic (`#0B0F17`, `#111827`) with electric cyan (`#00F0FF`) and neon amber (`#FFB800`) accents.
  - High-performance glassmorphism (`backdrop-filter: blur()`).
  - Editorial serif headers paired with clean sans-serif UI typography and monospace data tags.
- **Animation & Transitions:** Framer Motion (page transitions, spring layout tabs, mobile drawer animations).
- **Icons:** Lucide React (semantic domain iconography).

---

## 8. Frontend-Only Architecture

LIFE//THREADS is engineered as a **100% client-side application**:
- **Zero Backend / Server:** No Express, Node, Python, or serverless API functions.
- **Zero Database:** No MongoDB, PostgreSQL, Firebase, or external cloud storage.
- **Zero External AI Services:** No OpenAI, Anthropic, or external API keys required.
- **Zero Secrets / Tokens:** All data processing, graph construction, pattern recognition, and chapter synthesis execute entirely inside the user's browser in sub-millisecond execution times.

---

## 9. Project Folder Structure

```
life-threads/
├── dist/                         # Production build output
├── public/                       # Favicons, metadata, and static assets
├── src/
│   ├── components/               # Modular, reusable UI components
│   │   ├── ConnectionDrawer.jsx  # Slide-over detail drawer for graph nodes
│   │   ├── ConnectionGraph.jsx   # Accessible SVG relational graph canvas
│   │   ├── Navbar.jsx            # Desktop tabs & responsive mobile navigation drawer
│   │   ├── ReceiptCard.jsx       # Standardized life receipt specimen card
│   │   ├── ReceiptDetailModal.jsx# Accessible dialog modal for receipt inspection
│   │   └── StoryPlayer.jsx       # Step-by-step interactive documentary reader
│   │
│   ├── data/
│   │   └── mockReceipts.js       # Standardized schema dataset spanning 9 categories
│   │
│   ├── engine/                   # Pure functional data analysis & synthesis algorithms
│   │   ├── chapters.js           # Thematic chapter generation & narrative synthesis
│   │   ├── connections.js        # Relational scoring engine & graph construction
│   │   ├── insights.js           # Pattern detection & flagship insight algorithms
│   │   └── index.js              # Unified engine export point
│   │
│   ├── pages/                    # 5 Primary View Destinations
│   │   ├── OverviewPage.jsx      # Hero, KPI metrics, flagship insights & connection chain
│   │   ├── ExplorePage.jsx       # Full receipts catalog, search, and category filters
│   │   ├── ConnectionsPage.jsx   # Interactive graph canvas & relationship clusters
│   │   ├── ChaptersPage.jsx      # Narrative chapters directory & pattern intelligence
│   │   └── StoryPage.jsx         # Full-screen interactive story mode
│   │
│   ├── App.jsx                   # Root application orchestrator & memoized engine pipeline
│   ├── index.css                 # Comprehensive CSS design system, tokens, and a11y focus states
│   └── main.jsx                  # React DOM entry point
│
├── package.json                  # Dependencies & build scripts
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation
```

---

## 10. Local Setup & Installation

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/saisparsh18/Life-threads18.git

# 2. Navigate to project directory
cd Life-threads18

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The application will launch on `http://localhost:5173`.

---

## 11. Production Build & Verification

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### Build Characteristics:
- **Build Time:** ~240ms via Vite.
- **Module Count:** 2,299 modules transformed.
- **Zero Errors / Zero Warnings.**

---

## 12. Live Deployment & Repository

- **Live Deployment:** [https://life-threads18.vercel.app/](https://life-threads18.vercel.app/)
- **GitHub Repository:** [https://github.com/saisparsh18/Life-threads18](https://github.com/saisparsh18/Life-threads18)

---

## 13. Accessibility & Responsive Design Notes

- **Semantic HTML5:** Built using standard HTML elements (`<nav>`, `<main>`, `<article>`, `<header>`, native `<button type="button">`).
- **Single `<h1>` Hierarchy:** Every major view implements exactly one descriptive `<h1>` element.
- **Keyboard Navigation & ESC Support:**
  - Standardized `:focus-visible` styling (`outline: 2px solid var(--accent-cyan); outline-offset: 2px;`) across all interactive elements.
  - Pressing `Escape` automatically closes the Receipt Detail Modal, Connection Drawer, and mobile navigation menu.
  - `ArrowLeft` and `ArrowRight` navigate through Story Mode steps.
- **Accessible Data Visualizations:** SVG graph nodes feature `role="button"`, `tabIndex={0}`, descriptive `aria-label`s, and `Enter`/`Space` keyboard activation.
- **Screen Reader & Color Independence:**
  - Search input and date filters include explicit `aria-label`s.
  - Colors are never used as the sole conveyor of information; all badges pair distinct color schemes with high-contrast text and category icons.
- **Viewport Fluidity:** Tested from 1440px wide screens down to 375px mobile displays with `overflow-x: clip` to prevent horizontal page scrolling.

---

## 14. Performance Considerations

- **Memoized Calculations:** All relational graph matrices, chapter detection routines, and flagship insights are wrapped in React `useMemo` hooks in `App.jsx`, preventing redundant recomputations on tab changes.
- **Zero Heavy Graph Dependencies:** Avoids massive WebGL/canvas graphing libraries (e.g. D3 or Three.js) in favor of lightweight, responsive inline SVG math, keeping initial JS bundle sizes lean (<150 kB gzipped).
- **Fast First Paint:** Clean, tree-shakable iconography from Lucide React and minimal external overhead.

---

## 15. Dataset Extensibility

> [!NOTE]
> The current dataset in [`src/data/mockReceipts.js`](file:///c:/Users/saisp/Documents/Frontend%20arena/src/data/mockReceipts.js) consists of mock/demo digital receipts crafted to validate the full end-to-end relational pipeline.
>
> The schema follows a generic, extensible contract:
> ```javascript
> {
>   id: "rcpt-001",
>   title: "Midnight Ambient Session",
>   category: "Music",
>   date: "2026-03-18",
>   time: "23:45",
>   location: "District 4 Studio",
>   description: "Late night synthesizer session and field recording review.",
>   metadata: { artist: "Komorebi Sound Lab", duration: "42 min", device: "Audio Interface" },
>   tags: ["ambient", "synthesizer", "night", "creative"]
> }
> ```
> 
> When the official hackathon organizer dataset is provided, it can be dropped into `src/data/mockReceipts.js` (or imported via a standard adapter) **with zero changes required to the UI architecture, layout, or relational engine**.
