import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  GitMerge, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  FileText,
  Clock,
  TrendingUp,
  Activity,
  Compass,
  Zap,
  Info
} from 'lucide-react';
import ReceiptCard from '../components/ReceiptCard';
import { CATEGORY_CONFIG } from '../data/mockReceipts';

export default function ChaptersPage({ 
  chapters = [], 
  onReadChapterInStory, 
  onViewConnections,
  onExploreThread
}) {
  const [expandedChapterId, setExpandedChapterId] = useState(chapters[0]?.id || null);

  const toggleChapter = (id) => {
    setExpandedChapterId(prev => prev === id ? null : id);
  };

  return (
    <div className="chapters-page">
      {/* Header */}
      <div className="chapters-header">
        <div className="chapters-header-meta">
          <span className="page-kicker">CURATED PERIODS // PATTERN SYNTHESIS</span>
          <h1 className="page-title">Life In Chapters</h1>
          <p className="page-subtitle">
            Observed activity clusters synthesized into coherent narrative phases. These 6 chapters reflect detected patterns—including temporal regularity, spatial concentration, and category shifts—rather than simple calendar months.
          </p>
        </div>

        <div className="chapters-stats-pill">
          <span className="pill-num">{chapters.length}</span>
          <span className="pill-lbl">Narrative Chapters</span>
        </div>
      </div>

      {/* Chapters Grid / List */}
      <div className="chapters-container">
        {chapters.map((chapter, index) => {
          const isExpanded = expandedChapterId === chapter.id;

          return (
            <motion.section 
              key={chapter.id}
              className={`chapter-full-card ${isExpanded ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              aria-label={`Chapter ${chapter.chapterNumber || index + 1}: ${chapter.title}`}
            >
              {/* Main Editorial Chapter Card */}
              <div className="chapter-summary-bar">
                {/* Chapter Number Column */}
                <div className="chapter-index-col">
                  <span className="chapter-index-num font-mono">
                    0{chapter.chapterNumber || index + 1}
                  </span>
                  <span className="chapter-index-line"></span>
                </div>

                {/* Primary Meta & Content */}
                <div className="chapter-primary-meta">
                  <div className="meta-top-row">
                    <span className="chapter-period-tag font-mono">
                      {chapter.subtitle}
                    </span>
                    <span className="chapter-date-badge font-mono">
                      <Calendar size={12} /> {chapter.dateRange}
                    </span>
                  </div>

                  <h2 className="chapter-title">{chapter.title}</h2>
                  <p className="chapter-narrative-lead">{chapter.narrativeLead}</p>

                  {/* Key Algorithmic Insight Pill */}
                  <div className="chapter-insight-box">
                    <Sparkles size={14} className="insight-sparkle" />
                    <p className="insight-statement">
                      <strong>Key Insight:</strong> {chapter.keyInsight}
                    </p>
                  </div>

                  {/* Badges, Categories & Statistics */}
                  <div className="chapter-metrics-strip">
                    <div className="metric-chip">
                      <span className="chip-num font-mono">{chapter.momentsCount}</span>
                      <span className="chip-label">Moments</span>
                    </div>

                    <div className="metric-chip">
                      <GitMerge size={12} className="git-chip-icon" />
                      <span className="chip-num font-mono">{chapter.connectedMomentsCount}</span>
                      <span className="chip-label">Connections</span>
                    </div>

                    <div className="dominant-categories-group">
                      <span className="dom-label">Dominant Categories:</span>
                      {chapter.dominantCategories.map(cat => (
                        <span 
                          key={cat.category} 
                          className="dominant-pill"
                          style={{
                            color: CATEGORY_CONFIG[cat.category]?.color || '#38bdf8',
                            background: CATEGORY_CONFIG[cat.category]?.bg || 'rgba(56, 189, 248, 0.1)'
                          }}
                        >
                          {cat.category} ({cat.count})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chapter Card Actions */}
                <div className="chapter-actions-col">
                  <button 
                    type="button"
                    className="read-chapter-cta-btn"
                    onClick={() => onReadChapterInStory(chapter)}
                    aria-label={`Read Chapter: ${chapter.title}`}
                  >
                    <Sparkles size={15} />
                    <span>Read Chapter</span>
                  </button>

                  <button
                    type="button"
                    className="toggle-moments-btn"
                    onClick={() => toggleChapter(chapter.id)}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Hide chapter details' : 'View chapter details'} for ${chapter.title}`}
                  >
                    <span>{isExpanded ? 'Hide Detail' : `Chapter Detail`}</span>
                    <ChevronRight size={15} className={`arrow-icon ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Comprehensive Chapter Detail View */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    className="chapter-receipts-drawer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="chapter-drawer-inner">
                      {/* Chapter Summary & Why This Thread Matters */}
                      <div className="chapter-detail-overview-panel">
                        <div className="detail-summary-header">
                          <span className="detail-kicker">CHAPTER SUMMARY & PATTERN INTELLIGENCE</span>
                          <h3 className="detail-summary-title">{chapter.title}</h3>
                          <p className="detail-summary-text">{chapter.whyItMatters || chapter.narrativeLead}</p>
                        </div>

                        {/* Detected Patterns */}
                        {chapter.detectedPatterns && chapter.detectedPatterns.length > 0 && (
                          <div className="detail-detected-patterns-box">
                            <h4 className="detected-patterns-heading">
                              <Activity size={14} className="patterns-icon" />
                              <span>Detected Patterns in Data:</span>
                            </h4>
                            <ul className="patterns-bullet-list">
                              {chapter.detectedPatterns.map((pat, pIdx) => (
                                <li key={pIdx} className="pattern-bullet-item">
                                  <span className="bullet-dot"></span>
                                  <span>{pat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Detail Actions Row */}
                        <div className="detail-panel-actions-row">
                          <button
                            type="button"
                            className="detail-action-btn primary"
                            onClick={() => onReadChapterInStory(chapter)}
                            aria-label={`Read Chapter in Story Mode: ${chapter.title}`}
                          >
                            <Sparkles size={14} />
                            <span>Read Chapter in Story Mode</span>
                          </button>

                          <button
                            type="button"
                            className="detail-action-btn secondary"
                            onClick={() => onExploreThread ? onExploreThread(chapter.id) : (onViewConnections && onViewConnections(chapter.receipts[0]))}
                            aria-label="Explore Thread in Connections"
                          >
                            <GitMerge size={14} />
                            <span>Explore Thread</span>
                          </button>
                        </div>
                      </div>

                      {/* Relevant Receipt Cards from this Chapter */}
                      <div className="chapter-receipts-section">
                        <div className="drawer-subhead">
                          <Layers size={14} />
                          <span>Relevant Receipts in Chapter ({chapter.receipts.length})</span>
                        </div>

                        <div className="chapter-receipts-grid">
                          {chapter.receipts.map(receipt => (
                            <ReceiptCard
                              key={receipt.id}
                              receipt={receipt}
                              compact={true}
                              onViewConnections={onViewConnections}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
