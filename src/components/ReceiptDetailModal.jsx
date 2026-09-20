import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  MapPin, 
  GitMerge, 
  Tag, 
  Layers, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  Zap,
  ArrowRight
} from 'lucide-react';
import { CATEGORY_CONFIG } from '../data/mockReceipts';

export default function ReceiptDetailModal({ 
  receipt, 
  connectionData,
  connectionCount = 0,
  onClose, 
  onViewConnections,
  onSelectReceipt,
  onFilterCategory 
}) {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!receipt) return null;

  const config = CATEGORY_CONFIG[receipt.category] || {
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.25)'
  };

  const metadataEntries = Object.entries(receipt.metadata || {});
  const connections = connectionData?.connections || [];
  const actualConnectionCount = connectionData?.connectedCount ?? connectionCount;
  const explanation = connectionData?.explanation || '';

  return (
    <AnimatePresence>
      <div 
        className="modal-overlay-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-detail-modal-title"
      >
        <motion.div 
          className="receipt-detail-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-header-left">
              <span 
                className="modal-cat-badge"
                style={{
                  color: config.color,
                  background: config.bg,
                  borderColor: config.border
                }}
              >
                {receipt.category}
              </span>
              <span className="modal-id-tag font-mono">{receipt.id}</span>
            </div>

            <button 
              className="modal-close-icon-btn"
              onClick={onClose}
              aria-label="Close receipt details"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body-scrollable">
            <h2 id="receipt-detail-modal-title" className="modal-receipt-title">
              {receipt.title}
            </h2>

            {/* Time & Place Row */}
            <div className="modal-meta-row">
              <span className="meta-pill">
                <Clock size={13} />
                <span>{receipt.date} {receipt.time ? `• ${receipt.time}` : ''}</span>
              </span>

              {receipt.location && (
                <span className="meta-pill">
                  <MapPin size={13} />
                  <span>{receipt.location}</span>
                </span>
              )}
            </div>

            {/* Observation Notes / Description */}
            {(receipt.notes || receipt.description) && (
              <div className="modal-notes-box">
                <span className="box-kicker">OBSERVED DETAIL & DESCRIPTION</span>
                <p className="box-quote">"{receipt.notes || receipt.description}"</p>
              </div>
            )}

            {/* Metadata Grid */}
            {metadataEntries.length > 0 && (
              <div className="modal-metadata-section">
                <span className="section-label">TECHNICAL / RECORD METADATA</span>
                <div className="modal-meta-grid">
                  {metadataEntries.map(([key, val]) => (
                    <div key={key} className="meta-cell">
                      <span className="cell-key">{key}</span>
                      <span className="cell-val font-mono">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thematic Tags / Keywords */}
            {receipt.tags && receipt.tags.length > 0 && (
              <div className="modal-tags-section">
                <span className="section-label">KEYWORDS & THEMATIC TAGS</span>
                <div className="modal-tags-list">
                  {receipt.tags.map(tag => (
                    <span key={tag} className="modal-tag-chip">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Connection Intelligence Banner */}
            <div className="modal-connections-callout">
              <GitMerge size={16} className="callout-icon" />
              <div className="callout-text-wrap">
                <h4>Connection Intelligence</h4>
                <p>
                  This receipt has <strong>{actualConnectionCount} detected relational bonds</strong> across time, geography, or topic in the archive.
                </p>
                {explanation && (
                  <p className="modal-explanation-text">
                    <Zap size={13} className="zap-icon" />
                    <span>{explanation}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Connected Moments & Connection Reasons */}
            {connections.length > 0 && (
              <div className="modal-connected-moments-section">
                <div className="section-header-row">
                  <span className="section-label">
                    CONNECTED MOMENTS ({connections.length})
                  </span>
                  <span className="section-subtext-sm">
                    Why these moments connect:
                  </span>
                </div>

                <div className="modal-connected-list">
                  {connections.slice(0, 6).map(conn => {
                    const linked = conn.receipt;
                    const linkedConfig = CATEGORY_CONFIG[linked.category] || {};
                    return (
                      <div 
                        key={linked.id} 
                        className="modal-connected-item"
                        onClick={() => onSelectReceipt && onSelectReceipt(linked)}
                        role="button"
                        tabIndex={0}
                        title={`Inspect connected receipt: ${linked.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            onSelectReceipt && onSelectReceipt(linked);
                          }
                        }}
                      >
                        <div className="conn-item-head">
                          <span 
                            className="conn-item-cat"
                            style={{ color: linkedConfig.color }}
                          >
                            {linked.category}
                          </span>
                          <span className="conn-item-date font-mono">
                            {linked.date} {linked.time ? `• ${linked.time}` : ''}
                          </span>
                        </div>

                        <h5 className="conn-item-name">{linked.title}</h5>

                        {/* Connection Reasons & Standardized Signal Chips */}
                        <div className="conn-item-reasons-row">
                          {conn.signals && conn.signals.map((sig, sIdx) => (
                            <span key={sIdx} className="signal-chip-mini">
                              <ShieldCheck size={10} />
                              <span>{sig}</span>
                            </span>
                          ))}
                        </div>

                        <p className="conn-item-reason-text">
                          {conn.primaryReason}
                        </p>

                        <div className="conn-item-inspect-hint">
                          <span>Inspect this moment</span>
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer-actions">
            {onViewConnections && (
              <button 
                type="button"
                className="modal-action-btn primary explore-connections-btn"
                onClick={() => {
                  onClose();
                  onViewConnections(receipt);
                }}
                aria-label="Explore Connections"
              >
                <GitMerge size={15} />
                <span>Explore Connections</span>
              </button>
            )}

            {onFilterCategory && (
              <button 
                type="button"
                className="modal-action-btn secondary"
                onClick={() => {
                  onClose();
                  onFilterCategory(receipt.category);
                }}
                aria-label={`Filter all ${receipt.category}`}
              >
                <Layers size={14} />
                <span>Filter all {receipt.category}</span>
              </button>
            )}

            <button
              type="button"
              className="modal-action-btn tertiary"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span>Close</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
