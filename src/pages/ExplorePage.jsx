import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  Calendar, 
  Layers, 
  ArrowUpDown, 
  RotateCcw, 
  Sparkles, 
  Inbox,
  Tag,
  Clock,
  SlidersHorizontal,
  MapPin,
  User,
  Check
} from 'lucide-react';
import ReceiptCard from '../components/ReceiptCard';
import ReceiptDetailModal from '../components/ReceiptDetailModal';
import { CATEGORIES, CATEGORY_CONFIG } from '../data/mockReceipts';

export default function ExplorePage({ 
  receipts = [], 
  connectionsEngine, 
  onViewConnections, 
  initialSearch = '', 
  initialCategory = 'All' 
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dateFilter, setDateFilter] = useState('ALL'); // ALL, MARCH_2026, APRIL_2026, EARLY_MARCH, LATE_MARCH, EARLY_APRIL, LATE_APRIL
  const [sortBy, setSortBy] = useState('DATE_DESC'); // DATE_DESC, DATE_ASC, CONNECTIONS_DESC, TITLE_ASC
  const [inspectingReceipt, setInspectingReceipt] = useState(null);

  // Pre-calculate connections count map for fast lookup
  const connectionCounts = useMemo(() => {
    const map = {};
    receipts.forEach(r => {
      const connData = connectionsEngine?.getConnectionsForReceipt 
        ? connectionsEngine.getConnectionsForReceipt(r.id, receipts)
        : { connectedCount: 0 };
      map[r.id] = connData.connectedCount || 0;
    });
    return map;
  }, [receipts, connectionsEngine]);

  // Comprehensive multi-field search across:
  // 1. title
  // 2. description (notes / description)
  // 3. location
  // 4. artist/person (metadata fields: artist, person, sender, recipient, author, speaker, host, with)
  // 5. keywords (tags & text keywords)
  // 6. category
  const filteredReceipts = useMemo(() => {
    return receipts.filter(r => {
      // 1. Category Filter
      if (selectedCategory !== 'All' && r.category !== selectedCategory) {
        return false;
      }

      // 2. Date Filter
      if (dateFilter === 'MARCH_2026') {
        if (!r.date || !r.date.startsWith('2026-03')) return false;
      } else if (dateFilter === 'APRIL_2026') {
        if (!r.date || !r.date.startsWith('2026-04')) return false;
      } else if (dateFilter === 'EARLY_MARCH') {
        if (!r.date || r.date < '2026-03-01' || r.date > '2026-03-15') return false;
      } else if (dateFilter === 'LATE_MARCH') {
        if (!r.date || r.date < '2026-03-16' || r.date > '2026-03-31') return false;
      } else if (dateFilter === 'EARLY_APRIL') {
        if (!r.date || r.date < '2026-04-01' || r.date > '2026-04-15') return false;
      } else if (dateFilter === 'LATE_APRIL') {
        if (!r.date || r.date < '2026-04-16' || r.date > '2026-04-30') return false;
      }

      // 3. Multi-field Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        
        // Match title
        const titleMatch = (r.title || '').toLowerCase().includes(query);

        // Match description (notes or description)
        const descMatch = (r.notes || '').toLowerCase().includes(query) || 
                          (r.description || '').toLowerCase().includes(query);

        // Match location
        const locMatch = (r.location || '').toLowerCase().includes(query);

        // Match category
        const catMatch = (r.category || '').toLowerCase().includes(query);

        // Match keywords / tags
        const tagsMatch = (r.tags || []).some(t => t.toLowerCase().includes(query));

        // Match artist / person fields and general metadata
        const metadataValues = Object.entries(r.metadata || {});
        const metaMatch = metadataValues.some(([key, val]) => 
          key.toLowerCase().includes(query) || String(val).toLowerCase().includes(query)
        );
        const personMatch = ['artist', 'person', 'sender', 'recipient', 'speaker', 'author', 'with', 'host', 'director', 'curator'].some(field => 
          r.metadata && r.metadata[field] && String(r.metadata[field]).toLowerCase().includes(query)
        );

        if (!titleMatch && !descMatch && !locMatch && !catMatch && !tagsMatch && !metaMatch && !personMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'DATE_DESC') return b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || '');
      if (sortBy === 'DATE_ASC') return a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || '');
      if (sortBy === 'CONNECTIONS_DESC') {
        return (connectionCounts[b.id] || 0) - (connectionCounts[a.id] || 0);
      }
      if (sortBy === 'TITLE_ASC') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [receipts, selectedCategory, dateFilter, searchQuery, sortBy, connectionCounts]);

  // Active filters detection
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All' || dateFilter !== 'ALL';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDateFilter('ALL');
    setSortBy('DATE_DESC');
  };

  // Connection data for currently inspected receipt
  const inspectingConnectionData = useMemo(() => {
    if (!inspectingReceipt || !connectionsEngine?.getConnectionsForReceipt) return null;
    return connectionsEngine.getConnectionsForReceipt(inspectingReceipt.id, receipts);
  }, [inspectingReceipt, connectionsEngine, receipts]);

  // Human readable label for current date filter
  const dateFilterLabels = {
    'ALL': 'All Dates',
    'MARCH_2026': 'March 2026',
    'APRIL_2026': 'April 2026',
    'EARLY_MARCH': 'Early March (Mar 1–15)',
    'LATE_MARCH': 'Late March (Mar 16–31)',
    'EARLY_APRIL': 'Early April (Apr 1–15)',
    'LATE_APRIL': 'Late April (Apr 16–30)',
  };

  return (
    <div className="explore-page">
      {/* Page Header */}
      <div className="explore-header-section">
        <div className="explore-title-wrap">
          <span className="explore-kicker">ARCHIVAL EXPLORER</span>
          <h1 className="explore-title">Receipts Repository</h1>
          <p className="explore-subtitle">
            Search, filter, and inspect individual digital life receipts across all 9 categories. Click any receipt to view details, connection intelligence, and related moments.
          </p>
        </div>

        {/* Visible Result Count */}
        <div className="explore-counter-chip">
          <span className="counter-num">{filteredReceipts.length}</span>
          <span className="counter-lbl">
            Result count: {filteredReceipts.length}
          </span>
          <span className="counter-total">
            (of {receipts.length} total)
          </span>
        </div>
      </div>

      {/* Filter Toolbar with explicit Search and Filter DOM labels */}
      <div className="explore-toolbar-panel">
        {/* Search Input with visible Search label */}
        <div className="search-field-container">
          <label htmlFor="receipt-search-input" className="field-visible-label">
            <Search size={14} />
            <span>Search</span>
          </label>
          <div className="search-bar-wrap">
            <input
              id="receipt-search-input"
              type="text"
              className="search-input"
              placeholder="Search across title, description, location, artist/person, keywords, category (e.g. coffee, Leica, Solar Fields, sourdough)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            {searchQuery && (
              <button 
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Secondary Controls (Date filter, Sort, Clear filters) */}
        <div className="toolbar-secondary-controls">
          {/* Date Filter */}
          <div className="control-group">
            <Calendar size={14} className="control-icon" />
            <label htmlFor="date-filter-select" className="control-label">Date Filter:</label>
            <select
              id="date-filter-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="styled-select"
              aria-label="Date filter"
            >
              <option value="ALL">All Dates (Mar – Apr 2026)</option>
              <option value="MARCH_2026">March 2026 Only</option>
              <option value="APRIL_2026">April 2026 Only</option>
              <option value="EARLY_MARCH">Early March (Mar 1–15)</option>
              <option value="LATE_MARCH">Late March (Mar 16–31)</option>
              <option value="EARLY_APRIL">Early April (Apr 1–15)</option>
              <option value="LATE_APRIL">Late April (Apr 16–30)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="control-group">
            <ArrowUpDown size={14} className="control-icon" />
            <label htmlFor="sort-by-select" className="control-label">Sort:</label>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="styled-select"
              aria-label="Sort receipts"
            >
              <option value="DATE_DESC">Newest First</option>
              <option value="DATE_ASC">Oldest First</option>
              <option value="CONNECTIONS_DESC">Most Connected First</option>
              <option value="TITLE_ASC">Alphabetical (A–Z)</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button 
              type="button"
              className="clear-filters-btn"
              onClick={handleClearFilters}
              aria-label="Clear filters"
            >
              <RotateCcw size={13} />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Bar with explicit Filter label */}
      <div className="category-filter-section">
        <span className="category-filter-label">
          <Filter size={14} />
          <span>Filter</span>
        </span>

        <div className="category-chips-scroll" role="toolbar" aria-label="Category Filters">
          <button
            type="button"
            className={`category-chip-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
            aria-label="Filter: All Receipts"
          >
            <span>All</span>
            <span className="cat-count-badge">{receipts.length}</span>
          </button>

          {CATEGORIES.map(cat => {
            const cfg = CATEGORY_CONFIG[cat] || {};
            const catCount = receipts.filter(r => r.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                className={`category-chip-btn ${isSelected ? 'active' : ''}`}
                style={{
                  '--chip-color': cfg.color,
                  '--chip-bg': cfg.bg,
                  '--chip-border': cfg.border,
                }}
                onClick={() => setSelectedCategory(cat)}
                aria-label={`Filter: ${cat}`}
              >
                <span className="cat-bullet" style={{ backgroundColor: cfg.color }}></span>
                <span>{cat}</span>
                <span className="cat-count-badge">{catCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <div className="active-filters-bar" aria-label="Active Filters">
          <span className="active-filters-label">
            <SlidersHorizontal size={13} />
            <span>Active Filters:</span>
          </span>

          <div className="active-filter-chips-list">
            {searchQuery.trim() && (
              <span className="active-filter-pill">
                <span className="pill-type">Query:</span>
                <span className="pill-text">"{searchQuery}"</span>
                <button 
                  type="button"
                  className="pill-remove-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search query filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="active-filter-pill">
                <span className="pill-type">Category:</span>
                <span className="pill-text">{selectedCategory}</span>
                <button 
                  type="button"
                  className="pill-remove-btn"
                  onClick={() => setSelectedCategory('All')}
                  aria-label="Remove category filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {dateFilter !== 'ALL' && (
              <span className="active-filter-pill">
                <span className="pill-type">Date:</span>
                <span className="pill-text">{dateFilterLabels[dateFilter] || dateFilter}</span>
                <button 
                  type="button"
                  className="pill-remove-btn"
                  onClick={() => setDateFilter('ALL')}
                  aria-label="Remove date filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            <button 
              type="button"
              className="clear-all-inline-btn"
              onClick={handleClearFilters}
              aria-label="Clear all filters"
            >
              <RotateCcw size={11} />
              <span>Clear filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Receipts Grid or Empty State */}
      <main className="explore-results-area" aria-label="Receipts Results Grid">
        {filteredReceipts.length > 0 ? (
          <div className="receipts-responsive-grid">
            {filteredReceipts.map(receipt => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
                connectionCount={connectionCounts[receipt.id] || 0}
                onSelectReceipt={(r) => setInspectingReceipt(r)}
                onViewConnections={onViewConnections}
              />
            ))}
          </div>
        ) : (
          <div className="explore-empty-state">
            <div className="empty-icon-wrap">
              <Inbox size={42} className="empty-icon" />
            </div>
            <h3 className="empty-title">No receipts match your search</h3>
            <p className="empty-desc">
              We couldn't find any digital records matching your active filters
              {searchQuery ? ` for "${searchQuery}"` : ''}
              {selectedCategory !== 'All' ? ` in category "${selectedCategory}"` : ''}
              {dateFilter !== 'ALL' ? ` during ${dateFilterLabels[dateFilter]}` : ''}.
            </p>
            <div className="empty-actions-row">
              <button 
                type="button"
                className="empty-reset-btn" 
                onClick={handleClearFilters}
                aria-label="Clear filters and restore all receipts"
              >
                <RotateCcw size={14} />
                <span>Clear filters</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Receipt Detail Modal */}
      {inspectingReceipt && (
        <ReceiptDetailModal
          receipt={inspectingReceipt}
          connectionData={inspectingConnectionData}
          connectionCount={connectionCounts[inspectingReceipt.id] || 0}
          onClose={() => setInspectingReceipt(null)}
          onViewConnections={onViewConnections}
          onSelectReceipt={(r) => setInspectingReceipt(r)}
          onFilterCategory={(cat) => setSelectedCategory(cat)}
        />
      )}
    </div>
  );
}
