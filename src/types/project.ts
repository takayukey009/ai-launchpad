export type ProjectCategory = 
  | 'tool'        // Webツール・ユーティリティ
  | 'slide'       // HTMLスライド・プレゼン
  | 'game'        // Webゲーム・インタラクティブ
  | 'lp'          // サイト・LP・ポートフォリオ
  | 'ai-agent'    // AIエージェント・ボット
  | 'experiment'; // 実験・プロトタイプ

export type ProjectStatus = 'live' | 'beta' | 'wip' | 'archived';

export interface Project {
  id: string;
  number: string;              // "No.001"
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  url: string;                  // サブドメインURL (e.g. https://diff-lab.yourdomain.com)
  githubUrl?: string;
  thumbnail?: string;           // 画像URL (未設定時はジェネレーティブグラデーション)
  tags: string[];
  aiTools: string[];           // 例: ["Claude 3.7", "Vite", "Cloudflare Pages"]
  createdAt: string;           // "2026-03"
  features?: string[];         // 主な機能リスト
  promptNotes?: string;        // 作成時のプロンプトメモやTips
  starred?: boolean;           // おすすめ・注目フラグ
}

export interface StatsSummary {
  total: number;
  liveCount: number;
  categoryCounts: Record<ProjectCategory, number>;
  allTags: string[];
}
