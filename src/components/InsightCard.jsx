import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, GitMerge, TrendingUp, ArrowRight, Sparkles, Layers } from 'lucide-react';

const ICON_MAP = {
  RotateCw,
  GitMerge,
  TrendingUp
};

export default function InsightCard({ insight, onExplore, index = 0 }) {
  const IconComponent = ICON_MAP[insight.icon] || Sparkles;

  return (
    <motion.div 
      className="editorial-insight-card"
      style={{ '--insight-color': insight.color }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      whileHover={{ y: -5 }}
    >
      <div className="insight-card-top">
        <div className="insight-type-badge">
          <IconComponent size={13} className="insight-icon" />
          <span className="insight-category-type">{insight.type}</span>
        </div>
        <span className="insight-stat-pill">{insight.stat}</span>
      </div>

      <h3 className="insight-title">{insight.title}</h3>
      <p className="insight-lead">{insight.lead}</p>
      <p className="insight-desc">{insight.description}</p>

      {/* Supporting Receipt Count */}
      <div className="insight-supporting-meta">
        <Layers size={13} className="meta-icon" />
        <span className="supporting-receipts-count">
          <strong>{insight.supportingReceiptsCount}</strong> Supporting Receipts
        </span>
      </div>

      {insight.tags && (
        <div className="insight-tags">
          {insight.tags.map(tag => (
            <span key={tag} className="insight-tag-item">{tag}</span>
          ))}
        </div>
      )}

      <div className="insight-card-bottom">
        <button 
          type="button"
          className="insight-explore-btn"
          onClick={() => onExplore(insight)}
          aria-label={`Explore ${insight.title}`}
        >
          <span>Explore</span>
          <ArrowRight size={14} className="explore-arrow" />
        </button>
      </div>
    </motion.div>
  );
}
