import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Plus, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Project, ProjectCategory, ProjectStatus } from '../types/project';
import { CATEGORY_LABELS } from '../data/projects';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: Project) => void;
  nextNumber: string;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  nextNumber
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('tool');
  const [status, setStatus] = useState<ProjectStatus>('live');
  const [url, setUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [aiToolsInput, setAiToolsInput] = useState('Claude 3.7 Sonnet');
  const [promptNotes, setPromptNotes] = useState('');
  const [starred, setStarred] = useState(false);

  const [copied, setCopied] = useState(false);
  const [showJsonView, setShowJsonView] = useState(false);

  if (!isOpen) return null;

  const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
  const aiTools = aiToolsInput.split(',').map((t) => t.trim()).filter(Boolean);

  const generatedProject: Project = {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`,
    number: nextNumber,
    title: title || '新規AIサービス',
    description: description || 'サービスの説明文がここに入ります。',
    category,
    status,
    url: url || 'https://my-tool.yourdomain.dev',
    githubUrl: githubUrl || undefined,
    tags: tags.length ? tags : ['AI', 'ツール'],
    aiTools: aiTools.length ? aiTools : ['Claude 3.7'],
    createdAt: new Date().toISOString().slice(0, 7),
    promptNotes: promptNotes || undefined,
    starred
  };

  const jsonSnippet = JSON.stringify(generatedProject, null, 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddProject(generatedProject);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>
              新規AIサービス・作品の追加
            </h3>
          </div>
          <button type="button" className="btn-ghost" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              番号: {nextNumber}
            </span>
            <button
              type="button"
              className="btn-ghost"
              style={{ fontSize: '12px', gap: '4px' }}
              onClick={() => setShowJsonView(!showJsonView)}
            >
              <Code2 size={14} />
              <span>{showJsonView ? 'フォーム表示' : 'JSONプレビュー'}</span>
            </button>
          </div>

          {showJsonView ? (
            <div className="form-group">
              <label className="form-label">projects.ts 用 JSONコード</label>
              <div className="code-box">
                <button
                  type="button"
                  className="btn-secondary copy-code-btn"
                  onClick={handleCopyJson}
                >
                  {copied ? <Check size={12} color="var(--accent-emerald)" /> : <Copy size={12} />}
                  <span>{copied ? 'コピー完了' : 'JSONコピー'}</span>
                </button>
                <pre>{jsonSnippet}</pre>
              </div>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">サービス・作品名 *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="例: AI出力比較ラボ"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">説明・概要</label>
                <textarea
                  className="form-textarea"
                  placeholder="例: 複数LLMの出力をリアルタイムで横並び比較する検証ツール。"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">カテゴリ</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  >
                    {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_LABELS[cat].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">稼働ステータス</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                  >
                    <option value="live">🟢 LIVE (稼働中)</option>
                    <option value="beta">🟡 BETA (テスト中)</option>
                    <option value="wip">🔵 WIP (開発中)</option>
                    <option value="archived">⚪ ARCHIVED (アーカイブ)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">URL (サブドメイン等) *</label>
                <input
                  type="url"
                  required
                  className="form-input"
                  placeholder="https://diff-lab.yourdomain.dev"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">GitHub URL (任意)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/username/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">タグ (カンマ区切り)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="AI, 比較, API, Claude"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">使用AIツール</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Claude 3.7, GPT-4o"
                    value={aiToolsInput}
                    onChange={(e) => setAiToolsInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">プロンプトメモ / 作成Tips (任意)</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '60px' }}
                  placeholder="例: 「〇〇のプロンプトで一発出力させた」等の備忘録"
                  value={promptNotes}
                  onChange={(e) => setPromptNotes(e.target.value)}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  checked={starred}
                  onChange={(e) => setStarred(e.target.checked)}
                />
                <span>おすすめ・注目サービスとしてピン留めする（★）</span>
              </label>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              <span>ポータルに追加する</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
