import React from 'react';
import { Sparkles, Plus, Cloud, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAddModal: () => void;
  onOpenDeployGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onOpenAddModal,
  onOpenDeployGuide
}) => {
  return (
    <header className="site-header">
      <div className="brand-section">
        <div className="brand-logo-badge">
          <Sparkles size={22} />
        </div>
        <div className="brand-title-group">
          <div className="brand-title">
            <span>NEXUS</span>
            <span style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>// HUB</span>
          </div>
          <span className="brand-subtitle">AI Creations Launchpad & Index</span>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={onOpenDeployGuide}
          title="Cloudflareデプロイ＆ドメイン設定ガイド"
        >
          <Cloud size={16} color="var(--accent-cyan)" />
          <span>Cloudflare ガイド</span>
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={onOpenAddModal}
        >
          <Plus size={16} />
          <span>新規サービス登録</span>
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 4px' }} />

        {/* X (Twitter) Icon */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          title="X (Twitter)"
          style={{ padding: '8px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        {/* GitHub Icon */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          title="GitHub"
          style={{ padding: '8px' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>

        <button
          type="button"
          className="btn-ghost"
          onClick={onToggleTheme}
          title={isDark ? 'ライトモードに切替' : 'ダークモードに切替'}
        >
          {isDark ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>
      </div>
    </header>
  );
};
