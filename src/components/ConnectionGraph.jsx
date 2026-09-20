import React, { useState, useMemo } from 'react';
import { 
  RotateCcw, 
  Filter, 
  Info,
  LayoutGrid, 
  Network, 
  ChevronRight 
} from 'lucide-react';
import { CATEGORY_CONFIG } from '../data/mockReceipts';
import { filterReceiptsByCluster, calculateGraphLayout } from '../engine/connections';

// Curated cluster presets for instant exploration
const CLUSTERS = [
  { id: 'all', label: 'All Clusters (Full Web)' },
  { id: 'midnight', label: 'March 18 Midnight Chain' },
  { id: 'sunday', label: 'Sunday Coffee Rituals' },
  { id: 'cinema', label: 'Friday Cinema & Walks' },
  { id: 'sourdough', label: 'Sourdough Craft' },
  { id: 'coastal', label: 'Pacific Coastline' },
  { id: 'coding', label: 'Generative Coding' },
];

export default function ConnectionGraph({ 
  receipts = [], 
  graphData, 
  selectedReceiptId, 
  onSelectReceipt,
  onResetSelection 
}) {
  const [activeCluster, setActiveCluster] = useState('all');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'matrix'

  // Filter receipts based on selected cluster via engine utility
  const filteredReceipts = useMemo(() => {
    return filterReceiptsByCluster(receipts, activeCluster);
  }, [activeCluster, receipts]);

  // Map nodes to calculated 2D positions for SVG layout via engine utility
  const { nodePositions, edgesToRender, connectedIdSet } = useMemo(() => {
    return calculateGraphLayout(filteredReceipts, activeCluster, selectedReceiptId, graphData);
  }, [filteredReceipts, activeCluster, selectedReceiptId, graphData]);

  const activeHoveredReceipt = hoveredNodeId ? receipts.find(r => r.id === hoveredNodeId) : null;

  return (
    <div className="connection-graph-container">
      {/* Cluster / Filter Toolbar */}
      <div className="graph-toolbar">
        <div className="cluster-selector-group">
          <span className="cluster-label">
            <Filter size={14} /> Cluster View:
          </span>
          <div className="cluster-buttons">
            {CLUSTERS.map(c => (
              <button
                type="button"
                key={c.id}
                className={`cluster-pill-btn ${activeCluster === c.id ? 'active' : ''}`}
                aria-pressed={activeCluster === c.id}
                onClick={() => {
                  setActiveCluster(c.id);
                  if (onResetSelection) onResetSelection();
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="graph-view-toggles">
          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${viewMode === 'graph' ? 'active' : ''}`}
              onClick={() => setViewMode('graph')}
              title="Graph network visualization"
              aria-label="Graph network view"
            >
              <Network size={14} />
              <span className="mode-btn-text">Network</span>
            </button>
            <button
              className={`mode-btn ${viewMode === 'matrix' ? 'active' : ''}`}
              onClick={() => setViewMode('matrix')}
              title="List & matrix card view"
              aria-label="List card view"
            >
              <LayoutGrid size={14} />
              <span className="mode-btn-text">List Cards</span>
            </button>
          </div>

          {selectedReceiptId && (
            <button 
              type="button"
              className="reset-selection-btn"
              onClick={onResetSelection}
              title="Clear active node selection"
              aria-label="Reset focus to all nodes"
            >
              <RotateCcw size={13} />
              <span>Reset Focus</span>
            </button>
          )}
        </div>
      </div>

      {/* Flagship Notice Banner for March 18 Chain */}
      {activeCluster === 'midnight' && (
        <div className="chain-stepper-banner">
          <span className="chain-step-tag">FLAGSHIP CHAIN</span>
          <span className="chain-step-flow">
            Music <span>&rarr;</span> Place <span>&rarr;</span> Photo <span>&rarr;</span> Purchase <span>&rarr;</span> Event
          </span>
          <span className="chain-step-desc">
            All 7 moments occurred on March 18 at District 4 Studio within 210 minutes.
          </span>
        </div>
      )}

      {/* VIEW MODE 1: Interactive SVG Canvas */}
      {viewMode === 'graph' ? (
        <div className="graph-svg-wrapper">
          <svg 
            viewBox="0 0 960 560" 
            className="relationship-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              <filter id="glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-selected" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Grid Background */}
            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Render Connection Edges */}
            <g className="edges-group">
              {edgesToRender.map(edge => {
                const p1 = nodePositions[edge.source];
                const p2 = nodePositions[edge.target];
                if (!p1 || !p2) return null;

                const isConnectedToSelected = selectedReceiptId && (edge.source === selectedReceiptId || edge.target === selectedReceiptId);
                const isDimmed = selectedReceiptId && !isConnectedToSelected;

                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2 - 15;
                const pathD = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

                return (
                  <path
                    key={edge.id}
                    d={pathD}
                    className={`graph-edge ${isConnectedToSelected ? 'edge-active' : ''} ${isDimmed ? 'edge-dimmed' : ''}`}
                    stroke={isConnectedToSelected ? '#00f2fe' : 'rgba(255, 255, 255, 0.12)'}
                    strokeWidth={isConnectedToSelected ? 2.5 : 1}
                    fill="none"
                    filter={isConnectedToSelected ? 'url(#glow-cyan)' : undefined}
                  />
                );
              })}
            </g>

            {/* Render Nodes */}
            <g className="nodes-group">
              {Object.entries(nodePositions).map(([id, node]) => {
                const r = node.receipt;
                const config = CATEGORY_CONFIG[r.category] || { color: '#38bdf8' };
                const isSelected = selectedReceiptId === id;
                const isConnected = selectedReceiptId && connectedIdSet.has(id);
                const isDimmed = selectedReceiptId && !isConnected;
                const isHovered = hoveredNodeId === id;

                const radius = isSelected ? 18 : (isHovered ? 15 : 11);

                return (
                  <g 
                    key={id}
                    className={`graph-node-group ${isSelected ? 'node-selected' : ''} ${isDimmed ? 'node-dimmed' : ''}`}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => onSelectReceipt(r)}
                    onMouseEnter={() => setHoveredNodeId(id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select node ${r.id}: ${r.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectReceipt(r);
                      }
                    }}
                  >
                    {/* Generous invisible touch/click target */}
                    <circle 
                      r="28" 
                      fill="transparent" 
                      style={{ cursor: 'pointer' }}
                    />

                    {/* Outer selection ring / halo */}
                    {(isSelected || isConnected) && (
                      <circle 
                        r={radius + 8}
                        fill="none"
                        stroke={config.color}
                        strokeWidth="1.5"
                        strokeDasharray={isSelected ? 'none' : '4 3'}
                        opacity={isSelected ? 0.9 : 0.6}
                        filter="url(#glow-selected)"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      r={radius}
                      fill={isSelected ? config.color : '#0f172a'}
                      stroke={config.color}
                      strokeWidth={isSelected ? 3 : 2}
                      filter={isSelected || isHovered ? 'url(#glow-cyan)' : undefined}
                    />

                    {/* Node Inner Dot */}
                    <circle
                      r={isSelected ? 4 : 3}
                      fill={isSelected ? '#090b10' : config.color}
                    />

                    {/* Node Label */}
                    {(isSelected || isHovered || activeCluster === 'midnight') && (
                      <text
                        y={radius + 16}
                        textAnchor="middle"
                        className="node-svg-label"
                        fill="#f8fafc"
                        fontSize="10"
                        fontWeight={isSelected ? '600' : '400'}
                        letterSpacing="0.02em"
                      >
                        {r.title.length > 24 ? `${r.title.slice(0, 24)}...` : r.title}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Floating Tooltip */}
          {activeHoveredReceipt && !selectedReceiptId && (
            <div 
              className="graph-hover-tooltip"
              style={{
                left: `${(nodePositions[activeHoveredReceipt.id]?.x / 960) * 100}%`,
                top: `${(nodePositions[activeHoveredReceipt.id]?.y / 560) * 100}%`
              }}
            >
              <div className="tooltip-cat">{activeHoveredReceipt.category}</div>
              <div className="tooltip-title">{activeHoveredReceipt.title}</div>
              <div className="tooltip-meta">{activeHoveredReceipt.date} • {activeHoveredReceipt.location || 'Local'}</div>
              <div className="tooltip-cta">Click node to inspect connections</div>
            </div>
          )}
        </div>
      ) : (
        /* VIEW MODE 2: Mobile / List Matrix View */
        <div className="graph-matrix-view">
          <div className="matrix-notice">
            <Info size={14} />
            <span>Select any node below to inspect its connected cluster:</span>
          </div>
          <div className="matrix-cards-grid">
            {filteredReceipts.map(r => {
              const config = CATEGORY_CONFIG[r.category] || {};
              const isSelected = selectedReceiptId === r.id;
              const isConnected = selectedReceiptId && connectedIdSet.has(r.id);
              return (
                <div 
                  key={r.id}
                  className={`matrix-node-card ${isSelected ? 'selected' : ''} ${isConnected ? 'connected' : ''}`}
                  onClick={() => onSelectReceipt(r)}
                  style={{ '--node-color': config.color }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select node ${r.id}: ${r.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectReceipt(r);
                    }
                  }}
                >
                  <div className="matrix-card-top">
                    <span className="matrix-cat-pill" style={{ color: config.color }}>
                      {r.category}
                    </span>
                    <span className="matrix-date">{r.date}</span>
                  </div>
                  <h4 className="matrix-title">{r.title}</h4>
                  <div className="matrix-card-foot">
                    <span className="matrix-loc">{r.location || 'Local'}</span>
                    <span className="matrix-focus-cta">
                      {isSelected ? 'Focused' : 'Inspect'} <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend & Instructions */}
      <div className="graph-bottom-meta">
        <div className="graph-legend">
          <span className="legend-hint">
            <Info size={13} /> Click any node to highlight connections and inspect the underlying narrative signals.
          </span>
        </div>

        <div className="graph-category-chips">
          {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
            <span key={cat} className="legend-chip">
              <span className="legend-dot" style={{ backgroundColor: cfg.color }}></span>
              <span>{cat}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
