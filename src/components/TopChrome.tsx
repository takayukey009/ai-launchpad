import React from 'react';
import { Command, LayoutGrid, Terminal, BookOpen, Plus, Sun, Moon } from 'lucide-react';

interface TopChromeProps {
  viewMode: 'launcher' | 'bento' | 'terminal';
  onViewModeChange: (mode: 'launcher' | 'bento' | 'terminal') => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAddModal: () => void;
  onOpenManualModal: () => void;
  totalProjects: number;
}

export const TopChrome: React.FC<TopChromeProps> = ({
  viewMode,
  onViewModeChange,
  isDark,
  onToggleTheme,
  onOpenAddModal,
  onOpenManualModal,
  totalProjects
}) => {
  return (
    <header className="top-chrome">
      <div className="chrome-brand">
        <div className="chrome-logo-gem">
          <Command size={16} />
        </div>
        <div className="chrome-title">
          <span>TOGAWA.OS</span>
          <span style={{ color: 'var(--accent-linear-light)', opacity: 0.8 }}>// AI LAUNCHPAD</span>
        </div>
        <div className="edge-ping-badge">
          <span className="pulse-dot anim" style={{ color: 'var(--accent-emerald)' }} />
          <span>Cloudflare Edge: 18ms</span>
        </div>
      </div>

      <div className="chrome-controls">
        {/* Mode Switcher */}
        <div className="view-mode-pill">
          <button
            type="button"
            className={`mode-btn ${viewMode === 'launcher' ? 'active' : ''}`}
            onClick={() => onViewModeChange('launcher')}
            title="Raycast Command Launcher (↑/↓ to select, ↵ to Launch)"
          >
            <Command size={13} />
            <span>Launcher</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === 'bento' ? 'active' : ''}`}
            onClick={() => onViewModeChange('bento')}
            title="Bento Grid Showroom View"
          >
            <LayoutGrid size={13} />
            <span>Bento</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === 'terminal' ? 'active' : ''}`}
            onClick={() => onViewModeChange('terminal')}
            title="Terminal CLI Matrix View"
          >
            <Terminal size={13} />
            <span>Terminal</span>
          </button>
        </div>

        <button
          type="button"
          className="btn-surface"
          onClick={onOpenManualModal}
          style={{ fontSize: '12px' }}
        >
          <BookOpen size={14} color="var(--accent-linear-light)" />
          <span>使い方</span>
        </button>

        <button
          type="button"
          className="btn-raycast"
          onClick={onOpenAddModal}
        >
          <Plus size={14} />
          <span>+ サービス追加</span>
        </button>

        <button
          type="button"
          className="btn-icon"
          onClick={onToggleTheme}
          title={isDark ? 'ライトテーマ' : 'ダークテーマ'}
        >
          {isDark ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#5e6ad2" />}
        </button>
      </div>
    </header>
  );
};
