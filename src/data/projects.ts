import type { Project, ProjectCategory } from '../types/project';

export const CATEGORY_LABELS: Record<ProjectCategory, { label: string; icon: string; color: string }> = {
  tool: { label: 'Webツール', icon: 'Wrench', color: '#00f2fe' },
  slide: { label: 'HTMLスライド', icon: 'Presentation', color: '#a855f7' },
  game: { label: 'Webゲーム', icon: 'Gamepad2', color: '#ff6363' },
  lp: { label: 'サイト・LP', icon: 'Globe', color: '#5e6ad2' },
  'ai-agent': { label: 'AIエージェント', icon: 'Bot', color: '#10b981' },
  experiment: { label: '実験・プロトタイプ', icon: 'Sparkles', color: '#f59e0b' }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'hina-tasks-schedule-manager',
    number: 'No.001',
    title: 'Hina Tasks // 公演・稽古日程タスク管理システム',
    description: '劇団・公演の稽古日程表（PDF解析連動）と出演者別タスクをリアルタイムに一元管理するスマートマネージャー。',
    category: 'tool',
    status: 'live',
    url: 'https://tasks.togawa.dev',
    githubUrl: 'https://github.com/takayuki-togawa/hina-tasks',
    tags: ['Firebase', '日程管理', 'タスク管理', 'PDF解析', 'AI自動化'],
    aiTools: ['Antigravity', 'Claude 3.7 Sonnet', 'Firebase / Firestore'],
    createdAt: '2026-03',
    starred: true,
    features: [
      '稽古日程表PDFからの自動スケジュール抽出・同期',
      'キャスト・スタッフ別のタスク割り当て＆進捗可視化',
      'Firestoreによるリアルタイム同期＆オフライン対応'
    ],
    promptNotes: '「公演の稽古日程PDFを読み込んで、個人のスケジュールとタスクを一覧・更新できる実用的なWebシステム」をAIとペアプロして構築。'
  },
  {
    id: 'ai-diff-lab',
    number: 'No.002',
    title: 'AI出力比較ラボ',
    description: '同じ指示をClaude・GPT・Geminiの複数モデルへ同時に投げ、世代別の出力・応答速度・トークン数を並べて比較する検証ツール。',
    category: 'tool',
    status: 'live',
    url: 'https://diff-lab.togawa.dev',
    githubUrl: 'https://github.com/takayuki-togawa/ai-diff-lab',
    tags: ['AI', 'モデル比較', 'API', 'Claude', 'GPT-4o'],
    aiTools: ['Claude 3.7 Sonnet', 'OpenAI API', 'Anthropic API'],
    createdAt: '2026-02',
    starred: true,
    features: [
      '3画面スプリットビューでリアルタイムストリーミング比較',
      'トークンコスト・レスポンス秒数の自動算出',
      'Markdown / コードシンタックスハイライトの並列レンダリング'
    ],
    promptNotes: '「3つのLLMのAPIを叩いて同じプロンプトの出力を横並びで比較できるミニマルなWebUIを作って」と指示して1発生成。'
  },
  {
    id: 'gemini-spark-deck',
    number: 'No.003',
    title: 'Gemini Spark活用10選',
    description: 'HTML/CSS/JSだけで構築された超軽量・美麗プレゼンスライド（全38枚）。クリックまたは矢印キーでスムーズに進行。',
    category: 'slide',
    status: 'live',
    url: 'https://spark-deck.togawa.dev',
    tags: ['スライド', 'プレゼン', 'Gemini', 'HTMLスライド'],
    aiTools: ['Gemini 2.0 Flash', 'Tailwind', 'Vanilla JS'],
    createdAt: '2026-02',
    features: [
      'キーボード操作（←/→、Space、Fで全画面）',
      'インタラクティブなコード実行ブロック内蔵',
      'PDF書き出しモード対応'
    ]
  },
  {
    id: 'non-ai-design-recipes',
    number: 'No.004',
    title: 'AI感のないデザイン 26の作り方',
    description: '同じLPを26通りのプロンプト指示で生成した比較検証録。全ページに使ったWeb技術と配色レシピを一覧化。',
    category: 'lp',
    status: 'live',
    url: 'https://design-recipes.togawa.dev',
    tags: ['AI', 'LP', 'デザイン', 'UI/UX', 'CSS'],
    aiTools: ['Claude 3.7', 'Figma AI'],
    createdAt: '2026-01',
    features: [
      '26パターンのデザインカタログ検索',
      'ワンクリックでCSSデザイントークンをコピー',
      'フォント・余白・配色パレットの解説'
    ]
  },
  {
    id: 'cyber-rogue-canvas',
    number: 'No.005',
    title: 'Cyber Grid Rogue',
    description: 'HTML5 CanvasとWeb Audio APIだけで作られた、ブラウザで即遊べるサイバーパンク風ミニローグライクゲーム。',
    category: 'game',
    status: 'beta',
    url: 'https://cyber-rogue.togawa.dev',
    tags: ['ゲーム', 'Canvas', 'ローグライク', 'WebAudio'],
    aiTools: ['Claude 3.7', 'Gemini 2.0'],
    createdAt: '2026-02'
  },
  {
    id: 'token-cost-calculator',
    number: 'No.006',
    title: 'AI API料金シミュレーター',
    description: '文字数やトークン数、想定リクエスト数から各社主要モデルの月額APIコストを日本円で瞬時に試算するツール。',
    category: 'tool',
    status: 'live',
    url: 'https://cost-sim.togawa.dev',
    tags: ['ツール', 'API料金', 'シミュレータ', '便利ツール'],
    aiTools: ['GPT-4o mini', 'React'],
    createdAt: '2026-01'
  }
];
