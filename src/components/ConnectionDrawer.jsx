import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  GitMerge, 
  Clock, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Zap, 
  Tag, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CATEGORY_CONFIG } from '../data/mockReceipts';

export default function ConnectionDrawer({ 
  connectionData, 
  onClose, 
  onSelectReceipt,
  onNavigateToStory,
  onNavigateToExplore 
}) {
  // ESC key listener to close drawer
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!connectionData || !connectionData.receipt) return null;

  const { receipt, connections = [], signalsCount = 0, explanation = '' } = connectionData;
  const config = CATEGORY_CONFIG[receipt.category] || {};

  return (
    <AnimatePresence>
      <motion.aside 
        className="connection-detail-drawer"
        role="dialog"
        aria-label={`Connection details for ${receipt.title}`}
        initial={{ opacity: 0, x: 340 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 340 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      >
        <div className="drawer-inner">
          {/* Header */}
          <div className="drawer-header">
            <div className="drawer-title-group">
              <span className="drawer-kicker">SELECTED RECEIPT NODE</span>
              <span 
                className="drawer-category-pill"
                style={{ color: config.color, background: config.bg, borderColor: config.border }}
              >
                {receipt.category}
              </span>
            </div>

            <button 
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close detail panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="drawer-content">
            {/* Title & Timing */}
            <h2 className="drawer-receipt-title">{receipt.title}</h2>

            <div className="drawer-meta-row">
              <span className="drawer-meta-item">
                <Clock size={13} /> {receipt.date} {receipt.time ? `• ${receipt.time}` : ''}
              </span>
              {receipt.location && (
                <span className="drawer-meta-item">
                  <MapPin size={13} /> {receipt.location}
                </span>
              )}
            </div>

            {receipt.notes && (
              <blockquote className="drawer-quote">
                "{receipt.notes}"
              </blockquote>
            )}

            {/* Connection Signal Stats Banner */}
            <div className="signals-summary-box">
              <div className="signal-stat">
                <span className="signal-num">{connections.length}</span>
                <span className="signal-lbl">Connected Moments</span>
              </div>
              <div className="signal-divider"></div>
              <div className="signal-stat">
                <span className="signal-num">{signalsCount}</span>
                <span className="signal-lbl">Connection Signals</span>
              </div>
            </div>

            {/* Narrative Explanation of WHY */}
            <div className="explanation-card">
              <div className="explanation-header">
                <Zap size={14} className="explanation-icon" />
                <h4>Why These Moments Connect</h4>
              </div>
              <p className="explanation-text">{explanation}</p>
            </div>

            {/* Connected Receipts List */}
            <div className="connected-nodes-list-section">
              <h4 className="connected-list-title">
                <GitMerge size={14} /> Linked Moments ({connections.length})
              </h4>

              <div className="connected-list-items">
                {connections.map((conn) => {
                  const item = conn.receipt;
                  const itemConfig = CATEGORY_CONFIG[item.category] || {};
                  return (
                    <div 
                      key={item.id} 
                      className="connected-item-card"
                      onClick={() => onSelectReceipt && onSelectReceipt(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectReceipt && onSelectReceipt(item);
                        }
                      }}
                    >
                      <div className="conn-item-top">
                        <span 
                          className="conn-cat-tag"
                          style={{ color: itemConfig.color }}
                        >
                          {item.category}
                        </span>
                        <span className="conn-date">{item.date} {item.time ? `• ${item.time}` : ''}</span>
                      </div>

                      <h5 className="conn-item-title">{item.title}</h5>

                      {/* Standardized Signal Badges (Same date, Within 30 minutes, etc) */}
                      {conn.signals && conn.signals.length > 0 && (
                        <div className="conn-signal-badges-wrap">
                          {conn.signals.map((sig, sIdx) => (
                            <span key={sIdx} className="signal-chip">
                              <ShieldCheck size={10} />
                              <span>{sig}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Full Human-Readable Explanation */}
                      <p className="conn-reason-detail">
                        {conn.primaryReason}
                      </p>

                      <div className="conn-item-footer">
                        <span>Affinity Score: {conn.score}</span>
                        <span className="focus-link">Focus Node <ChevronRight size={12} /></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="drawer-footer">
            {onNavigateToStory && (
              <button 
                type="button"
                className="drawer-action-btn primary"
                onClick={() => onNavigateToStory(receipt)}
                aria-label="Follow Thread"
              >
                <Sparkles size={14} />
                <span>Follow Thread</span>
              </button>
            )}
            {onNavigateToExplore && (
              <button 
                className="drawer-action-btn secondary"
                onClick={() => onNavigateToExplore(receipt)}
              >
                <ExternalLink size={14} />
                <span>Find in Explorer</span>
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
