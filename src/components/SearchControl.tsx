import React, { useEffect, useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import type { ProjectCategory } from '../types/project';
import { CATEGORY_LABELS } from '../data/projects';

interface SearchControlProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: ProjectCategory | 'all';
  onCategoryChange: (cat: ProjectCategory | 'all') => void;
  categoryCounts: Record<ProjectCategory, number>;
  totalCount: number;
  allTags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  sortBy: 'latest' | 'number' | 'title';
  onSortChange: (sort: 'latest' | 'number' | 'title') => void;
}

export const SearchControl: React.FC<SearchControlProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
  allTags,
  selectedTag,
  onTagSelect,
  sortBy,
  onSortChange
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keydown for Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="control-bar">
      {/* Search Input Box */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="サービス名、タグ、技術スタック、説明文で検索... (⌘K)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery ? (
          <button
            type="button"
            className="btn-ghost"
            style={{ position: 'absolute', right: '12px', padding: '4px' }}
            onClick={() => onSearchChange('')}
          >
            <X size={16} />
          </button>
        ) : (
          <div className="search-shortcut">
            <span>⌘</span>
            <span>K</span>
          </div>
        )}
      </div>

      {/* Categories & Sort Row */}
      <div className="filters-row">
        <div className="category-tabs">
          <button
            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategoryChange('all')}
          >
            <Sparkles size={14} />
            <span>すべて</span>
            <span className="category-badge">{totalCount}</span>
          </button>

          {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((cat) => {
            const info = CATEGORY_LABELS[cat];
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                <span>{info.label}</span>
                <span className="category-badge">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="view-controls">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            <option value="latest">並び替え: おすすめ・新着順</option>
            <option value="number">並び替え: 番号順</option>
            <option value="title">並び替え: タイトル順</option>
          </select>
        </div>
      </div>

      {/* Tags Filter Bar */}
      {allTags.length > 0 && (
        <div className="tag-bar">
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            TAGS:
          </span>
          {selectedTag && (
            <button
              className="tag-chip active"
              onClick={() => onTagSelect(null)}
              style={{ fontWeight: 600 }}
            >
              <span>{selectedTag}</span>
              <X size={12} />
            </button>
          )}
          {allTags.map((tag) => {
            if (tag === selectedTag) return null;
            return (
              <button
                key={tag}
                className="tag-chip"
                onClick={() => onTagSelect(tag)}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
