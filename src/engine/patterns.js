// LIFE//THREADS - Pattern Detection Engine
// Identifies non-linear life patterns across raw receipt archives:
// - Repeated locations
// - Recurring temporal habits (e.g. Sunday mornings)
// - Activity spikes
// - Category dominance & shifts

/**
 * Detects frequent locations and their recurrence rates
 */
export function detectRepeatedLocations(receipts) {
  const locCounts = {};
  receipts.forEach(r => {
    if (!r.location) return;
    locCounts[r.location] = (locCounts[r.location] || 0) + 1;
  });

  return Object.entries(locCounts)
    .filter(([, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .map(([location, count]) => ({
      location,
      count,
      percentage: Math.round((count / receipts.length) * 100)
    }));
}

/**
 * Detects day-of-week patterns (e.g. Sunday morning coffee, Friday cinema)
 */
export function detectRecurringDays(receipts) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayStats = {};

  receipts.forEach(r => {
    if (!r.date) return;
    const dateObj = new Date(`${r.date}T12:00:00`);
    const dayName = daysOfWeek[dateObj.getDay()];

    if (!dayStats[dayName]) {
      dayStats[dayName] = { day: dayName, total: 0, categories: {} };
    }

    dayStats[dayName].total += 1;
    dayStats[dayName].categories[r.category] = (dayStats[dayName].categories[r.category] || 0) + 1;
  });

  return Object.values(dayStats).sort((a, b) => b.total - a.total);
}

/**
 * Detects activity spikes (days with high convergence of moments)
 */
export function detectActivitySpikes(receipts) {
  const dateCounts = {};
  receipts.forEach(r => {
    if (!r.date) return;
    dateCounts[r.date] = (dateCounts[r.date] || 0) + 1;
  });

  return Object.entries(dateCounts)
    .filter(([, count]) => count >= 4)
    .sort((a, b) => b[1] - a[1])
    .map(([date, count]) => {
      const dayReceipts = receipts.filter(r => r.date === date);
      const categories = [...new Set(dayReceipts.map(r => r.category))];
      return {
        date,
        count,
        categories,
        isSpike: count >= 5
      };
    });
}

/**
 * Detects category distribution and overall dominance
 */
export function detectCategoryDominance(receipts) {
  const counts = {};
  receipts.forEach(r => {
    counts[r.category] = (counts[r.category] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / receipts.length) * 100)
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Detects shifts in activity between temporal segments
 */
export function detectCategoryShifts(receipts) {
  // Split into March and April/May phases
  const marchReceipts = receipts.filter(r => r.date && r.date.startsWith('2026-03'));
  const aprilReceipts = receipts.filter(r => r.date && (r.date.startsWith('2026-04') || r.date.startsWith('2026-05')));

  const getTopCategory = (list) => {
    const counts = {};
    list.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  };

  const marchTop = getTopCategory(marchReceipts);
  const aprilTop = getTopCategory(aprilReceipts);

  return {
    phase1: { period: 'March 2026', topCategory: marchTop ? marchTop[0] : 'Music', count: marchReceipts.length },
    phase2: { period: 'April 2026', topCategory: aprilTop ? aprilTop[0] : 'Searches', count: aprilReceipts.length },
    insight: 'A behavioral shift from physical urban exploration in March towards research, culinary craft, and generative coding in April.'
  };
}

/**
 * Compiles all detected patterns for the overview and pattern dashboards
 */
export function analyzeAllPatterns(receipts) {
  return {
    repeatedLocations: detectRepeatedLocations(receipts),
    recurringDays: detectRecurringDays(receipts),
    activitySpikes: detectActivitySpikes(receipts),
    categoryDominance: detectCategoryDominance(receipts),
    categoryShifts: detectCategoryShifts(receipts),
    totalPatternsCount: 5
  };
}
