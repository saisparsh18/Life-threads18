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
 * Calculates a map of receipt ID -> connectedCount for fast lookup across UI components
 */
export function getConnectionCountsMap(receipts) {
  const map = {};
  receipts.forEach(r => {
    const connData = getConnectionsForReceipt(r.id, receipts);
    map[r.id] = connData.connectedCount;
  });
  return map;
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

/**
 * Filters and sorts receipts by search query, category, date range, and sort order
 */
export function filterAndSortReceipts(receipts, {
  category = 'All',
  dateFilter = 'ALL',
  query = '',
  sortBy = 'DATE_DESC',
  connectionCounts = {}
} = {}) {
  const cleanQuery = (query || '').toLowerCase().trim();

  return receipts.filter(r => {
    // 1. Category Filter
    if (category !== 'All' && r.category !== category) {
      return false;
    }

    // 2. Date Filter
    if (dateFilter === 'MARCH_2026') {
      if (!r.date || !r.date.startsWith('2026-03')) return false;
    } else if (dateFilter === 'APRIL_2026') {
      if (!r.date || !r.date.startsWith('2026-04')) return false;
    } else if (dateFilter === 'EARLY_MARCH') {
      if (!r.date || r.date < '2026-03-01' || r.date > '2026-03-15') return false;
    } else if (dateFilter === 'LATE_MARCH') {
      if (!r.date || r.date < '2026-03-16' || r.date > '2026-03-31') return false;
    } else if (dateFilter === 'EARLY_APRIL') {
      if (!r.date || r.date < '2026-04-01' || r.date > '2026-04-15') return false;
    } else if (dateFilter === 'LATE_APRIL') {
      if (!r.date || r.date < '2026-04-16' || r.date > '2026-04-30') return false;
    }

    // 3. Multi-field Search
    if (cleanQuery) {
      const titleMatch = (r.title || '').toLowerCase().includes(cleanQuery);
      const descMatch = (r.notes || '').toLowerCase().includes(cleanQuery) || 
                        (r.description || '').toLowerCase().includes(cleanQuery);
      const locMatch = (r.location || '').toLowerCase().includes(cleanQuery);
      const catMatch = (r.category || '').toLowerCase().includes(cleanQuery);
      const tagsMatch = (r.tags || []).some(t => t.toLowerCase().includes(cleanQuery));
      const metadataValues = Object.entries(r.metadata || {});
      const metaMatch = metadataValues.some(([key, val]) => 
        key.toLowerCase().includes(cleanQuery) || String(val).toLowerCase().includes(cleanQuery)
      );
      const personMatch = ['artist', 'person', 'sender', 'recipient', 'speaker', 'author', 'with', 'host', 'director', 'curator'].some(field => 
        r.metadata && r.metadata[field] && String(r.metadata[field]).toLowerCase().includes(cleanQuery)
      );

      if (!titleMatch && !descMatch && !locMatch && !catMatch && !tagsMatch && !metaMatch && !personMatch) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'DATE_DESC') return b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || '');
    if (sortBy === 'DATE_ASC') return a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || '');
    if (sortBy === 'CONNECTIONS_DESC') {
      return (connectionCounts[b.id] || 0) - (connectionCounts[a.id] || 0);
    }
    if (sortBy === 'TITLE_ASC') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
}

/**
 * Filters receipts for the interactive connection graph cluster presets
 */
export function filterReceiptsByCluster(receipts, clusterId) {
  if (!clusterId || clusterId === 'all') return receipts.slice(0, 48);
  if (clusterId === 'midnight') return receipts.filter(r => r.date === '2026-03-18');
  if (clusterId === 'sunday') return receipts.filter(r => r.location === 'Komorebi Coffee Roasters' || (r.tags && r.tags.includes('coffee')));
  if (clusterId === 'cinema') return receipts.filter(r => r.date === '2026-03-27' || (r.tags && r.tags.includes('cinema')));
  if (clusterId === 'sourdough') return receipts.filter(r => r.tags && r.tags.includes('sourdough'));
  if (clusterId === 'coastal') return receipts.filter(r => r.date >= '2026-04-17' && r.date <= '2026-04-19');
  if (clusterId === 'coding') return receipts.filter(r => r.tags && (r.tags.includes('coding') || r.tags.includes('hackathon')));
  return receipts;
}

/**
 * Calculates 2D node positions and filtered edges for the interactive SVG connection graph
 */
export function calculateGraphLayout(filteredReceipts, activeCluster, selectedReceiptId, graphData) {
  const width = 960;
  const height = 560;
  const padding = 60;

  const count = filteredReceipts.length;
  const posMap = {};

  if (activeCluster === 'midnight') {
    const order = ['rcpt-001', 'rcpt-002', 'rcpt-003', 'rcpt-004', 'rcpt-005', 'rcpt-006', 'rcpt-007'];
    const sorted = [...filteredReceipts].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

    sorted.forEach((r, idx) => {
      const x = padding + (idx / Math.max(1, sorted.length - 1)) * (width - padding * 2);
      const y = height / 2 + Math.sin(idx * 1.1) * 80;
      posMap[r.id] = { x, y, receipt: r };
    });
  } else {
    const categoryOrder = [
      'Music', 'Movies & Entertainment', 'Places', 'Purchases', 
      'Photos', 'Messages', 'Searches', 'Events', 'Personal Notes'
    ];
    filteredReceipts.forEach((r, idx) => {
      const angle = (idx / count) * 2 * Math.PI;
      const catIdx = categoryOrder.indexOf(r.category);
      const rFactor = 160 + (catIdx % 3) * 60 + ((idx * 37) % 50);
      
      const centerX = width / 2;
      const centerY = height / 2;

      const x = Math.max(padding, Math.min(width - padding, centerX + Math.cos(angle) * rFactor));
      const y = Math.max(padding, Math.min(height - padding, centerY + Math.sin(angle) * (rFactor * 0.75)));
      
      posMap[r.id] = { x, y, receipt: r };
    });
  }

  const connSet = new Set();
  if (selectedReceiptId) {
    connSet.add(selectedReceiptId);
    graphData.edges.forEach(e => {
      if (e.source === selectedReceiptId) connSet.add(e.target);
      if (e.target === selectedReceiptId) connSet.add(e.source);
    });
  }

  const activeReceiptIds = new Set(filteredReceipts.map(r => r.id));
  const edges = graphData.edges.filter(e => 
    activeReceiptIds.has(e.source) && activeReceiptIds.has(e.target)
  );

  return { nodePositions: posMap, edgesToRender: edges, connectedIdSet: connSet };
}
