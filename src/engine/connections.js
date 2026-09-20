// LIFE//THREADS - Connection Engine
// Discovers meaningful relationships between raw receipts based on:
// - Temporal proximity (same date, nearby timestamps)
// - Spatial convergence (identical or adjacent locations)
// - Contextual & semantic affinity (shared keywords, cross-category threads)

export function parseTimestamp(dateStr, timeStr) {
  if (!dateStr) return null;
  const time = timeStr || '12:00';
  return new Date(`${dateStr}T${time}:00`).getTime();
}

/**
 * Calculates connection strength & explainability between two receipts.
 * Returns human-readable standardized signal labels:
 * "Same date", "Same location", "Within 30 minutes", "Shared keyword", "Related categories"
 */
export function calculateReceiptAffinity(r1, r2) {
  if (r1.id === r2.id) return null;

  const signals = [];
  const reasons = [];
  let score = 0;

  // 1. Same Day
  const isSameDate = r1.date === r2.date;
  if (isSameDate) {
    score += 40;
    signals.push('Same day');
    reasons.push(`Recorded on the same day (${r1.date})`);

    // 2. Temporal Proximity (if both have time on the same date)
    if (r1.time && r2.time) {
      const t1 = parseTimestamp(r1.date, r1.time);
      const t2 = parseTimestamp(r2.date, r2.time);
      const diffMinutes = Math.abs(t1 - t2) / (1000 * 60);

      if (diffMinutes <= 45) {
        score += 40;
        signals.push('Within 45 minutes');
        reasons.push(`Occurred within ${Math.round(diffMinutes)} minutes (${r1.time} & ${r2.time})`);
      } else if (diffMinutes <= 90) {
        score += 30;
        signals.push('Within 1 hour');
        reasons.push(`Occurred within ${Math.round(diffMinutes)} minutes of each other`);
      } else if (diffMinutes <= 180) {
        score += 20;
        signals.push('Within 3 hours');
        reasons.push(`Occurred within ${Math.round(diffMinutes / 60)} hours on the same evening/morning`);
      }
    }
  }

  // 3. Same Location
  const hasSameLocation = r1.location && r2.location && (r1.location.toLowerCase() === r2.location.toLowerCase());
  if (hasSameLocation) {
    score += 35;
    signals.push('Same location');
    reasons.push(`Both anchored at "${r1.location}"`);
  }

  // 4. Shared Keywords / Tags
  const tags1 = r1.tags || [];
  const tags2 = r2.tags || [];
  const sharedTags = tags1.filter(t => tags2.includes(t));

  if (sharedTags.length > 0) {
    score += Math.min(25, sharedTags.length * 8);
    signals.push('Shared keyword');
    reasons.push(`Shared thematic keywords: #${sharedTags.join(', #')}`);
  }

  // 5. Related Categories (Cross-Category Narrative Affinity)
  // e.g. Music + Place, Place + Photo, Photo + Purchase, Purchase + Event, Search + Purchase
  const crossCategoryPairs = [
    ['Music', 'Places'],
    ['Places', 'Photos'],
    ['Photos', 'Purchases'],
    ['Purchases', 'Events'],
    ['Searches', 'Purchases'],
    ['Places', 'Music'],
    ['Events', 'Messages'],
    ['Places', 'Personal Notes'],
    ['Movies & Entertainment', 'Places'],
    ['Movies & Entertainment', 'Photos']
  ];

  const isCrossCategoryPair = crossCategoryPairs.some(
    ([c1, c2]) => (r1.category === c1 && r2.category === c2) || (r1.category === c2 && r2.category === c1)
  );

  if (isSameDate && isCrossCategoryPair) {
    score += 15;
    signals.push('Related categories');
    reasons.push(`Related category pair: ${r1.category} ↔ ${r2.category}`);
  }

  // Return connection if score meets threshold
  if (score >= 35) {
    return {
      targetId: r2.id,
      receipt: r2,
      score,
      signals,
      primarySignal: signals[0] || 'Contextual affinity',
      reasons,
      signalsCount: signals.length,
      primaryReason: reasons[0] || 'Contextual affinity'
    };
  }

  return null;
}

/**
 * Returns all connections for a specific receipt
 */
export function getConnectionsForReceipt(receiptId, allReceipts) {
  const target = allReceipts.find(r => r.id === receiptId);
  if (!target) return { connectedReceipts: [], signalsCount: 0, explanation: '' };

  const connections = [];
  allReceipts.forEach(other => {
    if (other.id === receiptId) return;
    const affinity = calculateReceiptAffinity(target, other);
    if (affinity) {
      connections.push(affinity);
    }
  });

  connections.sort((a, b) => b.score - a.score);

  // Generate overarching explanation
  let explanation = '';
  if (connections.length > 0) {
    const topSignals = [...new Set(connections.flatMap(c => c.signals))].slice(0, 3);
    const topReason = connections[0].primaryReason;
    explanation = `This moment connects with ${connections.length} other digital records through ${topSignals.join(', ').toLowerCase()}. Primary bond: ${topReason.toLowerCase()}.`;
  } else {
    explanation = 'This moment stands as an isolated observation with no direct temporal or spatial links.';
  }

  return {
    receipt: target,
    connections,
    connectedCount: connections.length,
    signalsCount: connections.reduce((acc, curr) => acc + curr.signalsCount, 0),
    explanation
  };
}

/**
 * Builds the graph representation (nodes & edges) for the interactive visualizer
 */
export function buildConnectionGraph(receipts) {
  const nodes = receipts.map((r, index) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    date: r.date,
    time: r.time,
    location: r.location,
    tags: r.tags,
    index
  }));

  const edges = [];
  const edgeSet = new Set();

  for (let i = 0; i < receipts.length; i++) {
    for (let j = i + 1; j < receipts.length; j++) {
      const r1 = receipts[i];
      const r2 = receipts[j];
      const affinity = calculateReceiptAffinity(r1, r2);

      if (affinity && affinity.score >= 45) {
        const edgeKey = `${r1.id}--${r2.id}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({
            id: edgeKey,
            source: r1.id,
            target: r2.id,
            score: affinity.score,
            signals: affinity.signals,
            primarySignal: affinity.primarySignal,
            primaryReason: affinity.primaryReason,
            reasons: affinity.reasons
          });
        }
      }
    }
  }

  return { nodes, edges };
}

/**
 * Provides the flagship example chain highlighted on the home page and in story mode
 */
export function getFlagshipChain(receipts) {
  const chainIds = ['rcpt-001', 'rcpt-002', 'rcpt-003', 'rcpt-004', 'rcpt-005'];
  const chainReceipts = chainIds
    .map(id => receipts.find(r => r.id === id))
    .filter(Boolean);

  return {
    title: 'The Midnight Convergence',
    date: '2026-03-18',
    location: 'District 4 Studio',
    stepNarrative: [
      { step: 1, text: 'A song played late in the evening.', receipt: chainReceipts[0] },
      { step: 2, text: 'A new location appeared.', receipt: chainReceipts[1] },
      { step: 3, text: 'A photograph was captured.', receipt: chainReceipts[2] },
      { step: 4, text: 'A purchase followed.', receipt: chainReceipts[3] },
      { step: 5, text: 'An event appeared.', receipt: chainReceipts[4] },
    ],
    summary: '5 moments. 1 connected thread.',
    explanation: 'These records occurred on March 18 between 20:15 and 22:00 within District 4 Studio, forming a continuous creative focus session.',
    receipts: chainReceipts
  };
}
