import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  GitMerge, 
  Sparkles, 
  Layers, 
  Clock, 
  MapPin, 
  ArrowRight,
  Compass,
  CheckCircle,
  Play,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  Activity,
  Zap,
  Tag
} from 'lucide-react';
import { CATEGORY_CONFIG } from '../data/mockReceipts';

export default function StoryPlayer({ 
  flagshipChain, 
  chapters = [], 
  initialChapterId = null,
  onExploreThread,
  onExploreConnections,
  onBackToChapters,
  onNavigateToExplore 
}) {
  // Generate interactive story arcs for each chapter using its real receipts
  const stories = useMemo(() => {
    return chapters.map((ch, chIdx) => {
      // Pick up to 5-6 representative sequential receipts from this chapter
      const sortedReceipts = [...ch.receipts].sort((a, b) => {
        return (a.date || '').localeCompare(b.date || '') || (a.time || '').localeCompare(b.time || '');
      });

      const sampleReceipts = sortedReceipts.slice(0, 5);

      const steps = sampleReceipts.map((r, idx) => {
        let promptText = '';
        if (r.category === 'Music') {
          promptText = idx === 0 ? 'A song played late that evening.' : 'An auditory frequency set the creative mood.';
        } else if (r.category === 'Places') {
          promptText = 'A new location appeared.';
        } else if (r.category === 'Photos') {
          promptText = 'A photograph was captured.';
        } else if (r.category === 'Purchases') {
          promptText = idx === sampleReceipts.length - 1 ? 'A purchase completed the thread.' : 'A transactional exchange acquired physical tools.';
        } else if (r.category === 'Events') {
          promptText = 'An event followed.';
        } else if (r.category === 'Searches') {
          promptText = 'An intellectual search query pierced the quiet.';
        } else if (r.category === 'Messages') {
          promptText = 'A digital dispatch bridged communication.';
        } else if (r.category === 'Personal Notes') {
          promptText = 'A private reflection crystallized into words.';
        } else if (r.category === 'Movies & Entertainment') {
          promptText = 'A cinematic narrative engaged the senses.';
        } else {
          promptText = 'A moment surfaced on the timeline.';
        }

        const signals = [];
        if (r.date) signals.push('Same day');
        if (r.location) signals.push('Same location');
        if (idx > 0 && r.time) signals.push('Within 45 minutes');
        signals.push('Shared keyword');
        signals.push('Related categories');

        const connectionNote = r.location
          ? `The data shows this moment converges around ${r.location} on ${r.date} alongside related records.`
          : `The data shows contextual alignment across ${r.tags ? r.tags.join(', ') : 'chapter patterns'}.`;

        return {
          index: idx + 1,
          time: r.time || 'Logged',
          date: r.date,
          prompt: promptText,
          receipt: r,
          receiptTitle: r.title,
          category: r.category,
          detail: r.notes || `Recorded in category ${r.category}`,
          location: r.location,
          signals: signals.slice(0, 3),
          connectionNote,
          patternNote: ch.detectedPatterns && ch.detectedPatterns[idx % ch.detectedPatterns.length] 
            ? ch.detectedPatterns[idx % ch.detectedPatterns.length]
            : ch.keyInsight
        };
      });

      const signalsCount = Math.max(3, Math.min(6, ch.connectedMomentsCount));

      return {
        id: ch.id,
        chapterNumber: ch.chapterNumber || chIdx + 1,
        title: ch.title,
        subtitle: ch.subtitle,
        date: ch.dateRange,
        location: ch.receipts[0]?.location || 'Various Coordinates',
        lead: ch.narrativeLead,
        keyInsight: ch.keyInsight,
        whyItMatters: ch.whyItMatters || 'These moments converge around the same date, location, and time window. Activity increased during late evening hours, forming an uninterrupted sequence.',
        detectedPatterns: ch.detectedPatterns || [
          'Activity increased during concentrated temporal clusters.',
          'High spatial convergence across core locations.',
          'Sequential cross-category threads connecting digital receipts.'
        ],
        momentsCount: ch.momentsCount,
        signalsCount,
        receipts: sampleReceipts,
        allReceipts: ch.receipts,
        steps,
        conclusion: {
          headline: 'Story Complete',
          title: ch.title,
          subhead: `${ch.momentsCount} connected moments • ${signalsCount} connection signals`,
          explanation: ch.whyItMatters || 'These moments converge around the same date, location, and time window.'
        }
      };
    });
  }, [chapters]);

  // Determine initial story index based on initialChapterId
  const initialIdx = useMemo(() => {
    if (!initialChapterId || stories.length === 0) return 0;
    const found = stories.findIndex(s => s.id === initialChapterId);
    return found !== -1 ? found : 0;
  }, [initialChapterId, stories]);

  const [activeStoryIdx, setActiveStoryIdx] = useState(initialIdx);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Sync if initialChapterId changes externally
  useEffect(() => {
    if (initialChapterId) {
      const idx = stories.findIndex(s => s.id === initialChapterId);
      if (idx !== -1) {
        setActiveStoryIdx(idx);
        setCurrentStepIndex(0);
      }
    }
  }, [initialChapterId, stories]);

  const activeStory = stories[activeStoryIdx] || stories[0];
  const totalSteps = activeStory ? activeStory.steps.length : 0;
  const isConclusion = currentStepIndex >= totalSteps;

  const handleNext = () => {
    if (currentStepIndex <= totalSteps) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
  };

  const handleStorySwitch = (idx) => {
    setActiveStoryIdx(idx);
    setCurrentStepIndex(0);
  };

  // Keyboard left/right arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentStepIndex < totalSteps) handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (currentStepIndex > 0) handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps]);

  if (!activeStory) return null;

  const currentStepData = !isConclusion ? activeStory.steps[currentStepIndex] : null;

  // Format progress indicator as e.g. "03 / 06"
  const formattedCurrent = String(Math.min(currentStepIndex + 1, totalSteps + 1)).padStart(2, '0');
  const formattedTotal = String(totalSteps + 1).padStart(2, '0');

  return (
    <div className="story-player-wrapper">
      {/* Story Header & Chapter Selector */}
      <div className="story-header-nav">
        <div className="story-title-meta">
          <div className="story-chapter-badge-row">
            <span className="chapter-number-label font-mono">
              CHAPTER 0{activeStory.chapterNumber}
            </span>
            <span className="story-kicker">INTERACTIVE STORY READER</span>
          </div>

          <h1 className="story-main-title">{activeStory.title}</h1>
          
          <div className="story-meta-sub">
            <span className="story-date-range font-mono">
              <Clock size={13} /> {activeStory.date}
            </span>
            <span className="story-location-range">
              <MapPin size={13} /> {activeStory.location}
            </span>
          </div>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="story-switcher-buttons" role="tablist" aria-label="Select Story Chapter">
          {stories.map((s, idx) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeStoryIdx === idx}
              className={`story-tab-btn ${activeStoryIdx === idx ? 'active' : ''}`}
              onClick={() => handleStorySwitch(idx)}
              aria-label={`Select Chapter 0${s.chapterNumber}: ${s.title}`}
            >
              <BookOpen size={13} />
              <span>Chapter 0{s.chapterNumber}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar & Visual Step Indicators */}
      <div className="story-progress-container">
        <div className="progress-steps-list">
          {activeStory.steps.map((st, idx) => {
            const isCompleted = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                className={`step-dot-btn ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => setCurrentStepIndex(idx)}
                aria-label={`Jump to narrative step ${idx + 1}`}
              >
                <span className="dot-circle">
                  {isCompleted ? <CheckCircle size={12} /> : idx + 1}
                </span>
                <span className="dot-time font-mono">{st.time}</span>
              </button>
            );
          })}

          <button
            type="button"
            className={`step-dot-btn conclusion-step ${isConclusion ? 'current' : ''}`}
            onClick={() => setCurrentStepIndex(totalSteps)}
            aria-label="Jump to story conclusion"
          >
            <span className="dot-circle">
              <Sparkles size={12} />
            </span>
            <span className="dot-time">Summary</span>
          </button>
        </div>
      </div>

      {/* Documentary / Journal Narrative Viewport */}
      <div className="story-stage-viewport">
        <AnimatePresence mode="wait">
          {!isConclusion && currentStepData && (
            <motion.div
              key={`step-${activeStory.id}-${currentStepIndex}`}
              className="story-step-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step Sequence Badge */}
              <div className="step-badge-row">
                <span className="step-number-tag font-mono">
                  MOMENT {currentStepData.index} OF {totalSteps}
                </span>
                <span className="step-time-tag font-mono">
                  <Clock size={13} /> {currentStepData.date} {currentStepData.time ? `• ${currentStepData.time}` : ''}
                </span>
                <span 
                  className="step-cat-tag"
                  style={{
                    color: CATEGORY_CONFIG[currentStepData.category]?.color || '#38bdf8',
                    background: CATEGORY_CONFIG[currentStepData.category]?.bg || 'rgba(56, 189, 248, 0.1)',
                    borderColor: CATEGORY_CONFIG[currentStepData.category]?.border || 'rgba(56, 189, 248, 0.3)'
                  }}
                >
                  {currentStepData.category}
                </span>
              </div>

              {/* Large Poetic Documentary Prompt */}
              <div className="story-narrative-section">
                <span className="section-sub-label font-mono">Narrative:</span>
                <h3 className="step-poetic-prompt">"{currentStepData.prompt}"</h3>
              </div>

              {/* Relevant Receipt Specimen */}
              <div className="story-receipts-section">
                <span className="section-sub-label font-mono">Relevant Receipt:</span>
                <div className="story-receipt-highlight">
                  <div className="receipt-highlight-head">
                    <span 
                      className="rec-cat-pill"
                      style={{ color: CATEGORY_CONFIG[currentStepData.category]?.color }}
                    >
                      {currentStepData.category}
                    </span>
                    <span className="rec-id-tag font-mono">{currentStepData.receipt?.id}</span>
                  </div>

                  <h4 className="rec-title">{currentStepData.receiptTitle}</h4>
                  <p className="rec-detail">{currentStepData.detail}</p>
                  
                  {currentStepData.location && (
                    <div className="rec-location-tag">
                      <MapPin size={12} />
                      <span>{currentStepData.location}</span>
                    </div>
                  )}

                  {/* Metadata Chips if present */}
                  {currentStepData.receipt?.metadata && Object.keys(currentStepData.receipt.metadata).length > 0 && (
                    <div className="rec-meta-row-mini">
                      {Object.entries(currentStepData.receipt.metadata).slice(0, 3).map(([k, v]) => (
                        <span key={k} className="rec-meta-chip-mini">
                          <strong>{k}:</strong> {String(v)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Detected Connection & Signals */}
              <div className="story-detected-connection">
                <span className="section-sub-label font-mono">Detected Connection:</span>
                <div className="story-connection-callout">
                  <GitMerge size={16} className="callout-icon" />
                  <div className="callout-content">
                    <p className="callout-text">{currentStepData.connectionNote}</p>
                    
                    {/* Signal badges */}
                    <div className="callout-signals-strip">
                      {currentStepData.signals.map((sig, sIdx) => (
                        <span key={sIdx} className="signal-chip-mini">
                          <ShieldCheck size={10} />
                          <span>{sig}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern Explanation */}
              <div className="story-pattern-explanation">
                <span className="section-sub-label font-mono">Pattern Explanation:</span>
                <p className="step-pattern-text">{currentStepData.patternNote}</p>
              </div>
            </motion.div>
          )}

          {/* FINAL STEP: STORY COMPLETE */}
          {isConclusion && (
            <motion.div
              key={`conclusion-${activeStory.id}`}
              className="story-conclusion-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <div className="conclusion-badge">
                <Sparkles size={16} />
                <span>Story Complete</span>
              </div>

              <h3 className="conclusion-headline">CHAPTER 0{activeStory.chapterNumber}: {activeStory.title}</h3>

              {/* High-level stats */}
              <div className="conclusion-metrics-pills">
                <div className="c-pill">
                  <span className="c-pill-num font-mono">{activeStory.receipts.length}</span>
                  <span className="c-pill-lbl">Connected Moments</span>
                </div>
                <div className="c-pill">
                  <span className="c-pill-num font-mono accent-cyan">{activeStory.signalsCount}</span>
                  <span className="c-pill-lbl">Connection Signals</span>
                </div>
              </div>

              {/* WHY THIS THREAD MATTERS */}
              <div className="story-why-matters-card">
                <div className="why-header">
                  <Zap size={15} className="why-icon" />
                  <h4 className="why-title">WHY THIS THREAD MATTERS</h4>
                </div>
                <p className="why-text">{activeStory.whyItMatters}</p>
              </div>

              {/* Detected Patterns List */}
              <div className="conclusion-patterns-list-box">
                <span className="patterns-box-label font-mono">Detected Patterns in Thread:</span>
                <ul className="conclusion-patterns-list">
                  {activeStory.detectedPatterns.map((pat, pIdx) => (
                    <li key={pIdx} className="conclusion-pat-item">
                      <span className="pat-dot"></span>
                      <span>{pat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Moments Gallery */}
              <div className="conclusion-moments-track">
                <span className="track-lbl font-mono">Chronological Specimen Chain:</span>
                <div className="track-items-grid">
                  {activeStory.receipts.map((r, rIdx) => {
                    const cfg = CATEGORY_CONFIG[r.category] || {};
                    return (
                      <div key={r.id} className="track-mini-card">
                        <div className="track-mini-top">
                          <span className="track-cat font-mono" style={{ color: cfg.color }}>{r.category}</span>
                          <span className="track-id font-mono">{r.id}</span>
                        </div>
                        <h5 className="track-title">{r.title}</h5>
                        <span className="track-date font-mono">{r.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Required Final Step Buttons: "Explore Connections", "Back to Chapters", "Explore Thread" */}
              <div className="conclusion-actions">
                {onExploreConnections && (
                  <button 
                    type="button"
                    className="story-cta-btn primary"
                    onClick={() => onExploreConnections(activeStory)}
                    aria-label="Explore Connections"
                  >
                    <GitMerge size={16} />
                    <span>Explore Connections</span>
                  </button>
                )}

                {onBackToChapters && (
                  <button 
                    type="button"
                    className="story-cta-btn secondary"
                    onClick={onBackToChapters}
                    aria-label="Back to Chapters"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Chapters</span>
                  </button>
                )}

                {onExploreThread && (
                  <button 
                    type="button"
                    className="story-cta-btn secondary"
                    onClick={() => onExploreThread(activeStory.id)}
                    aria-label="Explore Thread"
                  >
                    <Compass size={16} />
                    <span>Explore Thread</span>
                  </button>
                )}

                <button 
                  type="button"
                  className="story-cta-btn tertiary"
                  onClick={handleRestart}
                  aria-label="Replay this chapter"
                >
                  <RotateCcw size={15} />
                  <span>Replay Chapter</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Story Controls Toolbar with ← Previous, Next →, Progress Indicator (03 / 06), and Explore Thread */}
      <div className="story-controls-bar">
        {/* Previous Button */}
        <button
          type="button"
          className="story-nav-arrow-btn"
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        {/* Center Progress Indicator & Actions */}
        <div className="story-center-actions">
          {/* Explicit Progress Indicator e.g. 03 / 06 */}
          <div className="story-step-indicator font-mono" aria-label="Story Progress">
            <span className="indicator-current">{formattedCurrent}</span>
            <span className="indicator-slash">/</span>
            <span className="indicator-total">{formattedTotal}</span>
          </div>

          {/* Explore Thread Button */}
          {onExploreThread && (
            <button
              type="button"
              className="story-explore-thread-pill"
              onClick={() => onExploreThread(activeStory.id)}
              aria-label="Explore Thread"
            >
              <GitMerge size={13} />
              <span>Explore Thread</span>
            </button>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          className="story-nav-arrow-btn next"
          onClick={handleNext}
          disabled={isConclusion}
          aria-label="Next"
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
