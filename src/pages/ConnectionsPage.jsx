import React from 'react';
import { GitMerge } from 'lucide-react';
import ConnectionGraph from '../components/ConnectionGraph';
import ConnectionDrawer from '../components/ConnectionDrawer';

export default function ConnectionsPage({ 
  receipts = [], 
  graphData, 
  selectedReceiptId, 
  selectedConnectionData, 
  onSelectReceipt, 
  onResetSelection,
  onNavigateToStory,
  onNavigateToExplore 
}) {
  return (
    <div className="connections-page">
      {/* Header with explicit Connections label */}
      <div className="connections-page-header">
        <div className="header-meta">
          <span className="page-kicker">RELATIONAL ARCHITECTURE</span>
          <h1 className="page-title">Connections Web & Relationships</h1>
          <p className="page-subtitle">
            Interactive visual network of receipts. Every line represents a detected relationship across time, physical coordinate, or creative focus.
          </p>
        </div>

        <div className="graph-stats-summary">
          <div className="g-stat-pill">
            <span className="g-stat-val">{graphData.nodes.length}</span>
            <span className="g-stat-lbl">Plotted Nodes</span>
          </div>
          <div className="g-stat-pill">
            <span className="g-stat-val accent-cyan">{graphData.edges.length}</span>
            <span className="g-stat-lbl">Connections</span>
          </div>
        </div>
      </div>

      {/* Main Graph Visualization Stage */}
      <div className="graph-interactive-stage">
        <ConnectionGraph
          receipts={receipts}
          graphData={graphData}
          selectedReceiptId={selectedReceiptId}
          onSelectReceipt={onSelectReceipt}
          onResetSelection={onResetSelection}
        />

        {/* Selected Receipt Detail Drawer / Panel */}
        {selectedConnectionData ? (
          <ConnectionDrawer
            connectionData={selectedConnectionData}
            onClose={onResetSelection}
            onSelectReceipt={onSelectReceipt}
            onNavigateToStory={onNavigateToStory}
            onNavigateToExplore={onNavigateToExplore}
          />
        ) : (
          <aside className="connection-prompt-sidebar" aria-label="Connection Explanation Panel">
            <div className="prompt-inner">
              <GitMerge size={28} className="prompt-icon" />
              <h3>Connections &amp; Signals</h3>
              <p>
                Click any receipt node in the network to inspect its connected moments, connection explanation, and underlying signals.
              </p>
              <div className="sample-signals-preview">
                <span className="preview-label">Detected Signal Types:</span>
                <div className="preview-tags">
                  <span className="signal-chip">Same location</span>
                  <span className="signal-chip">Same day</span>
                  <span className="signal-chip">Within 45 minutes</span>
                  <span className="signal-chip">Shared keyword</span>
                  <span className="signal-chip">Related categories</span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
