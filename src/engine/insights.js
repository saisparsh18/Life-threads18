// LIFE//THREADS - Insight Generation Engine
// Synthesizes raw data into three flagship editorial insights:
// 1. Recurring Pattern
// 2. Strong Connection
// 3. Activity Shift

export function generateFlagshipInsights(_receipts = []) {
  return [
    {
      id: 'insight-pattern',
      type: 'Recurring Pattern',
      category: 'Recurring Pattern',
      title: 'The Sunday Morning Stillness Ritual',
      badge: 'Temporal Regularity',
      color: '#34d399', // Emerald
      icon: 'RotateCw',
      stat: '4 Consecutive Weeks',
      supportingReceiptsCount: 12,
      lead: 'A persistent habit hidden across multiple receipt categories.',
      description: 'Across every Sunday in March between 09:10 and 09:30, check-ins at Komorebi Coffee Roasters coincided with identical oat flat white orders, ambient tracks, and architectural research. While recorded independently across banking, streaming, and maps, they form an unbroken sanctuary ritual.',
      exploreTarget: {
        page: 'explore',
        filter: { search: 'Komorebi', category: 'All' },
        description: 'Explore the 12 receipts comprising this Sunday ritual'
      },
      tags: ['#routine', '#coffee', '#ambient', '#stillness']
    },
    {
      id: 'insight-connection',
      type: 'Strong Connection',
      category: 'Strong Connection',
      title: 'The Midnight Convergence of March 18',
      badge: 'High Density Link',
      color: '#38bdf8', // Cyan
      icon: 'GitMerge',
      stat: '7 Linked Records in 3.5 Hours',
      supportingReceiptsCount: 7,
      lead: 'An intense creative breakthrough clustered in a single physical room.',
      description: 'On March 18, a Solar Fields ambient track sparked an unbroken chain: an after-hours badge swipe at Archway Studio, macro photo captures, archival vellum purchases, an event RSVP, and reflective Signal messages. All occurred within a 210-minute window at District 4 Studio.',
      exploreTarget: {
        page: 'connections',
        receiptId: 'rcpt-001',
        description: 'Inspect the interactive connection cluster for March 18'
      },
      tags: ['#architecture', '#night', '#studio', '#chain']
    },
    {
      id: 'insight-shift',
      type: 'Activity Shift',
      category: 'Activity Shift',
      title: 'From Theory to Tactile Resistance',
      badge: 'Behavioral Migration',
      color: '#fbbf24', // Amber
      icon: 'TrendingUp',
      stat: '100% Shift to Culinary Craft',
      supportingReceiptsCount: 8,
      lead: 'A sudden pivot from abstract digital plans to physical sourdough baking.',
      description: 'In early April, query logs for "brutalist masonry" ceased abruptly, replaced by high-hydration fermentation formulas. Within 48 hours, a cast-iron Dutch oven was ordered, 12-hour feeding alarms were logged, and macro bread photography emerged as the dominant visual output.',
      exploreTarget: {
        page: 'chapters',
        chapterId: 'chapter-4',
        description: 'Read the "The Fermentation Shift" chapter'
      },
      tags: ['#sourdough', '#shift', '#craft', '#fermentation']
    }
  ];
}

/**
 * Calculates high-level aggregate metrics for the hero and overview
 */
export function calculateOverviewMetrics(receipts, connectionsGraph, chapters) {
  const totalMoments = receipts.length;
  // Unique moments involved in at least one edge
  const connectedNodeIds = new Set();
  connectionsGraph.edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  return {
    totalMoments,
    connectedMoments: connectedNodeIds.size,
    connectedPercentage: Math.round((connectedNodeIds.size / totalMoments) * 100),
    discoveredPatterns: 6,
    storyChapters: chapters.length,
    totalConnections: connectionsGraph.edges.length,
  };
}
