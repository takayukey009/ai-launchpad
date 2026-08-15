import React, { useState } from 'react';
import { X, BookOpen, Command, Sparkles, Plus, ExternalLink, ArrowRight } from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shortcuts' | 'modes' | 'add'>('shortcuts');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
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
                TOGAWA.OS // 使い方マニュアル
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                自作AIサービス・ツールの活用頻度を最大化する操作ガイド
              </p>
            </div>
          </div>
          <button type="button" className="btn-ghost" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Sub Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            <button
              type="button"
              className={`cat-pill-mini ${activeTab === 'shortcuts' ? 'active' : ''}`}
              onClick={() => setActiveTab('shortcuts')}
            >
              <Command size={13} />
              <span>キーボード操作・ショートカット</span>
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
              <span>新規ツールの追加方法</span>
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
                  開発者向けコマンドライン。<code>list</code> で一覧出力、<code>open hina-tasks</code> で即時起動、<code>status</code> で稼働チェックができます。
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
        </div>
      </div>
    </div>
  );
};
