import React from 'react';
import { Activity, Layers, Rocket, Zap, Terminal } from 'lucide-react';
import type { StatsSummary } from '../types/project';

interface StatsHeroProps {
  stats: StatsSummary;
}

export const StatsHero: React.FC<StatsHeroProps> = ({ stats }) => {
  return (
    <section className="hero-hud">
      <div className="glass-card hero-main-card">
        <div>
          <div className="hero-eyebrow">
            <Terminal size={14} />
            <span>UNIFIED AI ECOSYSTEM</span>
          </div>
          <h1 className="hero-title">
            AIで作った全サービスを<br />
            1つのドメインに集約する。
          </h1>
          <p className="hero-description">
            ノリで作ったWebツール、スライド、ゲーム、LP、実験プロトタイプを一覧化。
            日常的な単純接触回数を増やし、メンテナンスと活用のハードルをゼロにする個人開発ランチャー。
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
          <div className="status-pill live" style={{ padding: '6px 12px', fontSize: '12px' }}>
            <span className="status-dot pulse" />
            <span>SYSTEM STATUS : ALL LIVE</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            HOSTED ON CLOUDFLARE PAGES
          </span>
        </div>
      </div>

      <div className="hero-stats-panel">
        <div className="glass-card stat-box">
          <div className="stat-label">
            <Rocket size={14} color="var(--accent-primary)" />
            <span>TOTAL LAUNCHES</span>
          </div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-subtext">制作・登録済みプロジェクト</div>
        </div>

        <div className="glass-card stat-box">
          <div className="stat-label">
            <Activity size={14} color="var(--accent-emerald)" />
            <span>ACTIVE LIVE</span>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-emerald)' }}>
            {stats.liveCount}
          </div>
          <div className="stat-subtext">正常稼働中サブドメイン</div>
        </div>

        <div className="glass-card stat-box">
          <div className="stat-label">
            <Layers size={14} color="var(--accent-cyan)" />
            <span>CATEGORIES</span>
          </div>
          <div className="stat-value">{Object.keys(stats.categoryCounts).length}</div>
          <div className="stat-subtext">ツール・スライド・ゲーム・LP</div>
        </div>

        <div className="glass-card stat-box">
          <div className="stat-label">
            <Zap size={14} color="var(--accent-purple)" />
            <span>TAGS INDEXED</span>
          </div>
          <div className="stat-value">{stats.allTags.length}</div>
          <div className="stat-subtext">検索・フィルタリング対応</div>
        </div>
      </div>
    </section>
  );
};
