import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  GitMerge, 
  BookOpen, 
  MapPin, 
  ChevronRight, 
  Receipt 
} from 'lucide-react';
import InsightCard from '../components/InsightCard';
import ReceiptCard from '../components/ReceiptCard';
import { CATEGORY_CONFIG } from '../data/mockReceipts';

export default function OverviewPage({
  metrics,
  flagshipInsights = [],
  flagshipChain,
  chapters = [],
  recentReceipts = [],
  connectionCounts = {},
  onNavigateTab,
  onSelectInsight,
  onSelectChapter,
  onViewConnections,
  onSelectReceipt
}) {
  return (
    <div className="overview-page">
      {/* Hero Section - Preserved Exactly As Requested */}
      <header className="overview-hero">
        <div className="hero-atmosphere-glow"></div>

        <motion.div 
          className="hero-pill-badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill-dot"></span>
          <span>Digital Archaeology // Pure Frontend Experience</span>
        </motion.div>

        <motion.h1 
          className="hero-main-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          LIFE<span className="title-accent">//</span>THREADS
        </motion.h1>

        <motion.p 
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          "Your life isn't a timeline.<br />
          <span className="hero-tagline-highlight">It's a collection of connections."</span>
        </motion.p>

        <motion.p 
          className="hero-supporting-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          Hundreds of tiny digital moments can reveal patterns, relationships, and stories hiding in plain sight.
        </motion.p>

        {/* Hero CTAs - Verbatim "Discover Your Story" & "Explore Receipts" */}
        <motion.div 
          className="hero-actions-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
        >
          <button 
            type="button"
            className="hero-btn primary"
            onClick={() => onNavigateTab('story')}
            aria-label="Discover Your Story"
          >
            <Sparkles size={17} />
            <span>Discover Your Story</span>
          </button>

          <button 
            type="button"
            className="hero-btn secondary"
            onClick={() => onNavigateTab('explore')}
            aria-label="Explore Receipts"
          >
            <Search size={17} />
            <span>Explore Receipts</span>
          </button>
        </motion.div>

        {/* Clearly Visible Key Statistics Strip */}
        <motion.div 
          className="stats-strip-container"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="stat-box">
            <span className="stat-number">{metrics.totalMoments}</span>
            <span className="stat-title">Total Moments</span>
            <span className="stat-sub">9 Digital Categories</span>
          </div>

          <div className="stat-box">
            <span className="stat-number accent-cyan">{metrics.connectedMoments}</span>
            <span className="stat-title">Connections</span>
            <span className="stat-sub">{metrics.connectedPercentage}% linked to other moments</span>
          </div>

          <div className="stat-box">
            <span className="stat-number accent-purple">{metrics.discoveredPatterns}</span>
            <span className="stat-title">Patterns</span>
            <span className="stat-sub">Discovered Patterns Detected</span>
          </div>

          <div className="stat-box">
            <span className="stat-number accent-emerald">{metrics.storyChapters}</span>
            <span className="stat-title">Chapters</span>
            <span className="stat-sub">Story Chapters Generated</span>
          </div>
        </motion.div>
      </header>

      {/* 1. "Hidden in Plain Sight" */}
      <section className="overview-section" aria-labelledby="hidden-insights-title">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <Sparkles size={14} className="eyebrow-icon" />
            <span>SYNTHESIZED INTELLIGENCE</span>
          </div>
          <h2 id="hidden-insights-title" className="section-heading">Hidden in Plain Sight</h2>
          <p className="section-subtext">
            Three real insight cards generated from the local dataset cross-referencing timestamps, receipts, searches, and locations.
          </p>
        </div>

        <div className="insights-three-grid">
          {flagshipInsights.map((insight, idx) => (
            <InsightCard 
              key={insight.id} 
              insight={insight} 
              index={idx}
              onExplore={onSelectInsight}
            />
          ))}
        </div>
      </section>

      {/* 2. "Connected Moments" */}
      <section className="overview-section" aria-labelledby="connected-moments-title">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <GitMerge size={14} className="eyebrow-icon" />
            <span>RELATIONAL CHAINS</span>
          </div>
          <h2 id="connected-moments-title" className="section-heading">Connected Moments</h2>
          <p className="section-subtext">
            Visual connection chain using actual receipt IDs: Music → Place → Photo → Purchase → Event. Click any node to inspect details or launch the graph.
          </p>
        </div>

        {/* Visual Chain Showcase */}
        <div className="chain-showcase-panel">
          <div className="chain-header">
            <div className="chain-meta-left">
              <span className="chain-badge">MARCH 18 SPECIMEN CHAIN</span>
              <h3 className="chain-title">Music → Place → Photo → Purchase → Event</h3>
            </div>
            <button 
              type="button"
              className="chain-action-btn"
              onClick={() => onNavigateTab('connections')}
              aria-label="Explore Full Relationship Graph"
            >
              <span>Explore Full Graph</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Sequential Chain Steps with Actual Receipt IDs */}
          <div className="chain-steps-track">
            {flagshipChain.stepNarrative.map((item, idx) => {
              const r = item.receipt;
              const config = CATEGORY_CONFIG[r.category] || {};
              return (
                <React.Fragment key={item.step}>
                  <div 
                    className="chain-node-card clickable"
                    onClick={() => onSelectReceipt && onSelectReceipt(r)}
                    title={`Click to inspect ${r.id}: ${r.title}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${r.id}: ${r.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (onSelectReceipt) onSelectReceipt(r);
                      }
                    }}
                  >
                    <div className="node-top-bar">
                      <span 
                        className="node-cat-pill"
                        style={{ color: config.color, background: config.bg, borderColor: config.border }}
                      >
                        {r.category}
                      </span>
                      <span className="node-id-tag font-mono">{r.id}</span>
                    </div>

                    <h4 className="node-title">{r.title}</h4>
                    <p className="node-narrative">"{item.text}"</p>

                    <div className="node-sub">
                      <span className="node-time font-mono">{r.date} &bull; {r.time}</span>
                      <span className="node-loc">
                        <MapPin size={11} /> {r.location}
                      </span>
                    </div>
                  </div>

                  {idx < flagshipChain.stepNarrative.length - 1 && (
                    <div className="chain-connector-arrow">
                      <span className="arrow-line"></span>
                      <span className="arrow-head">&rarr;</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="chain-footer-explanation">
            <div className="explanation-left">
              <strong>Why this connects:</strong> All 5 records (rcpt-001 through rcpt-005) occurred on March 18 between 20:15 and 22:00 within District 4 Studio, forming a unified burst of creative focus.
            </div>
            <button 
              type="button"
              className="chain-inspect-btn"
              onClick={() => onViewConnections && onViewConnections(flagshipChain.receipts[0])}
              aria-label="Inspect connection signals for March 18 chain"
            >
              <GitMerge size={13} />
              <span>Inspect Signals</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. "Your Chapters" */}
      <section className="overview-section" aria-labelledby="chapters-preview-title">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <BookOpen size={14} className="eyebrow-icon" />
            <span>NARRATIVE ARCS</span>
          </div>
          <h2 id="chapters-preview-title" className="section-heading">Your Chapters</h2>
          <p className="section-subtext">
            Generated chapters grouped into meaningful narrative phases based on observed dominant patterns and activity clusters.
          </p>
        </div>

        <div className="chapters-preview-grid">
          {chapters.slice(0, 4).map((ch, idx) => (
            <div key={ch.id} className="chapter-preview-card">
              <div className="chapter-card-top">
                <span className="chapter-num font-mono">CHAPTER 0{idx + 1}</span>
                <span className="chapter-dates font-mono">{ch.dateRange}</span>
              </div>

              <h3 className="chapter-card-title">{ch.title}</h3>
              <p className="chapter-card-lead">{ch.narrativeLead}</p>

              <div className="chapter-insight-box">
                <p className="insight-statement">
                  <strong>Insight:</strong> {ch.keyInsight}
                </p>
              </div>

              <div className="chapter-dominant-cats">
                {ch.dominantCategories.map(d => (
                  <span key={d.category} className="cat-chip">
                    {d.category} ({d.count})
                  </span>
                ))}
              </div>

              <div className="chapter-card-footer">
                <span className="chapter-moments-count">
                  <strong>{ch.momentsCount}</strong> moments &bull; {ch.connectedMomentsCount} connections
                </span>

                <button 
                  type="button"
                  className="read-chapter-btn"
                  onClick={() => onSelectChapter(ch)}
                  aria-label={`Read Chapter: ${ch.title}`}
                >
                  <span>Read Chapter</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "Recent Moments" */}
      <section className="overview-section" aria-labelledby="recent-moments-title">
        <div className="section-title-wrap">
          <div className="section-eyebrow">
            <Receipt size={14} className="eyebrow-icon" />
            <span>RAW DIGITAL RECORD SPECIMENS</span>
          </div>
          <div className="recent-moments-heading-row">
            <div>
              <h2 id="recent-moments-title" className="section-heading">Recent Moments</h2>
              <p className="section-subtext">
                Actual receipt cards from the local dataset. Click any card to inspect details and view connections.
              </p>
            </div>
            <button 
              type="button"
              className="view-all-explore-btn"
              onClick={() => onNavigateTab('explore')}
              aria-label="Search and Filter All Receipts in Explore"
            >
              <span>Search & Filter All {metrics.totalMoments} Receipts</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="recent-receipts-grid">
          {recentReceipts.slice(0, 6).map(receipt => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              connectionCount={connectionCounts[receipt.id] || 0}
              onSelectReceipt={onSelectReceipt}
              onViewConnections={onViewConnections}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
