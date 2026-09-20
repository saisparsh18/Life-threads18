import React from 'react';
import { motion } from 'framer-motion';
import { 
  Headphones, 
  Film, 
  MapPin, 
  CreditCard, 
  Camera, 
  MessageSquare, 
  Search, 
  Calendar, 
  FileText,
  Clock,
  GitMerge,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { CATEGORY_CONFIG } from '../data/mockReceipts';

const ICON_MAP = {
  Headphones,
  Film,
  MapPin,
  CreditCard,
  Camera,
  MessageSquare,
  Search,
  Calendar,
  FileText
};

export default function ReceiptCard({ 
  receipt, 
  connectionCount = 0, 
  onViewConnections, 
  onSelectReceipt,
  isSelected = false,
  isDimmed = false,
  compact = false 
}) {
  const config = CATEGORY_CONFIG[receipt.category] || {
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.25)',
    icon: 'FileText',
    tag: 'Receipt'
  };

  const IconComponent = ICON_MAP[config.icon] || FileText;

  // Render metadata summary key-values
  const metadataEntries = Object.entries(receipt.metadata || {}).slice(0, 3);

  const handleCardClick = (e) => {
    // If target is or within the "View Connections" button, let that handler run
    if (e.target.closest('.view-connections-btn')) return;
    if (onSelectReceipt) {
      onSelectReceipt(receipt);
    }
  };

  return (
    <motion.article 
      className={`receipt-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''} ${compact ? 'compact' : ''} ${onSelectReceipt ? 'clickable' : ''}`}
      style={{
        '--cat-color': config.color,
        '--cat-bg': config.bg,
        '--cat-border': config.border,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isDimmed ? 0.25 : 1, y: 0 }}
      whileHover={!isDimmed ? { y: -3 } : {}}
      transition={{ duration: 0.25 }}
      onClick={handleCardClick}
      role={onSelectReceipt ? 'button' : undefined}
      tabIndex={onSelectReceipt ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelectReceipt && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelectReceipt(receipt);
        }
      }}
    >
      {/* Card Header */}
      <div className="receipt-card-header">
        <div className="receipt-category-badge">
          <IconComponent size={13} className="cat-icon" />
          <span>{receipt.category}</span>
        </div>

        <div className="receipt-timing">
          <span className="receipt-date">{receipt.date}</span>
          {receipt.time && (
            <span className="receipt-time">
              <Clock size={11} className="clock-icon" />
              {receipt.time}
            </span>
          )}
        </div>
      </div>

      {/* Card Title */}
      <h3 className="receipt-title" title={receipt.title}>
        {receipt.title}
      </h3>

      {/* Notes / Narrative Snippet */}
      {receipt.notes && (
        <p className="receipt-notes">{receipt.notes}</p>
      )}

      {/* Location if available */}
      {receipt.location && (
        <div className="receipt-location">
          <MapPin size={12} className="loc-icon" />
          <span>{receipt.location}</span>
        </div>
      )}

      {/* Metadata Chips */}
      {metadataEntries.length > 0 && (
        <div className="receipt-meta-chips">
          {metadataEntries.map(([key, val]) => (
            <span key={key} className="meta-chip">
              <span className="meta-key">{key}:</span>
              <span className="meta-val">{String(val)}</span>
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {receipt.tags && receipt.tags.length > 0 && (
        <div className="receipt-tags">
          {receipt.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-pill">#{tag}</span>
          ))}
        </div>
      )}

      {/* Card Footer with Connection Count & Action */}
      <div className="receipt-footer">
        <div 
          className="connection-count-badge" 
          title={`${connectionCount} related moments identified by date, location, or context`}
        >
          <GitMerge size={12} className="git-icon" />
          <span>
            <strong>{connectionCount}</strong> {connectionCount === 1 ? 'connection' : 'connections'}
          </span>
        </div>

        <div className="receipt-footer-actions">
          {onSelectReceipt && (
            <button
              type="button"
              className="quick-detail-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectReceipt(receipt);
              }}
              title="Inspect receipt metadata & details"
              aria-label={`Inspect details for ${receipt.title}`}
            >
              <Maximize2 size={12} />
              <span>Details</span>
            </button>
          )}

          {onViewConnections && (
            <button 
              type="button"
              className="view-connections-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewConnections(receipt);
              }}
              aria-label={`View connections for ${receipt.title}`}
            >
              <span>Connections</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
