import React, { useState } from 'react';
import { X, BookOpen, Command, Sparkles, Plus, Cloud, Globe, GitBranch, ShieldCheck } from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shortcuts' | 'modes' | 'add' | 'ops'>('shortcuts');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(94, 106, 210, 0.15)',
                border: '1px solid rgba(94, 106, 210, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-linear-light)'
              }}
            >
              <BookOpen size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>
                TOGAWA.OS // 使い方＆運用マニュアル
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                自作AIサービスの活用頻度を最大化する操作と運用の完全ガイド
              </p>
            </div>
          </div>
          <button type="button" className="btn-ghost" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Sub Navigation Tabs */}
          <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', overflowX: 'auto' }}>
            <button
              type="button"
              className={`cat-pill-mini ${activeTab === 'shortcuts' ? 'active' : ''}`}
              onClick={() => setActiveTab('shortcuts')}
            >
              <Command size={13} />
              <span>キーボード操作</span>
            </button>
            <button
              type="button"
              className={`cat-pill-mini ${activeTab === 'modes' ? 'active' : ''}`}
              onClick={() => setActiveTab('modes')}
            >
              <Sparkles size={13} />
              <span>3つの表示モード</span>
            </button>
            <button
              type="button"
              className={`cat-pill-mini ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              <Plus size={13} />
              <span>新規ツールの追加</span>
            </button>
            <button
              type="button"
              className={`cat-pill-mini ${activeTab === 'ops' ? 'active' : ''}`}
              onClick={() => setActiveTab('ops')}
            >
              <Cloud size={13} color="var(--accent-cyan)" />
              <span>自動デプロイ＆独自ドメイン設定</span>
            </button>
          </div>

          {/* TAB 1: SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                このサイトは Raycast や Linear のような<strong>キーボードファースト</strong>で設計されています。マウスを使わずに爆速でツールを起動できます。
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface-2)', borderRadius: '8px', border: '1px solid var(--border-dim)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span className="kbd">↑</span>
                      <span className="kbd">↓</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>リストの選択・移動</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>右ペインのプレビューがリアルタイム連動</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface-2)', borderRadius: '8px', border: '1px solid var(--border-dim)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="kbd">↵ Enter</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>選択中のサービスを即起動</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--accent-emerald)', fontWeight: 600 }}>新しいタブで一瞬で開く</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface-2)', borderRadius: '8px', border: '1px solid var(--border-dim)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="kbd">Space</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>詳細情報・プロンプトTipsを表示</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>モーダルで全体確認</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface-2)', borderRadius: '8px', border: '1px solid var(--border-dim)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="kbd">C</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>サブドメインURLをコピー</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>クリップボードへ即時保存</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-surface-2)', borderRadius: '8px', border: '1px solid var(--border-dim)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="kbd">⌘K</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>検索バーにフォーカス</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>どこからでも瞬時に検索開始</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODES */}
          {activeTab === 'modes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px 14px', background: 'var(--bg-surface-2)', borderRadius: '10px', border: '1px solid var(--border-dim)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-linear-light)', marginBottom: '4px' }}>
                  ⚡ 1. Launcher（ランチャーモード）
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  普段使いに最もおすすめの画面。左側でサクサク選んで、右側でサブドメインやAIプロンプトメモを確認しながら即起動できます。
                </p>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-surface-2)', borderRadius: '10px', border: '1px solid var(--border-dim)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                  🍱 2. Bento（ベントーショールーム）
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  VercelやAppleスタイルの美しいカードグリッド。人に自分の作品を見せたり、実績ポートフォリオとして一覧で眺めたいときに最適です。
                </p>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-surface-2)', borderRadius: '10px', border: '1px solid var(--border-dim)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
                  💻 3. Terminal（CLIマトリクスモード）
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  開発者向けコマンドライン。<code>list</code> で一覧出力、<code>open yagate</code> や <code>open hina-tasks</code> で即時起動、<code>status</code> で稼働チェックができます。
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ADD */}
          {activeTab === 'add' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700 }}>
                💡 AIで新しいツールを作ったときの登録手順
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent-linear)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>1</div>
                  <div>
                    <strong style={{ fontSize: '13px' }}>「+ サービス追加」をクリック</strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>右上のボタンを押して登録モーダルを開きます。</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent-linear)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>2</div>
                  <div>
                    <strong style={{ fontSize: '13px' }}>タイトル・URL・タグを入力</strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>サブドメインURLや使用したAI（Claude 3.7、GPT等）をメモ。</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent-linear)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>3</div>
                  <div>
                    <strong style={{ fontSize: '13px' }}>「ポータルに追加する」をクリック</strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🎉 紙吹雪とともに画面に即時登録され、すぐに使えるようになります！</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OPS (DEPLOY & DOMAINS) */}
          {activeTab === 'ops' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* GitHub CI/CD */}
              <div style={{ padding: '14px 16px', background: 'var(--bg-surface-2)', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '14px', fontWeight: 700 }}>
                  <GitBranch size={16} />
                  <span>GitHub連動の完全自動デプロイ</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  今後、プロジェクトのコードや <code>projects.ts</code> を編集して GitHub に <code>git push</code> するだけで、<strong>Cloudflareが数秒で自動検知して本番サイト（ai-launchpad.pages.dev）を最新版に更新</strong>してくれます。
                </p>
              </div>

              {/* Custom Domains Setup */}
              <div style={{ padding: '14px 16px', background: 'var(--bg-surface-2)', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 700 }}>
                  <Globe size={16} />
                  <span>独自ドメイン・サブドメインの設定手順（任意）</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  もしご自身の独自ドメイン（例: <code>togawa.dev</code> や <code>hub.togawa.dev</code>）をこのポータルに割り当てたい場合の手順です：
                </p>

                <ol style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li>Cloudflareダッシュボード &gt; <strong>Workers &amp; Pages</strong> を開く</li>
                  <li>デプロイした <strong>`ai-launchpad`</strong> をクリック</li>
                  <li><strong>「Custom domains（カスタムドメイン）」</strong> タブ &gt; <strong>「Set up a custom domain」</strong> をクリック</li>
                  <li>割り当てたいドメイン（例: <code>togawa.dev</code> や <code>hub.togawa.dev</code>）を入力して保存</li>
                  <li><strong>DNSレコードとSSL証明書が完全自動で設定され、即座にアクセス可能になります！</strong></li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
