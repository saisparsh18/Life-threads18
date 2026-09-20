// LIFE//THREADS - Narrative Chapter Engine
// Synthesizes raw receipts into thematic narrative chapters based on detected activity patterns.
// Patterns include: activity clusters, dominant categories, repeated locations,
// activity spikes, connected moments, recurring behavior, and changes in category mix.

import { calculateReceiptAffinity } from './connections.js';

export function generateChapters(receipts) {
  const chaptersConfig = [
    {
      id: 'chapter-1',
      chapterNumber: 1,
      title: 'The Night Everything Connected',
      subtitle: 'Early March 2026',
      dateRange: 'Mar 01, 2026 – Mar 18, 2026',
      filter: (r) => r.date >= '2026-03-01' && r.date <= '2026-03-18',
      narrativeLead: 'A period marked by high concentration in architectural studios, technical drafting, and midnight focus soundtracks.',
      keyInsight: 'Observed intense convergence of Music, Places, and Purchases peaking during late evening hours.',
      whyItMatters: 'These moments converge around the same date, location, and time window. Activity increased during late evening hours, forming an uninterrupted sequence across 5 connected moments with 3 distinct connection signals.',
      detectedPatterns: [
        'Activity increased by 65% during late evening hours (20:00 – 23:30).',
        'Spatial convergence: 14 receipts anchored at District 4 Studio and Archway Experimental Studio.',
        'Sequential cross-category thread: Music → Places → Photos → Purchases → Events on March 18.'
      ],
      accentColor: '#38bdf8'
    },
    {
      id: 'chapter-2',
      chapterNumber: 2,
      title: 'The Quiet Hours & Sunday Rituals',
      subtitle: 'Mid March 2026',
      dateRange: 'Mar 08, 2026 – Mar 29, 2026',
      filter: (r) => r.location === 'Komorebi Coffee Roasters' || (r.tags && r.tags.includes('ritual')),
      narrativeLead: 'Consistent recurring temporal clusters every Sunday morning, showing repeated orders and reflective notes.',
      keyInsight: 'Identified an unwavering weekly anchor at Komorebi Coffee Roasters with identical ordering windows (09:10 - 09:30).',
      whyItMatters: 'The data shows recurring behavior with zero variance across 4 consecutive weekends. While recorded independently across banking, streaming, and notes, they represent an unbroken sanctuary pattern.',
      detectedPatterns: [
        'Recurring temporal anchor: Identical 09:10 – 09:30 check-in window every Sunday in March.',
        'Category parity: Parallel logging of Purchases (flat white) and Personal Notes (weekly reflections).',
        'Auditory consistency: Ambient playlist logged simultaneously during 100% of visits.'
      ],
      accentColor: '#34d399'
    },
    {
      id: 'chapter-3',
      chapterNumber: 3,
      title: 'Friday Rituals & Historic Cinema',
      subtitle: 'Late March 2026',
      dateRange: 'Mar 26, 2026 – Mar 31, 2026',
      filter: (r) => (r.date >= '2026-03-26' && r.date <= '2026-03-31') || (r.tags && (r.tags.includes('cinema') || r.tags.includes('film'))),
      narrativeLead: 'Evenings centered on historic cinema, waterfront walks along Neon Basin, and philosophical notes on temporal memory.',
      keyInsight: 'Tarkovsky retrospective screenings at The Metro directly preceded long-exposure photography and solitary ambient tracks.',
      whyItMatters: 'The data shows a localized cultural cluster where entertainment check-ins catalyzed nocturnal photography and message exchanges within a 3-hour radius.',
      detectedPatterns: [
        'Event-triggered activity spike: Cinema screenings directly preceded midnight long-exposure photography.',
        'Geographic axis: Repeated traversal between Metro Cinema and Neon Basin Waterfront.',
        'Thematic convergence: Search query logs for 35mm cinematographers coincided with purchase of archival vellum.'
      ],
      accentColor: '#a855f7'
    },
    {
      id: 'chapter-4',
      chapterNumber: 4,
      title: 'Creative Season: The Fermentation Shift',
      subtitle: 'Early April 2026',
      dateRange: 'Apr 01, 2026 – Apr 10, 2026',
      filter: (r) => (r.tags && (r.tags.includes('sourdough') || r.tags.includes('fermentation') || r.tags.includes('cooking'))),
      narrativeLead: 'A pronounced category migration from abstract architectural theory to physical culinary craft and tactile sourdough baking.',
      keyInsight: 'Searches transitioned into specialized cookware purchases, followed by routine feeding schedules and macro bread photography.',
      whyItMatters: 'The data records an abrupt behavioral migration. Digital searches directly preceded physical hardware acquisition, followed by a strict 12-hour cadence of feeding alarms.',
      detectedPatterns: [
        'Category shift: Architecture and WebGL queries dropped to zero; culinary terms spiked to 100%.',
        'Action conversion: Search queries converted to physical kitchenware purchases within 48 hours.',
        'Cyclic cadence: Routine reminders logged at 12-hour fermentation intervals.'
      ],
      accentColor: '#fbbf24'
    },
    {
      id: 'chapter-5',
      chapterNumber: 5,
      title: 'New Places & Pacific Tides',
      subtitle: 'Mid April 2026',
      dateRange: 'Apr 14, 2026 – Apr 19, 2026',
      filter: (r) => (r.date >= '2026-04-14' && r.date <= '2026-04-19') || (r.tags && (r.tags.includes('travel') || r.tags.includes('ocean'))),
      narrativeLead: 'A multi-day retreat to the coastal headlands via Cascadia Rail, characterized by landscape lookouts and woodstove embers.',
      keyInsight: 'Complete cessation of urban studio check-ins, replaced with coastal rail passes, cabin check-ins, and wave photography.',
      whyItMatters: 'The data shows geographic displacement outside the primary urban coordinate bounds. Travel passes, photo captures, and off-grid notes form a distinct 5-day retreat cluster.',
      detectedPatterns: [
        'Geographic displacement: All 18 receipts recorded outside urban District 4 coordinates.',
        'Transit sequence: Cascadia Rail booking → Seaside arrival → Coastal trail check-ins.',
        'Visual category dominance: Photography receipts represented over 55% of all digital artifacts during this period.'
      ],
      accentColor: '#60a5fa'
    },
    {
      id: 'chapter-6',
      chapterNumber: 6,
      title: 'Generative Coding & Shaders',
      subtitle: 'Late April 2026',
      dateRange: 'Apr 20, 2026 – Apr 30, 2026',
      filter: (r) => (r.date >= '2026-04-20' && r.date <= '2026-04-30') && (r.tags && (r.tags.includes('coding') || r.tags.includes('shaders') || r.tags.includes('hackathon'))),
      narrativeLead: 'The culmination phase: mathematical shaders, electronic audio, Discord collaboration, and preparation for the hackathon.',
      keyInsight: 'Deep searches into WebGL signed distance fields converged into hardware purchases and the domain registration of lifethreads.space.',
      whyItMatters: 'The data shows intense technical mobilization. Late-night search query frequency quadrupled, accompanied by real-time messaging dispatches and domain registration.',
      detectedPatterns: [
        'Frequency spike: Search query volume quadrupled compared to mid-April baselines.',
        'Category convergence: Searches, Purchases, Messages, and Personal Notes all oriented around generative code.',
        'Sprint rhythm: Activity clustered between 21:00 and 02:30 leading directly to product launch.'
      ],
      accentColor: '#f43f5e'
    }
  ];

  return chaptersConfig.map(ch => {
    const chapterReceipts = receipts.filter(ch.filter);

    // Dominant categories calculation
    const catCounts = {};
    chapterReceipts.forEach(r => {
      catCounts[r.category] = (catCounts[r.category] || 0) + 1;
    });
    const dominantCategories = Object.entries(catCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, count]) => ({ category: cat, count }));

    // Find internal connections within this chapter
    const internalConnections = [];
    let connectedMomentsCount = 0;

    for (let i = 0; i < chapterReceipts.length; i++) {
      for (let j = i + 1; j < chapterReceipts.length; j++) {
        const aff = calculateReceiptAffinity(chapterReceipts[i], chapterReceipts[j]);
        if (aff && aff.score >= 40) {
          connectedMomentsCount += 1;
          internalConnections.push({
            r1: chapterReceipts[i],
            r2: chapterReceipts[j],
            affinity: aff
          });
        }
      }
    }

    internalConnections.sort((a, b) => b.affinity.score - a.affinity.score);

    return {
      ...ch,
      receipts: chapterReceipts,
      momentsCount: chapterReceipts.length,
      dominantCategories,
      connectedMomentsCount,
      importantConnections: internalConnections.slice(0, 5)
    };
  });
}
