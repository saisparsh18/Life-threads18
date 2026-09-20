import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import OverviewPage from './pages/OverviewPage';
import ExplorePage from './pages/ExplorePage';
import ConnectionsPage from './pages/ConnectionsPage';
import ChaptersPage from './pages/ChaptersPage';
import StoryPage from './pages/StoryPage';
import ReceiptDetailModal from './components/ReceiptDetailModal';

import { mockReceipts } from './data/mockReceipts';
import { 
  buildConnectionGraph, 
  getConnectionsForReceipt, 
  getFlagshipChain 
} from './engine/connections';
import { generateChapters } from './engine/chapters';
import { generateFlagshipInsights, calculateOverviewMetrics } from './engine/insights';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReceiptId, setSelectedReceiptId] = useState('rcpt-001');
  const [selectedStoryChapterId, setSelectedStoryChapterId] = useState(null);
  const [exploreInitialSearch, setExploreInitialSearch] = useState('');
  const [exploreInitialCategory, setExploreInitialCategory] = useState('All');
  const [inspectingReceipt, setInspectingReceipt] = useState(null);

  // Compute graph, chapters, flagship chain, and metrics from dataset
  const receipts = mockReceipts;

  const graphData = useMemo(() => {
    return buildConnectionGraph(receipts);
  }, [receipts]);

  const chapters = useMemo(() => {
    return generateChapters(receipts);
  }, [receipts]);

  const flagshipInsights = useMemo(() => {
    return generateFlagshipInsights(receipts);
  }, [receipts]);

  const flagshipChain = useMemo(() => {
    return getFlagshipChain(receipts);
  }, [receipts]);

  const metrics = useMemo(() => {
    return calculateOverviewMetrics(receipts, graphData, chapters);
  }, [receipts, graphData, chapters]);

  // Connection counts dictionary for fast lookup
  const connectionCounts = useMemo(() => {
    const map = {};
    receipts.forEach(r => {
      const connData = getConnectionsForReceipt(r.id, receipts);
      map[r.id] = connData.connectedCount;
    });
    return map;
  }, [receipts]);

  // Sorted recent receipts for Overview section 4
  const recentReceipts = useMemo(() => {
    return [...receipts].sort((a, b) => {
      return (b.date || '').localeCompare(a.date || '') || (b.time || '').localeCompare(a.time || '');
    });
  }, [receipts]);

  // Selected receipt connection data for the drawer
  const selectedConnectionData = useMemo(() => {
    if (!selectedReceiptId) return null;
    return getConnectionsForReceipt(selectedReceiptId, receipts);
  }, [selectedReceiptId, receipts]);

  // Connection data for modal inspection
  const modalConnectionData = useMemo(() => {
    if (!inspectingReceipt) return null;
    return getConnectionsForReceipt(inspectingReceipt.id, receipts);
  }, [inspectingReceipt, receipts]);

  // Handler: When clicking "View Connections" on any receipt card
  const handleViewConnections = (receipt) => {
    setSelectedReceiptId(receipt.id);
    setActiveTab('connections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: When clicking "Explore" on an insight card
  const handleSelectInsight = (insight) => {
    if (!insight.exploreTarget) return;

    if (insight.exploreTarget.page === 'explore') {
      setExploreInitialSearch(insight.exploreTarget.filter?.search || '');
      setExploreInitialCategory(insight.exploreTarget.filter?.category || 'All');
      setActiveTab('explore');
    } else if (insight.exploreTarget.page === 'connections') {
      if (insight.exploreTarget.receiptId) {
        setSelectedReceiptId(insight.exploreTarget.receiptId);
      }
      setActiveTab('connections');
    } else if (insight.exploreTarget.page === 'chapters') {
      if (insight.exploreTarget.chapterId) {
        setSelectedStoryChapterId(insight.exploreTarget.chapterId);
      }
      setActiveTab('chapters');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: When clicking "Read Chapter" -> switches to Story mode with that specific chapter!
  const handleSelectChapter = (chapter) => {
    setSelectedStoryChapterId(chapter.id);
    setActiveTab('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Navigation tabs
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Exploring thread from Story page
  const handleExploreThread = (threadId) => {
    // If it's a chapter ID, find its first receipt, otherwise default to flagship rcpt-001
    const ch = chapters.find(c => c.id === threadId);
    const targetId = ch && ch.receipts[0] ? ch.receipts[0].id : 'rcpt-001';
    setSelectedReceiptId(targetId);
    setActiveTab('connections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Reset selected node
  const handleResetSelection = () => {
    setSelectedReceiptId(null);
  };

  return (
    <div className="app-shell">
      {/* Top Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={handleSelectTab} 
      />

      {/* Main Routed Page Content */}
      <main className="app-main-viewport" id={`panel-${activeTab}`} role="tabpanel">
        {activeTab === 'overview' && (
          <OverviewPage
            metrics={metrics}
            flagshipInsights={flagshipInsights}
            flagshipChain={flagshipChain}
            chapters={chapters}
            recentReceipts={recentReceipts}
            connectionCounts={connectionCounts}
            onNavigateTab={handleSelectTab}
            onSelectInsight={handleSelectInsight}
            onSelectChapter={handleSelectChapter}
            onViewConnections={handleViewConnections}
            onSelectReceipt={(r) => setInspectingReceipt(r)}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            receipts={receipts}
            connectionsEngine={{ getConnectionsForReceipt }}
            onViewConnections={handleViewConnections}
            initialSearch={exploreInitialSearch}
            initialCategory={exploreInitialCategory}
          />
        )}

        {activeTab === 'connections' && (
          <ConnectionsPage
            receipts={receipts}
            graphData={graphData}
            selectedReceiptId={selectedReceiptId}
            selectedConnectionData={selectedConnectionData}
            onSelectReceipt={(r) => setSelectedReceiptId(r.id)}
            onResetSelection={handleResetSelection}
            onNavigateToStory={(r) => {
              const foundCh = chapters.find(c => c.receipts.some(item => item.id === r?.id));
              if (foundCh) {
                setSelectedStoryChapterId(foundCh.id);
              }
              setActiveTab('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToExplore={(r) => {
              setExploreInitialSearch(r.title);
              setActiveTab('explore');
            }}
          />
        )}

        {activeTab === 'chapters' && (
          <ChaptersPage
            chapters={chapters}
            onReadChapterInStory={handleSelectChapter}
            onViewConnections={handleViewConnections}
            onExploreThread={handleExploreThread}
          />
        )}

        {activeTab === 'story' && (
          <StoryPage
            flagshipChain={flagshipChain}
            chapters={chapters}
            initialChapterId={selectedStoryChapterId}
            onExploreThread={handleExploreThread}
            onExploreConnections={(story) => {
              handleExploreThread(story?.id);
            }}
            onBackToChapters={() => {
              setActiveTab('chapters');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToExplore={(title) => {
              setExploreInitialSearch(title);
              setActiveTab('explore');
            }}
          />
        )}
      </main>

      {/* Global Receipt Detail Modal */}
      {inspectingReceipt && (
        <ReceiptDetailModal
          receipt={inspectingReceipt}
          connectionData={modalConnectionData}
          connectionCount={connectionCounts[inspectingReceipt.id] || 0}
          onClose={() => setInspectingReceipt(null)}
          onViewConnections={handleViewConnections}
          onSelectReceipt={(r) => setInspectingReceipt(r)}
          onFilterCategory={(cat) => {
            setExploreInitialCategory(cat);
            setActiveTab('explore');
          }}
        />
      )}

      {/* Editorial Footer */}
      <footer className="editorial-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="brand-logo-text">LIFE<span className="brand-slash">//</span>THREADS</span>
            <p className="footer-tagline">
              "Your life isn't a timeline. It's a collection of connections."
            </p>
          </div>

          <div className="footer-hackathon-info">
            <span className="f-pill">Frontend-Only Architecture</span>
            <span className="f-pill">Zero Server / Zero DB</span>
            <span className="f-pill">6-Hour Sprint Submission</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
