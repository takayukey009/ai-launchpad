import React, { useState, useEffect, useRef } from 'react';
import { Search, ExternalLink, Copy, Check, Info, Sparkles, Wrench, Presentation, Gamepad2, Globe, Bot, Star, Terminal } from 'lucide-react';
import type { Project, ProjectCategory } from '../types/project';
import { CATEGORY_LABELS } from '../data/projects';

interface CommandLauncherProps {
  projects: Project[];
  onSelectProjectForModal: (p: Project) => void;
  onOpenAddModal: () => void;
}

const CategoryIconMap: Record<ProjectCategory, React.ComponentType<{ size?: number; color?: string }>> = {
  tool: Wrench,
  slide: Presentation,
  game: Gamepad2,
  lp: Globe,
  'ai-agent': Bot,
  experiment: Sparkles
};

export const CommandLauncher: React.FC<CommandLauncherProps> = ({
  projects,
  onSelectProjectForModal,
  onOpenAddModal
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<ProjectCategory | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const listPaneRef = useRef<HTMLDivElement>(null);

  // Filter projects
  const filtered = projects.filter((p) => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.aiTools.some((t) => t.toLowerCase().includes(q))
    );
  });

  const activeProject: Project | undefined = filtered[selectedIndex] || filtered[0];

  // Adjust index if out of bounds
  useEffect(() => {
    if (selectedIndex >= filtered.length) {
      setSelectedIndex(Math.max(0, filtered.length - 1));
    }
  }, [filtered.length, selectedIndex]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on / or ⌘K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // If active element is input, arrow keys move list if alt/arrows
      if (document.activeElement === searchInputRef.current) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filtered.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        } else if (e.key === 'Enter' && activeProject) {
          e.preventDefault();
          window.open(activeProject.url, '_blank');
        }
        return;
      }

      // Global shortcuts when browsing list
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter' && activeProject) {
        e.preventDefault();
        window.open(activeProject.url, '_blank');
      } else if (e.key === ' ' && activeProject) {
        e.preventDefault();
        onSelectProjectForModal(activeProject);
      } else if ((e.key === 'c' || e.key === 'C') && activeProject) {
        e.preventDefault();
        handleCopyUrl(activeProject.url, activeProject.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filtered, selectedIndex, activeProject, onSelectProjectForModal]);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="launcher-container">
      {/* 1. Command Search Input */}
      <div className="launcher-search-box">
        <Search size={18} color="var(--text-muted)" />
        <input
          ref={searchInputRef}
          type="text"
          className="launcher-search-input"
          placeholder="Type to search apps, tools, slides, or tags... (Press ↑ ↓ to navigate, ↵ to Launch)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(0);
          }}
        />
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span className="kbd">⌘K</span>
          <span className="kbd">ESC</span>
        </div>
      </div>

      {/* 2. Category Filter Bar */}
      <div className="launcher-cat-bar">
        <button
          type="button"
          className={`cat-pill-mini ${selectedCat === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCat('all')}
        >
          <Sparkles size={12} />
          <span>All Launches ({projects.length})</span>
        </button>
        {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((cat) => {
          const info = CATEGORY_LABELS[cat];
          const count = projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              className={`cat-pill-mini ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              <span>{info.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* 3. Split Body (List + Preview) */}
      <div className="launcher-body">
        {/* Left List Pane */}
        <div ref={listPaneRef} className="launcher-list-pane">
          {filtered.map((item, idx) => {
            const Icon = CategoryIconMap[item.category] || Sparkles;
            const isFocused = idx === selectedIndex;
            return (
              <div
                key={item.id}
                className={`launcher-item-row ${isFocused ? 'focused' : ''}`}
                onClick={() => {
                  setSelectedIndex(idx);
                  onSelectProjectForModal(item);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="item-main-col">
                  <div className="item-icon-box">
                    <Icon size={16} color={CATEGORY_LABELS[item.category]?.color || '#5e6ad2'} />
                  </div>
                  <div className="item-text-group">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="item-title">{item.title}</span>
                      {item.starred && <Star size={12} color="#fbbf24" fill="#fbbf24" />}
                    </div>
                    <span className="item-desc-snippet">{item.description}</span>
                  </div>
                </div>

                <div className="item-meta-col">
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {item.number}
                  </span>
                  <div className={`status-indicator ${item.status}`}>
                    <span className={`pulse-dot ${item.status === 'live' ? 'anim' : ''}`} />
                    <span>{item.status}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No services match "{search}"</p>
              <button
                type="button"
                className="btn-raycast"
                style={{ marginTop: '12px' }}
                onClick={onOpenAddModal}
              >
                + Create New Service
              </button>
            </div>
          )}
        </div>

        {/* Right Preview Pane */}
        <div className="launcher-preview-pane">
          {activeProject ? (
            <>
              <div className="preview-hero-card">
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at 50% 50%, var(--accent-linear) 0%, transparent 80%)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 2 }}>
                  <div className="item-icon-box" style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                    {React.createElement(CategoryIconMap[activeProject.category] || Sparkles, {
                      size: 24,
                      color: CATEGORY_LABELS[activeProject.category]?.color || '#5e6ad2'
                    })}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {activeProject.number} // {CATEGORY_LABELS[activeProject.category]?.label}
                  </span>
                </div>
              </div>

              <div className="preview-details-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className="preview-title">{activeProject.title}</h3>
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-raycast"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    <span>Launch</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <p className="preview-desc">{activeProject.description}</p>

                {/* Subdomain & Endpoint Specs */}
                <div className="preview-meta-row">
                  <div className="meta-field">
                    <span className="meta-field-label">SUBDOMAIN</span>
                    <span className="meta-field-value" style={{ color: 'var(--accent-cyan)' }}>
                      {activeProject.url.replace('https://', '')}
                    </span>
                  </div>
                  <div className="meta-field">
                    <span className="meta-field-label">AI ENGINE</span>
                    <span className="meta-field-value">
                      {activeProject.aiTools.join(', ')}
                    </span>
                  </div>
                  <div className="meta-field">
                    <span className="meta-field-label">STATUS</span>
                    <span className="meta-field-value" style={{ color: 'var(--accent-emerald)' }}>
                      ● Operational
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TAGS</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                    {activeProject.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'var(--bg-surface-3)',
                          border: '1px solid var(--border-dim)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
              Select a project to inspect details
            </div>
          )}
        </div>
      </div>

      {/* 4. Raycast Action Bar Footer */}
      <div className="launcher-footer">
        <div className="footer-hints">
          <div className="hint-item">
            <span className="kbd">↵</span>
            <span>Launch Subdomain</span>
          </div>
          <div className="hint-item">
            <span className="kbd">Space</span>
            <span>Inspect Full Details</span>
          </div>
          <div className="hint-item">
            <span className="kbd">C</span>
            <span>{copiedId === activeProject?.id ? 'Copied URL!' : 'Copy URL'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            {filtered.length} Services Registered
          </span>
        </div>
      </div>
    </div>
  );
};
